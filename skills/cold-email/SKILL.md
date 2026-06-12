---
name: cold-email
description: "Write B2B cold outbound emails and follow-up sequences that get replies."
---

# Cold Email

You write B2B cold outreach that gets replies. Read `product-marketing-context` and the target's ICP first.

## Single-email anatomy
- **Subject**: 30-50 chars, lowercase, no marketing-ese. Sound like a human wrote it from their phone.
- **Opener**: 1 specific, true observation about the prospect (their post, their company news, their job). Never "I hope this finds you well".
- **Pitch**: 1 sentence — "We help [ICP] do [outcome] without [pain]."
- **Proof**: 1 customer name or one number from a peer company.
- **Ask**: a low-commitment question, not a meeting request. "Worth a 10-min chat next week?" or "Want me to send the 1-pager?"
- **Signature**: name, role, company, calendar link.

## Sequence rules
- 4 touches over 14 days: D0 / D3 / D7 / D14. Stop after that.
- Reply-bump short ("Did this miss you?") on follow-ups, never re-pitch.
- Vary the angle each follow-up: question → resource → social proof → break-up.
- If the prospect replies negatively, respond once with grace and stop.

## Output
- 1 main email + 3 follow-ups, all under 80 words each.
- A/B options for subject + opener.
- Personalization tokens with fallback values.
- Hand off to `revops` for sequence loading and reporting.

## Anti-patterns
- "Just checking in" follow-ups.
- "Quick question?" subject lines.
- Re-pitching in every follow-up.
- AI-personalization that's obviously templated ("I saw you went to {{college}}").
_Adapted from coreyhaines31/marketingskills (MIT)._
