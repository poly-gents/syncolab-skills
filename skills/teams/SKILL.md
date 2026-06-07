---
name: teams
description: Read and send Microsoft Teams channel and chat messages via teams_* Graph tools.
---

# Microsoft Teams

## Purpose

Operate Teams channels and chats through native Microsoft Graph integration tools.

## When to Use

- List joined teams, channels, or chats before messaging.
- Read recent channel or chat message history.
- Post a message to a channel or chat (with approval).

## When NOT to Use

- Outlook mail or calendar → use `outlook`.
- OneDrive or SharePoint files → use `onedrive` / `sharepoint`.

## Workflow

1. **`teams_verify_connection`** — confirm Graph access.
2. **`teams_list_joined_teams`** → **`teams_list_channels`** — resolve team and channel ids.
3. **`teams_list_channel_messages`** — read channel history; **`teams_send_channel_message`** to post.
4. For DMs: **`teams_list_chats`** → **`teams_list_chat_messages`** → **`teams_send_chat_message`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `teams_verify_connection` | Verify Teams Graph access |
| `teams_list_joined_teams` | List joined teams |
| `teams_list_channels` | List channels in a team |
| `teams_list_channel_messages` | Read channel messages |
| `teams_send_channel_message` | Post to a channel |
| `teams_list_chats` | List 1:1 and group chats |
| `teams_list_chat_messages` | Read chat messages |
| `teams_send_chat_message` | Send a chat message |

## Safety and Boundaries

- Requires **Microsoft Teams** OAuth (shared M365 session with Outlook).
- Write tools require approval — confirm team/channel/chat id and message body before sending.
