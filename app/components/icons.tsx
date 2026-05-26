// Brand marks and decorative SVGs — ported from indusskills12 brand.jsx

export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#FF6B1A" />
      <path
        d="M7 17 L 7 9 L 12 13 L 17 9 L 17 17"
        stroke="var(--bg-base)"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}

export function HeroArt({ size = 460 }: { size?: number }) {
  return (
    <svg
      width="100%"
      height="auto"
      style={{ maxWidth: size }}
      viewBox="0 0 460 460"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ha-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8C42" stopOpacity="1" />
          <stop offset="1" stopColor="#D14E0F" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="ha-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF6B1A" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FF6B1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="230" cy="230" r="220" fill="url(#ha-glow)" />
      <g opacity="0.18">
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 18 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={60 + c * 20}
              cy={360 + r * 8}
              r="0.8"
              fill="var(--text-primary)"
            />
          )),
        )}
      </g>
      <g>
        <rect x="100" y="290" width="260" height="60" fill="var(--bg-hover)" stroke="var(--border-subtle)" strokeWidth="1" />
        <rect x="100" y="290" width="260" height="3" fill="#FF6B1A" opacity="0.6" />
        <rect x="135" y="220" width="190" height="70" fill="var(--bg-elevated)" stroke="var(--border-subtle)" strokeWidth="1" />
        <rect x="135" y="220" width="190" height="3" fill="#FF6B1A" opacity="0.7" />
        <rect x="170" y="140" width="120" height="80" fill="var(--bg-elevated)" stroke="var(--border-subtle)" strokeWidth="1" />
        <rect x="170" y="140" width="120" height="3" fill="#FF6B1A" opacity="0.85" />
        <rect x="210" y="80" width="40" height="60" fill="url(#ha-warm)" />
        <rect x="210" y="80" width="40" height="60" stroke="#FF8C42" strokeWidth="0.5" fill="none" />
        <rect x="216" y="240" width="28" height="50" fill="var(--bg-base)" />
        <path d="M216 250 Q 230 240 244 250 L 244 290 L 216 290 Z" fill="var(--bg-base)" />
        <rect x="226" y="180" width="8" height="40" fill="var(--bg-base)" />
        <rect x="222" y="178" width="16" height="6" fill="var(--bg-base)" />
        <circle cx="230" cy="180" r="3" fill="url(#ha-warm)" />
        <path
          d="M218 102 L 218 122 L 224 117 L 230 122 L 236 117 L 242 122 L 242 102"
          stroke="var(--bg-base)"
          strokeWidth="1.4"
          fill="none"
          strokeLinejoin="miter"
        />
        <text x="105" y="328" fontSize="8.5" fontFamily="ui-monospace" fill="var(--text-muted)" letterSpacing="0.15em">REGISTRY</text>
        <text x="140" y="258" fontSize="8.5" fontFamily="ui-monospace" fill="var(--text-muted)" letterSpacing="0.15em">CONNECT</text>
        <text x="174" y="178" fontSize="8.5" fontFamily="ui-monospace" fill="var(--text-muted)" letterSpacing="0.15em">AGENT</text>
      </g>
      <rect x="60" y="350" width="340" height="1" fill="var(--border-subtle)" />
      <rect x="80" y="356" width="300" height="1" fill="var(--bg-hover)" />
      <rect x="380" y="180" width="2" height="170" fill="var(--border-subtle)" />
      <rect x="380" y="180" width="2" height="20" fill="#FF6B1A" opacity="0.7" />
      <rect x="78" y="240" width="2" height="110" fill="var(--border-subtle)" />
      <g opacity="0.55">
        <circle cx="335" cy="155" r="14" stroke="#FF6B1A" strokeWidth="0.8" fill="none" />
        <circle cx="335" cy="155" r="2" fill="#FF6B1A" />
        <path
          d="M335 141 L 335 135 M 335 175 L 335 169 M 321 155 L 315 155 M 355 155 L 349 155"
          stroke="#FF6B1A"
          strokeWidth="0.8"
        />
        <text x="352" y="158" fontSize="8" fontFamily="ui-monospace" fill="var(--text-secondary)" letterSpacing="0.1em">22.5°N</text>
      </g>
      <g opacity="0.7">
        <text x="100" y="395" fontSize="9" fontFamily="ui-monospace" fill="var(--text-muted)" letterSpacing="0.18em">FIG. 01 — REGISTRY ARCHITECTURE</text>
        <line x1="100" y1="402" x2="360" y2="402" stroke="var(--border-subtle)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export function PublishArt({ size = 320 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pa-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8C42" />
          <stop offset="1" stopColor="#D14E0F" />
        </linearGradient>
      </defs>
      <rect x="60" y="80" width="180" height="200" rx="3" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
      <rect x="80" y="60" width="180" height="200" rx="3" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
      <rect x="100" y="40" width="180" height="200" rx="3" fill="var(--bg-hover)" stroke="var(--border-subtle)" />
      <rect x="100" y="40" width="180" height="6" fill="url(#pa-warm)" />
      <rect x="116" y="62" width="40" height="6" rx="1" fill="var(--text-primary)" opacity="0.85" />
      <rect x="116" y="76" width="100" height="3" rx="1" fill="var(--text-secondary)" opacity="0.5" />
      <rect x="116" y="84" width="80" height="3" rx="1" fill="var(--text-secondary)" opacity="0.4" />
      <rect x="116" y="105" width="148" height="60" fill="var(--bg-base)" stroke="var(--border-subtle)" />
      {[20, 30, 22, 38, 28, 44, 36, 52, 42, 56].map((h, i) => (
        <rect key={i} x={120 + i * 14} y={165 - h} width="9" height={h} fill="#FF6B1A" opacity={0.4 + i * 0.06} />
      ))}
      <rect x="116" y="180" width="44" height="14" rx="3" fill="rgba(255,107,26,0.12)" stroke="rgba(255,107,26,0.3)" />
      <rect x="166" y="180" width="36" height="14" rx="3" fill="var(--bg-base)" stroke="var(--border-subtle)" />
      <rect x="208" y="180" width="40" height="14" rx="3" fill="var(--bg-base)" stroke="var(--border-subtle)" />
      <rect x="116" y="210" width="120" height="2" fill="var(--border-subtle)" />
      <rect x="116" y="218" width="80" height="2" fill="var(--border-subtle)" />
      <line x1="100" y1="120" x2="60" y2="120" stroke="#FF6B1A" strokeWidth="0.8" opacity="0.6" />
      <circle cx="58" cy="120" r="3" fill="#FF6B1A" />
      <line x1="280" y1="160" x2="306" y2="160" stroke="#FF6B1A" strokeWidth="0.8" opacity="0.6" />
      <circle cx="308" cy="160" r="3" fill="#FF6B1A" />
      <text x="32" y="124" fontSize="8" fontFamily="ui-monospace" fill="var(--text-secondary)">v1.2</text>
      <text x="290" y="155" fontSize="8" fontFamily="ui-monospace" fill="var(--text-secondary)" textAnchor="end">10.2k</text>
    </svg>
  );
}

// Service icon — generic monogram fallback. Picks a deterministic style per name
// without inventing service identities we don't have.
export function SkillAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const letter = (name.split(/[/.\-_@]/).filter(Boolean).pop() ?? name).charAt(0).toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="7" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--text-primary)"
        fontFamily="var(--font-source-serif), Georgia, serif"
      >
        {letter}
      </text>
      <rect x="11" y="27" width="14" height="1.4" fill="#FF6B1A" />
    </svg>
  );
}

export function SparkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className="uses-icon">
      <path
        d="M1 8 L 3.5 5 L 5.5 7 L 8 3 L 11 6"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 11 V 3.5 A 1.5 1.5 0 0 1 4.5 2 H 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

export function SearchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11 L 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
