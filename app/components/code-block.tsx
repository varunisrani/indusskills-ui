import type { ReactNode } from "react";

export function CodeBlock({
  lines,
  children,
}: {
  lines?: ReactNode[];
  children?: ReactNode;
}) {
  return (
    <div className="code-block">
      {lines
        ? lines.map((l, i) => (
            <div key={i} style={{ minHeight: "1.4em" }}>
              {l}
            </div>
          ))
        : children}
    </div>
  );
}
