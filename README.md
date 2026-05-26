# IndusSkills Registry

The local-first MCP registry for India Stack. Search and install indigenous MCP skills without sending your credentials anywhere.

- **Website:** https://www.indusskills.dev
- **CLI:** [`indusskills`](https://www.npmjs.com/package/indusskills) on npm (current: v0.1.7)
- **Install the CLI globally:** `npm install -g indusskills`
- **Install a skill:** `indusskills install <skill-name>`
- **Schema:** Official skill.json, verbatim
- **License:** Apache-2.0 for the registry, MIT for the CLI

## Use it

```bash
# one-time setup
npm install -g indusskills

# search the registry
indusskills search filesystem

# install into any MCP host
indusskills install io.github.modelcontextprotocol/memory --client claude         # Claude Desktop
indusskills install io.github.modelcontextprotocol/memory --client claude-code    # Claude Code
indusskills install io.github.modelcontextprotocol/memory --client cursor         # Cursor
indusskills install io.github.modelcontextprotocol/memory --client vscode         # VS Code

# list what's installed
indusskills list --client claude

# sanity check
indusskills doctor
```

## How to publish a skill

See [https://www.indusskills.dev/publish](https://www.indusskills.dev/publish).

1. Add `mcpName` to your npm package's `package.json`.
2. Open a PR adding a `skill.json` to `skills/` in this repo.
3. The validation Action runs schema + ownership checks. If green, a maintainer merges.

## How to self-host

Fork this repo. Point at private npm packages. Deploy to your own Vercel. Done.

## Local development

```bash
pnpm install
pnpm dev               # http://localhost:3000
pnpm validate-skills  # check every skill.json against the official schema
pnpm typecheck
pnpm build
```

## Layout

```
.
├── skills/                       # one .json per skill (official skill.json format)
├── categories/index.json          # category definitions
├── schemas/                       # cached official skill.schema.json
├── scripts/validate-skills.ts    # local validation runner
├── scripts/verify-mcpname.ts      # npm mcpName cross-check (used by CI)
├── lib/
│   ├── skills.ts                 # data loader
│   └── schema.ts                  # AJV validation helper
├── app/
│   ├── page.tsx                   # homepage
│   ├── skills/page.tsx           # list
│   ├── skills/[...name]/page.tsx # detail (catch-all for slashes in reverse-DNS)
│   ├── publish/page.tsx           # publishing guide
│   └── api/v0/skills/
│       ├── route.ts               # GET list (with ?search=)
│       └── [...name]/route.ts     # GET single
├── public/.well-known/mcp-registry.json
├── vercel.json                    # Vercel framework + CORS + cache headers
├── next.config.ts                 # outputFileTracingIncludes for skills/*.json
└── .github/workflows/
    ├── validate-pr.yml
    └── deploy.yml
```

## Live stack

| Layer | URL |
|---|---|
| Site | https://www.indusskills.dev |
| API | https://www.indusskills.dev/api/v0/skills |
| Discovery | https://www.indusskills.dev/.well-known/mcp-registry.json |
| CLI source | https://github.com/varunisrani/indusskills-cli |
| CLI on npm | https://www.npmjs.com/package/indusskills |
