---
name: managents-knowledge-base
description: Browse and curate Syncolab project Knowledge Base concepts, write formatted bodies, and add taxonomy types or statuses using available kb_* tools. Bulk import and taxonomy rename/archive belong in Office UI.
---

# Syncolab Knowledge Base

## Purpose

Maintain project Knowledge Base concepts and their taxonomy using available kb_* tools. Concepts hold decisions, risks, notes, and other typed knowledge with formatted bodies.

## When to Use

- Browse concepts, read their bodies, or create and update project knowledge.
- Discover valid types and statuses before assigning them to concepts.
- Add a new concept type or status when the requested workflow needs one.

## When NOT to Use

- External document systems such as Notion or Google Docs: use the corresponding skill.
- Agent memory or platform Living Docs: use the relevant memory or documentation skill.
- Bulk hierarchy or seed imports, or renaming/archiving taxonomy definitions: direct the user to Office Knowledge Base UI. These operations are not exposed as agent tools. Do not simulate a bulk import with many individual writes unless the user explicitly requests that alternative.

## Expected Outcome

Use verified concept/type/status IDs, preserve existing content when editing, and return confirmed results with any permission or scope limitations.

## Inputs to Gather

- The requested change and the project bound to the conversation or initiative.
- Existing concept IDs, intended parent, and valid type/status values from tool results.
- Whether the run grants the required read or write tools.

## Workflow

1. Read `kb_get_taxonomy` or `kb_list_concept_types` to learn valid type/status IDs. Their compact taxonomy response is plain text; do not assume JSON or invent IDs.
2. Browse with `kb_list_concepts`, using `parent_concept_id`, `type_id`, `status`, or `include_archived` when needed. Omit the parent to browse root concepts. Follow the live schema's pagination; a bounded result is not the whole tree. At depth 2 or 3, the result is capped and cursor pagination is unavailable.
3. Read the target node with `kb_get_concept` before editing its body. Prefer updating existing knowledge over creating a duplicate.
4. Plan a shallow structure: keep related material in a few substantial concepts with internal headings. A document section is not automatically a separate concept; split finely only when requested.
5. Use `kb_create_concept` or `kb_update_concept` with only the requested metadata and body changes. Use `type_id` and `status` on the concept to change its classification; this does not rename the taxonomy definition.
6. When a new type or status is needed, use `kb_create_concept_type` or `kb_create_concept_status` with the fields required by the live schema. Re-read taxonomy to use returned identifiers. Updating or archiving existing taxonomy definitions remains an Office UI action.
7. Report confirmed changes and concept IDs. A failed or interrupted call may have partially completed; inspect before retrying a creation.

### Formatted bodies

Store concept bodies as TipTap-compatible HTML, not raw Markdown. Use `<p>`, `<h1>`–`<h3>`, lists, tables, quotes, and code blocks as supported by the editor. Avoid scripts, unsafe URLs, arbitrary styling, and unsupported markup.

- For a short body, pass HTML in `content`.
- For a long body, use the available `begin_document_write` workflow with `mimeType: "text/html"`. Follow the runtime's write-session instructions and wait for its sealed `staging://` handle, then pass that handle to the concept create/update tool with the intended metadata. Do not invent a handle or assume an internal commit tool is callable.
- `summary` is an optional one-line blurb, never a substitute for the body.
- Preserve unrelated sections when editing. A write-session outline becomes headings within a concept, not separate tree nodes.

Example short body: `<h2>Decision</h2><p>Use the agreed rollout sequence.</p><h2>Rationale</h2><ul><li>Limits the initial operational impact.</li></ul>`

### Project scope

The runtime supplies the project from conversation/initiative context. Current Knowledge Base schemas do not accept `project_id`; do not invent that argument. If no project is bound or the bound project is wrong, ask to open or bind the intended project before proceeding.

### Archive and delete

Use `kb_update_concept` with `archived_at` when preserving history is appropriate; archiving affects the subtree. `kb_delete_concept` deletes the node and all descendants and requires approval. Establish the intended subtree and explain its impact before a destructive action. Do not claim an exact affected count from a truncated listing.

## Tool Availability Rules

Use only tools exposed in the current run and their live schemas. Read-only access permits inspection and proposed changes, not execution. Missing access does not justify guessing another tool name or bypassing permissions. This platform capability needs project context and tool grants, not an extra OAuth connection.

## Output Format

Return what was found or changed, confirmed concept IDs, and any incomplete results, permission errors, or actions that require Office UI. Link related timeline milestones or delivery work using actual concept IDs when relevant.

## Quality Bar

Taxonomy IDs come from tool results, concept bodies retain valid formatting, and the hierarchy matches the requested granularity. Never fabricate content, write confirmations, or a successful import. Respect the requested scope and the runtime's approval requirements.

## References

- `skills/skill.instruction.md`, `skills/meta.instructions.md`
