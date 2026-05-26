"use client";

import { useState } from "react";

type Client = {
  id: string;
  name: string;
  flag: string;
  configPath: string;
  reload: string;
};

const CLIENTS: Client[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    flag: "claude-code",
    configPath: "Managed by `claude skills add -s user`",
    reload: "Picked up on next `claude` session — no restart needed.",
  },
  {
    id: "claude",
    name: "Claude Desktop",
    flag: "claude",
    configPath: "~/Library/Application Support/Claude/claude_desktop_config.json",
    reload: "Restart Claude Desktop (Cmd+Q + reopen).",
  },
  {
    id: "cursor",
    name: "Cursor",
    flag: "cursor",
    configPath: "~/.cursor/skills.json",
    reload: "Restart Cursor to load.",
  },
  {
    id: "vscode",
    name: "VS Code",
    flag: "vscode",
    configPath: "~/.vscode/skills.json",
    reload: "Reload the VS Code window.",
  },
  {
    id: "indusagi",
    name: "IndusAGI",
    flag: "indusagi",
    configPath: "~/.indusagi/agent/skills/",
    reload: "Next `indusagi` run loads it. Or `/reload` in-session.",
  },
];

export function ClientInstaller({
  skillName,
  defaultClient = "claude-code",
}: {
  skillName: string;
  defaultClient?: string;
}) {
  const [active, setActive] = useState(defaultClient);
  const [copied, setCopied] = useState(false);
  const client = CLIENTS.find((c) => c.id === active) ?? CLIENTS[0];
  const command = `indusskills install ${skillName} --client ${client.flag}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard unavailable; ignore
    }
  };

  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {/* client tabs */}
      <div
        role="tablist"
        aria-label="Install for client"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-deep)",
        }}
      >
        {CLIENTS.map((c) => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(c.id)}
              style={{
                flex: "1 1 auto",
                padding: "10px 12px",
                fontSize: 12.5,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                background: isActive ? "var(--bg-elevated)" : "transparent",
                borderBottom: isActive
                  ? "2px solid var(--accent-primary)"
                  : "2px solid transparent",
                transition: "color 0.15s, background 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* command */}
      <div style={{ position: "relative", padding: "14px 16px" }}>
        <pre
          style={{
            margin: 0,
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: 12.5,
            lineHeight: 1.6,
            color: "var(--text-primary)",
            overflowX: "auto",
            paddingRight: 40,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>$ </span>
          <span style={{ color: "var(--code-blue)" }}>indusskills</span>{" "}
          <span>install</span>{" "}
          <span style={{ color: "var(--code-green)" }}>{skillName}</span>{" "}
          --client <span style={{ color: "var(--accent-primary)" }}>{client.flag}</span>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          title={copied ? "Copied" : "Copy"}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 28,
            height: 28,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            color: copied ? "var(--accent-primary)" : "var(--text-muted)",
            background: copied ? "rgba(255,107,26,0.08)" : "transparent",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {copied ? (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5 L 7 12 L 13 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3 11 V 3.5 A 1.5 1.5 0 0 1 4.5 2 H 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
          )}
        </button>
      </div>

      {/* meta */}
      <div
        style={{
          padding: "10px 16px 12px",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: "var(--bg-deep)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            wordBreak: "break-all",
          }}
        >
          {client.configPath}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {client.reload}
        </div>
      </div>
    </div>
  );
}
