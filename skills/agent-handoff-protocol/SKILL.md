---
name: agent-handoff-protocol
description: "Hand a long-running task from one agent to another (or back to a human) with a single, complete handoff packet so the receiver never has to reverse-engineer prior state."
---

# Agent handoff protocol

Handoffs are where multi-agent systems silently lose context. Treat every handoff like an air-gap: assume the receiver has zero memory of your work and write a handoff packet that stands alone.

## When to hand off

- The current owner is hitting a tool/skill they don't have — use `discover-capability-and-request-access` first, but if approval is slow, hand off to an agent who already has the tool.
- Workload rebalancing under `delegation-decision-matrix`.
- The work is now at a phase that belongs to a different role (planner → executor, executor → reviewer, agent → human).
- End-of-shift / context-window exhaustion.

## The handoff packet

Write a single message (Slack thread, planning task comment, or task description update) containing exactly these sections — no more, no less:

1. **Goal.** One sentence: what the user is ultimately trying to achieve.
2. **State.** Bullet list of what is done, what is pending, what is in-flight.
3. **Key artefacts.** Links to relevant files, PRs, tickets, docs. Include line numbers when pointing at code.
4. **Open decisions.** Anything the receiver must decide before continuing. If you have a recommendation, state it but mark it as your opinion.
5. **Constraints.** Hard constraints (user requirements, deadlines, do-not-touch zones).
6. **Next step.** The single most useful next action for the receiver.

## Receive-side checklist

Before continuing, the receiver MUST:

1. Acknowledge receipt with a `status: starting` ping (`agent-status-pings`).
2. Confirm they have the tools the handoff requires; otherwise fail fast with `report_incident` (platform side) or `request_tool_or_skill_access` (customer side).
3. Re-read the user's original request in the conversation. The handoff packet is a summary; the user's words are source of truth.

## Anti-patterns

- "Continuing where I left off" with no packet.
- Handing off only the latest message and assuming the receiver can scroll history.
- Handing off blocked work without naming the blocker.
