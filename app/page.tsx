import Link from "next/link";
import { loadAll, getSkillType, type SkillRecord } from "@/lib/skills";
import { HeroArt, PublishArt, SkillAvatar, SearchIcon } from "./components/icons";
import { CodeBlock } from "./components/code-block";

function SkillCard({ record }: { record: SkillRecord }) {
  const { skill } = record;
  const title = (skill.title as string) ?? skill.name;
  const description = skill.description as string;
  const type = getSkillType(record);
  const isRemote = type === "remote";

  return (
    <Link
      href={`/skills/${skill.name}`}
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: 196,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <SkillAvatar name={skill.name} size={40} />
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
              fontSize: 12,
              color: "var(--text-muted)",
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              marginTop: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {skill.name}
          </div>
        </div>
      </div>
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary)",
          fontSize: 13,
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {description}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <span className={`pill ${isRemote ? "pill-remote" : "pill-india"}`}>
          {isRemote ? "● Remote" : `▦ ${type}`}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          }}
        >
          v{skill.version as string}
        </span>
      </div>
    </Link>
  );
}

function HomeHero({ total }: { total: number }) {
  return (
    <section className="hero-section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container hero-grid">
        <div>
          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              color: "var(--text-muted)",
              letterSpacing: "0.18em",
              marginBottom: 22,
            }}
          >
            ── INDUSSKILLS / REGISTRY v0.1.0
          </div>
          <h1 className="display hero-title" style={{ margin: 0, marginBottom: 22, fontWeight: 400 }}>
            Skills,
            <br />
            indigenously
            <br />
            built.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              lineHeight: 1.55,
              maxWidth: 500,
              margin: "0 0 32px",
            }}
          >
            The local-first registry. Search indigenous Agent Skills for Bhashini, ONDC, UPI,
            DigiLocker — plus everything global. Install with one command. Your credentials never leave
            your machine.
          </p>
          <form action="/skills" method="get" style={{ position: "relative", maxWidth: 540 }}>
            <span
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            >
              <SearchIcon size={14} />
            </span>
            <input
              name="q"
              placeholder="Search skills — try 'filesystem', 'bhashini', 'gmail'…"
              style={{
                width: "100%",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "15px 22px 15px 46px",
                fontSize: 14,
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
            />
          </form>
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 18,
              fontSize: 12.5,
              color: "var(--text-muted)",
            }}
          >
            <span>{total.toLocaleString()} skills</span>
            <span>·</span>
            <span>5 client integrations</span>
            <span>·</span>
            <span>Updated daily</span>
          </div>
        </div>
        <div className="hero-art">
          <HeroArt size={460} />
        </div>
      </div>
    </section>
  );
}

