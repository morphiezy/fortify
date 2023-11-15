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

const logger = async (description: string, userId: string) => {
  addDoc(collection(db, "history"), {
    description,
    user: userId,
    createdAt: serverTimestamp(),
  });
};

export const saveCredential = async (credential: Credential): Promise<void> => {
  Promise.all([
    addDoc(collection(db, "credentials"), {
      ...credential,
      createdAt: serverTimestamp(),
    }),
    logger(`${credential.name} password added`, credential.user),
  ]);
};

export const updateCredential = async (
  credential: FormSchema,
  id: string,
  userId: string,
  message: string,
): Promise<void> => {
  Promise.all([
    updateDoc(doc(db, "credentials", id), { ...credential }),
    logger(message, userId),
  ]);
};

export const deleteCredential = async (
  id: string,
  userId: string,
  credentialName: string,
): Promise<void> => {
  Promise.all([
    deleteDoc(doc(db, "credentials", id)),
    logger(`${credentialName} password was deleted`, userId),
  ]);
};

export const createUser = async (userInfo: NewUser): Promise<void> => {
  setDoc(doc(db, "users", userInfo.id), userInfo);
};

export const updateUserPin = async ({
  id,
  pin,
}: Omit<NewUser, "email">): Promise<void> => {
  updateDoc(doc(db, "users", id), { pin });
};
