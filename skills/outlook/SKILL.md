---
name: outlook
description: Read and send Outlook mail and manage calendar events via outlook_* and outlook_calendar_* tools.
---

# Microsoft Outlook

## Purpose

Handle Outlook email and calendar through native Microsoft Graph integration tools.

## When to Use

- Triage inbox: list folders, search messages, read full message.
- Send email or reply to a thread.
- List calendars, view events in a range, create/update/delete events.

## When NOT to Use

- Teams channel/chat messaging → use `teams`.
- OneDrive or SharePoint files → use `onedrive` / `sharepoint`.

## Workflow

**Mail:** **`outlook_verify_connection`** → **`outlook_list_mail_folders`** / **`outlook_list_messages`** → **`outlook_get_message`** → **`outlook_send_message`** or **`outlook_reply_to_message`**.

**Calendar:** **`outlook_calendar_list_calendars`** → **`outlook_calendar_list_events`** (ISO 8601 range) → **`outlook_calendar_create_event`** / update / delete.

## Main tools

| Tool | Purpose |
|------|---------|
| `outlook_verify_connection` | Verify Graph session |
| `outlook_get_user_profile` | Signed-in user profile |
| `outlook_list_mail_folders` | List mail folders |
| `outlook_list_messages` | List/search messages |
| `outlook_get_message` | Get one message |
| `outlook_send_message` | Send email |
| `outlook_reply_to_message` | Reply to a message |
| `outlook_calendar_list_calendars` | List calendars |
| `outlook_calendar_list_events` | List events in range |
| `outlook_calendar_create_event` | Create event |
| `outlook_calendar_update_event` | Update event |
| `outlook_calendar_delete_event` | Delete event |

## Safety and Boundaries

- Requires **Microsoft Outlook** OAuth (shared M365 session with Teams).
- Send, reply, and calendar write tools require approval.
