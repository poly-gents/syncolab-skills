---
name: browser-use
description: Automate interactive browser sessions for exploration and scripted UI flows. Use when an agent must navigate pages, click candidates, and observe DOM state via browser automation tools.
---

# Browser Use

## Purpose

Drive an interactive browser for exploration and scripted UI flows: open pages, act on candidates, and return observations from tool output—without inventing selectors or page state.

## When to Use

- Prototype or experimental browser automation agents.
- Navigate, click, type, or wait on dynamic pages through browser-use / agent-browser style tools.
- Capture page state after actions for follow-up reasoning.

## When NOT to Use

- Product demo recording on the dedicated demo computer → **product-demo** / `demo_*` tools when that family is equipped.
- Cloud Browserbase MCP sessions → **browserbase**.
- Static HTTP fetch without rendering.

## Expected Outcome

- Session started before interaction.
- Actions use tool-returned candidates or explicit approved selectors—never invented CSS/XPath.
- Results summarized from tool responses only.

## Workflow

1. Confirm browser automation tools are available for the session.
2. Start or reuse a browser session; navigate to the target URL.
3. Observe returned candidates / snapshot; pick ids from the latest observation.
4. Act (click/type/wait) using only ids or hrefs from that observation.
5. Summarize outcomes; escalate when auth, MFA, or CAPTCHA blocks progress.

## Main tools

Prefer platform `agent-browser` / remote browser / browser-use MCP tools exposed to the agent. Do not invent tool names.

## Safety and Boundaries

- Do not bypass paywalls, CAPTCHAs, or MFA.
- Do not store or echo secrets from pages.
- Prefer read-only exploration unless the user approved writes.

