"use client";

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { auth, db } from "@/lib/firebase-client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User>;
  signInWithEmail: (email: string, password: string) => Promise<User>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getAuthError(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  const messages: Record<string, string> = {
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/email-already-in-use": "An account already exists with this email.",
    "auth/weak-password": "Use a password with at least six characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network connection failed. Please try again.",
  };
  return messages[code] ?? "Authentication failed. Please try again.";
}

async function saveUserProfile(user: User, name?: string) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: name ?? user.displayName ?? "",
    email: user.email ?? "",
    photoURL: user.photoURL ?? null,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const active = true;
    void setPersistence(auth, browserLocalPersistence).catch(() => undefined);
    return onAuthStateChanged(auth, (nextUser) => {
      if (!active) return;
      setUser(nextUser);
      setLoading(false);
      if (nextUser) void saveUserProfile(nextUser).catch(() => undefined);
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    signInWithGoogle: async () => {
      try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        await saveUserProfile(result.user);
        return result.user;
      } catch (error) {
        throw new Error(getAuthError(error));
      }
    },
    signInWithEmail: async (email, password) => {
      try {
        const result = await signInWithEmailAndPassword(auth, email.trim(), password);
        await result.user.reload();
        if (!result.user.emailVerified) {
          await signOut(auth);
          throw new Error("Please verify your email before signing in.");
        }
        await saveUserProfile(result.user);
        return result.user;
      } catch (error) {
        if (error instanceof Error && error.message.includes("verify")) throw error;
        throw new Error(getAuthError(error));
      }
    },
    signUpWithEmail: async (name, email, password) => {
      try {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(result.user, { displayName: name.trim() });
        await saveUserProfile(result.user, name.trim());
        await sendEmailVerification(result.user);
        await signOut(auth);
        return result.user;
      } catch (error) {
        throw new Error(getAuthError(error));
      }
    },
    resetPassword: async (email) => {
      try {
        await sendPasswordResetEmail(auth, email.trim());
      } catch (error) {
        throw new Error(getAuthError(error));
      }
    },
    resendVerification: async () => {
      if (!auth.currentUser) throw new Error("No signed-in account found.");
      await sendEmailVerification(auth.currentUser);
    },
    logout: () => signOut(auth),
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export { getAuthError };
