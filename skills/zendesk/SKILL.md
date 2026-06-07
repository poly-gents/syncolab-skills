---
name: zendesk
description: Triage and update Zendesk support tickets via zendesk_* REST API v2 tools.
---

# Zendesk

## Purpose

Manage Zendesk Support tickets through native REST API v2 integration tools.

## When to Use

- Verify connection for the configured subdomain.
- List, search, or get tickets by id.
- Create tickets, update fields, or add comments (with approval).

## When NOT to Use

- HubSpot or Salesforce CRM → use `hubspot` / `salesforce`.
- Zendesk Sell or Chat without dedicated tools.

## Workflow

1. **`zendesk_verify_connection`**.
2. **`zendesk_list_tickets`** (optional status filter) or **`zendesk_search_tickets`**.
3. **`zendesk_get_ticket`** for full detail.
4. Writes (approval): **`zendesk_create_ticket`**, **`zendesk_update_ticket`**, **`zendesk_add_ticket_comment`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `zendesk_verify_connection` | Verify API access |
| `zendesk_list_tickets` | List tickets |
| `zendesk_get_ticket` | Get ticket by id |
| `zendesk_search_tickets` | Search tickets |
| `zendesk_create_ticket` | Create ticket |
| `zendesk_update_ticket` | Update ticket fields |
| `zendesk_add_ticket_comment` | Add public/internal comment |

## Safety and Boundaries

- Requires **Zendesk** OAuth and subdomain configured in Integrations.
- All write tools require approval — confirm ticket id and comment visibility.
