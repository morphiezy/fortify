import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { config } from "./config";

initializeApp(config);

export const auth = getAuth();
export const db = getFirestore();
