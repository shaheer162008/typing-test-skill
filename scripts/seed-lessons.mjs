import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

if (!process.argv.includes("--clear-all")) {
  console.error("Refusing to seed. Re-run with --clear-all to replace the entire Firestore database with the lesson seed.");
  process.exit(1);
}

function getCredential() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const parsed = JSON.parse(json);
    return cert({ projectId: parsed.project_id, clientEmail: parsed.client_email, privateKey: parsed.private_key.replace(/\\n/g, "\n") });
  }
  const localKeyPath = join(process.cwd(), "private-key.json");
  if (existsSync(localKeyPath)) {
    const parsed = JSON.parse(readFileSync(localKeyPath, "utf8"));
    return cert({ projectId: parsed.project_id, clientEmail: parsed.client_email, privateKey: parsed.private_key });
  }
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error("Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY before seeding.");
  }
  return cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") });
}

const app = getApps().length ? getApps()[0] : initializeApp({ credential: getCredential() });
const db = getFirestore(app, process.env.FIRESTORE_DATABASE_ID ?? "(default)");

async function clearDatabase() {
  const collections = await db.listCollections();
  let deleted = 0;
  for (const collection of collections) {
    const snapshot = await collection.get();
    for (const document of snapshot.docs) {
      await db.recursiveDelete(document.ref);
      deleted += 1;
    }
  }
  console.log(`Cleared ${deleted} root documents across ${collections.length} collections.`);
}

const durations = [1, 2, 3, 5, 10, 15, 20, 30];
const wordCounts = [25, 50, 75, 100];
const categories = [
  ...durations.flatMap((durationMinutes) => [
    { id: `timed-${durationMinutes}-minute`, type: "timed-test", mode: "test", durationMinutes, title: `${durationMinutes}-minute typing test`, text: "Practice makes progress. Focus on rhythm, accuracy, and calm keystrokes while keeping your hands relaxed." },
    { id: `practice-${durationMinutes}-minute`, type: "practice", mode: "practice", durationMinutes, title: `${durationMinutes}-minute typing practice`, text: "Build a steady typing habit with calm hands, clear focus, and accurate movement through every sentence." },
  ]),
  ...wordCounts.map((wordCount) => ({ id: `words-${wordCount}`, type: "word-test", mode: "words", wordCount, title: `${wordCount}-word typing test`, text: "Type with control and let accuracy lead your speed through a focused fixed passage." })),
];

await clearDatabase();

for (const category of categories) {
  const categoryRef = db.collection("categories").doc(category.id);
  await categoryRef.set({
    id: category.id,
    type: category.type,
    mode: category.mode,
    durationMinutes: category.durationMinutes ?? null,
    wordCount: category.wordCount ?? null,
    title: category.title,
    enabled: true,
    createdAt: new Date().toISOString(),
  });
  await categoryRef.collection("lessons").doc("lesson-1").set({
    id: "lesson-1",
    categoryId: category.id,
    mode: category.mode,
    durationMinutes: category.durationMinutes ?? null,
    wordCount: category.wordCount ?? null,
    order: 1,
    title: `${category.title} · Lesson 01`,
    focus: "Steady rhythm and accuracy",
    text: category.text,
    enabled: true,
    createdAt: new Date().toISOString(),
  });
}

console.log(`Seeded ${categories.length} categories with one nested lesson each.`);
