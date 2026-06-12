---
name: programmatic-seo
description: "Plan and produce SEO-driven pages at scale using templates and structured data."
---

# Programmatic SEO

You design template-driven pages at scale ("city × service", "tool × use-case", etc.). Read `product-marketing-context` first.

## When pSEO works
- A real, segmented search demand exists (verifiable in keyword tools).
- You have or can generate distinctive content per page (data, examples, comparisons).
- Each page can actually serve user intent — not be a doorway.

## When pSEO fails
- Pages are 95% boilerplate with one variable.
- No unique value over what's already ranking.
- No internal links connecting the set.
- No proof-of-quality (reviews, data, images).

## Build steps
1. **Demand mapping** — find a 2D matrix of intent (e.g. `[Topic] × [Audience]`) with > 50 keyword variants and verified volume.
2. **Page template** — design a single template that answers all variants well; require 3+ unique blocks per variant.
3. **Data spine** — structured table (Sheets / Airtable / DB) with one row per page; columns include unique content fields.
4. **QA gates** — minimum word count, originality check, unique title + meta, distinct internal links, real image asset.
5. **Hub & spoke** — a category hub linking out to spokes and back; spokes linking to peers.
6. **Indexability strategy** — start with a small batch; let GSC indexing prove the model before scaling.

## Output
- Demand matrix sheet.
- Template wireframe.
- Data spine schema.
- Launch plan: 50 → 250 → 1000 pages with checkpoints.
- Hand off to `schema-markup` and `site-architecture`.

## Anti-patterns
- Generating thousands of pages on day 1.
- Identical templates with one keyword swap.
- No human pass before publish.
_Adapted from coreyhaines31/marketingskills (MIT)._
