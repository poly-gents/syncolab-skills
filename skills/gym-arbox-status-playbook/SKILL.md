---
name: gym-arbox-status-playbook
description: "Map live Arbox status_id values to gym CRM categories and apply safe lead status transitions"
---

# Gym Arbox Status Playbook

## Purpose

Bootstrap and apply **Arbox lead status semantics** for any gym studio on the platform. Status labels differ per tenant — this skill teaches how to load live IDs and map them to operational meaning before any CRM write.

## When to Use

- Before the first status change in a session.
- When the user mentions pipeline stages, Hebrew/English status names, or “where should this lead go?”
- When interpreting leads, tasks, or reports grouped by status.

## When NOT to Use

- For nutrition menu delivery (use **gym-nutrition-menu-delivery**).
- For trial booking flow details (use **gym-member-onboarding-flow**).
- When Arbox is not connected — point to Integrations instead of guessing.

## Expected Outcome

- Live `status_id` table loaded from Arbox and documented for the tenant.
- Status updates proposed with human confirmation before **`arbox_public_post`**.

## Inputs to Gather

- Arbox connection status (**`arbox_verify_connection`**).
- Tenant-specific status label mapping (store in SKS / living doc after workshop).
- Target `user_id` and intended next stage.

## Workflow

1. Call **`arbox_verify_connection`**.
2. Call **`arbox_public_get`** with path **`v3/statuses`** (short name `statuses` works).
3. Build a table: **label → `status_id` → meaning → typical next step**. Never guess IDs.
4. For updates, use **`POST /v3/leads/updateStatus`** via **`arbox_public_post`**: `{ "user_id": <number>, "status_id": <number>, "comment": "..." }`.
5. Confirm `user_id` and target status with the human; add a short comment explaining the change.

## Example category semantics (Israeli studios — adapt per tenant)

| Example label | Meaning | Typical next step |
|---------------|---------|-------------------|
| מעוניין / פוטנציאל | New or cold lead | First call / message |
| לקוח | Existing or returning member | Service / retention, not cold outreach |
| שקילות ומדידות | Weigh-in / body metrics tracking | Log metrics, schedule nutrition meeting |
| פגישת סגירה | Closing / membership decision | Book slot, prepare offer |
| אחר | Catch-all in Arbox | Use label as-is; do not invent transitions |

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full Arbox | Load statuses, propose updates, post after confirmation |
| Read-only | Load statuses and draft update payloads only |
| No Arbox | Stop; do not fabricate status IDs |

### Related tool sets

- `arbox`

## Safety and Boundaries

- Never paste API keys into chat.
- Treat member PII as sensitive.
- Do not invent status IDs or transitions not present in live Arbox data.

## References

- Arbox OpenAPI: `https://arboxserver.arboxapp.com/docs/api.json`
- Platform tools: **`arbox_public_get`**, **`arbox_public_post`**
