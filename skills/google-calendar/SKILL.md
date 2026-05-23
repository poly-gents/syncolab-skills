---
name: google-calendar
description: Lists, creates, updates, and deletes Google Calendar events via calendar_* tools. Use for schedules, meetings, and all-day or timed events on primary or named calendars.
---

# Google Calendar

## Purpose

Manage Google Calendar events through the integration: list calendars and events in a time range, create timed or all-day events, update, and delete—with correct RFC3339 boundaries and calendar IDs.

## When to Use

- What is on the calendar today, this week, or a custom range.
- Create, update, or delete meetings and events.
- List available calendars when the user names a non-primary calendar.

## When NOT to Use

- Gmail, Drive, Docs, or Sheets → respective Google skills.
- Video conferencing setup outside Calendar APIs unless tools expose it.
- Skill repo maintenance → **create-skill** / **publish-skill**.

## Expected Outcome

- Events returned with summary, start/end, and calendar context.
- Creates/updates use correct `dateTime` or all-day `date` objects.
- Deletes confirmed only after successful tool response.

## Inputs to Gather

- Date range: compute `timeMin` / `timeMax` in RFC3339 (e.g. start/end of “today” in user or UTC timezone).
- `calendarId` (default `primary` unless specified).
- Event fields: summary, start, end; all-day vs timed.

## Workflow

1. Confirm calendar tools are available.
2. **List calendars** if the target calendar is unknown: `calendar_list_calendars`.
3. **List events** in range: `calendar_list_events` with `calendarId`, `timeMin`, `timeMax`.
4. **Create / update / delete** as requested with proper start/end objects.
5. Summarize events or confirm mutations from tool output.

### Domain rules

1. **RFC3339 for ranges**: `timeMin` and `timeMax` as RFC3339 (e.g. `2026-02-07T00:00:00Z`); derive day bounds for “today” / “tomorrow”.
2. **Primary calendar**: Use `calendarId: "primary"` unless the user names another.
3. **Start/end objects**: `dateTime` (RFC3339) for timed events; `date` (`YYYY-MM-DD`) for all-day.
4. **List then act**: List the relevant window before create, update, or delete.

### Main tools

- `calendar_list_calendars`, `calendar_list_events` (`calendarId`, `timeMin`, `timeMax`)
- `calendar_create_event`, `calendar_update_event`, `calendar_delete_event`

### Examples

**Today’s agenda:** `calendar_list_events` on `primary` with today’s `timeMin`/`timeMax`. Return summaries and times.

**Team sync tomorrow 10–11:** `calendar_create_event` with summary, `dateTime` start/end for the requested window; confirm from response.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | List and mutate events; report API errors. |
| Read-only | List only; draft event payloads for user approval. |
| No integration | Do not fabricate events or IDs. |

### Related tool sets

- `calendar`
- `meeting-scheduler`

## Review / Decision / Execution Criteria

- Time zones: be explicit when inferring “today”; prefer user-stated timezone when known.
- Confirm deletes and large batch changes with the user when appropriate.

## Output Format

1. Request and actions.
2. Event list or mutation confirmation.
3. Errors or permission issues.
4. Suggested follow-ups (add attendees, change calendar).

## Quality Bar

- Correct RFC3339 and all-day vs timed distinction.
- No invented event IDs or links.

## Safety and Boundaries

- No secrets in examples.
- Confirm destructive deletes when impact is unclear.

## Escalation / Dispatch Rules

- Scheduling that also needs email → **gmail** after calendar action if needed.
- No write tools → output exact `calendar_*` arguments.

## References

- Legacy: `skills/old_skills.json` (`google-calendar`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
