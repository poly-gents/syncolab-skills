---
name: linkedin
description: Publish and analyze LinkedIn posts, ads, and lead forms via linkedin_* Marketing API tools.
---

# LinkedIn

## Purpose

Operate the connected LinkedIn member profile, organization pages, ad accounts, and lead forms through native integration tools.

## When to Use

- Verify connection; read authenticated member profile.
- Publish or analyze member or organization posts.
- List ad accounts, campaigns, and campaign analytics.
- List lead gen forms and submissions.

## When NOT to Use

- Searching arbitrary LinkedIn profiles (not supported).
- Facebook or Instagram → use `facebook` / `instagram`.

## Workflow

1. **`linkedin_verify_connection`** → **`linkedin_get_member_profile`**.
2. **Social:** **`linkedin_create_member_post`**; org flow via **`linkedin_list_admin_organizations`** → **`linkedin_list_organization_posts`** / **`linkedin_create_organization_post`**.
3. **Analytics:** **`linkedin_get_member_post_analytics`** or **`linkedin_get_organization_post_analytics`**.
4. **Ads:** **`linkedin_list_ad_accounts`** → **`linkedin_list_campaigns`** → **`linkedin_get_campaign_analytics`**.
5. **Leads:** **`linkedin_list_lead_forms`** → **`linkedin_list_lead_form_responses`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `linkedin_verify_connection` | Verify OAuth session |
| `linkedin_get_member_profile` | Authenticated member profile |
| `linkedin_create_member_post` | Publish member post |
| `linkedin_get_member_post_analytics` | Member post stats |
| `linkedin_list_admin_organizations` | Org pages user administers |
| `linkedin_list_organization_posts` | List org posts |
| `linkedin_create_organization_post` | Publish org post |
| `linkedin_get_organization_post_analytics` | Org share stats |
| `linkedin_list_ad_accounts` | List ad accounts |
| `linkedin_get_ad_account` | Get ad account |
| `linkedin_list_campaigns` | List campaigns |
| `linkedin_get_campaign` | Get campaign |
| `linkedin_get_campaign_analytics` | Campaign/account metrics |
| `linkedin_list_lead_forms` | List lead forms |
| `linkedin_get_lead_form` | Get lead form |
| `linkedin_list_lead_form_responses` | List form submissions |

## Safety and Boundaries

- Requires **LinkedIn** OAuth; reconnect after scope updates.
- Post and org publish tools require approval.
- Campaign creation is not supported in v1.
