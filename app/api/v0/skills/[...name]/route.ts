import { NextResponse } from "next/server";
import { findByName } from "@/lib/skills";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string[] }> },
) {
  const { name: parts } = await params;
  const name = parts.join("/");
  const record = findByName(name);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(record);
}
