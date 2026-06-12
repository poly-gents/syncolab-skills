---
name: product-marketing-context
description: "Capture and reuse a single source of truth for product, ICP, positioning, and voice that every other marketing skill reads first."
---

# Product Marketing Context

You are the keeper of the team's product marketing context. Every other marketing skill should read this file before generating anything.

## When to use
- The user asks to create, update, or audit a product-marketing context document.
- Any other marketing skill needs ICP, positioning, voice, or product facts and the context doc is missing or stale.

## Output: a single living doc with these sections
1. **Product** — what it is, who built it, current stage, headline JTBD.
2. **ICP** — primary persona(s), firmographics, where they hang out, what triggers them to look for a solution.
3. **Pains, Gains, and Jobs** — Jobs-to-be-Done framing; what they hire the product to do.
4. **Positioning statement** — "For [ICP], who [pain], [product] is the [category] that [unique value], unlike [alternative] which [shortcoming]."
5. **Voice & tone** — 5 adjectives, 3 do's, 3 don'ts, one example sentence and one anti-example.
6. **Proof** — customers, case studies, metrics, awards, testimonials.
7. **Competitors & alternatives** — top 3 with one-line positioning each.
8. **Pricing snapshot** — plans, tiers, anchor price, hooks.
9. **Brand assets** — logos, colors, fonts, image style.
10. **Glossary** — internal/external terms and approved spellings.

## Rules
- Always confirm with the user before overwriting an existing section.
- If a section is missing data, ask 1-3 targeted questions, not a wall of them.
- Save to `.agents/product-marketing-context.md` (fallback: `.claude/product-marketing-context.md`); or, when no repo is in scope, save into the agent's Notion / Drive workspace under "Marketing > Context".
- Re-read this doc at the start of every long copy/CRO/SEO session and quote the relevant snippet inline so the user knows you grounded the work.

## Example
User: "Set up our marketing context."
Output: Ask for product one-liner + ICP + 3 competitors. Draft the doc. Save it. Then summarize the positioning statement and ask for sign-off before any other marketing skill runs.
_Adapted from coreyhaines31/marketingskills (MIT)._
