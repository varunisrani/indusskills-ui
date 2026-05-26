import { NextResponse } from "next/server";
import { loadAll, search } from "@/lib/skills";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("search");
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") ?? "30", 10) || 30,
    100,
  );

  const results = q ? search(q, limit) : loadAll().slice(0, limit);

  return NextResponse.json({
    skills: results,
    metadata: {
      count: results.length,
      generatedBy: "indusskills.dev",
    },
  });
}
