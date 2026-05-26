import Link from "next/link";
import { PublishArt } from "@/app/components/icons";

export default function PublishPage() {
  return (
    <div className="publish-page" style={{ position: "relative", zIndex: 1 }}>
      {/* hero — coming soon */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 48,
          alignItems: "center",
          marginBottom: 56,
        }}
      >
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
              marginBottom: 22,
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
            Coming soon
          </div>
          <h1
            className="display"
            style={{
              fontSize: 56,
              margin: "0 0 16px",
              fontWeight: 400,
            }}
          >
            Publishing is
            <br />
            on the way.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 540,
              lineHeight: 1.55,
              margin: "0 0 24px",
            }}
          >
            We're finishing the publish flow — schema validation and <code>skillName</code>{" "}
            verification. Until then, you can browse the registry and install any skill with the
            CLI.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/skills" className="btn btn-primary">
              Browse skills →
            </Link>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ filter: "saturate(0.85)", opacity: 0.85 }}>
            <PublishArt size={300} />
          </div>
        </div>
      </div>

      {/* roadmap */}
      <div className="eyebrow" style={{ marginBottom: 14 }}>
        § ROADMAP
      </div>
      <h2
        className="display"
        style={{
          fontSize: 32,
          margin: "0 0 28px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        What's shipping for publishers
      </h2>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {[
          {
            n: 1,
            title: "Publish your npm package",
            blurb:
              "Add a skillName field to your package.json so it can be cross-referenced from the registry.",
          },
          {
            n: 2,
            title: "Submit a skill.json",
            blurb:
              "Send us a skill.json describing your skill — name, version, and how to reach it (remote URL or package identifier).",
          },
          {
            n: 3,
            title: "Automated validation",
            blurb:
              "Schema is checked, skillName is cross-referenced with your published package, and endpoints are pinged for reachability.",
          },
          {
            n: 4,
            title: "You're live in the registry",
            blurb:
              "If validation passes, your skill appears in the registry within minutes and is installable across all five clients.",
          },
        ].map((s) => (
          <li
            key={s.n}
            className="card"
            style={{
              padding: 22,
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: 18,
              opacity: 0.78,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                fontSize: 12,
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
              }}
            >
              {String(s.n).padStart(2, "0")}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-source-serif), Georgia, serif",
                  fontSize: 20,
                  fontWeight: 500,
                  marginBottom: 4,
                  letterSpacing: "-0.005em",
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {s.blurb}
              </p>
            </div>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              Coming soon
            </span>
          </li>
        ))}
      </ol>

      {/* in the meantime */}
      <div
        style={{
          marginTop: 56,
          padding: 28,
          border: "1px solid var(--border-subtle)",
          borderRadius: 10,
          background: "var(--bg-elevated)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          IN THE MEANTIME
        </div>
        <div
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: 22,
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          Install the CLI
        </div>
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            maxWidth: 540,
          }}
        >
          The install side already works across all 5 clients — Claude Desktop, Claude Code,
          Cursor, VS Code, and IndusAGI.
        </p>
        <pre className="code-block" style={{ margin: 0, fontSize: 12.5, maxWidth: 420 }}>
          <span style={{ color: "var(--text-muted)" }}>$ </span>
          <span style={{ color: "var(--code-blue)" }}>npm</span> install -g{" "}
          <span style={{ color: "var(--text-primary)" }}>@indusagi/skills</span>
        </pre>
      </div>
    </div>
  );
}
