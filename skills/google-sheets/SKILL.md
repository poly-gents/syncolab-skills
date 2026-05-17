---
name: google-sheets
description: Reads and writes Google Sheets ranges in A1 notation via sheets_* tools. Use for spreadsheets, append rows, metadata, and clear/write operations when spreadsheetId is known or from Drive.
---

# Google Sheets

## Purpose

Read and write spreadsheet data: resolve `spreadsheetId`, use A1 ranges, append rows vs overwrite ranges, and return tabular results from tool output.

## When to Use

- Read or write cell ranges (including multi-sheet workbooks).
- Append rows without overwriting existing data.
- Get spreadsheet metadata or create/clear ranges.

## When NOT to Use

- Locating a spreadsheet by name only → **google-drive** first.
- Long-form documents → **google-docs**.

## Expected Outcome

- Data read as tables from `sheets_read_range`.
- Writes/appends confirmed by API response.
- Ranges always include sheet name when multiple sheets exist.

## Inputs to Gather

- `spreadsheetId` (from user or Drive).
- A1 range (e.g. `Sheet1!A1:D10`, `Sheet1!A:Z`).
- `values` as 2D array (rows of cells) for write/append.

## Workflow

1. Resolve `spreadsheetId` via user input or **google-drive** if missing.
2. **Metadata** (optional): `sheets_get_spreadsheet`.
3. **Read**: `sheets_read_range` (`spreadsheetId`, `range`).
4. **Write**: `sheets_write_range` to overwrite; `sheets_append_rows` to add rows.
5. **Clear/create** when requested: `sheets_clear_range`, `sheets_create_spreadsheet`.
6. Present results as readable tables.

### Domain rules

1. **spreadsheetId first** before read/write.
2. **A1 notation** with sheet prefix when multiple sheets exist.
3. **Append vs write**: Append adds rows; write overwrites the range.
4. **2D values**: Each row is an array of cell values.

### Main tools

- `sheets_get_spreadsheet`, `sheets_read_range`, `sheets_write_range`, `sheets_append_rows`, `sheets_create_spreadsheet`, `sheets_clear_range`

### Examples

**Read first 10 rows:** `sheets_read_range` with `Sheet1!A1:Z10`.

**Append total row:** `sheets_append_rows` with range and `[["Total", "100"]]`.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Read, write, append, clear. |
| Read-only | Read and plan writes. |
| No integration | Do not fabricate cell values. |

### Related tool sets

- `google-sheets`

## Review / Decision / Execution Criteria

- Confirm overwrite ranges with the user when data loss is possible.
- Validate sheet names from `sheets_get_spreadsheet` when unsure.

## Output Format

1. Spreadsheet id and range.
2. Table or confirmation.
3. Errors.
4. Drive lookup if id unknown.

## Quality Bar

- Correct A1 notation; no Grafana or unrelated API patterns.
- Numeric and text cells as returned by the API.

## Safety and Boundaries

- Confirm large clears or overwrites.
- No secrets in sheet data in logs.

## Escalation / Dispatch Rules

- Find spreadsheet → **google-drive** then return here.

## References

- Legacy: `skills/old_skills.json` (`google-sheets`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
