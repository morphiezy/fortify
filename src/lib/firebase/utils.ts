import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./app";
import { NewUser } from "../types/user";
import { FormSchema } from "../validations/form-validation";
import { Credential } from "../types/credential";

/**
 * Logs user actions to the history collection
 */
const logger = async (description: string, userId: string): Promise<void> => {
  try {
    await addDoc(collection(db, "history"), {
      description,
      user: userId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};

/**
 * Saves a new credential and logs the action
 */
export const saveCredential = async (credential: Credential): Promise<void> => {
  try {
    await Promise.all([
      addDoc(collection(db, "credentials"), {
        ...credential,
        createdAt: serverTimestamp(),
      }),
      logger(`${credential.name} password added`, credential.user),
    ]);
  } catch (error) {
    console.error("Failed to save credential:", error);
    throw error;
  }
};

/**
 * Updates an existing credential and logs the action
 */
export const updateCredential = async (
  credential: FormSchema,
  id: string,
  userId: string,
  message: string,
): Promise<void> => {
  try {
    await Promise.all([
      updateDoc(doc(db, "credentials", id), { ...credential }),
      logger(message, userId),
    ]);
  } catch (error) {
    console.error("Failed to update credential:", error);
    throw error;
  }
};

/**
 * Deletes a credential and logs the action
 */
export const deleteCredential = async (
  id: string,
  userId: string,
  credentialName: string,
): Promise<void> => {
  try {
    await Promise.all([
      deleteDoc(doc(db, "credentials", id)),
      logger(`${credentialName} password was deleted`, userId),
    ]);
  } catch (error) {
    console.error("Failed to delete credential:", error);
    throw error;
  }
};

/**
 * Creates a new user document
 */
export const createUser = async (userInfo: NewUser): Promise<void> => {
  try {
    await setDoc(doc(db, "users", userInfo.id), userInfo);
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

/**
 * Updates the PIN for an existing user
 */
export const updateUserPin = async ({
  id,
  pin,
}: Omit<NewUser, "email">): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", id), { pin });
  } catch (error) {
    console.error("Failed to update user PIN:", error);
    throw error;
  }
};
