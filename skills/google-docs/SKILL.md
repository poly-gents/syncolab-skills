---
name: google-docs
description: Creates, reads, appends, and replaces Google Docs content via docs_* tools. Use for PRDs, meeting notes, and document edits when documentId is known or resolved via Drive.
---

# Google Docs

## Purpose

Create and mutate Google Docs: create with title/content, read, append at end, or replace body—using `documentId` from create or from **google-drive** search.

## When to Use

- Create a new Doc with title and optional initial content.
- Read or append to an existing Doc.
- Replace document content wholesale.

## When NOT to Use

- Finding an unknown Doc by name → **google-drive** first for `documentId`.
- Spreadsheets → **google-sheets**.
- Skill repo work → **create-skill** / **publish-skill**.

## Expected Outcome

- `documentId` returned on create and reused for subsequent ops.
- Read/append/replace confirmed from tool responses.
- No fabricated document text.

## Inputs to Gather

- `documentId` (from create or Drive).
- Title and initial content for creates.
- Append text or full replacement body as specified.

## Workflow

1. If `documentId` is unknown, use **google-drive** (`drive_search` / `drive_get_file`) to resolve it.
2. **Create**: `docs_create_document` (title, optional content) → save `documentId`.
3. **Read**: `docs_read_document` with `documentId`.
4. **Append**: `docs_append_text` at end when adding content.
5. **Replace**: `docs_replace_content` when overwriting existing content.
6. Summarize what changed; cite `documentId`.

### Domain rules

1. **Create returns documentId**—required for later calls.
2. **Append vs replace**: Append for additions; replace for full rewrites.
3. **Resolve via Drive** when the user references a doc by name only.

### Main tools

- `docs_create_document`, `docs_read_document`, `docs_append_text`, `docs_replace_content`

### Examples

**New PRD doc:** `docs_create_document` with title and first line; return link/id from response.

**Append meeting notes:** `docs_append_text` with `documentId` and user text.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Create, read, append, replace. |
| Read-only | Read only; draft writes for approval. |
| No integration | Do not fabricate document content. |

### Related tool sets

- `google-docs`

## Review / Decision / Execution Criteria

- Smallest change: append vs replace intentionally.
- Confirm large replacements with the user when appropriate.

## Output Format

1. Request and `documentId`.
2. Excerpt or confirmation from tools.
3. Errors.
4. Drive search follow-up if ID was missing.

## Quality Bar

- Preserve user wording for append/replace when given verbatim.
- Ground reads in `docs_read_document` output.

## Safety and Boundaries

- No confidential content in examples.
- Confirm destructive full replace when scope is unclear.

## Escalation / Dispatch Rules

- Missing file → **google-drive** then return here.
- No write access → output planned `docs_*` calls.

## References

- Legacy: `skills/old_skills.json` (`google-docs`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
