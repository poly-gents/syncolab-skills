---
name: arbox-studio-operations
description: Run gym operations against live Arbox data: leads, schedule, memberships
---

# Arbox studio operations

- **Classes / schedule**: **`arbox_get_schedule`** with `from_date` and `to_date` (`YYYY-MM-DD`); optional `location_id`, `box_category_id`, `staff_id`.
- **Leads, users, tasks**: **`arbox_public_get`** with paths like `v3/leads`, `v3/users`, `v3/tasks` (short names like `leads` work).
- **POST-only** endpoints: **`arbox_public_post`** per Arbox OpenAPI.
- If Arbox is not connected, say so and point to Integrations.
