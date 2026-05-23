---
name: scheduled-tasks
description: "Run one of the initiative's configured scheduled tasks manually from chat."
---

# Scheduled Tasks

This initiative has opted in to **Scheduled Tasks**. When a manual run is dispatched, execute **one** configured task using its saved context sources and summarize the outcome.

## When to run

- The workspace task description or `input_context.optInFlow.runConfig` names a scheduled task to run now.
- The initiative's `scheduledTasks.tasks` configuration defines the available tasks, cadence, and context sources.

## The loop

1. **List configured tasks.** Read the run configuration. If more than one task exists and none is selected, ask the user which task to run (one question, concise options).
2. **Load context sources.** For the selected task, pull data from its configured sources (planning overview, integrations, docs, inbox summaries, etc.) using the tools you already have.
3. **Execute the task intent.** Follow the task `kind` semantics:
   - `daily_summary` — concise status rollup for leadership.
   - `issue_digest` — prioritized open/blocked items from planning or GitHub.
   - `standup_prep` — what changed, what's next, blockers.
   - `planning_sync` — reconcile planning boards with external trackers when connected.
   - `integration_sync` — refresh or summarize integration-backed artifacts without destructive writes unless explicitly configured.
4. **Summarize.** Deliver the output the task name promises, plus any follow-ups that need a human.

## Hard rules

- Run **one** task per workspace dispatch unless the run configuration explicitly batches them.
- Do not create or edit cron schedules in this flow — configuration changes belong in Initiative Settings.
- If a required integration is missing, say so plainly and produce the best partial summary from available sources.
- Keep PII out of summaries when posting back to shared channels.
