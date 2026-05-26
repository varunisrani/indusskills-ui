import { BrandMark } from "./icons";

export function Footer() {
  const columns: Array<{ h: string; l: Array<{ label: string; href: string; external?: boolean }> }> = [
    {
      h: "Registry",
      l: [
        { label: "Browse skills", href: "/skills" },
        { label: "Publish", href: "/publish" },
      ],
    },
    {
      h: "CLI",
      l: [
        { label: "npm", href: "https://www.npmjs.com/package/indusskills", external: true },
      ],
    },
    {
      h: "About",
      l: [
        { label: "indusskills.dev", href: "https://www.indusskills.dev", external: true },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <BrandMark size={22} />
            <span style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: 17, fontWeight: 600 }}>
              IndusSkills
            </span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 13.5, maxWidth: 320, margin: 0 }}>
            Local-first registry. Search, install, and ship Agent Skills across five clients with a single CLI.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.h}>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 14,
              }}
            >
              {c.h}
            </div>
            {c.l.map((x) => (
              <a
                key={x.label}
                href={x.href}
                target={x.external ? "_blank" : undefined}
                rel={x.external ? "noreferrer" : undefined}
                style={{ display: "block", color: "var(--text-secondary)", fontSize: 13.5, padding: "5px 0" }}
              >
                {x.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 IndusAGI Labs</span>
        <span>Local-first · Built for the India Stack era</span>
      </div>
    </footer>
  );
}
