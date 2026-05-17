#!/usr/bin/env python3
"""
Validate a Syncolab skill directory.

Expected repository layout:

/skills/
  meta.schema.json
  meta.instructions.md
  skill.instruction.md
  <skill-label>/
    SKILL.md
    meta.yaml
    references/   optional
    assets/       optional
    scripts/      optional

Usage:
  python scripts/validate_skill.py <skill-label>

Example:
  python scripts/validate_skill.py code-review

Dependencies:
  pip install pyyaml jsonschema
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover
    yaml = None

try:
    from jsonschema import Draft202012Validator
except ImportError:  # pragma: no cover
    Draft202012Validator = None


ALLOWED_OPTIONAL_DIRS = {"references", "assets", "scripts"}
REQUIRED_SKILL_FILES = {"SKILL.md", "meta.yaml"}
# Repository scaffold; not a published operational skill.
SCAFFOLD_SKILL_LABELS = {"_template"}
SKILL_LABEL_PATTERN = re.compile(r"^[a-z][a-z0-9]*(-[a-z0-9]+)*$")
FRONTMATTER_PATTERN = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)

RECOMMENDED_SKILL_SECTIONS = [
    "Purpose",
    "When to Use",
    "Expected Outcome",
    "Workflow",
    "Tool Availability Rules",
    "Output Format",
    "Quality Bar",
]


def find_repo_root(start: Path) -> Path:
    """Find repository root by walking upward until /skills exists."""
    current = start.resolve()

    for candidate in [current, *current.parents]:
        if (candidate / "skills").is_dir():
            return candidate

    return current


def load_json(path: Path, errors: list[str]) -> Any | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"Invalid JSON in {path}: {exc}")
        return None


def load_yaml(path: Path, errors: list[str]) -> Any | None:
    if yaml is None:
        errors.append("Missing dependency: PyYAML. Install with: pip install pyyaml")
        return None

    try:
        return yaml.safe_load(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"Invalid YAML in {path}: {exc}")
        return None


def validate_skill_label(skill_label: str, errors: list[str]) -> None:
    if skill_label in SCAFFOLD_SKILL_LABELS:
        return

    if not SKILL_LABEL_PATTERN.match(skill_label):
        errors.append(
            f"Invalid skill label '{skill_label}'. Skill labels must be lowercase kebab-case, "
            "for example: code-review"
        )


def validate_required_global_files(skills_dir: Path, errors: list[str]) -> None:
    schema_path = skills_dir / "meta.schema.json"
    instructions_path = skills_dir / "meta.instructions.md"
    creation_instructions_path = skills_dir / "skill.instruction.md"

    if not schema_path.is_file():
        errors.append(f"Missing global schema file: {schema_path}")

    if not instructions_path.is_file():
        errors.append(f"Missing global metadata instructions file: {instructions_path}")

    if not creation_instructions_path.is_file():
        errors.append(f"Missing global skill creation instructions file: {creation_instructions_path}")


def validate_skill_directory(skill_dir: Path, skill_label: str, errors: list[str], warnings: list[str]) -> None:
    if not skill_dir.exists():
        errors.append(f"Skill directory does not exist: {skill_dir}")
        return

    if not skill_dir.is_dir():
        errors.append(f"Skill path exists but is not a directory: {skill_dir}")
        return

    if skill_dir.name != skill_label:
        errors.append(f"Skill directory name '{skill_dir.name}' does not match skill label '{skill_label}'.")

    for required_file in REQUIRED_SKILL_FILES:
        if not (skill_dir / required_file).is_file():
            errors.append(f"Missing required file: {skill_dir / required_file}")

    for child in skill_dir.iterdir():
        if child.is_dir() and child.name not in ALLOWED_OPTIONAL_DIRS:
            errors.append(
                f"Unsupported directory in skill: {child}. "
                f"Allowed optional directories are: {', '.join(sorted(ALLOWED_OPTIONAL_DIRS))}"
            )
        elif child.is_file() and child.name not in REQUIRED_SKILL_FILES:
            warnings.append(
                f"Unexpected file in skill root: {child}. "
                "Consider moving supporting files into references/, assets/, or scripts/."
            )


def validate_meta_yaml(
    meta_path: Path,
    schema_path: Path,
    skill_label: str,
    errors: list[str],
    warnings: list[str],
) -> dict[str, Any] | None:
    if Draft202012Validator is None:
        errors.append("Missing dependency: jsonschema. Install with: pip install jsonschema")
        return None

    schema = load_json(schema_path, errors)
    meta = load_yaml(meta_path, errors)

    if schema is None or meta is None:
        return None

    if not isinstance(meta, dict):
        errors.append(f"meta.yaml must contain a YAML object at the root: {meta_path}")
        return None

    validator = Draft202012Validator(schema)
    validation_errors = sorted(validator.iter_errors(meta), key=lambda e: list(e.path))

    for err in validation_errors:
        location = ".".join(str(part) for part in err.path) or "<root>"
        errors.append(f"meta.yaml schema error at {location}: {err.message}")

    name = meta.get("name")
    if isinstance(name, str) and skill_label not in SCAFFOLD_SKILL_LABELS:
        normalized_name = name.strip().lower().replace(" ", "-")
        if normalized_name != skill_label:
            warnings.append(
                f"meta.yaml name '{name}' does not obviously match skill label '{skill_label}'. "
                "This may be intentional for display names, but check consistency."
            )

    tags = meta.get("tags")
    if (
        isinstance(tags, list)
        and skill_label not in SCAFFOLD_SKILL_LABELS
        and skill_label not in tags
    ):
        warnings.append(
            f"meta.yaml tags do not include the skill label '{skill_label}'. "
            "Consider adding it for discoverability unless intentionally omitted."
        )

    return meta


def parse_frontmatter(skill_md: str, skill_md_path: Path, errors: list[str]) -> dict[str, Any] | None:
    match = FRONTMATTER_PATTERN.match(skill_md)
    if not match:
        errors.append(f"SKILL.md is missing YAML frontmatter at the top: {skill_md_path}")
        return None

    if yaml is None:
        errors.append("Missing dependency: PyYAML. Install with: pip install pyyaml")
        return None

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except Exception as exc:
        errors.append(f"Invalid SKILL.md frontmatter YAML in {skill_md_path}: {exc}")
        return None

    if not isinstance(frontmatter, dict):
        errors.append(f"SKILL.md frontmatter must be a YAML object: {skill_md_path}")
        return None

    return frontmatter


def validate_skill_md(
    skill_md_path: Path,
    skill_label: str,
    meta: dict[str, Any] | None,
    errors: list[str],
    warnings: list[str],
) -> None:
    if not skill_md_path.is_file():
        return

    try:
        content = skill_md_path.read_text(encoding="utf-8")
    except Exception as exc:
        errors.append(f"Could not read SKILL.md: {exc}")
        return

    if not content.strip():
        errors.append(f"SKILL.md is empty: {skill_md_path}")
        return

    frontmatter = parse_frontmatter(content, skill_md_path, errors)

    if frontmatter is not None:
        frontmatter_name = frontmatter.get("name")
        frontmatter_description = frontmatter.get("description")

        if frontmatter_name != skill_label:
            errors.append(
                f"SKILL.md frontmatter name must match skill label. "
                f"Expected '{skill_label}', got '{frontmatter_name}'."
            )

        if not isinstance(frontmatter_description, str) or len(frontmatter_description.strip()) < 20:
            errors.append("SKILL.md frontmatter description is missing or too short.")

    if f"# " not in content:
        errors.append("SKILL.md must include at least one top-level heading.")

    for section in RECOMMENDED_SKILL_SECTIONS:
        heading_pattern = re.compile(rf"^##\s+{re.escape(section)}\s*$", re.MULTILINE)
        if not heading_pattern.search(content):
            warnings.append(f"SKILL.md is missing recommended section: ## {section}")

    line_count = len(content.splitlines())
    if line_count > 500:
        warnings.append(
            f"SKILL.md has {line_count} lines. Consider moving large details into references/ "
            "to preserve progressive disclosure."
        )

    if meta:
        meta_description = meta.get("description", {})
        capability = meta_description.get("capability") if isinstance(meta_description, dict) else None
        if isinstance(capability, str) and capability[:40].lower() not in content.lower():
            warnings.append(
                "SKILL.md does not appear to reflect meta.yaml description.capability. "
                "Check that metadata and skill body are aligned."
            )


def validate_optional_directories(skill_dir: Path, errors: list[str], warnings: list[str]) -> None:
    references_dir = skill_dir / "references"
    assets_dir = skill_dir / "assets"
    scripts_dir = skill_dir / "scripts"

    if references_dir.exists():
        for item in references_dir.rglob("*"):
            if item.is_file() and item.name.startswith("."):
                warnings.append(f"Hidden file found in references/: {item}")

    if assets_dir.exists():
        for item in assets_dir.rglob("*"):
            if item.is_file() and item.suffix.lower() not in {
                ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
                ".mp3", ".wav", ".m4a", ".mp4", ".mov", ".webm",
                ".pdf"
            }:
                warnings.append(
                    f"Unusual file type in assets/: {item}. "
                    "Assets should usually be images, audio, video, diagrams, or PDFs."
                )

    if scripts_dir.exists():
        for item in scripts_dir.rglob("*"):
            if item.is_file() and item.suffix.lower() not in {
                ".py", ".sh", ".bash", ".zsh", ".js", ".ts", ".mjs", ".json", ".yaml", ".yml", ".md"
            }:
                warnings.append(
                    f"Unusual file type in scripts/: {item}. "
                    "Scripts should usually be executable or configuration files."
                )


def print_report(skill_label: str, errors: list[str], warnings: list[str]) -> int:
    if not errors and not warnings:
        print(f"✅ Skill '{skill_label}' is valid.")
        return 0

    if not errors:
        print(f"✅ Skill '{skill_label}' passed required validation with warnings.")
    else:
        print(f"❌ Skill '{skill_label}' is invalid.")

    if errors:
        print("\nErrors to fix:")
        for index, error in enumerate(errors, start=1):
            print(f"  {index}. {error}")

    if warnings:
        print("\nWarnings to review:")
        for index, warning in enumerate(warnings, start=1):
            print(f"  {index}. {warning}")

    return 1 if errors else 0


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python scripts/validate_skill.py <skill-label>", file=sys.stderr)
        return 2

    skill_label = sys.argv[1].strip()
    errors: list[str] = []
    warnings: list[str] = []

    validate_skill_label(skill_label, errors)

    repo_root = find_repo_root(Path.cwd())
    skills_dir = repo_root / "skills"
    skill_dir = skills_dir / skill_label
    schema_path = skills_dir / "meta.schema.json"
    meta_path = skill_dir / "meta.yaml"
    skill_md_path = skill_dir / "SKILL.md"

    if not skills_dir.is_dir():
        errors.append(f"Could not find /skills directory from current path: {Path.cwd()}")
        return print_report(skill_label, errors, warnings)

    validate_required_global_files(skills_dir, errors)
    validate_skill_directory(skill_dir, skill_label, errors, warnings)

    meta = None
    if meta_path.is_file() and schema_path.is_file():
        meta = validate_meta_yaml(meta_path, schema_path, skill_label, errors, warnings)

    validate_skill_md(skill_md_path, skill_label, meta, errors, warnings)

    if skill_dir.is_dir():
        validate_optional_directories(skill_dir, errors, warnings)

    return print_report(skill_label, errors, warnings)


if __name__ == "__main__":
    raise SystemExit(main())
