---
name: snyk
description: Runs Snyk dependency and code security scans, prioritizes findings by severity and exploitability, and proposes minimal-breakage remediations. Use when auditing vulnerabilities or validating fixes.
---

# Snyk

## Purpose

Run Snyk scans (dependencies, containers, code where supported), prioritize findings by risk, and propose upgrades or patches with re-scan verification.

## When to Use

- User asks for vulnerability scan, Snyk report, or dependency audit.
- Prioritizing CVEs before release or after alert.
- Planning upgrades/patches with minimal breakage.
- Verifying fixes with a follow-up scan.

## When NOT to Use

- Non-Snyk DAST/IaC-only tools without Snyk in scope.
- Threat modeling or design review → **threat-modeling**.
- General code review without security tooling → **shadow-code-reviewer**.

## Expected Outcome

- Scan summary with counts by severity and top exploitable issues.
- Concrete remediation paths (upgrade version, patch, ignore with justification only if user requests).
- Re-scan confirmation after fixes when tools allow.

## Inputs to Gather

- Repository path, manifest/lockfiles, and target branch.
- Snyk org/project IDs if using Snyk API/MCP.
- Severity threshold and SLA context (blocker vs backlog).
- Whether container or IaC scans are in scope.

## Workflow

1. Confirm Snyk CLI or `snyk` / `security-scanner` tools are available.
2. Run appropriate test (`test`, `code test`, `container test` per project type).
3. Sort by severity and exploitability; deprioritize unreachable dev-only noise when evidence supports it.
4. Propose minimal-change upgrades; note breaking major bumps separately.
5. Apply fixes only when user approves write access.
6. Re-scan and diff issue counts.

## Domain guidance

Use Snyk CLI or IDE integration to scan dependencies and code for known vulnerabilities. Prioritize by severity and exploitability; propose upgrades or patches with minimal breakage. Re-scan after fixes.

- Prefer upgrading direct dependencies before transitive overrides.
- Document any ignore with expiry and owner if the user explicitly accepts risk.
- Never fabricate CVE lists or scan exit codes.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Run scans and apply approved manifest/lockfile updates. |
| Read-only | Run read-only scan; output patch commands. |
| No integration | Provide exact `snyk test` commands; do not invent findings. |

### Related tool sets

- `snyk`
- `security-scanner`

## Review / Decision / Execution Criteria

- Distinguish fixable vs accepted risk vs false positive.
- Call out reachable exploit paths when Snyk provides them.
- Confirm major upgrades that affect API compatibility.

## Output Format

1. Scan scope and command(s) run.
2. Table: issue, severity, package, fixed in version.
3. Recommended actions (ordered).
4. Re-scan delta if performed.
5. Blockers (auth, missing files).

## Quality Bar

- Actionable for developers; avoid dumping raw JSON without prioritization.
- Evidence from Snyk output only.

## Safety and Boundaries

- Do not commit Snyk tokens or `.snyk` policy changes without approval.
- Do not fabricate vulnerability counts.

## Escalation / Dispatch Rules

- Architecture-level security design → **threat-modeling**.
- CI integration → **optimize-pipelines**, **add-tests**.

## References

- `skills/old_skills.json` (`snyk`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
