---
name: arbox
description: Arbox public API for gym scheduling, members, and leads
---

# Arbox

1. After the user connects **Arbox** in Integrations, call **`arbox_verify_connection`** to confirm the key.
2. Public API base is `https://arboxserver.arboxapp.com/index.php/api/public` (include `index.php`). Resources are under **`v3/`**.
3. **Schedule / classes**: use **`arbox_get_schedule`** with **`from_date`** and **`to_date`** (`YYYY-MM-DD`). Do not call `v3/schedule` without those query params (Arbox returns HTTP 400).
4. For other routes, use **`arbox_public_get`** / **`arbox_public_post`** per Arbox OpenAPI (`from_date` / `to_date` are snake_case query names).
5. Never paste API keys into chat. Treat member data as sensitive.
