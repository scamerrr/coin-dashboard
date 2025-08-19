"use client";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

// Define styles outside the component
const styles = {
  container: {
    padding: "24px",
    textAlign: "center", // Remove if using .js file
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto"
  },
  title: {
    color: "#2c3e50",
    marginBottom: "20px"
  },
  total: {
    fontSize: "48px",
    fontWeight: 700,
    margin: "20px 0",
    transition: "color 0.3s ease"
  },
  status: {
    marginTop: "10px",
    color: "#7f8c8d",
    fontStyle: "italic"
  }
};

export default function Home() {
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("loading"); // "loading" | "connected" | "error"

  useEffect(() => {
    const coinRef = ref(db, "coinCount");
    
    const unsubscribe = onValue(coinRef, (snapshot) => {
      const value = snapshot.val();
      console.log("Coin update:", value);
      setTotal(value || 0);
      setStatus("connected");
    }, (error) => {
      console.error("Firebase error:", error);
      setStatus("error");
    });

    return () => unsubscribe();
  }, []);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Coin Dashboard</h1>
      
      <div style={{
        ...styles.total,
        color: status === "connected" ? "#2ecc71" : 
               status === "error" ? "#e74c3c" : "#3498db"
      }}>
        ₱{total.toFixed(2)}
      </div>
      
      <div style={styles.status}>
        {status === "loading" && "Connecting to Firebase..."}
        {status === "connected" && "Live updates active"}
        {status === "error" && "Connection error - try refreshing"}
      </div>
    </main>
  );
}