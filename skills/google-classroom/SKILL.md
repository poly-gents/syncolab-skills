---
name: google-classroom
description: Read Google Classroom courses, coursework, announcements, and topics via classroom_* tools for university teaching workflows.
---

# Google Classroom

## Purpose

Read course structure from Google Classroom through native integration tools: list courses, inspect coursework and topics, and read announcements for syllabus-aware TAs.

## When to Use

- List or inspect courses the connected teacher can access.
- Pull assignments, topics, or announcements into course context.
- Verify Classroom OAuth is working.

## When NOT to Use

- Writing grades or posting as students (not in MVP toolset).
- Gmail, Drive file edits, or Calendar → respective Google skills.

## Expected Outcome

- Course metadata and lists returned with pagination handled.
- Errors surfaced clearly when Classroom is not connected.

## Workflow

1. **`classroom_list_courses`** — find `courseId`.
2. **`classroom_get_course`** — title, section, state.
3. **`classroom_list_coursework`**, **`classroom_list_topics`**, **`classroom_list_announcements`** as needed.
4. Merge summaries into **`course-context-from-classroom`** / living docs — do not dump raw roster PII into chat.
