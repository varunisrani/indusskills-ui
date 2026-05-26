import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type SkillJson = Record<string, unknown> & { name: string };

export type SkillRecord = {
  skill: SkillJson;
  _meta?: Record<string, unknown>;
};

export type SkillType =
  | "npm"
  | "pypi"
  | "docker"
  | "nuget"
  | "remote"
  | "other";

export type Namespace = "io.github" | "com" | "ai" | "other";

export type SortOrder = "name-asc" | "name-desc";

const skillsDir = join(process.cwd(), "skills");

export function loadAll(): SkillRecord[] {
  const files = readdirSync(skillsDir).filter((f) => f.endsWith(".json"));
  const results = files
    .map((f) => {
      const skill = JSON.parse(
        readFileSync(join(skillsDir, f), "utf8"),
      ) as SkillJson;
      return { skill, _meta: skill._meta as Record<string, unknown> | undefined };
    })
    .sort((a, b) => a.skill.name.localeCompare(b.skill.name));
  return results;
}

export function findByName(name: string): SkillRecord | null {
  return loadAll().find((r) => r.skill.name === name) ?? null;
}

export function getSkillType(record: SkillRecord): SkillType {
  const pkgs = record.skill.packages as Array<{ registryType?: string }> | undefined;
  const remotes = record.skill.remotes as Array<unknown> | undefined;
  const rt = pkgs?.[0]?.registryType;
  if (rt === "npm") return "npm";
  if (rt === "pypi") return "pypi";
  if (rt === "oci") return "docker";
  if (rt === "nuget") return "nuget";
  if (!pkgs?.length && remotes?.length) return "remote";
  return "other";
}

export function getNamespace(record: SkillRecord): Namespace {
  const name = record.skill.name;
  if (name.startsWith("io.github.")) return "io.github";
  if (name.startsWith("com.")) return "com";
  if (name.startsWith("ai.")) return "ai";
  return "other";
}

export function search(query: string, limit = 30): SkillRecord[] {
  const q = query.toLowerCase();
  return loadAll()
    .filter((r) => matchesQuery(r, q))
    .slice(0, limit);
}

function matchesQuery(r: SkillRecord, q: string): boolean {
  if (!q) return true;
  const s = r.skill as Record<string, string | undefined>;
  return (
    (s.name?.toLowerCase().includes(q) ?? false) ||
    (s.description?.toLowerCase().includes(q) ?? false) ||
    (s.title?.toLowerCase().includes(q) ?? false)
  );
}

export type FilterOptions = {
  q?: string;
  type?: SkillType | "all";
  namespace?: Namespace | "all";
  sort?: SortOrder;
};

export function filterAndSort(opts: FilterOptions = {}): SkillRecord[] {
  const q = (opts.q ?? "").toLowerCase();
  const type = opts.type ?? "all";
  const namespace = opts.namespace ?? "all";
  const sort = opts.sort ?? "name-asc";

  let results = loadAll().filter((r) => {
    if (!matchesQuery(r, q)) return false;
    if (type !== "all" && getSkillType(r) !== type) return false;
    if (namespace !== "all" && getNamespace(r) !== namespace) return false;
    return true;
  });

  if (sort === "name-desc") {
    results = [...results].reverse();
  }

  return results;
}

export function getTypeCounts(): Record<SkillType, number> {
  const counts: Record<SkillType, number> = {
    npm: 0,
    pypi: 0,
    docker: 0,
    nuget: 0,
    remote: 0,
    other: 0,
  };
  for (const r of loadAll()) {
    counts[getSkillType(r)]++;
  }
  return counts;
}

export function getNamespaceCounts(): Record<Namespace, number> {
  const counts: Record<Namespace, number> = {
    "io.github": 0,
    com: 0,
    ai: 0,
    other: 0,
  };
  for (const r of loadAll()) {
    counts[getNamespace(r)]++;
  }
  return counts;
}
