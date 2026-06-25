# Notes for Claude (and humans) - SchulyKeycloak

Schuly's own Keycloak image - the production identity provider (Keycloakify login theme + the `schuly` realm), shipped as an optimized build. See `docs/` for setup.

## Workflow rules (enforced)

- Never work on `main`. Create an issue (labeled) → branch `feature/<issue#>_PascalCase`
  or `fix/<issue#>_PascalCase` → PR (labeled) with `Closes #<issue>` → squash-merge +
  delete branch.
- Use **bun** as the package manager / task runner - never npm, npx, or node directly.
- Use CLI tooling whenever one exists (`gh issue create`, `gh pr create`, generators, etc.).
- No AI / Claude attribution in commits or PRs. Ever.
- No test plans in PRs. PR body is **Summary** + `Closes #<issue>` only.
- Commit subject: short imperative.
- PR labels: `bug`, `enhancement`, `feature`, `refactor`, `CI/CD`, `dependencies`, `documentation`.

## Code formatting

**Declaration signatures go on one line** - don't wrap a function / method / arrow parameter list across multiple lines, however long it gets. This applies to *declarations*, not call sites: leave call sites (JSX / component trees, fluent chains), object / array literals, and multi-line conditionals (`if` / `for` / `while`) wrapped as they are.
