---
name: github
description: Inspects GitHub pull requests, diffs, files, and reviews via github_* tools. Use for PR details, file lists, comments, reviews, and reading repo file content at a ref.
---

# GitHub

## Purpose

Operate on GitHub pull requests and repository files: fetch PR metadata, list changed files, read diffs, post comments or reviews, and load file content at a path/ref.

## When to Use

- Inspect a PR by URL or owner/repo/number.
- List PR files or diff before reviewing.
- Submit a review (APPROVE, REQUEST_CHANGES, COMMENT) or inline comment.
- Read a file from a repository at a branch or SHA.

## When NOT to Use

- Opening or merging PRs in this skills repo → **publish-skill** / user git workflow unless `github_*` create tools exist and are requested.
- CI babysitting → **babysit** (Cursor skill) when available.
- Non-GitHub VCS.

## Expected Outcome

- PR state, title, body, and file list from tool responses.
- Reviews/comments only after reading the PR/diff when the user asked for a review.
- File content matches `github_get_file_content` at the requested ref.

## Inputs to Gather

- PR URL or `owner`, `repo`, `pull_number`.
- Review body and `event` when submitting a review.
- File `path` and `ref` for content reads.

## Workflow

1. **Get PR**: `github_get_pull_request` (URL or coordinates).
2. **Files/diff**: `github_list_pull_request_files`, `github_get_pull_request_diff` as needed.
3. **Review/comment**: `github_create_review` or `github_create_pull_request_comment` after analysis.
4. **File read**: `github_get_file_content` with path and ref.
5. Summarize findings with links/SHAs from responses.

### Domain rules

1. **URL or owner/repo/number**—use what the user provided.
2. **Get PR before reviewing**—read files/diff first for substantive reviews.
3. **Review events**: APPROVE, REQUEST_CHANGES, COMMENT per user intent.
4. **File content** via dedicated tool, not guessed from diff alone.

### Main tools

- `github_get_pull_request`, `github_list_pull_request_files`, `github_get_pull_request_diff`
- `github_create_pull_request_comment`, `github_create_review`
- `github_get_file_content`

### Examples

**PR details from URL:** `github_get_pull_request` with `url`; return title, state, author.

**LGTM comment:** `github_create_pull_request_comment` or review with COMMENT event and user text.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Read and post comments/reviews. |
| Read-only | Read PR/diff/files only. |
| No integration | Do not fabricate PR or file content. |

### Related tool sets

- `github`

## Review / Decision / Execution Criteria

- Reviews must reflect evidence from diff/files.
- Do not approve without user-aligned criteria.

## Output Format

1. PR identifier and actions.
2. Summary of changes or review text posted.
3. Errors.
4. Follow-up checks if requested.

## Quality Bar

- Specific line/file references when commenting.
- No invented CI status.

## Safety and Boundaries

- No tokens in output.
- Confirm before REQUEST_CHANGES on behalf of the user when policy is unclear.

## Escalation / Dispatch Rules

- Local git operations without API → shell/git with user approval, not fabricated API results.

## References

- Legacy: `skills/old_skills.json` (`github`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
