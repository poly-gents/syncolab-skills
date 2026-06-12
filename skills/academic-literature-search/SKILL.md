---
name: academic-literature-search
description: "Query design across arXiv / Semantic Scholar / OpenAlex / CrossRef / PubMed / Unpaywall via the unified academic_search tool."
---

# Academic literature search

- Use **`academic_search`** — it fans out across arXiv, Semantic Scholar, OpenAlex, CrossRef, and (when relevant) PubMed, then dedupes by DOI and reciprocal-rank-merges.
- **Google Scholar has no public API.** Do not pretend to call it; the unified search covers essentially the same corpus.
- Iterate the query: start broad, then add field-of-study, year, or author filters; widen if 0 hits.
- For a known paper, prefer **`academic_get_paper`** with a DOI / arXiv id / S2 id over re-searching.
- For citation graph hops, use **`academic_get_citations`** and **`academic_get_references`**.
- To read the actual paper: **`academic_find_pdf`** (Unpaywall + arXiv fallback). If no OA copy exists, say so and offer the abstract/citation.
