---
name: gmail
description: Lists, searches, reads, and sends Gmail messages and labels via native gmail_* tools. Use for inbox triage, unread filters, full message bodies, and outbound email.
---

# Gmail

## Purpose

Operate Gmail through the connected integration: search and list messages, fetch full bodies, send mail, and inspect labels—without fabricating message content or send confirmations.

## When to Use

- List or search messages (unread, from, subject, label filters).
- Read full email content after listing by message ID.
- Send email with to/subject/body (and cc/bcc when specified).
- List labels or check the connected profile.

## When NOT to Use

- Calendar, Drive, Docs, or Sheets tasks → **google-calendar**, **google-drive**, **google-docs**, **google-sheets**.
- Skill authoring or publishing in this repo → **create-skill** / **publish-skill**.
- Gmail is not connected or tools are unavailable.

## Expected Outcome

- Tool-backed results: subjects, snippets, IDs, send confirmations from API responses.
- List-then-get pattern when full bodies are needed.
- Explicit errors for auth, quota, or missing message IDs.

## Inputs to Gather

- Search intent: `q` string (e.g. `is:unread`, `from:user@example.com`, `subject:meeting`) and/or `labelIds`.
- Message IDs from a prior list when fetching full content.
- Send payload: to, subject, body; cc/bcc only if the user specified them.

## Workflow

1. Confirm Gmail tools are available; do not invent messages or send status.
2. **Search/list first**: `gmail_list_messages` with `q` and/or `labelIds`, `maxResults` as needed.
3. **Get full body when needed**: `gmail_get_message` with `messageId` from the list.
4. **Send**: `gmail_send_email` with required to, subject, body; add cc/bcc when specified.
5. Summarize results (subject, from, snippet or body excerpt); offer to open specific messages.

### Domain rules

1. **Search with `q`**: Gmail search syntax in `q` (e.g. `is:unread`); use `labelIds` for INBOX, UNREAD, etc.
2. **One list, then get**: Prefer filtered list before per-message gets.
3. **Send with required fields**: Never omit to, subject, or body unless the tool schema allows defaults.

### Main tools

- `gmail_list_messages` (`q`, `labelIds`, `maxResults`), `gmail_get_message`
- `gmail_send_email` (to, subject, body), `gmail_get_profile`, `gmail_list_labels`

### Examples

**Unread inbox:** `gmail_list_messages` with `q: "is:unread"`. Return subject, from, snippet; offer `gmail_get_message` for one thread.

**Send:** `gmail_send_email` with user-provided to, subject, body; confirm from tool response only.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Execute list/get/send; report API errors. |
| Read-only | List and get only; draft send payload for user approval. |
| No integration | State limitation; do not fabricate messages or send confirmations. |

### Related tool sets

- `email`

## Review / Decision / Execution Criteria

- Use Gmail `q` syntax correctly; paginate when result sets are large.
- Do not expose full PII unnecessarily in summaries.
- Confirm before bulk send or destructive label changes if supported.

## Output Format

1. Request and actions taken.
2. Message list or send confirmation (from tool output).
3. Errors or missing permissions.
4. Optional next steps (open message, refine search).

## Quality Bar

- Grounded in tool responses; cite message IDs when relevant.
- Concise tables or bullets for multiple messages.

## Safety and Boundaries

- No secrets or tokens in skill examples or logs.
- Do not fabricate send success.
- Confirm unusual bulk operations with the user.

## Escalation / Dispatch Rules

- Cross-product Google work → route to the matching Google skill after resolving file IDs in Drive if needed.
- No write access → provide exact tool arguments for dispatch.

## References

- Legacy: `skills/old_skills.json` (`gmail`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
