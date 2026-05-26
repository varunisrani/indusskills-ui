# IndusSkills — Handoff: what's done & what you still have to do

Status: 2026-05-12. The local build is complete and verified end-to-end against the
schema and the live npm registry. The steps remaining all require credentials I cannot
hold (GitHub org admin, npm publisher, Vercel project owner, domain registrant).

## What's done locally

### Registry site (this directory: `/Users/varunisrani/indusagi-ts/indusskills`)

- Next.js 16 + Tailwind 4 + TypeScript scaffolded against the actual installed versions
  (not the Next 15 / Tailwind 3 versions the plan assumed).
- 10 seed `skill.json` files in `skills/` — all validate against the official
  `2025-12-11` schema cached locally in `schemas/`.
- `pnpm validate-skills` — 10/10 pass.
- `pnpm verify-mcpname` — hits live npm.registry.npmjs.org, all 6 npm packages exist
  (mcpName tolerated for mirror entries).
- `pnpm typecheck` — clean.
- `pnpm build` — clean, 10 detail pages prerendered statically, 2 dynamic API routes.
- API routes verified by curl:
  - `GET /api/v0/skills` → 10 records
  - `GET /api/v0/skills?search=memory` → 1 (Memory)
  - `GET /api/v0/skills/io.github.modelcontextprotocol/filesystem` → single record
  - `GET /api/v0/skills/does-not-exist` → 404
  - `GET /.well-known/mcp-registry.json` → discovery metadata
- Pages verified by HTTP smoke test:
  - `/` homepage with featured-skills grid
  - `/skills` list of all 10
  - `/skills/io.github.modelcontextprotocol/memory` detail
  - `/publish` 3-step publisher guide
- `.github/workflows/validate-pr.yml` runs schema validation + npm cross-check on PRs.
- `.github/workflows/deploy.yml` deploys to Vercel on push to main (needs secrets, below).
- `.github/PULL_REQUEST_TEMPLATE.md` for skill submissions.

### CLI (sibling directory: `/Users/varunisrani/indusagi-ts/indusskills-cli`)

- `@indusskills/cli@0.1.0` ESM-only Node 20+ CLI built with tsup (7 KB bundle).
- Commands: `search`, `install`, `list`, `doctor`.
- Verified end-to-end against the local registry with a fake `$HOME`:
  - npm-type install writes `{command: "npx", args: ["-y", <pkg>]}` into
    `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS.
  - pypi-type install writes `{command: "uvx", args: [<pkg>]}`.
  - Existing config is backed up to `~/.indusskills/backups/<client>-<timestamp>.json`
    before write.
  - Multiple installs accumulate; `list` shows them; 404 returns exit 1.

## What needs your hands

### Deviations from the plan (already applied)

| Plan said              | Actually used                          | Reason                              |
|------------------------|----------------------------------------|-------------------------------------|
| Next.js 15             | Next.js 16.2.6                         | already installed; works fine       |
| Tailwind 3 + config.ts | Tailwind 4 + CSS `@theme`              | already installed; v4 has no config |
| `src/` directory       | root `lib/` + `app/`                   | scaffold did not use `src/`         |
| `force-static` routes  | dynamic routes (search params)         | v16 strips query at build time      |
| bytedance `version: "latest"` | pinned to `1.0.0`             | schema explicitly rejects "latest"  |

### Phase 6 manual steps (require your creds)

1. **Create the GitHub org `indusskills`** on github.com. The gh CLI cannot create orgs.
2. **Create the two repos** (your existing gh auth is fine):
   ```bash
   gh repo create indusskills/registry --public \
     --description "IndusSkills · The local-first MCP registry for India Stack" \
     --license apache-2.0
   gh repo create indusskills/cli --public \
     --description "IndusSkills CLI · Search and install MCP skills locally" \
     --license mit
   ```
3. **Push the local trees**:
   ```bash
   cd /Users/varunisrani/indusagi-ts/indusskills
   git init && git add . && git commit -m "feat: bootstrap IndusSkills registry"
   git remote add origin git@github.com:indusskills/registry.git
   git branch -M main && git push -u origin main

   cd /Users/varunisrani/indusagi-ts/indusskills-cli
   git init && git add . && git commit -m "feat: bootstrap IndusSkills CLI v0.1.0"
   git remote add origin git@github.com:indusskills/cli.git
   git branch -M main && git push -u origin main
   git tag v0.1.0 && git push --tags
   ```
4. **Claim the npm scope** and publish the CLI:
   ```bash
   npm whoami           # confirm logged in
   npm org create indusskills
   cd /Users/varunisrani/indusagi-ts/indusskills-cli
   pnpm build
   npm publish --access public
   ```
   `@indusskills` was empty on the npm registry at last check.
5. **Vercel**:
   ```bash
   pnpm add -g vercel
   cd /Users/varunisrani/indusagi-ts/indusskills
   vercel link
   vercel --prod
   ```
   Then in the Vercel dashboard, add `indusskills.dev` as a custom domain (you must
   already own / register it — the plan mentions registering before Phase 6).
6. **Wire CI secrets** for the deploy workflow:
   ```bash
   gh secret set VERCEL_TOKEN --repo indusskills/registry
   gh secret set VERCEL_ORG_ID --repo indusskills/registry
   gh secret set VERCEL_PROJECT_ID --repo indusskills/registry
   ```
   Values live in your Vercel account → Settings → Tokens and the project's
   `.vercel/project.json` after `vercel link`.
7. **Smoke test from a clean shell** (post-publish):
   ```bash
   npx @indusskills/cli@latest search filesystem
   npx @indusskills/cli@latest install io.github.modelcontextprotocol/memory --client claude
   ```
   Restart Claude Desktop, confirm the Memory skill appears in the tools list.

### Heads-up

- The official MCP Registry is **still in preview** (`modelcontextprotocol.io/registry/about`
  carries a breaking-change notice). The `2025-12-11` schema version may move. The
  verifier already tolerates mirror entries without `mcpName`; you can flip that to
  strict in `scripts/verify-mcpname.ts` once upstream packages publish `mcpName`.
- The plan's Phase 7 (mirror sync, India Stack Verified badge, `@indusagi/bhashini-mcp`,
  Cursor/VS Code parity, signed artifacts) is intentionally out of scope here.
- Do not announce on HN / Reddit until the post-publish smoke test passes on a fresh
  machine (Phase 6.5 in the plan).

## Definition-of-Done status

| Criterion                                                              | Status                              |
|------------------------------------------------------------------------|-------------------------------------|
| `indusskills.dev` returns homepage + 10 skills                           | Local build does; deploy is on you  |
| `/api/v0/skills` returns valid JSON                                   | ✅ verified locally                  |
| `/api/v0/skills/<name>` returns single record                         | ✅ verified locally                  |
| `npx @indusskills/cli@latest search memory` finds Memory                  | ✅ works against local registry      |
| `npx @indusskills/cli@latest install …` writes valid Claude config       | ✅ verified against fake $HOME       |
| Claude Desktop restart loads the skill                                | ⏳ requires post-publish run         |
| Broken PR fails CI                                                     | Workflow ready; runs once on GitHub |
| Repos pushed public                                                    | ⏳ requires you                      |
| CLI published `@indusskills/cli@0.1.0`                                    | ⏳ requires you                      |
| No credentials, secrets, or telemetry sent to indusskills.dev             | ✅ CLI talks only to /api/v0         |
