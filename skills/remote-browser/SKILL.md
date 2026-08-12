---
name: remote-browser
description: Operate a remote/hosted browser session for agent automation when local browser tools are unavailable. Use for remote navigation, interaction, and observation.
---

# Remote Browser

## Purpose

Use a remote or hosted browser endpoint for agent automation when the runtime exposes remote-browser tools: navigate, interact, and observe without assuming a local Chrome instance.

## When to Use

- Experimental agents configured for remote browser tooling.
- Hosted browser sessions distinct from Browserbase MCP branding.

## When NOT to Use

- Browserbase MCP → **browserbase**.
- Local agent-browser / computer browser tools when those are the bound surface.
- Product demo producer flows → `demo_*` / **product-demo**.

## Expected Outcome

- Remote session established before actions.
- Observations come from tool output only.
- Clear errors when the remote browser is unavailable.

## Workflow

1. Verify remote browser tools are present.
2. Create or attach to a remote session.
3. Navigate and act using tool schemas; never invent endpoints.
4. Return titles, text, or screenshots from tool results.

## Safety and Boundaries

- Treat remote session credentials as secrets.
- Do not exfiltrate page content beyond the user task.

