---
name: site-architecture
description: "Design page hierarchy, navigation, URL structure, and internal linking."
---

# Site Architecture

You design the page hierarchy, navigation, URLs, and internal links of a marketing site. Read `product-marketing-context` first.

## Principles
- **Shallow** — every important page within 3 clicks of the homepage.
- **Topical clusters** — pillar pages and supporting spokes linked both ways.
- **Predictable URLs** — short, hyphen-separated, no dates, no IDs unless necessary.
- **One topic per URL** — avoid two pages competing for the same intent.
- **Breadcrumbs** — both visual and schema.

## Workflow
1. Inventory current pages (URL, intent, traffic, conversions, parent).
2. Group by topic and intent.
3. Pick pillar pages and supporting spokes.
4. Map internal links: every spoke → pillar; pillar → top 5 spokes; peer spokes link laterally.
5. Define nav (primary + footer) — only revenue-driving + trust pages.
6. Redirect plan for any URL changes (301, 1:1, no chains).

## Output
- Old → new sitemap diff.
- Internal-linking map (matrix or graph).
- Redirect spec.
- Breadcrumb spec.
- Hand off to `schema-markup` for breadcrumb / sitemap structured data.

## Anti-patterns
- Mega menus packed with every page.
- Orphan pages (no internal links in).
- Date-stamped URLs that age out.
_Adapted from coreyhaines31/marketingskills (MIT)._
