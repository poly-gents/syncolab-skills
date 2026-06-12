---
name: swarm-coordination
description: "Coordinate three or more agents on the same objective with explicit role assignment, a shared scratchpad, and arbitration — avoid the silent-clash failure mode."
---

# Swarm coordination (3+ agents)

Two-agent coordination is mostly handoffs. Three-or-more-agent coordination has new failure modes: silent clashes, redundant work, and consensus collapse. Use this skill when the orchestrator (you) is fan-ing out to 3+ workers on the same objective.

## When to use

- Sprint planning where multiple agents work the same backlog.
- Multi-repo refactor where each repo has its own agent.
- Research where multiple agents explore different angles of the same question.

## The shape

- **One orchestrator.** That is you. No two orchestrators on the same swarm.
- **N workers.** Each has a clearly named lane (e.g., `worker-backend`, `worker-frontend`, `worker-research`).
- **One shared scratchpad.** A planning task description, a doc, or a thread that all workers and the orchestrator can read. No private channels.
- **One arbitration rule.** When workers conflict, the orchestrator decides; if the conflict is policy-shaped, escalate via `consensus-arbitration`.

## The loop

1. **Roster.** Confirm each agent is clocked in via `agent_directory_list`.
2. **Lane assignment.** Write each lane's scope to the shared scratchpad. Each worker confirms (`status: starting`) on its lane line.
3. **Heartbeat.** Every worker runs `agent-status-pings` at 3-minute cadence.
4. **Conflict checks.** Every 10 minutes, the orchestrator scans the scratchpad for overlaps and either splits/merges lanes or invokes `consensus-arbitration`.
5. **Convergence.** When all lanes are `done`, the orchestrator runs `production-validation` (if engineering) or `agent-self-check` (if non-engineering) on the unified output before reporting back to the user.

## Anti-patterns

- No shared scratchpad — workers chat in private threads and drift.
- Two orchestrators reassigning the same lane.
- Letting a `blocked` worker stall the swarm — re-route the lane within 1 cycle.
