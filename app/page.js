"use client";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

export default function Home() {
  const [total, setTotal] = useState(0); // Removed TypeScript annotation
  const [connectionType, setConnectionType] = useState("checking..."); // Removed TypeScript annotation

  useEffect(() => {
    const coinRef = ref(db, "coinCount");
    const connRef = ref(db, ".info/connected");

    // Connection type check
    const connUnsubscribe = onValue(connRef, (snapshot) => {
      setConnectionType(snapshot.val() ? "WebSocket" : "LongPolling");
    });

    // Value listener
    const valueUnsubscribe = onValue(coinRef, (snapshot) => {
      const value = snapshot.val();
      setTotal(value || 0);
    });

    return () => {
      connUnsubscribe();
      valueUnsubscribe();
    };
  }, []);

  return (
    <main style={{ padding: 24, textAlign: "center" }}>
      <h1>Coin Dashboard</h1>
      <div style={{ fontSize: 48, fontWeight: 700 }}>
        ₱{total.toFixed(2)}
      </div>
      <div style={{
        color: connectionType === "WebSocket" ? "green" : "orange",
        marginTop: 10,
        fontFamily: "monospace"
      }}>
        {connectionType}
      </div>
    </main>
  );
}