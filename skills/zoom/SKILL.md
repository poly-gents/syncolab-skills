---
name: zoom
description: Manage Zoom meetings and Calendar events, retrieve recordings and transcripts, import meeting content into Syncolab, and inspect attendance and usage with available Zoom tools.
---

# Zoom

## Purpose

Manage Zoom meetings and Calendar events, retrieve meeting artifacts, and inspect attendance and usage.

Use **`zoom_*`** tools after an admin connects Zoom (Integrations OAuth, account/admin-level). Start with `zoom_verify_connection` or `zoom_get_integration_capabilities` to confirm the connection and granted scopes before relying on other tools.

## Pull-only — no live sync
Every `zoom_*` call makes a live request to Zoom when invoked. There is **no webhook, no background sync, and no automatic import** of recordings, transcripts, or summaries — nothing happens in Syncolab because a Zoom meeting occurred or ended. If asked "did anything happen in Zoom", you must call a tool; you cannot answer from memory.

## Zoom Calendar vs. Google/Microsoft Calendar
`zoom_calendar_*` tools operate on **Zoom Calendar**, a distinct product from Google Calendar and Microsoft Outlook Calendar — it is *not* an alternate view of those calendars. There is no calendar-discovery endpoint: pass `cal_id` as `"primary"` (the connected user's own calendar) or a known user email; ask the user if you don't have one. To put a Zoom meeting on a Google/Outlook calendar, create the meeting with `zoom_create_meeting` first, then use the Google/Microsoft Calendar tools to add an event containing the returned join URL — do not assume `zoom_calendar_create_event` reaches those calendars.

## Meetings
Use `zoom_list_meetings` / `zoom_list_upcoming_meetings` / `zoom_get_meeting` to read. Use `zoom_create_meeting`, `zoom_update_meeting`, and `zoom_delete_meeting` for mutations — execute only within the user-authorized scope and current tool permissions; `zoom_delete_meeting` and `zoom_calendar_delete_event` are destructive and also require `confirm:true`. Never surface a host `start_url` to a user; only the safe join URL is returned.

## Recordings and transcripts
1. Find the meeting (`zoom_get_past_meeting`, `zoom_list_past_meeting_instances`) and inspect available artifacts with `zoom_get_recording_files` before assuming a format exists.
2. Prefer `zoom_get_meeting_transcript` for the Zoom-generated VTT transcript. It returns a typed status — `ready`, `processing`, or `unavailable` — and never polls automatically; if `processing`, tell the user to retry later rather than looping.
3. Participant-separated audio only exists if the account enabled that cloud-recording setting **before** the meeting; do not assume it's always present — check `zoom_get_recording_files` first.
4. To bring meeting content into Syncolab (for analysis, search, etc.), use `zoom_ingest_meeting_content` explicitly — it is a write/approval-gated action, idempotent per meeting, and prefers transcript → participant audio → combined audio; video requires `artifact_policy:"video"`. It is the only tool that starts a Syncolab processing job; nothing else does.

## Dashboard and reports
`zoom_dashboard_*` tools are on-demand metrics (not real-time event history) and require a Business+ plan — expect a plan/feature error on lower-tier accounts. `zoom_report_*` tools are billing-grade usage/report data, distinct from the live meeting and Dashboard endpoints; use reports for historical/billing questions and Dashboard/meeting tools for current-state questions.

## Errors
Treat `AUTH_MISSING` / `REAUTHORIZATION_REQUIRED` as "ask an admin to reconnect Zoom", `SCOPE_NOT_GRANTED` as "this action isn't authorized by the current connection", and `PLAN_UNAVAILABLE` / `LICENSE_UNAVAILABLE` as "this Zoom plan doesn't support that feature" — do not present these as generic failures.

## When to Use

Use this skill for Zoom scheduling, meeting history, recordings, transcripts, attendance, and usage questions. For ordinary Google or Outlook calendar work, use that calendar's skill instead.

## Expected Outcome

Return the requested Zoom records or verified changes, with the correct meeting occurrence and processing state.

## Workflow

1. Establish the requested host, meeting or occurrence, date range, timezone, and destination project when importing content. Use returned IDs, not a topic guessed to be unique.
2. For recurring meetings, distinguish the series from a completed instance. Use `zoom_list_past_meeting_instances` and the returned UUID for occurrence-specific transcripts or attendance. Pass IDs as returned; let the tool handle URL encoding.
3. Follow `next_page_token` only on tools whose schema exposes it, preserving the same filters. Keep date ranges within the tool's documented window. Do not imply one page is an exhaustive result.
4. Before modifying a meeting or event, read its current state and apply only the requested fields. A timeout is not proof that a creation failed: inspect before retrying to avoid duplicates.
5. For ingestion, establish the target project and artifact policy. Report the returned artifact/job state; job creation is not completed transcription.

## Tool Availability Rules

Check the tools actually granted to this agent. Connection capabilities describe OAuth permissions; they do not grant the agent access to every tool. With read-only access, inspect and describe the proposed change; with no Zoom tools, report the limitation.

## Additional read workflows

Use `zoom_list_users`, `zoom_get_user`, and `zoom_verify_user_email` to resolve hosts. Meeting templates, invitations, registration, polls, surveys, Q&A, and summaries each have dedicated tools. A missing summary or transcript does not prove that the meeting never happened.

## Output Format

Return the meeting/event ID and safe join URL when applicable, the timezone and date range used, results supported by returned records, and any pagination, permission, or processing limitations.

## Quality Bar

For mutations, distinguish requested, completed, and failed changes. Do not expose host start URLs, tokens, or private participant data beyond the requested purpose.

## References

Read [the tool reference](references/tools.md) when choosing tools. The current runtime schema is authoritative for parameters and availability.
