// scripts/sync-official.ts

import fs from 'fs/promises';
import path from 'path';

const REGISTRY_URL = 'https://raw.githubusercontent.com/VoltAgent/awesome-agent-skills/main/README.md';
const SKILLS_DIR = path.join(process.cwd(), 'skills');

async function main() {
  console.log('🚀 Syncing 1000+ skills from VoltAgent/awesome-agent-skills...');
  
  const readme = await (await fetch(REGISTRY_URL)).text();
  
  // Parse markdown pattern: - **[org/repo/skill-name](url)** - description
  const skillRegex = /-\s+\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s+-\s+(.+)/g;
  const matches = [...readme.matchAll(skillRegex)];

  let successCount = 0;

  // Clean the directory first
  try {
    await fs.rm(SKILLS_DIR, { recursive: true, force: true });
  } catch (e) {
    // Ignore error if it doesn't exist
  }
  await fs.mkdir(SKILLS_DIR, { recursive: true });

  for (const match of matches) {
    const fullPath = match[1].trim();        // e.g. "phuryn/ab-test-analysis"
    const url = match[2].trim();             // e.g. "https://github.com/phuryn/pm-skills/tree/main/pm-data-analytics/skills/ab-test-analysis"
    const description = match[3].trim();

    const [org, repo, ...skillParts] = fullPath.split('/');
    const skillName = skillParts.join('/') || repo;

    let rawUrl = '';

    // If it's a GitHub URL
    if (url.startsWith('https://github.com/')) {
      // If it has /tree/main/ or /tree/master/ etc
      if (url.includes('/tree/')) {
        rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/tree/', '/') + '/SKILL.md';
      } else {
        // Assume root of the repo
        rawUrl = url.replace('github.com', 'raw.githubusercontent.com') + '/main/SKILL.md';
      }
    } else {
      // We skip officialskills.sh URLs for now as they don't provide a direct raw markdown endpoint
      console.log(`⚠️ Skipped non-GitHub URL ${fullPath} (${url})`);
      continue;
    }

    try {
      const response = await fetch(rawUrl);
      if (!response.ok) {
        // Try master if main failed
        if (rawUrl.includes('/main/')) {
           const fallbackUrl = rawUrl.replace('/main/', '/master/');
           const fallbackResponse = await fetch(fallbackUrl);
           if (!fallbackResponse.ok) {
              console.log(`⚠️ Skipped ${fullPath} (HTTP ${fallbackResponse.status} on fallback)`);
              continue;
           }
           rawUrl = fallbackUrl;
        } else {
           console.log(`⚠️ Skipped ${fullPath} (HTTP ${response.status})`);
           continue;
        }
      }

      // Fetch the actual text
      const finalResponse = await fetch(rawUrl);
      const skillMd = await finalResponse.text();

      const skillJson = {
        name: skillName,
        description,
        instructions: skillMd,
        dev: { indusskills: { source: fullPath, githubUrl: rawUrl, lastSynced: new Date().toISOString() } }
      };

      await fs.writeFile(path.join(SKILLS_DIR, `${skillName.replace(/\//g, '-')}.json`), JSON.stringify(skillJson, null, 2));
      successCount++;
    } catch (e) {
      console.log(`⚠️ Failed to fetch ${fullPath}: ${e}`);
    }
  }

  console.log(`✅ Synced ${successCount} skills!`);
}

main();
