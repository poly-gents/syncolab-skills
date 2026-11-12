---
name: managents-knowledge-base
description: "Curate project knowledge via Storage TipTap documents (initiative_storage_*). Prefer few substantive nodes with rich TipTap HTML. Never store Markdown."
---

# Syncolab Knowledge Base

## Purpose

Maintain project curated knowledge as **Storage TipTap documents** (`initiative_storage_*`). Document `content` is **TipTap HTML** rendered in Office — never raw Markdown. Knowledge is a classification/filter view over Storage, not a separate tool family.

## When to Use

- Browse or edit project curated docs (decisions, risks, notes, folders).
- Learn valid `classification` / `status` values before create/update (from Storage classification catalog when available).
- Write or rewrite document bodies that must look formatted in the Office editor.
- Capture a long design / epic / plan into Storage without exploding into dozens of tiny nodes.

## When NOT to Use

- Platform Living Docs (SKS) → **syncolab-living-docs**.
- Long-term agent memory → **syncolab-cognitive-memory**.
- Bulk hierarchy seed import → Office Storage UI.

## Expected Outcome

- Discover with `initiative_storage_search` / `initiative_storage_list_nodes`.
- Read files and TipTap documents with `initiative_storage_read`; it detects the node type. Documents return numbered canonical HTML; files return a staging handle.
- Surgical edits with `initiative_storage_edit_document` (`oldString`/`newString`, unique match).
- Full rewrite with `initiative_storage_create_document` / `initiative_storage_update_document` (short HTML or staging handle).
- Prefer updating an existing document over creating parallel duplicates.

## Workflow

1. **Discover first:** `initiative_storage_search({ query })` or `initiative_storage_list_nodes`.
2. **Read:** `initiative_storage_read` — documents support optional `start_line`/`end_line`; use `canonicalContent` from a full read or copy HTML without the `N| ` prefix for edits. Files return a staging handle for `file_read_text` or other file tools.
3. **Write:**
   - Partial → `initiative_storage_edit_document({ edits: [{ oldString, newString }] })`.
   - Full short body → `content` on create/update.
   - Full long body → `begin_document_write` → handle on create/update.
4. **Organize:** create_folder / move as needed.

**Project scope:** Never pass `project_id` unless schema requires it and context is missing.

## Tools

| Tool | Role |
|------|------|
| `initiative_storage_search` / `list_nodes` / `read` | Discovery + TipTap/file read |
| `initiative_storage_edit_document` | Surgical TipTap patches (prefer) |
| `initiative_storage_create_document` / `update_document` | Create / full-body replace |
| `initiative_storage_create_folder` / `move` / `write` | Folders, moves, files |

## Anti-patterns

- Storing Markdown as document `content`.
- Using `update_document` for one-paragraph changes (use `edit_document`).
- Matching `oldString` against line-number prefixes.
- Creating many tiny sibling docs when one rich document would do.
