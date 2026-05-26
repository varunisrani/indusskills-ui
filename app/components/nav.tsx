"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./icons";

function isActive(pathname: string, prefix: string): boolean {
  if (prefix === "/") return pathname === "/";
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("indus-theme")) as
      | "dark"
      | "light"
      | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("indus-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand" onClick={close}>
        <BrandMark size={24} />
        <span>IndusSkills</span>
      </Link>
      <span className="nav-stars nav-hide-sm">
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1 L 10 6 L 15 6 L 11 9.5 L 12.5 14.5 L 8 11.5 L 3.5 14.5 L 5 9.5 L 1 6 L 6 6 Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
        v0.1.6
      </span>

      <span className="nav-spacer" />

      <div className="nav-links nav-hide-md">
        <Link href="/skills" className={isActive(pathname, "/skills") ? "active" : ""}>
          Skills
        </Link>
        <Link href="/publish" className={isActive(pathname, "/publish") ? "active" : ""}>
          Publish
        </Link>
        <a href="https://www.npmjs.com/package/indusskills" target="_blank" rel="noreferrer">
          npm
        </a>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        aria-label="Toggle theme"
        style={{
          width: 32,
          height: 32,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border-subtle)",
          borderRadius: 8,
          color: "var(--text-secondary)",
          transition: "border-color 0.15s, color 0.15s",
          flexShrink: 0,
        }}
      >
        {theme === "dark" ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M8 1 V 3" />
              <path d="M8 13 V 15" />
              <path d="M1 8 H 3" />
              <path d="M13 8 H 15" />
              <path d="M2.5 2.5 L 4 4" />
              <path d="M12 12 L 13.5 13.5" />
              <path d="M2.5 13.5 L 4 12" />
              <path d="M12 4 L 13.5 2.5" />
            </g>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 9.5 A 6 6 0 1 1 6.5 3 A 5 5 0 0 0 13 9.5 Z" fill="currentColor" />
          </svg>
        )}
      </button>

      <Link href="/publish" className="nav-publish nav-hide-md">
        Publish
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M3 5 L 6 8 L 9 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </Link>

      <button
        type="button"
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        style={{
          width: 36,
          height: 36,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border-subtle)",
          borderRadius: 8,
          color: "var(--text-primary)",
          flexShrink: 0,
        }}
      >
        {open ? (
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M3 3 L 13 13 M 13 3 L 3 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M2 4 H 14 M 2 8 H 14 M 2 12 H 14" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
      </button>

      {open && (
        <div className="nav-mobile-menu">
          <Link
            href="/skills"
            onClick={close}
            className={isActive(pathname, "/skills") ? "active" : ""}
          >
            Skills
          </Link>
          <Link
            href="/publish"
            onClick={close}
            className={isActive(pathname, "/publish") ? "active" : ""}
          >
            Publish
          </Link>
          <a href="https://www.npmjs.com/package/indusskills" onClick={close}>
            npm
          </a>
        </div>
      )}
    </nav>
  );
}
