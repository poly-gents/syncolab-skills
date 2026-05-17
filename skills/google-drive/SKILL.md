---
name: google-drive
description: Lists, searches, downloads, and organizes Google Drive files via drive_* tools. Use to find file IDs for Docs/Sheets, browse folders, and download content.
---

# Google Drive

## Purpose

Navigate and search Google Drive: list folders, plain-text search, fetch metadata, download files, and create folders—supplying file IDs downstream to Docs or Sheets skills.

## When to Use

- Find a file or spreadsheet by name or phrase.
- Browse a folder’s contents.
- Get metadata or download file bytes.
- Create a folder.

## When NOT to Use

- Editing Doc body or Sheet cells → **google-docs** / **google-sheets** (after resolving `documentId` / `spreadsheetId` here).
- Gmail or Calendar → **gmail** / **google-calendar**.

## Expected Outcome

- Search/list results with names, types, and IDs.
- Downloads only when the user needs file content.
- Clear handoff IDs when the next step is Docs or Sheets.

## Inputs to Gather

- Plain-text search phrase (no Drive query DSL in `drive_search`).
- `folderId` for browse vs global search.
- Whether the user needs metadata only or a download.

## Workflow

1. Confirm Drive tools are available.
2. **Browse** with `drive_list_files` (`folderId`, optional `q`, `pageSize`) or **search** with `drive_search` (plain text only).
3. **Metadata**: `drive_get_file` with file ID.
4. **Download** when requested: `drive_download_file`.
5. **Create folder** when requested: `drive_create_folder`.
6. If the user will edit a Doc or Sheet, pass the ID to the appropriate skill.

### Domain rules

1. **Plain-text search**: `drive_search` accepts normal phrases only—no special query syntax.
2. **IDs for Docs/Sheets**: Resolve file ID here; edit in **google-docs** or **google-sheets**.
3. **List vs search**: Folder browse → `drive_list_files`; name/content discovery → `drive_search`.

### Main tools

- `drive_list_files`, `drive_get_file`, `drive_download_file`, `drive_create_folder`, `drive_search`

### Examples

**Find Budget 2026 spreadsheet:** `drive_search` with `"Budget 2026"`; return IDs and offer Sheets read via **google-sheets**.

**Root listing:** `drive_list_files` without `folderId` or with root folder ID; concise name/type list.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Search, list, download, create folders. |
| Read-only | Search/list/get only. |
| No integration | Do not fabricate file IDs or contents. |

### Related tool sets

- `google-drive`

## Review / Decision / Execution Criteria

- Paginate large folders.
- Prefer search when the user knows a name, list when they know a folder.

## Output Format

1. Actions and tools used.
2. Files (name, type, id).
3. Errors.
4. Next skill if editing Docs/Sheets.

## Quality Bar

- Never invent Drive query syntax.
- IDs must come from tool responses.

## Safety and Boundaries

- Do not download or expose sensitive files without user intent.
- No secrets in paths or examples.

## Escalation / Dispatch Rules

- Doc/Sheet edits → **google-docs** / **google-sheets** with resolved IDs.
- No integration → state blocker explicitly.

## References

- Legacy: `skills/old_skills.json` (`google-drive`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
