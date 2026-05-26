import Link from "next/link";
import { notFound } from "next/navigation";
import { findByName, getSkillType } from "@/lib/skills";
import { SkillAvatar, SparkIcon } from "@/app/components/icons";
import { CodeBlock } from "@/app/components/code-block";
import { ClientInstaller } from "@/app/components/client-installer";

type Tab = "overview" | "integrate" | "spec";
const TABS: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "overview", label: "Overview", icon: "ⓘ" },
  { id: "integrate", label: "Integrate", icon: "</>" },
  { id: "spec", label: "skill.json", icon: "{}" },
];

export default async function SkillDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string[] }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { name: parts } = await params;
  const sp = await searchParams;
  const name = parts.join("/");
  const record = findByName(name);
  if (!record) notFound();

  const tab = (TABS.find((t) => t.id === sp.tab)?.id ?? "overview") as Tab;
  const { skill } = record;
  const title = (skill.title as string) ?? skill.name;
  const description = skill.description as string;
  const version = skill.version as string | undefined;
  const websiteUrl = skill.websiteUrl as string | undefined;
  const repository = skill.repository as { url?: string } | undefined;
  const pkg = (skill.packages as Array<Record<string, unknown>> | undefined)?.[0];
  const remotes = skill.remotes as Array<{ type?: string; url?: string }> | undefined;
  const type = getSkillType(record);
  const isRemote = type === "remote";

  return (
    <div className="container detail-page">
      {/* breadcrumb */}
      <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 24 }}>
        <Link href="/skills">Skills</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
      </div>

      {/* header */}
      <header
        className="detail-header"
        style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 18 }}
      >
        <SkillAvatar name={skill.name} size={64} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            className="detail-title"
            style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {title}
            <span className="verified-check" style={{ width: 18, height: 18, fontSize: 11 }}>
              ✓
            </span>
          </h1>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              fontSize: 13,
              color: "var(--text-secondary)",
              marginTop: 6,
              wordBreak: "break-all",
            }}
          >
            {skill.name}
            {version && (
              <>
                {" "}
                · <span style={{ color: "var(--accent-primary)" }}>v{version}</span>
              </>
            )}
          </div>
        </div>
        <span className={`pill ${isRemote ? "pill-remote" : "pill-india"}`}
          style={{ fontSize: 12, padding: "6px 12px" }}>
          {isRemote ? "● Remote" : `▦ ${type}`}
        </span>
      </header>

      {/* stat pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {version && <span className="pill-stat">v{version}</span>}
        <span className="pill-stat">▦ {type}</span>
        {typeof pkg?.registryType === "string" && (
          <span className="pill-stat">
            <SparkIcon /> {pkg.registryType}: {pkg.identifier as string}
          </span>
        )}
        {remotes?.[0]?.url && (
          <span className="pill-stat" style={{ color: "var(--success)" }}>
            🌐 {remotes[0].url}
          </span>
        )}
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noreferrer" className="pill-stat">
            ↗ Website
          </a>
        )}
        {repository?.url && (
          <a href={repository.url} target="_blank" rel="noreferrer" className="pill-stat">
            ↗ Repository
          </a>
        )}
      </div>

      {/* tabs */}
      <div
        className="detail-tabs"
        style={{
          display: "flex",
          gap: 4,
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: 32,
        }}
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          const href = t.id === "overview" ? `/skills/${name}` : `/skills/${name}?tab=${t.id}`;
          return (
            <Link
              key={t.id}
              href={href}
              style={{
                padding: "12px 18px",
                fontSize: 13.5,
                color: active ? "var(--accent-primary)" : "var(--text-secondary)",
                borderBottom: active
                  ? "2px solid var(--accent-primary)"
                  : "2px solid transparent",
                marginBottom: -1,
                transition: "color 0.15s",
              }}
            >
              <span style={{ marginRight: 6 }}>{t.icon}</span>
              {t.label}
            </Link>
          );
        })}
      </div>

      {tab === "overview" && (
        <div className="detail-body">
          <div>
            <SectionTitle icon="ⓘ" title="About" />
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                fontSize: 14.5,
                margin: "0 0 32px",
              }}
            >
              {description}
            </p>

            <SectionTitle icon="＋" title="Endpoints" />
            {remotes && remotes.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {remotes.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-jetbrains-mono), ui-monospace, monospace",
                        fontSize: 11,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {r.type ?? "remote"}
                    </span>
                    <code
                      style={{
                        flex: 1,
                        fontFamily:
                          "var(--font-jetbrains-mono), ui-monospace, monospace",
                        fontSize: 12.5,
                        color: "var(--text-primary)",
                        wordBreak: "break-all",
                      }}
                    >
                      {r.url}
                    </code>
                  </div>
                ))}
              </div>
            ) : pkg ? (
              <div
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 8,
                  padding: "12px 14px",
                  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                  fontSize: 13,
                }}
              >
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                  Package
                </div>
                <div>
                  {(pkg.registryType as string) ?? "package"}:{" "}
                  <span style={{ color: "var(--accent-primary)" }}>
                    {pkg.identifier as string}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>No endpoints declared.</div>
            )}
          </div>

          <aside>
            <SectionTitle icon="🔗" title="Install" />
            <div
              style={{
                fontSize: 12.5,
                color: "var(--text-muted)",
                marginBottom: 10,
              }}
            >
              All 5 clients — pick one
            </div>
            <ClientInstaller skillName={skill.name} />

            <div className="card" style={{ padding: 14, marginTop: 14 }}>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Don't have the CLI?
              </div>
              <CodeBlock
                lines={[
                  <>
                    <span className="tok-cmd">npm</span> install -g <span className="tok-arg">indusskills</span>
                  </>,
                ]}
              />
            </div>

            <div
              style={{
                marginTop: 24,
                paddingTop: 18,
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>
                Schema
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)", wordBreak: "break-all" }}>
                {(skill.$schema as string) ?? "—"}
              </div>
            </div>
          </aside>
        </div>
      )}

      {tab === "integrate" && (
        <>
          <SectionTitle icon="</>" title="Install in any client" />
          <div className="integrate-grid">
            <div>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                One CLI for five hosts. Pick your client on the right — the right config file is
                written for you, and we tell you how to reload.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                <a
                  href="https://www.npmjs.com/package/indusskills"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  📦 npm install -g indusskills
                </a>
              </div>
            </div>

            <div style={{ maxWidth: 520 }}>
              <ClientInstaller skillName={skill.name} />
            </div>
          </div>
        </>
      )}

      {tab === "spec" && (
        <div>
          <SectionTitle icon="{}" title="skill.json" />
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            The full skill descriptor as registered with IndusSkills.
          </p>
          <pre
            className="code-block"
            style={{
              whiteSpace: "pre",
              fontSize: 12,
              maxHeight: 600,
              overflow: "auto",
            }}
          >
            {JSON.stringify(skill, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div
      style={{
        fontSize: 17,
        fontWeight: 600,
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{icon}</span>
      {title}
    </div>
  );
}
