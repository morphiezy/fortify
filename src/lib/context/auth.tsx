import { useState, createContext, useEffect, useContext } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User as AuthUser,
} from "firebase/auth";
import { auth, db } from "../firebase/app";
import { createUser } from "../firebase/utils";
import { getCurrentUser } from "../firebase/collection";
import type { User } from "@/lib/types/user";
import { decrypt } from "../crypto";

type AuthContext = {
  user: User;
  loading: boolean;
  error: string;
  signInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: JSX.Element;
};

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const manageUser = async (authUser: AuthUser) => {
      const { uid, email, displayName, photoURL } = authUser;

      setUser({
        id: uid,
        displayName,
        photoURL,
        email,
      } as User);

      const userSnapshot = await getCurrentUser(uid);

      if (!userSnapshot.exists()) {
        try {
          await createUser({ id: uid, email, pin: null });
          const newUser = (await getCurrentUser(uid)).data();

          setUser({
            displayName,
            photoURL,
            ...newUser,
          } as User);
        } catch (error) {
          setError((error as Error).message);
        }
      } else {
        const userPin = userSnapshot.data().pin;

        setUser(
          (prevUser) =>
            ({
              ...prevUser,
              pin: userPin ? decrypt(userPin, uid) : null,
            } as User),
        );
      }

      setLoading(false);
    };

    const handleAuth = (authUser: AuthUser | null): void => {
      setLoading(true);

      if (authUser) void manageUser(authUser);
      else {
        setUser(null);
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, handleAuth);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const unsubUser = onSnapshot(doc(db, "users", user.id), (doc) => {
      const userPin = doc.data()?.pin;

      setUser(
        (prevData) =>
          ({
            ...prevData,
            ...doc.data(),
            pin: userPin ? decrypt(userPin, user.id) : null,
          } as User),
      );
    });

    return () => unsubUser();
  }, [user?.id]);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const value: AuthContext = {
    user: user as User,
    loading,
    error,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within an AuthContextProvider");

  return context;
}
