# Deploy IndusSkills to Vercel

The registry is a Next.js 16 app. Vercel auto-detects it. Two stages:

1. **First deploy** (interactive, ~3 min)
2. **CI auto-deploy** on every push to `main` (one-time secret wiring)

---

## Stage 1 — first deploy

### Prereqs

- A Vercel account (free tier is fine): https://vercel.com/signup — sign in with the GitHub account that will own the registry repo
- The Vercel CLI installed:
  ```bash
  pnpm add -g vercel
  ```
- A GitHub repo for the registry (recommended — Vercel can link to it for auto-redeploy). If you don't have one yet:
  ```bash
  cd /Users/varunisrani/indusagi-ts/indusskills
  git init && git add . && git commit -m "feat: bootstrap IndusSkills registry"
  gh repo create indusskills/registry --public --source=. --push \
    --description "IndusSkills · local-first MCP registry for India Stack"
  ```
  (The `indusskills` GitHub org must exist — create it on github.com first if needed.)

### Deploy

```bash
cd /Users/varunisrani/indusagi-ts/indusskills

# 1. Log in to Vercel (opens browser)
vercel login

# 2. Link this directory to a new Vercel project
vercel link
# - Set up and deploy? Yes
# - Which scope? Pick your personal account or the indusskills org if you created one on Vercel
# - Link to existing project? No
# - Project name? indusskills (or whatever — shows in your Vercel dashboard)
# - Directory? ./ (current)

# 3. Push the first production build
vercel --prod
```

When it finishes you get a URL like `https://indusskills-abc123.vercel.app`. Open it — homepage should load, `/skills` lists 10, `/api/v0/skills` returns JSON.

### Add the custom domain

1. https://vercel.com/dashboard → click your project → **Settings → Domains**
2. Add `indusskills.dev`
3. Vercel shows DNS records (A and/or CNAME) — add them at your domain registrar (GoDaddy / Namecheap / Cloudflare / wherever you registered `indusskills.dev`)
4. Wait 1–30 min for DNS to propagate; SSL cert auto-issues

Test:
```bash
curl -s https://indusskills.dev/api/v0/skills | head -c 200
```

Should return JSON.

---

## Stage 2 — automatic redeploy on `git push`

The repo already has `.github/workflows/deploy.yml` wired to push to Vercel on every commit to `main`. It needs three secrets.

### Get the secret values

From your local machine, after `vercel link`:

```bash
cd /Users/varunisrani/indusagi-ts/indusskills
cat .vercel/project.json
```

That prints:
```json
{ "orgId": "team_xxxxx", "projectId": "prj_xxxxx" }
```

For the **token**:
1. https://vercel.com/account/tokens
2. **Create Token** → name it `indusskills-ci`, scope = full
3. Copy the value (starts `vercel_...`)

### Wire into GitHub

```bash
gh secret set VERCEL_TOKEN --repo indusskills/registry        # paste token
gh secret set VERCEL_ORG_ID --repo indusskills/registry       # paste orgId
gh secret set VERCEL_PROJECT_ID --repo indusskills/registry   # paste projectId
```

Now every `git push origin main` triggers `.github/workflows/deploy.yml` and redeploys to production automatically.

---

## After it's live — point the CLI at it

The CLI defaults to `https://indusskills.dev/api/v0`. Once that's serving real responses:

```bash
# remove the dev-only override from your shell
sed -i.bak '/INDUSMCP_REGISTRY/d' ~/.zshrc
source ~/.zshrc

# now indusskills talks to the deployed registry
indusskills search filesystem
indusskills doctor
```

The deployed CLI + deployed registry combination is what every user gets when they run `npx indusskills@latest`.

---

## What's in this repo specifically for Vercel

| File | Purpose |
|---|---|
| `next.config.ts` | `outputFileTracingIncludes` ensures `skills/*.json` ship with the skillless function (otherwise the API would 500 on Vercel because the files wouldn't be bundled) |
| `vercel.json` | Framework hint, CORS + cache headers on `/api/v0/*` and `/.well-known/*`, region pinned to `bom1` (Mumbai — closest to most India Stack users) |
| `.vercelignore` | Keeps `node_modules`, `.next`, docs, and dev cruft out of the deploy bundle |
| `.github/workflows/deploy.yml` | CI auto-deploy on push to `main` |

Don't edit these unless you're changing the deployment topology. Vercel auto-detects Next.js 16 with Turbopack — no other config needed.

---

## Troubleshooting

- **`vercel --prod` fails with "function exceeds size limit"** — only happens if `.vercelignore` was modified. The default is well under the 50 MB limit.
- **`/api/v0/skills` returns `[]` in prod** — `outputFileTracingIncludes` in `next.config.ts` is wrong or missing. Make sure the patterns match the route paths.
- **Custom domain stays "Pending"** — DNS hasn't propagated. Run `dig indusskills.dev` and check the answer matches what Vercel told you to set. Cloudflare orange-cloud proxy will block Vercel's SSL issuance; set it to grey-cloud / DNS-only first, then re-enable proxy after the cert issues.
- **CORS error from the CLI** — covered by `vercel.json` `Access-Control-Allow-Origin: *`. If you see CORS errors anyway, confirm `vercel.json` was deployed (visible in build logs).
