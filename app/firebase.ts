// app/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase, enableLogging, forceWebSockets } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0njoBEiSEEoZxDeA0Bzjew-o-fexGzls",
  authDomain: "coin-dashboard-37cb1.firebaseapp.com",
  databaseURL: "https://coin-dashboard-37cb1-default-rtdb.firebaseio.com",
  projectId: "coin-dashboard-37cb1",
  storageBucket: "coin-dashboard-37cb1.appspot.com",
  messagingSenderId: "640919644206",
  appId: "1:640919644206:web:71cc9bd54ec53ec0a617bf"
};

// Initialize with explicit WebSocket enforcement
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

if (typeof window !== 'undefined') {
  enableLogging(true);
  forceWebSockets(); // Critical change
  console.log("Firebase configured to use WebSockets only");
}

export { db };