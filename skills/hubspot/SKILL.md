---
name: hubspot
description: Search and update HubSpot CRM contacts, companies, deals, and notes via hubspot_* tools.
---

# HubSpot

## Purpose

Read and write HubSpot CRM records through native CRM API v3 integration tools.

## When to Use

- Search or get contacts and companies.
- List deals; create contacts, deals, or notes.
- Update contact properties after user confirmation.

## When NOT to Use

- Salesforce records → use `salesforce`.
- Non-CRM HubSpot products without dedicated tools.

## Workflow

1. **`hubspot_verify_connection`**.
2. **`hubspot_search_contacts`** / **`hubspot_get_contact`**; **`hubspot_search_companies`** for accounts.
3. **`hubspot_list_deals`** for pipeline view.
4. Writes (approval): **`hubspot_create_contact`**, **`hubspot_update_contact`**, **`hubspot_create_deal`**, **`hubspot_create_note`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `hubspot_verify_connection` | Verify CRM access |
| `hubspot_search_contacts` | Search/list contacts |
| `hubspot_get_contact` | Get contact by id |
| `hubspot_create_contact` | Create contact |
| `hubspot_update_contact` | Update contact |
| `hubspot_search_companies` | Search/list companies |
| `hubspot_list_deals` | List deals |
| `hubspot_create_deal` | Create deal |
| `hubspot_create_note` | Log note on CRM object |

## Safety and Boundaries

- Requires **HubSpot** OAuth connect.
- All write tools require approval — confirm object ids and field values.
