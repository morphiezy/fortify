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
  Query,
} from "firebase/firestore";

/**
 * Retrieves a single user document by ID
 */
export function getCurrentUser(id: string): Promise<DocumentSnapshot> {
  return getDoc(doc(db, "users", id));
}

/**
 * Builds a query for credentials filtered by user ID and sorted by creation date
 */
export function queryCredentialsByUserId(userId: string): Query {
  return query(
    collection(db, "credentials"),
    where("user", "==", userId),
    orderBy("createdAt", "desc"),
  );
}

/**
 * Retrieves all credentials for a specific user
 */
export function getCredentials(userId: string): Promise<QuerySnapshot> {
  const q = queryCredentialsByUserId(userId);
  return getDocs(q);
}

/**
 * Retrieves a single credential document by ID
 */
export function getCredentialById(id: string): Promise<DocumentSnapshot> {
  return getDoc(doc(db, "credentials", id));
}

/**
 * Builds a query for user history sorted by creation date
 */
export function queryHistory(userId: string): Query {
  return query(
    collection(db, "history"),
    where("user", "==", userId),
    orderBy("createdAt", "desc"),
  );
}
