---
name: okta
description: Manages Okta users, groups, and application assignments via connected directory integration. Use when looking up identity records, group membership, or app access—not generic spreadsheet operations.
---

# Okta

## Purpose

Query and administer Okta directory objects (users, groups, apps, assignments) through connected tools with least privilege and verified API responses.

## When to Use

- User asks about Okta users, groups, MFA status, or app assignments.
- Access reviews: who has an app, which groups grant a role.
- Provisioning or deprovisioning tasks when write tools and approval exist.
- Troubleshooting login or SSO issues tied to Okta configuration.

## When NOT to Use

- Non-Okta IdP (Azure AD-only, etc.) without Okta connection.
- Broad IAM architecture design → **provision-access**, **author-iac**.
- Skill repo authoring → **create-skill** / **publish-skill**.

## Expected Outcome

- User/group/app IDs and assignment state from tool output.
- Clear before/after on changes the user approved.
- Explicit stop when Okta admin API access is missing.

## Inputs to Gather

- Okta org/domain and policy context if multi-org.
- User email, login, or Okta ID; group name; app name/ID.
- Whether change is read-only lookup vs approved write.
- Ticket or approval reference for production access changes.

## Workflow

1. Confirm Okta MCP tools; prefer search/list before get by guess.
2. Resolve user or group canonical ID.
3. For access questions: trace user → groups → app assignments (or direct assignment).
4. For writes: restate action, require confirmation, apply minimal change.
5. Verify post-change state with a read call.
6. Summarize without exposing secrets, recovery codes, or full profile PII unnecessarily.

## Domain guidance

1. **Search before mutate** — email/login lookup before updates.
2. **Group vs direct assignment** — explain effective access path.
3. **Lifecycle** — staged, active, suspended, deprovisioned; do not delete users without explicit approval.
4. **App links** — distinguish SAML/OIDC apps and assignment scope (user vs group).
5. **Tool schemas only** — never fabricate assignment state.

### Examples

**User:** "Does alex@company.com have the Admin console app?"
→ Find user, list group memberships and app assignments, state effective access and source (group vs direct).

**User:** "Add new hire to Engineering and Slack SSO."
→ Confirm groups exist, add user to groups, verify app assignment policy, report final state.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Query and apply approved directory changes. |
| Read-only | Directory investigation only; output steps for writes. |
| No integration | Do not fabricate Okta records. |

### Related tool sets

- `okta`
- `custom-apis`

## Review / Decision / Execution Criteria

- Cite user ID, group ID, and app ID in summaries.
- Treat deactivation and group removal as high impact—confirm twice.
- Follow least privilege; prefer group-based access over one-off grants.

## Output Format

1. Question and objects resolved (user/group/app IDs).
2. Current state (memberships, assignments).
3. Changes made (if any) with verification read.
4. Blockers.
5. Next steps or approval needed.

## Quality Bar

- Suitable for IT/access review audit trail tone.
- No spreadsheet/A1 patterns.

## Safety and Boundaries

- Do not expose passwords, MFA seeds, or API tokens.
- Do not bulk-modify production access without explicit approval.
- Do not fabricate assignment or login events.

## Escalation / Dispatch Rules

- Broader access provisioning workflows → **provision-access**.
- Security review of new apps → **threat-modeling**, **flag-security-issues**.

## References

- `skills/old_skills.json` (`okta`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
