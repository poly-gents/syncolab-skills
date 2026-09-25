---
name: Managents Knowledge Base
description: Curate project knowledge via Storage TipTap documents (initiative_storage_*). Prefer few substantive nodes with rich TipTap HTML unless the user asks for a fine split. Never store Markdown. Long bodies use begin_document_write → commit → handle. Prefer edit_document for surgical changes. Do not use retired kb_* tools.
---

# Managents Knowledge Base

## Purpose

Maintain project curated knowledge as **Storage TipTap documents** (`initiative_storage_*`). Document `content` is **TipTap HTML** rendered in Office — never raw Markdown.

## When to Use

- Browse or edit project curated docs (decisions, risks, notes, folders).
- Learn valid `classification` / `status` values before create/update (from Storage classification catalog when available).
- Write or rewrite document bodies that must look formatted in the Office editor.
- Capture a long design / epic / plan into Storage without exploding into dozens of tiny nodes.

## When NOT to Use

- Platform Living Docs (SKS) → **syncolab-living-docs**.
- Long-term agent memory → **syncolab-cognitive-memory**.
- Bulk hierarchy seed import → Office Storage / Knowledge Base **Import** (agent import tools are disabled).
- Any `kb_*` tool (search/list/get/create/update/delete/taxonomy) — **retired** for curated agents such as Maxwell.

## Expected Outcome

- Discover with `initiative_storage_search` / `initiative_storage_list_nodes`.
- Read TipTap with `initiative_storage_read_document` (numbered canonical HTML; optional line range).
- **Partial edits:** `initiative_storage_edit_document` with `{ oldString, newString }` patches (Cursor-style; unique match required).
- **Full rewrite only:** `initiative_storage_update_document` / create with short `content` or long `staging://` handle.
- Prefer updating an existing document over creating parallel duplicates.
- Prefer few substantive nodes with rich TipTap HTML unless the user asks for a fine split.

## Workflow

1. **Discover first:** `initiative_storage_search({ query })` or `initiative_storage_list_nodes` for folder children.
2. **Read:** `initiative_storage_read_document` — use `start_line` / `end_line` to navigate; copy exact HTML **without** the `N| ` prefix into edit anchors.
3. **Edit:**
   - Surgical changes → `initiative_storage_edit_document({ edits: [{ oldString, newString }] })`.
   - Inserts/appends → keep surrounding existing HTML in both oldString and newString.
   - Full rewrite → `update_document` / create; long bodies → `begin_document_write` → handle.
4. **Organize:** `initiative_storage_create_folder` / `initiative_storage_move` as needed.
5. **Files/blobs:** `initiative_storage_write` / `initiative_storage_read` (not TipTap).

**Project scope:** Runtime fills the project from conversation/initiative context. **Never** pass or ask for `project_id` on `initiative_storage_*` tools unless the schema requires it and context is missing.

## Tools

| Tool | Role |
|------|------|
| `initiative_storage_search` / `list_nodes` / `read` / `read_document` | Discovery + TipTap/file read |
| `initiative_storage_edit_document` | Surgical TipTap patches (prefer for edits) |
| `initiative_storage_create_document` / `update_document` | Create / full-body replace; short `content` or long `handle` |
| `initiative_storage_create_folder` / `move` / `write` | Folders, moves, binary/file write |

## Anti-patterns

- Calling any `kb_*` tool.
- Storing Markdown as document `content`.
- Using `update_document` to change one paragraph (use `edit_document`).
- Pasting a multi-page body into `content` (use write session + `handle`).
- Creating many tiny sibling docs when one rich document would do.
- Matching `oldString` against line-number prefixes (`118| …`).
