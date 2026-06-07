---
name: facebook
description: Manage Facebook Pages, posts, insights, and ad reads via facebook_* Graph tools.
---

# Facebook

## Purpose

Operate Facebook Pages and Marketing API reads through native Graph integration tools.

## When to Use

- Verify connection; list and inspect managed Pages.
- Read or publish Page feed posts.
- Pull Page insights or ad account/campaign performance.

## When NOT to Use

- Instagram organic posts → use `instagram`.
- LinkedIn → use `linkedin`.

## Workflow

1. **`facebook_verify_connection`** → **`facebook_list_pages`** → **`facebook_get_page`**.
2. **Feed:** **`facebook_list_page_posts`**; publish via **`facebook_create_page_post`**.
3. **Insights:** **`facebook_get_page_insights`**.
4. **Ads:** **`facebook_list_ad_accounts`** → **`facebook_list_campaigns`** → **`facebook_get_campaign_insights`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `facebook_verify_connection` | Verify OAuth session |
| `facebook_get_user_profile` | Authenticated user profile |
| `facebook_list_pages` | List managed Pages |
| `facebook_get_page` | Page metadata |
| `facebook_list_page_posts` | List feed posts |
| `facebook_create_page_post` | Publish Page post |
| `facebook_get_page_insights` | Page metrics |
| `facebook_list_ad_accounts` | List ad accounts |
| `facebook_get_ad_account` | Get ad account |
| `facebook_list_campaigns` | List campaigns |
| `facebook_get_campaign` | Get campaign |
| `facebook_get_campaign_insights` | Ad performance metrics |

## Safety and Boundaries

- Requires **Facebook** OAuth; reconnect for `ads_read` scope.
- Page post creation requires approval.
