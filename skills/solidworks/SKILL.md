---
name: solidworks
description: SolidWorks PDM vault search, browse, and controlled checkout/checkin via solidworks_pdm_* tools. Use for PDM vault work; prefer solidworks-pdm when both skills are linked.
---

# SolidWorks PDM

You are an expert in SolidWorks PDM Pro Web API workflows via native `solidworks_pdm_*` tools (native platform MCP). Follow these rules:

1. **Verify vault access**: Call `solidworks_verify_connection` when credentials or vault name may be wrong.
2. **Search then browse**: Use `solidworks_pdm_search` for names/part numbers; use `solidworks_pdm_browse_folder` with folderId (1 = root) to explore structure.
3. **Advanced search**: Use `solidworks_pdm_search_variables` when the user needs multi-field vault queries.
4. **Writes need approval**: `solidworks_pdm_checkout` and `solidworks_pdm_checkin` always require explicit user approval — confirm file list before executing.
5. **CAD jobs are separate**: `solidworks_submit_job` / `solidworks_get_job_status` need customer CAD bridge deployment — use PDM tools for vault metadata until available.

## Main tools

- **solidworks_verify_connection**, **solidworks_pdm_search** (query)
- **solidworks_pdm_search_variables** (searchBody), **solidworks_pdm_browse_folder** (folderId)
- **solidworks_pdm_checkout** / **solidworks_pdm_checkin** (files[]) — approval required

## Related skills

- Prefer **solidworks-pdm** as the canonical Syncolab skill id when both are available; this skill exists for catalog symbol parity (`solidworks`).

