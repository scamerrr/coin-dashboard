"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [total, setTotal] = useState(0);

  async function load() {
    try {
      const res = await fetch("/api/insert", { cache: "no-store" });
      const data = res.ok ? await res.json() : {};
      setTotal(Number(data?.total ?? 0));
    } catch {
      setTotal(0);
    }
  }

  useEffect(() => {
    load(); // initial load
    const id = setInterval(load, 2000); // poll every 2s
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Coin Dashboard</h1>
      <div style={{ fontSize: 48, fontWeight: 700 }}>
        ₱{Number(total ?? 0).toFixed(2)}
      </div>
    </main>
  );
}