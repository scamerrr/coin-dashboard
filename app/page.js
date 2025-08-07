"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [last, setLast] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/insert");
      const data = await res.json();
      setTotal(data.total);
      setLast(data.lastInserted);
    };

    fetchData(); // first load
    const interval = setInterval(fetchData, 2000); // update every 2 secs
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>💰 Coin Dashboard</h1>
      <h2>Total: ₱{total.toFixed(2)}</h2>
      <p>Last Inserted Coin: ₱{last.toFixed(2)}</p>
    </main>
  );
}