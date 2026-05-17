---
name: browserbase
description: Automates browser sessions via Browserbase MCP—navigate URLs, wait for load, interact with selectors, and capture page state. Use for dynamic web pages, scraping, and scripted browser actions.
---

# Browserbase

## Purpose

Run cloud browser sessions through Browserbase MCP: start or reuse a session, navigate, wait for dynamic content, interact via selectors, and return page title, text, or screenshots from tool output.

## When to Use

- Open a URL and read page content or title.
- Click, type, or interact with elements on dynamic sites.
- Scripted flows: navigate → wait → act → verify.

## When NOT to Use

- Local IDE browser testing in Cursor → **cursor-ide-browser** MCP when available.
- Static HTTP fetch without rendering when a simple HTTP client suffices.
- Logins requiring manual MFA without user handoff.

## Expected Outcome

- Session created before navigation.
- Actions sequenced: navigate, wait, then click/type/screenshot.
- Results described from tool responses, not invented DOM state.

## Inputs to Gather

- Target URL(s).
- Selectors for targeted elements when clicking or typing.
- Timeouts for slow or SPA pages.

## Workflow

1. Discover Browserbase tools via MCP `list_tools`.
2. **Start or reuse session** before navigation.
3. **Navigate** to URL; **wait** for load on dynamic pages.
4. **Act** with one clear step at a time (click, type, screenshot) using selectors when needed.
5. Return title, visible text, or screenshot description from tools.

### Domain rules

1. **Session before navigate**.
2. **Wait for load** on dynamic pages; use timeouts.
3. **Selectors** when targeting specific elements.
4. **One action per step** for reliability.

### Main tools

- Browserbase MCP: session create, navigate, interact, screenshot (names from `list_tools`).

### Examples

**Page title for example.com:** Session → navigate → wait → read title from tool output.

**Google weather search:** Navigate → wait for search box → type query → submit → summarize results.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full MCP access | Run session workflows. |
| Read-only | Not applicable for browser automation. |
| No Browserbase MCP | State limitation; do not describe fake page content. |

### Related tool sets

- `chrome-devtools`

## Review / Decision / Execution Criteria

- Retry with fresh snapshot after navigation that changes DOM.
- Stop after repeated failures; report blocker (login, captcha).

## Output Format

1. URL and steps taken.
2. Extracted content or screenshot summary.
3. Errors or need for user login.

## Quality Bar

- No invented selectors or page text.
- Respect site terms and user scope.

## Safety and Boundaries

- Do not enter credentials unless user provides them in session.
- Stop at captcha/MFA for user handoff.

## Escalation / Dispatch Rules

- Local interactive debugging → IDE browser MCP if user prefers.

## References

- Legacy: `skills/old_skills.json` (`browserbase`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
