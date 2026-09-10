"use client";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-client";

export type FirestoreLesson = {
  id: string;
  categoryId: string;
  mode: "test" | "practice" | "words";
  durationMinutes?: number | null;
  wordCount?: number | null;
  order: number;
  title: string;
  focus?: string;
  text: string;
  enabled: boolean;
};

export function useFirestoreLessons(categoryId: string) {
  const [lessons, setLessons] = useState<FirestoreLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lessonsQuery = query(collection(db, "categories", categoryId, "lessons"), orderBy("order", "asc"));
    return onSnapshot(lessonsQuery, (snapshot) => {
      setLessons(snapshot.docs.map((lesson) => ({ id: lesson.id, ...lesson.data() } as FirestoreLesson)).filter((lesson) => lesson.enabled));
      setLoading(false);
    }, () => {
      setLessons([]);
      setLoading(false);
      setError("Unable to load lessons from Firestore.");
    });
  }, [categoryId]);

  return { lessons, loading, error };
}