function FeaturedSection({
  featured,
  total,
}: {
  featured: SkillRecord[];
  total: number;
}) {
  return (
    <section style={{ padding: "20px 40px 60px", position: "relative" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              fontWeight: 500,
              fontSize: 28,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Featured skills
          </h2>
          <Link
            href="/skills"
            style={{ color: "var(--text-secondary)", fontSize: 13.5 }}
          >
            Browse all {total.toLocaleString()} →
          </Link>
        </div>
        <div className="cards-4col">
          {featured.map((r) => (
            <SkillCard key={r.skill.name} record={r} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
          <Link href="/skills" className="btn btn-primary">
            Browse {total.toLocaleString()}+ skills →
          </Link>
          <Link href="/publish" className="btn btn-secondary">
            Publish a skill
          </Link>
        </div>
      </div>
    </section>
  );
}

function ConnectSection() {
  return (
    <section
      className="section"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-deep)",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            color: "var(--text-muted)",
            letterSpacing: "0.2em",
            marginBottom: 18,
          }}
        >
          § 02 — INTEGRATION
        </div>
        <h2 className="display section-title" style={{ margin: "0 0 18px", fontWeight: 400 }}>
          Install once. Use anywhere.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "var(--text-secondary)",
            maxWidth: 680,
            margin: "0 auto 8px",
          }}
        >
          One CLI, five hosts. Each install command writes to the right config file and tells you
          how to load it.
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 36px" }}>
          Your credentials never leave your machine.
        </p>

        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              paddingLeft: 4,
            }}
          >
            {">_ Terminal"}
          </div>
          <CodeBlock
            lines={[
              <>
                <span className="tok-cmd">npm</span> install -g <span className="tok-arg">indusskills</span>
              </>,
              <>
                <span className="tok-arg">indusskills search</span> <span className="tok-str">filesystem</span>
              </>,
            ]}
          />
          <CodeBlock
            lines={[
              <>
                <span className="tok-com"># pick a client: claude · claude-code · cursor · vscode · indusagi</span>
              </>,
              <>
                <span className="tok-arg">indusskills install</span> <span className="tok-str">{"<skill-name>"}</span>{" "}
                --client <span className="tok-arg">claude-code</span>
              </>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  const clients: Array<{
    name: string;
    flag: string;
    path: string;
    blurb: string;
    accent?: boolean;
    fullWidth?: boolean;
  }> = [
    {
      name: "Claude Desktop",
      flag: "--client claude",
      path: "~/Library/Application Support/Claude/claude_desktop_config.json",
      blurb: "Restart Claude Desktop (Cmd+Q + reopen) to load installed skills.",
    },
    {
      name: "Claude Code",
      flag: "--client claude-code",
      path: "Managed by `claude skills add -s user`",
      blurb: "No restart needed — picked up on next `claude` session.",
    },
    {
      name: "Cursor",
      flag: "--client cursor",
      path: "~/.cursor/skills.json",
      blurb: "Restart Cursor to load.",
    },
    {
      name: "VS Code",
      flag: "--client vscode",
      path: "~/.vscode/skills.json",
      blurb: "Reload the VS Code window to load.",
    },
    {
      name: "IndusAGI Coding Agent",
      flag: "--client indusagi",
      path: "~/.indusagi/agent/skills/ (+ ~/.indusvx/agent/skills/ mirror)",
      blurb:
        "Next `indusagi` / `indus` run picks it up. Run `/reload` in-session to force a reload.",
      accent: true,
      fullWidth: true,
    },
  ];

  return (
    <section style={{ padding: "60px 40px", position: "relative", zIndex: 1 }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          § 01 — SUPPORTED CLIENTS
        </div>
        <h2
          className="display section-title-md"
          style={{ margin: "0 0 12px", fontWeight: 400 }}
        >
          Five hosts. One CLI.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            maxWidth: 560,
            margin: "0 0 32px",
          }}
        >
          Each install command writes to the right config file and tells you how to load it.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {clients.map((c) => (
            <div
              key={c.name}
              className="card"
              style={{ gridColumn: c.fullWidth ? "1 / -1" : "auto" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-source-serif), Georgia, serif",
                    fontSize: 20,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {c.name}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                    fontSize: 10.5,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    border: c.accent
                      ? "1px solid var(--accent-primary)"
                      : "1px solid var(--border-subtle)",
                    color: c.accent ? "var(--accent-primary)" : "var(--text-secondary)",
                    borderRadius: 4,
                  }}
                >
                  {c.flag}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  wordBreak: "break-all",
                }}
              >
                {c.path}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                  marginTop: 10,
                  lineHeight: 1.55,
                }}
              >
                {c.blurb}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublishSection() {
  return (
    <section
      className="section"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-deep)",
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", opacity: 0.85 }}>
          <PublishArt size={340} />
        </div>
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(255, 107, 26, 0.08)",
              border: "1px solid rgba(255, 107, 26, 0.3)",
              color: "var(--accent-primary)",
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent-primary)",
                boxShadow: "0 0 0 4px rgba(255, 107, 26, 0.2)",
              }}
            />
            § 03 — Publishing · Coming soon
          </div>
          <h2 className="display section-title-md" style={{ margin: "0 0 16px", fontWeight: 400 }}>
            Publish on IndusSkills
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              margin: "0 0 32px",
              maxWidth: 540,
            }}
          >
            We're finishing the publish flow — schema validation and <code>skillName</code>{" "}
            verification. We'll announce it here the moment it's live.
          </p>
          <div className="cards-2col" style={{ marginBottom: 28 }}>
            <div className="card" style={{ padding: 18, opacity: 0.85 }}>
              <div style={{ fontSize: 13.5, marginBottom: 12 }}>
                <span style={{ fontWeight: 600 }}>Reach.</span>{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  Indexed across five clients with one install command.
                </span>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid var(--border-subtle)",
                  fontSize: 11,
                  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Coming soon
              </span>
            </div>
            <div className="card" style={{ padding: 18, opacity: 0.85 }}>
              <div style={{ fontSize: 13.5, marginBottom: 14 }}>
                <span style={{ fontWeight: 600 }}>Validation.</span>{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  Automated checks for schema, <code>skillName</code>, and reachable endpoints.
                </span>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid var(--border-subtle)",
                  fontSize: 11,
                  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Coming soon
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/publish" className="btn btn-primary">
              See the roadmap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const all = loadAll();
  const featured = all.slice(0, 8);

  return (
    <>
      <HomeHero total={all.length} />
      <FeaturedSection featured={featured} total={all.length} />
      <ClientsSection />
      <ConnectSection />
      <PublishSection />
    </>
  );
}
