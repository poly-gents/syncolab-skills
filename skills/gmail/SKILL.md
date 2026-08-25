---
name: gmail
description: Lists, searches, reads, drafts, sends, replies, and forwards Gmail messages, and fetches attachments via native gmail_* tools. Use for inbox triage, unread filters, full message bodies, attachment download, saving drafts, threaded replies, and outbound email.
---

# Gmail

## Purpose

Operate Gmail through the connected integration: search and list messages, fetch full bodies, save drafts, reply/forward in-thread, send mail, and inspect labels—without fabricating message content or send confirmations.

## When to Use

- List or search messages (unread, from, subject, label filters).
- Read full email content after listing by message ID.
- Fetch attachment binary content (e.g. for upload to Drive).
- Save a message as a Gmail draft for human review before sending.
- List, read, update, or delete existing drafts.
- Send email immediately, or send an existing draft, with to/subject/body (and cc/bcc when specified).
- Reply, reply-all, or forward by passing `replyToMessageId` and `mode` on `gmail_send_email` or `gmail_create_draft`.
- List labels or check the connected profile.

## When NOT to Use

- Calendar, Drive, Docs, or Sheets tasks → **google-calendar**, **google-drive**, **google-docs**, **google-sheets**.
- Skill authoring or publishing in this repo → **create-skill** / **publish-skill**.
- Gmail is not connected or tools are unavailable.

## Expected Outcome

- Tool-backed results: subjects, snippets, IDs, draft IDs, and send confirmations from API responses.
- List-then-get pattern when full bodies are needed.
- Explicit errors for auth, quota, or missing message/draft IDs.

## Inputs to Gather

- Search intent: `q` string (e.g. `is:unread`, `from:user@example.com`, `subject:meeting`) and/or `labelIds`.
- Message IDs from a prior list when fetching full content.
- Send/draft payload: to, subject, body for new mail; `replyToMessageId` + `mode` (`reply` | `replyAll` | `forward`) for threaded actions.
- Draft IDs from `gmail_list_drafts` or `gmail_create_draft` when updating, sending, or deleting a draft.

## Workflow

1. Confirm Gmail tools are available; do not invent messages or send status.
2. **Search/list first**: `gmail_list_messages` with `q` and/or `labelIds`, `maxResults` as needed.
3. **Get full body when needed**: `gmail_get_message` with `messageId` from the list.
4. **Attachments**: `gmail_extract_attachments` first; then `gmail_get_attachment` with `messageId` and `attachmentId` (returns a staging handle).
5. **Draft (preferred for review)**: `gmail_create_draft`. New mail: to, subject, bodyText. Reply/forward: `replyToMessageId` + `mode` (`reply` | `replyAll` | `forward`) + bodyText (new text only). Call `gmail_send_draft` only when the user wants the draft delivered.
6. **Send immediately**: `gmail_send_email` with the same fields. Prefer a draft when the user asked to review first.
7. Summarize results (subject, from, snippet or body excerpt); cite message/draft IDs.

### Domain rules

1. **Search with `q`**: Gmail search syntax in `q` (e.g. `is:unread`); use `labelIds` for INBOX, UNREAD, etc.
2. **One list, then get**: Prefer filtered list before per-message or per-draft gets.
3. **Send with required fields**: New mail needs to, subject, and bodyText. Reply/replyAll need replyToMessageId and bodyText (recipients/subject are filled). Optional to/cc/bcc on reply merge extra people — they do not replace the thread list; duplicates are dropped. Forward needs replyToMessageId, to, and bodyText.
4. **Draft vs send**: `gmail_create_draft` does not deliver mail. `gmail_send_email` and `gmail_send_draft` do.
5. **Threading**: Never fake a reply by copying From into to. Always pass `replyToMessageId` and `mode` so the platform sets In-Reply-To, References, threadId, Re:/Fwd:, and quotes the original. bodyText is only your new words.

### Main tools

- `gmail_list_messages` (`q`, `labelIds`, `maxResults`), `gmail_get_message`, `gmail_get_attachment`
- `gmail_list_drafts`, `gmail_get_draft`, `gmail_create_draft`, `gmail_update_draft`, `gmail_send_draft`, `gmail_delete_draft`
- `gmail_send_email` (new mail, or reply/replyAll/forward via replyToMessageId + mode), `gmail_get_profile`, `gmail_list_labels`

### Examples

**Unread inbox:** `gmail_list_messages` with `q: "is:unread"`. Return subject, from, snippet; offer `gmail_get_message` for one thread.

**Draft:** `gmail_create_draft` with user-provided to, subject, body. Return the draft ID; do not claim the mail was sent.

**Reply (draft):** `gmail_create_draft` with `replyToMessageId` from `gmail_get_message`, `mode: "reply"` (or `"replyAll"`), and bodyText. Recipients are filled automatically. Pass to/cc/bcc only to add extra people.

**Forward:** `gmail_send_email` or `gmail_create_draft` with `replyToMessageId`, `mode: "forward"`, `to`, and bodyText.

**Send:** `gmail_send_email` with user-provided to, subject, body; confirm from tool response only. Or `gmail_send_draft` with a draft ID after review.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Execute list/get/draft/send; report API errors. |
| Read-only | List and get only; draft send payload for user approval. |
| No integration | State limitation; do not fabricate messages or send confirmations. |

### Related tool sets

- `email`

## Review / Decision / Execution Criteria

- Use Gmail `q` syntax correctly; paginate when result sets are large.
- Do not expose full PII unnecessarily in summaries.
- Confirm before bulk send or destructive label changes if supported.
- Prefer `gmail_create_draft` when the user asked to review, save, or not send yet.

## Output Format

1. Request and actions taken.
2. Message list, draft ID, or send confirmation (from tool output).
3. Errors or missing permissions.
4. Optional next steps (open message, send draft, refine search).

## Quality Bar

- Grounded in tool responses; cite message and draft IDs when relevant.
- Concise tables or bullets for multiple messages.

## Safety and Boundaries

- No secrets or tokens in skill examples or logs.
- Do not fabricate send success. Creating a draft is not sending.
- Confirm unusual bulk operations with the user.

## Escalation / Dispatch Rules

- Cross-product Google work → route to the matching Google skill after resolving file IDs in Drive if needed.
- No write access → provide exact tool arguments for dispatch.

## References

- Legacy: `skills/old_skills.json` (`gmail`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
