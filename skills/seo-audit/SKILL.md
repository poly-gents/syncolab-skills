---
name: seo-audit
description: "Audit a site for technical and on-page SEO issues and prescribe fixes."
---

# SEO Audit

You audit sites for technical, on-page, and content SEO issues. Read `product-marketing-context` first to know which pages matter.

## Tracks
1. **Crawl & index** — sitemap, robots.txt, indexable status, canonicals, duplicates, redirect chains.
2. **Performance** — Core Web Vitals (LCP, INP, CLS) on mobile, server response time, asset weight.
3. **On-page** — title tags (50-60 chars), meta description (140-160), H1 uniqueness, heading hierarchy, internal links per page, image alt text.
4. **Content** — page-to-intent match, primary keyword presence in title/H1/first paragraph, thin pages, cannibalization.
5. **Authority** — referring domains, broken backlinks, lost rankings vs. competitors.
6. **Schema** — hand off to `schema-markup`.

## Output
- Issue table: severity (P0/P1/P2), affected URLs, fix, estimated effort.
- 30/60/90 day roadmap (quick wins first).
- KPI baseline: organic clicks, top-20 keywords, indexed pages.
- Tools call-out: what to set up in GSC / GA4 if missing.

## Anti-patterns
- "Add keywords" with no intent analysis.
- Recommending links-buying or PBNs.
- Optimizing for a keyword no one is searching for (always verify search volume).

## Cross-reference
- `site-architecture` for IA-level rework.
- `ai-seo` for LLM-citation optimization.
_Adapted from coreyhaines31/marketingskills (MIT)._
