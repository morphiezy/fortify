import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { config } from "./config";

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(config);
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  throw new Error("Firebase initialization failed");
}

export const auth = getAuth(app);
export const db = getFirestore(app);
