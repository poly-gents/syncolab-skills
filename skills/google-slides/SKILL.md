---
name: google-slides
description: Create and edit Google Slides decks via slides_* tools for pitch decks, EBRs, and data stories.
---

# Google Slides

## Purpose

Build and update presentation decks through native Google Slides integration tools.

## When to Use

- Create a new pitch deck, EBR, or executive summary slides.
- Read an existing deck outline before editing.
- Add slides or replace placeholder text in a connected deck.

## When NOT to Use

- Spreadsheets or raw Drive search → use `google-sheets` / `google-drive`.
- Google Docs long-form prose → use `google-docs`.

## Workflow

1. **`slides_list_presentations`** — find an existing deck id when needed.
2. **`slides_create_presentation`** — create a new deck with a title (optional folder via Drive id).
3. **`slides_read_presentation`** — pull a plain-text outline per slide before editing.
4. **`slides_add_slide`** + **`slides_insert_text`** — append structured content.
5. **`slides_replace_text`** — swap placeholders (e.g. `{{company}}`) across the deck.

## Main tools

| Tool | Purpose |
|------|---------|
| `slides_list_presentations` | List decks the app can access |
| `slides_create_presentation` | Create a new deck |
| `slides_get_presentation` | Raw presentation JSON |
| `slides_read_presentation` | Text outline per slide |
| `slides_add_slide` | Add a slide |
| `slides_insert_text` | Add a text box on a slide |
| `slides_replace_text` | Replace all matching text |

## Safety and Boundaries

- Requires a dedicated **Google Slides** OAuth connect (not bundled with Drive/Sheets/Docs family).
- Write tools require approval — confirm deck title and target presentation id before executing.
