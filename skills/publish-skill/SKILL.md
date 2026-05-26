---
name: publish-skill
description: Publishes a validated Syncolab skill via GitHub pull request for review and merge to main. Use when submitting a new or updated skill under skills/ to the syncolab-skills repository after local authoring is complete.
---

# Publish Skill

## Purpose

Opens a GitHub pull request to add or update a Syncolab skill on `main` after local authoring and validation are complete. Assumes the **syncolab-skills** repo is cloned, the agent has **shell** and **GitHub** access (`git`, `gh`), and skill content already follows repository standards.

For authoring the skill itself, use **create-skill** first.

## When to Use

- User asks to publish, submit, PR, or contribute a skill to syncolab-skills.
- Skill files exist under `skills/<skill-label>/` and should land on `main` via review.
- User finished create-skill work and wants the GitHub workflow next.

## When NOT to Use

- Skill does not exist or has not been validated → use **create-skill** first.
- User only wants local edits without opening a PR.
- User asked to force-push, rewrite history, or merge without review.
- Changes are unrelated to skill packages (no skill paths in the PR).

## Expected Outcome

- Feature branch pushed to `origin`.
- One focused commit (or small logical set) containing the skill changes.
- Open PR targeting `main` with a clear summary and test plan.
- PR URL returned to the user.
- Skill content meets repository standards (`create-skill` checklist). Syncolab maintainers update catalog artifacts when merging to `main`.

## Inputs to Gather

1. **Skill label(s)** — directory name(s) under `skills/`, e.g. `create-skill`.
2. **Remote** — `origin` URL and default branch (usually `main`).
3. **Git state** — branch, uncommitted files, divergence from `main`.
4. **Review status** — skill structure checked against `meta.schema.json` and instruction files.
5. **User intent** — draft PR vs ready for review; any linked issue/ticket.

Confirm the skill package is complete per **create-skill** before publishing.

## Workflow

### 1. Verify prerequisites

```bash
# Repo root
test -d skills && command -v git && command -v gh
```

- If `gh` is missing or unauthenticated, stop and ask the user to install/auth (`gh auth login`).
- Read **create-skill** if `SKILL.md` / `meta.yaml` are missing or invalid.

### 2. Review every skill in the change set

Confirm each skill in scope passes the **create-skill** review checklist (structure, frontmatter, `meta.yaml` vs schema). Do not open a PR with known schema or naming errors.

### 3. Inspect git state (parallel)

```bash
git status
git diff
git branch -vv
git log -5 --oneline
```

- Identify files under `skills/<skill-label>/` (and only include intentional related changes).
- Do not stage unrelated edits, secrets, or `.env` files.

### 4. Sync with default branch

```bash
git fetch origin
git log origin/main..HEAD --oneline
git diff origin/main...HEAD --stat
```

Create a new branch if still on `main` with local commits, or continue on an existing feature branch.

```bash
git checkout -b "add-skill-<skill-label>"
# or reuse an approved branch name the user prefers
```

### 5. Stage and commit (focused)

Stage only skill-related paths:

```bash
git add "skills/<skill-label>/"
# add other skill paths if multiple skills in one PR
git status
```

Commit message (complete sentences, focus on **why**):

```text
Add <skill-label> skill for <short capability summary>.

EOF via heredoc when committing from automation.
```

Use a HEREDOC for multi-line messages:

```bash
git commit -m "$(cat <<'EOF'
Add create-skill skill for authoring validated Syncolab skills.

EOF
)"
```

- Do not use `--no-verify` unless the user explicitly requests it.
- Do not commit unless the user asked to commit (if unclear, ask once).

### 6. Push and open PR

```bash
git push -u origin HEAD
```

```bash
gh pr create --title "Add <skill-label> skill" --body "$(cat <<'EOF'
## Summary
- Adds `skills/<skill-label>/` with SKILL.md and meta.yaml.
- Review: skill conforms to `meta.schema.json` and instruction files.

## Test plan
- [ ] Skill reviewed against schema and instructions
- [ ] Review routing metadata (description, tags, triggers)
- [ ] Confirm skill boundaries and tool rules are appropriate

EOF
)"
```

Adjust title/body for updates vs new skills (`Update …` / `Fix validation for …`).

### 7. Report back

Return:

- PR URL
- Branch name
- Skill label(s) included
- Validation command(s) run
- Anything left unstaged or uncommitted

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| `git` + `gh` + network | Branch, commit (if approved), push, open PR. |
| `git` only | Prepare branch and commit locally; give exact `gh pr create` for the user. |
| Read-only | Output step-by-step commands and PR body draft; do not claim push/PR succeeded. |

Never fabricate PR URLs, CI status, or review approval.

## Review / Decision / Execution Criteria

**Ready to publish when:**

- Each skill in the PR meets authoring standards from **create-skill**.
- PR contains only intentional skill (and closely related) files.
- Commit message describes user-visible outcome.
- PR body includes summary and test plan checklist.
- Metadata and `SKILL.md` are aligned (triggers, boundaries, type).

**Do not:**

- Force-push to `main` / `master` without explicit user request (warn if asked).
- `git add .` when unrelated changes exist in the tree.
- Combine unrelated refactors with a skill addition.

## Output Format

```markdown
## Publish result
- **PR:** <url>
- **Branch:** <name>
- **Skills:** <skill-label>(s)
- **Validation:** passed | failed (details)

## Notes
- <uncommitted files, follow-ups, or reviewer callouts>
```

## Quality Bar

- One PR per logical skill addition when possible; split unrelated work.
- PR title is specific (`Add code-review skill`, not `Updates`).
- Test plan is actionable for human reviewers.
- Respect repository git safety: no destructive commands without explicit approval.

## Safety and Boundaries

- Never commit credentials, `.env`, or private keys.
- Never force-push shared default branches unless explicitly requested.
- Never skip hooks unless the user explicitly requests it.
- Do not merge the PR unless the user explicitly asks and permissions allow.

## Escalation / Dispatch Rules

- **Skill content incomplete** → **create-skill**, then return to publish-skill.
- **Large unrelated diff** → propose split (separate PRs per skill or concern); do not `git add .`.
- **CI failures after PR** → fix in the same branch, push, report; optional babysit-style follow-up if available.
- **Multiple skills** → validate each label; one PR is fine if scope is cohesive and reviewable.

## References

- **create-skill** — `skills/create-skill/SKILL.md`
- `skills/skill.instruction.md`
- `skills/meta.schema.json` — metadata rules
- GitHub CLI: `gh pr create`, `gh pr view`
