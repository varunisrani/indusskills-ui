import Link from "next/link";
import {
  filterAndSort,
  getNamespaceCounts,
  getSkillType,
  getTypeCounts,
  loadAll,
  type Namespace,
  type SkillType,
  type SortOrder,
} from "@/lib/skills";
import { SkillAvatar, SearchIcon, SparkIcon } from "@/app/components/icons";
import { BrandMark } from "@/app/components/icons";

const TYPES: Array<SkillType | "all"> = [
  "all",
  "npm",
  "pypi",
  "docker",
  "remote",
  "nuget",
  "other",
];

const NAMESPACES: Array<Namespace | "all"> = ["all", "io.github", "com", "ai", "other"];

const TYPE_LABEL: Record<SkillType | "all", string> = {
  all: "All",
  npm: "npm",
  pypi: "PyPI",
  docker: "Docker",
  nuget: "NuGet",
  remote: "Remote",
  other: "Other",
};

const TYPE_ICON: Record<SkillType | "all", string> = {
  all: "▦",
  npm: "📦",
  pypi: "🐍",
  docker: "🐳",
  nuget: "◆",
  remote: "●",
  other: "⋯",
};

const NS_LABEL: Record<Namespace | "all", string> = {
  all: "All namespaces",
  "io.github": "io.github.*",
  com: "com.*",
  ai: "ai.*",
  other: "Other",
};

