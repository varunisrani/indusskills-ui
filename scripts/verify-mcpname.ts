import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type Pkg = { registryType: string; identifier: string };
type Skill = {
  name: string;
  packages?: Pkg[];
  _meta?: Record<string, unknown>;
};

async function main(): Promise<void> {
  const dir = join(process.cwd(), "skills");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

  let failed = 0;
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(dir, file), "utf8")) as Skill;
    const isMirror =
      (data._meta?.["dev.indusskills/source"] as string | undefined) ===
      "official-registry-mirror";

    for (const pkg of data.packages ?? []) {
      if (pkg.registryType !== "npm") continue;
      const url = `https://registry.npmjs.org/${pkg.identifier}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error(
          `ERR ${file}: npm package ${pkg.identifier} not found (HTTP ${res.status})`,
        );
        failed++;
        continue;
      }
      const meta = (await res.json()) as { mcpName?: string };
      if (!meta.mcpName) {
        // Tolerant for mirror entries where upstream hasn't added mcpName yet.
        // First-party submissions (non-mirror) MUST have mcpName set.
        if (isMirror) {
          console.log(
            `OK  ${file}: ${pkg.identifier} (mirror, no mcpName yet — tolerated)`,
          );
        } else {
          console.error(
            `ERR ${file}: npm package ${pkg.identifier} is missing "mcpName" in package.json`,
          );
          failed++;
        }
        continue;
      }
      if (meta.mcpName !== data.name) {
        console.error(
          `ERR ${file}: npm mcpName "${meta.mcpName}" does not match skill.name "${data.name}"`,
        );
        failed++;
      } else {
        console.log(`OK  ${file}: ${pkg.identifier} mcpName=${meta.mcpName}`);
      }
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} npm cross-checks failed.`);
    process.exit(1);
  }
  console.log(`\nAll npm packages verified.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
