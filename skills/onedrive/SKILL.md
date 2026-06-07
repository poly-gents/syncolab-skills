---
name: onedrive
description: Browse, search, and manage OneDrive files via onedrive_* Graph tools.
---

# Microsoft OneDrive

## Purpose

Navigate and manage the signed-in user's OneDrive through native Graph integration tools.

## When to Use

- Verify connection and inspect drive metadata.
- Browse root or folder contents; search by query.
- Create folders or delete items (with approval).

## When NOT to Use

- SharePoint team sites or document libraries → use `sharepoint`.
- Outlook mail or Teams chat → use `outlook` / `teams`.

## Workflow

1. **`onedrive_verify_connection`** or **`onedrive_get_drive`**.
2. **`onedrive_list_root_items`** / **`onedrive_list_folder_items`** — browse by item id.
3. **`onedrive_search_items`** when the user gives a filename or keyword.
4. **`onedrive_get_item`** for metadata; **`onedrive_create_folder`** / **`onedrive_delete_item`** for writes.

## Main tools

| Tool | Purpose |
|------|---------|
| `onedrive_verify_connection` | Verify OneDrive access |
| `onedrive_get_drive` | Drive metadata |
| `onedrive_list_root_items` | List root items |
| `onedrive_list_folder_items` | List folder children |
| `onedrive_get_item` | Item metadata |
| `onedrive_search_items` | Search files/folders |
| `onedrive_create_folder` | Create folder |
| `onedrive_delete_item` | Delete file/folder |

## Safety and Boundaries

- Requires dedicated **OneDrive** OAuth connect.
- Create and delete require approval — confirm parent id and item name/id before executing.
