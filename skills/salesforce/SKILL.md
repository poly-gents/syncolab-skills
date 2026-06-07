---
name: salesforce
description: Query and update Salesforce CRM records via salesforce_* REST Data API tools.
---

# Salesforce

## Purpose

Read and write Salesforce records through native REST Data API integration tools.

## When to Use

- Verify connection; run SOQL queries for reporting or lookup.
- Get, create, or update records by object type and id.
- Log a Task activity on a contact, lead, or related record.

## When NOT to Use

- HubSpot CRM → use `hubspot`.
- Bulk data loads or Apex execution (not supported).

## Workflow

1. **`salesforce_verify_connection`**.
2. **`salesforce_query`** for SOQL reads; **`salesforce_get_record`** for one record.
3. Writes (approval): **`salesforce_create_record`**, **`salesforce_update_record`**, **`salesforce_create_task`**.

## Main tools

| Tool | Purpose |
|------|---------|
| `salesforce_verify_connection` | Verify REST API access |
| `salesforce_query` | Run SOQL query |
| `salesforce_get_record` | Get record by type + id |
| `salesforce_create_record` | Create record |
| `salesforce_update_record` | Update record |
| `salesforce_create_task` | Log Task activity |

## Safety and Boundaries

- Requires **Salesforce** OAuth connect with instance URL.
- All write tools require approval — confirm object type, id, and field map.
