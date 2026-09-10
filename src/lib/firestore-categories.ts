"use client";

import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-client";

export type FirestoreCategory = {
  id: string;
  type: "timed-test" | "practice" | "word-test";
  mode: "test" | "practice" | "words";
  durationMinutes?: number | null;
  wordCount?: number | null;
  title: string;
  enabled: boolean;
};

export function useFirestoreCategories(type?: FirestoreCategory["type"]) {
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);

  useEffect(() => onSnapshot(collection(db, "categories"), (snapshot) => {
    setCategories(snapshot.docs.map((category) => ({ id: category.id, ...category.data() } as FirestoreCategory)).filter((category) => category.enabled && (!type || category.type === type)));
  }, () => setCategories([])), [type]);

  return categories;
}
