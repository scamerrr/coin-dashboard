import { NextResponse } from "next/server";

let total = 0; // in-memory store

export async function GET() {
  return NextResponse.json({ total });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const value = Number(body?.value ?? 0);
    if (!Number.isFinite(value)) return NextResponse.json({ error: "Invalid value" }, { status: 400 });

    total += value; // update total
    return NextResponse.json({ message: "Coin inserted", total });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
