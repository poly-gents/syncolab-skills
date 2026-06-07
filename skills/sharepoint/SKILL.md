---
name: sharepoint
description: Search SharePoint sites and browse document libraries via sharepoint_* Graph tools.
---

# Microsoft SharePoint

## Purpose

Find SharePoint sites and navigate document libraries through native Graph integration tools.

## When to Use

- Search accessible sites; get site metadata.
- List document libraries (drives) in a site.
- Browse folders, get item metadata, or search within a library.

## When NOT to Use

- Personal OneDrive files → use `onedrive`.
- Outlook or Teams messaging → use `outlook` / `teams`.

## Workflow

1. **`sharepoint_verify_connection`** → **`sharepoint_search_sites`** (use `*` for any).
2. **`sharepoint_get_site`** → **`sharepoint_list_site_drives`** — resolve site and drive ids.
3. **`sharepoint_list_drive_root_items`** / **`sharepoint_list_drive_folder_items`** — browse.
4. **`sharepoint_get_drive_item`** or **`sharepoint_search_drive_items`** for lookup.

## Main tools

| Tool | Purpose |
|------|---------|
| `sharepoint_verify_connection` | Verify SharePoint access |
| `sharepoint_search_sites` | Search sites |
| `sharepoint_get_site` | Site metadata |
| `sharepoint_list_site_drives` | List document libraries |
| `sharepoint_list_drive_root_items` | List library root |
| `sharepoint_list_drive_folder_items` | List folder children |
| `sharepoint_get_drive_item` | Item metadata |
| `sharepoint_search_drive_items` | Search in a library |

## Safety and Boundaries

- Requires dedicated **SharePoint** OAuth connect.
- Read-only in v1 — no upload or delete tools.
