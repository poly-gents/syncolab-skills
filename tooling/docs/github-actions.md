# GitHub Actions — comparison with [google/skills](https://github.com/google/skills)

## What `google/skills` runs (from Actions API + run history)

| Workflow name | In repo? | Trigger | Purpose |
|---------------|----------|---------|---------|
| **Dependency Graph** | No — path `dynamic/dependabot/update-graph` | GitHub-managed | Updates the dependency graph for Dependabot alerts. No `.github/workflows` file in the skills repo. |
| **GitHub Actions Scan** | No — org deploys `.github/workflows/github_actions_scan.yml` | `pull_request_target` | Semgrep rules on workflow YAML (google/github-team). |
| **Google GitHub Admin: Actions Workflow Security Scan** | No — org deploys `action_scanning.yml` | `pull_request` on `.github/workflows/**` | CodeQL Actions security queries (untrusted checkout, injection, etc.). |

The [google/skills](https://github.com/google/skills) tree has **no committed** `.github/workflows` for skill validation. PRs still show Actions because **Google’s org** attaches security workflows. Those are not something you copy into a public skills library unless you run the same org policies.

## What Syncolab runs

| Repo | Workflow | Purpose |
|------|----------|---------|
| `syncolab-skills` (public) | `.github/workflows/skills-ci.yml` | Skill validation and manifest drift checks on pull requests and pushes. |

Production **Agent Studio seed** does not use Actions. It clones `poly-gents/syncolab-skills` and reads `manifest.json` (see master-backend `registry.json`).

## `poly-gents` org — Actions allowlist

If the organization uses **“Allow specified actions”**, allow at least:

| Action | Used for |
|--------|----------|
| `actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8` (or `actions/checkout@v4`) | Checkout the skills repository |
| `actions/setup-node@49933ea5288caeca8642d1e84afbd3f953d9626f` (or `actions/setup-node@v4`) | Node 20 + npm cache |

Or use policy: **Allow actions created by GitHub** (covers the above).

Dynamic workflows (like Google’s **Dependency Graph**) are GitHub-managed; enable **Dependency graph** / Dependabot on the repo if you want the same Insights tab. The public skills repo has no root `package.json`; its maintainer package is under `tooling/`.

Optional (Google-internal style; not required for Syncolab):

- Org workflow from [google/github-team `action_scanning.yml`](https://github.com/google/github-team/blob/main/.github/workflows/action_scanning.yml) — only needed if you want CodeQL workflow scanning on every `.github/workflows` change.
- Semgrep **GitHub Actions Scan** — org-level; not required for skill content.

## Security notes (aligned with Google’s scans)

- Use `pull_request`, not `pull_request_target`, for untrusted fork code (we validate PR skill trees, not base secrets).
- `permissions: contents: read` on the job.
- Pin third-party actions to commit SHAs in workflow files.
- `npm ci` runs in `tooling/`; skill folders are data, not executed as install scripts in CI.
