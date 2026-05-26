## Skill submission

- **Skill name:** `io.github.<you>/<skill>`
- **npm package:** `@<you>/<skill>` (or PyPI / Docker)
- **Repository:** https://github.com/<you>/<skill>

### Checklist

- [ ] `skill.json` placed in `skills/` with filename matching the skill name (dots and slashes replaced)
- [ ] `mcpName` field added to the npm `package.json` (or `mcp-name:` in PyPI README)
- [ ] Schema validation passes locally: `pnpm validate-skills`
- [ ] I am the owner of this npm/PyPI package, or have permission to publish on their behalf
- [ ] If this is a remote (streamable-http / sse) skill, I have confirmed the URL is reachable

### Notes for reviewers

<!-- Anything special the maintainer should know (breaking changes, naming clashes, etc.) -->
