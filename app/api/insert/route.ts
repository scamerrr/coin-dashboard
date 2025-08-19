// app/api/insert/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/firebase";
import { ref, get, set, onValue } from "firebase/database";

export const dynamic = 'force-dynamic'; // Disable caching

export async function GET() {
  try {
    // Force WebSocket connection
    const testRef = ref(db, ".info/connected");
    const connection = await get(testRef);
    
    const coinRef = ref(db, "coinCount");
    const snapshot = await get(coinRef);
    const total = snapshot.exists() ? snapshot.val() : 0;

    return NextResponse.json({ 
      total,
      connectionType: connection.val() ? "WebSocket" : "Fallback",
      status: "live"
    });
  } catch (err) {
    return NextResponse.json({ 
      error: "Connection failed",
      details: err.message 
    }, { status: 500 });
  }
}