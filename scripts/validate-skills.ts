import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isValidSkillJson } from "../lib/schema";

const dir = join(process.cwd(), "skills");
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

let failed = 0;
for (const file of files) {
  const data = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const { ok, errors } = isValidSkillJson(data);
  if (ok) {
    console.log(`OK  ${file}`);
  } else {
    failed++;
    console.error(`ERR ${file}`);
    for (const e of errors) console.error(`    ${e}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} of ${files.length} files failed.`);
  process.exit(1);
}
console.log(`\n${files.length} files OK.`);
