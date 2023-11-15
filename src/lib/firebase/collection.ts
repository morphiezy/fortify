import { db } from "./app";
import {
  DocumentSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  QuerySnapshot,
} from "firebase/firestore";

export function getCurrentUser(id: string): Promise<DocumentSnapshot> {
  return getDoc(doc(db, "users", id));
}

export function queryCredentialsByUserId(userId: string) {
  return query(
    collection(db, "credentials"),
    where("user", "==", userId),
    orderBy("createdAt", "desc"),
  );
}

export function getCredentials(userId: string): Promise<QuerySnapshot> {
  const q = queryCredentialsByUserId(userId);
  return getDocs(q);
}

export function getCredentialById(id: string) {
  return getDoc(doc(db, "credentials", id));
}

export function queryHistory(userId: string) {
  return query(
    collection(db, "history"),
    where("user", "==", userId),
    orderBy("createdAt", "desc"),
  );
}
