---
name: calendly
description: Read Calendly user profile, event types, availability, and scheduled events via calendly_* tools for office-hours scheduling.
---

# Calendly

## Purpose

Use the connected Calendly OAuth integration to inspect scheduling configuration and availability — supporting office-hours workflows for course TAs.

## When to Use

- Verify Calendly connection.
- List event types and scheduling URLs.
- Check availability in a UTC window.
- Review upcoming scheduled events for the connected user.

## When NOT to Use

- Google Calendar event CRUD → **google-calendar**.
- Student tutoring content → **course-practice-ta-session-flow**.

## Expected Outcome

- Current user resource with scheduling URL when connected.
- Event types and availability slots returned with clear time bounds.

## Workflow

1. **`calendly_verify_connection`** or **`calendly_get_current_user`**.
2. **`calendly_list_event_types`**.
3. **`calendly_get_event_type_availability`** with ISO-8601 UTC range.
4. **`calendly_list_scheduled_events`** / **`calendly_get_scheduled_event`** when reviewing bookings.
