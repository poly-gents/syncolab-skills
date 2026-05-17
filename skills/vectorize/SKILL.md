---
name: vectorize
description: Runs semantic RAG and vector search over indexed knowledge via Vectorize MCP tools discovered at runtime. Use for memory retrieval, knowledge-base lookup, and evidence-backed answers from chunks.
---

# Vectorize

## Purpose

Retrieve relevant passages from vector-indexed content: phrase queries clearly, treat chunks as evidence, summarize with brief citations—using tool names from the Vectorize MCP server (`list_tools`).

## When to Use

- Semantic search over a knowledge base or indexed corpus.
- “What do we know about …” questions needing retrieved context.
- Finding notes or docs by meaning, not exact filename.

## When NOT to Use

- Authoritative Syncolab platform docs → **syncolab-living-docs** (SKS).
- Tenant long-term agent memory (CML REST/hydration) → **syncolab-cognitive-memory**.
- Fabricating answers without running a query tool.

## Expected Outcome

- One focused natural-language query first; refine only if results are weak.
- Response summarizes chunks; does not dump raw text walls.
- Tool names and parameters from live MCP schema.

## Inputs to Gather

- Clear natural-language query (avoid overly short keywords).
- Optional filters if the MCP schema exposes them (collection, tenant, etc.).

## Workflow

1. Discover Vectorize tools via MCP `list_tools`; read schema before call.
2. Run a single well-phrased query.
3. If results are off-topic, refine query once with more context.
4. Synthesize answer with short citations to chunk sources/ids when present.

### Domain rules

1. **Phrase queries clearly** in natural language.
2. **Chunks are evidence**—summarize and cite, do not paste entire indexes.
3. **One focused query first** before iterating.

### Main tools

- Vectorize MCP query/retrieve tools (names from `list_tools` at runtime).

### Examples

**Q4 launch:** Query `"Q4 product launch"`; return concise summary with chunk references.

**API auth flow:** Query `"API authentication flow"`; present matching passages briefly.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full MCP access | Query and summarize results. |
| Read-only | Query only. |
| No Vectorize MCP | Do not invent retrieved text. |

### Related tool sets

- `openai`

## Review / Decision / Execution Criteria

- Prefer precision over dumping all chunks.
- Distinguish low-confidence empty results from “no data.”

## Output Format

1. Query used.
2. Summary with citations.
3. Gaps or low relevance.
4. SKS/CML skill if user needs platform canonical docs or tenant memory.

## Quality Bar

- Grounded answers only in retrieved chunks.
- No hallucinated citations.

## Safety and Boundaries

- Do not leak sensitive chunk content beyond user need.
- No secrets in queries.

## Escalation / Dispatch Rules

- Platform truth → **syncolab-living-docs**.
- Agent memory layer → **syncolab-cognitive-memory**.

## References

- Legacy: `skills/old_skills.json` (`vectorize`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
