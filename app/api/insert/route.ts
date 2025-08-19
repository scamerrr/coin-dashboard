// app/api/insert/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/firebaseClient"; // import Firebase client
import { ref, get, set } from "firebase/database";

export async function GET() {
  try {
    const coinRef = ref(db, "coinCount");
    const snapshot = await get(coinRef);
    const total = snapshot.exists() ? snapshot.val() : 0;
    return NextResponse.json({ total });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch total" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const value = Number(body?.value ?? 0);

    if (!Number.isFinite(value)) {
      return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }

    // read current total from Firebase
    const coinRef = ref(db, "coinCount");
    const snapshot = await get(coinRef);
    const current = snapshot.exists() ? snapshot.val() : 0;

    // update Firebase total
    const newTotal = current + value;
    await set(coinRef, newTotal);

    return NextResponse.json({ message: "Coin inserted", total: newTotal });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}