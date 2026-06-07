---
name: instagram
description: Manage Instagram media, comments, and insights via instagram_* Graph tools.
---

# Instagram

## Purpose

Operate the connected Instagram Business/Creator account through native Graph integration tools.

## When to Use

- Verify connection; read account profile.
- List or inspect media posts; publish image posts.
- Moderate comments; pull media or account insights.

## When NOT to Use

- Searching arbitrary Instagram users (not supported).
- Facebook Pages → use `facebook`.
- DM automation (not supported in v1).

## Workflow

1. **`instagram_verify_connection`** → **`instagram_get_user_profile`**.
2. **`instagram_list_media`** → **`instagram_get_media`** for detail.
3. Publish via **`instagram_create_media_post`** (public HTTPS image URL + caption).
4. Comments: **`instagram_list_media_comments`** → **`instagram_reply_to_media_comment`**.
5. Analytics: **`instagram_get_media_insights`** / **`instagram_get_account_insights`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `instagram_verify_connection` | Verify OAuth session |
| `instagram_get_user_profile` | Business/Creator profile |
| `instagram_list_media` | List recent posts |
| `instagram_get_media` | Get one post |
| `instagram_create_media_post` | Publish image post |
| `instagram_list_media_comments` | List comments |
| `instagram_reply_to_media_comment` | Reply to comment |
| `instagram_get_media_insights` | Post metrics |
| `instagram_get_account_insights` | Account metrics |

## Safety and Boundaries

- Requires **Instagram** OAuth connect.
- Publish and comment reply tools require approval.
