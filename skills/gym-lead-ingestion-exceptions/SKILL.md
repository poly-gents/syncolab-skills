---
name: gym-lead-ingestion-exceptions
description: "Resolve duplicate or missing marketing leads when automatic Arbox ingestion fails"
---

# Gym Lead Ingestion Exceptions

## Purpose

Handle **stage-1 exceptions** when campaign leads fail to appear correctly in Arbox. Normal ingestion is automatic — this skill is for dedupe, manual create, and wrong initial status only.

## When to Use

- Lead missing after form submit.
- Duplicate lead for same phone/email.
- Wrong initial status after auto-ingest.

## When NOT to Use

- Daily sales prioritization (use **gym-sales-daily-prioritization**).
- Routine pipeline management when ingestion works.

## Expected Outcome

- Single clean lead record with correct initial status; issue logged if recurring.

## Workflow

1. Confirm with the human: campaign name, submit time, phone/email.
2. **Duplicate check**: **`arbox_public_get`** → **`v3/users`**, **`searchUser`**, or filtered lead list.
3. If match found: add context in a note — **do not** create a second lead.
4. If missing: create via **`POST /v3/leads`** with **`arbox_public_post`** per OpenAPI body for the campaign.
5. Set initial status using live IDs from **gym-arbox-status-playbook** (typically “new lead / potential”).
6. Recurring failures → workboard task + SKS living doc for marketing/Arbox support.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full Arbox | Search, create leads, update status |
| Read-only | Diagnose and draft payloads |

### Related tool sets

- `arbox`

## Safety and Boundaries

- Never create duplicates when an existing user/lead matches.
- Confirm before any **`arbox_public_post`**.