function makeHref(
  current: { q: string; type: string; ns: string; sort: string },
  changes: Partial<{ q: string; type: string; ns: string; sort: string }>,
): string {
  const merged = { ...current, ...changes };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.type && merged.type !== "all") params.set("type", merged.type);
  if (merged.ns && merged.ns !== "all") params.set("ns", merged.ns);
  if (merged.sort && merged.sort !== "name-asc") params.set("sort", merged.sort);
  const s = params.toString();
  return s ? `/skills?${s}` : "/skills";
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 10,
        marginTop: 22,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function FilterRow({
  href,
  icon,
  label,
  count,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 13.5,
        color: active ? "var(--accent-primary)" : "var(--text-secondary)",
        background: active ? "rgba(255,107,26,0.1)" : "transparent",
        transition: "background 0.12s, color 0.12s",
        textAlign: "left",
      }}
    >
      <span style={{ width: 16, display: "inline-flex", justifyContent: "center", fontSize: 14 }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {typeof count === "number" && (
        <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
          {count.toLocaleString()}
        </span>
      )}
    </Link>
  );
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
    ns?: string;
    sort?: string;
  }>;
}) {
  const sp = await searchParams;
  const q = sp.q ?? "";
  const type = (TYPES.includes((sp.type ?? "all") as SkillType | "all")
    ? sp.type ?? "all"
    : "all") as SkillType | "all";
  const ns = (NAMESPACES.includes((sp.ns ?? "all") as Namespace | "all")
    ? sp.ns ?? "all"
    : "all") as Namespace | "all";
  const sort: SortOrder = sp.sort === "name-desc" ? "name-desc" : "name-asc";

  const all = loadAll();
  const results = filterAndSort({ q, type, namespace: ns, sort });
  const typeCounts = getTypeCounts();
  const nsCounts = getNamespaceCounts();
  const current = { q, type, ns, sort };
  const anyFilter = q !== "" || type !== "all" || ns !== "all" || sort !== "name-asc";

  return (
    <div className="container browse-grid">
      {/* sidebar */}
      <aside className="browse-sidebar">
        <form action="" method="get" style={{ position: "relative", marginBottom: 14 }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          >
            <SearchIcon size={12} />
          </span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Search skills…"
            style={{
              width: "100%",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
              padding: "9px 12px 9px 32px",
              color: "var(--text-primary)",
              fontSize: 13,
              outline: "none",
            }}
          />
          {type !== "all" && <input type="hidden" name="type" value={type} />}
          {ns !== "all" && <input type="hidden" name="ns" value={ns} />}
          {sort !== "name-asc" && <input type="hidden" name="sort" value={sort} />}
        </form>

        <SectionHead>Sort</SectionHead>
        <FilterRow
          href={makeHref(current, { sort: "name-asc" })}
          icon="↓"
          label="A → Z"
          active={sort === "name-asc"}
        />
        <FilterRow
          href={makeHref(current, { sort: "name-desc" })}
          icon="↑"
          label="Z → A"
          active={sort === "name-desc"}
        />

        <SectionHead>Type</SectionHead>
        {TYPES.map((t) => {
          const active = t === type;
          const count = t === "all" ? all.length : typeCounts[t as SkillType];
          if (count === 0 && t !== "all") return null;
          return (
            <FilterRow
              key={t}
              href={makeHref(current, { type: t })}
              icon={TYPE_ICON[t]}
              label={TYPE_LABEL[t]}
              count={count}
              active={active}
            />
          );
        })}

        <SectionHead>Namespace</SectionHead>
        {NAMESPACES.map((n) => {
          const active = n === ns;
          const count = n === "all" ? all.length : nsCounts[n as Namespace];
          if (count === 0 && n !== "all") return null;
          return (
            <FilterRow
              key={n}
              href={makeHref(current, { ns: n })}
              icon="·"
              label={NS_LABEL[n]}
              count={count}
              active={active}
            />
          );
        })}

        {anyFilter && (
          <div style={{ marginTop: 18 }}>
            <Link
              href="/skills"
              style={{
                fontSize: 12.5,
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              }}
            >
              ← Clear filters
            </Link>
          </div>
        )}
      </aside>

      {/* list */}
      <main>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            {results.length.toLocaleString()} skills
          </span>{" "}
          <span style={{ color: "var(--text-muted)" }}>of {all.length.toLocaleString()}</span>
          {q && (
            <span style={{ color: "var(--text-muted)" }}>
              {" "}matching <span style={{ color: "var(--text-secondary)" }}>"{q}"</span>
            </span>
          )}
          {type !== "all" && (
            <span style={{ color: "var(--text-muted)" }}>
              {" "}· type=<span style={{ color: "var(--text-secondary)" }}>{TYPE_LABEL[type]}</span>
            </span>
          )}
          {ns !== "all" && (
            <span style={{ color: "var(--text-muted)" }}>
              {" "}· namespace=<span style={{ color: "var(--text-secondary)" }}>{NS_LABEL[ns]}</span>
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div
            style={{
              padding: 40,
              border: "1px dashed var(--border-strong)",
              borderRadius: 10,
              textAlign: "center",
              color: "var(--text-secondary)",
              fontStyle: "italic",
            }}
          >
            No skills match this combination of filters.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {results.map((record) => {
              const { skill } = record;
              const t = getSkillType(record);
              const isRemote = t === "remote";
              const title = (skill.title as string) ?? skill.name;
              return (
                <Link
                  key={skill.name}
                  href={`/skills/${skill.name}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 10,
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                >
                  <SkillAvatar name={skill.name} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {title}
                      </span>
                      <span className="verified-check">✓</span>
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{skill.name}</span>
                      <span style={{ color: "var(--text-muted)" }}>·</span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        <SparkIcon /> v{skill.version as string}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {skill.description as string}
                    </p>
                  </div>
                  <span className={`pill ${isRemote ? "pill-remote" : "pill-india"}`}>
                    {isRemote ? "● Remote" : TYPE_LABEL[t]}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* featured aside */}
      <aside className="browse-featured">
        <div
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          Featured
        </div>
        {all.slice(0, 3).map((r) => (
          <Link
            key={r.skill.name}
            href={`/skills/${r.skill.name}`}
            className="card"
            style={{ padding: 14, marginBottom: 10, display: "block" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SkillAvatar name={r.skill.name} size={32} />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 140,
                    }}
                  >
                    {(r.skill.title as string) ?? r.skill.name}
                  </span>
                  <span className="verified-check">✓</span>
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 180,
                  }}
                >
                  {r.skill.name}
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div
          style={{
            marginTop: 32,
            padding: 16,
            background: "rgba(255,107,26,0.06)",
            border: "1px solid rgba(255,107,26,0.2)",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <BrandMark size={18} /> Local-first
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Your credentials never leave your machine. `npx @indusagi/skills install` writes config directly to your client's local config file.
          </p>
        </div>
      </aside>
    </div>
  );
}
