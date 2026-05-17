---
name: threat-modeling
description: Performs STRIDE-style threat modeling on features and systems with ranked mitigations and residual risk. Use before shipping new surfaces, auth flows, or third-party integrations.
---

# Threat modeling

## Purpose

Identify threats at trust boundaries, propose mitigations, and rank residual risk so teams can decide what must ship-block vs follow-up vs accepted risk.

## When to Use

- User asks for threat model, STRIDE review, or security design review.
- New auth flows, APIs, admin tools, or third-party integrations.
- Pre-ship security sign-off on a feature or architecture change.

## When NOT to Use

- Vulnerability scanning only → **snyk**, **flag-security-issues**.
- Incident postmortem → **postmortem-authoring**.
- Penetration test execution without design context.

## Expected Outcome

- Ranked threat list with asset, threat, impact/likelihood, mitigation, residual risk, owner.
- Clear ship/no-ship recommendations for must-fix items.

## Inputs to Gather

- Architecture diagram or data-flow description.
- Trust boundaries (Internet, VPC, admin, third parties).
- Authn/z model, data classification, and compliance constraints.
- Existing controls (WAF, mTLS, rate limits).

## Workflow

1. Scope the feature/system and draw trust boundaries.
2. Apply STRIDE (or agreed framework) per component/data flow.
3. For each threat: asset, threat, likelihood/impact, mitigation, residual risk.
4. Rank: must-fix before ship, follow-up, accepted risk (with owner).
5. Link mitigations to tickets/docs when tools available.

## Domain guidance

Use a structured lens (e.g. STRIDE) on **trust boundaries**: authn/z, data flows, third parties, admin paths.

For each finding: asset, threat, likelihood/impact (qualitative is fine), **mitigation**, residual risk.

Output a ranked list: must-fix before ship vs follow-up vs accepted risk (with owner).

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | File findings to **jira** / **google-docs** when asked. |
| Read-only | Produce threat model document only. |
| No integrations | Markdown output; user distributes. |

### Related tool sets

- `jira`
- `google-docs`

## Review / Decision / Execution Criteria

- Cover authz bypass, injection, secrets exposure, and supply chain where relevant.
- Mitigations concrete (not "use best practices" alone).
- Accepted risks have named owners and review date.

## Output Format

Table or bullets: ID, asset, threat, risk, mitigation, residual, priority, owner.

## Quality Bar

- Useful for security + engineering negotiation before ship.
- Grounded in described architecture, not generic OWASP laundry lists without mapping.

## Safety and Boundaries

- Do not include live secrets or exploitable PoC steps in customer-visible docs without need.
- Do not fabricate compensating controls that do not exist.

## Escalation / Dispatch Rules

- Dependency CVEs → **snyk**.
- Deep code review → **shadow-code-reviewer**, **flag-security-issues**.

## References

- `skills/old_skills.json` (`threat-modeling`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
