import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const email = process.argv[2];
if (!email) throw new Error("Usage: npm run admin:set -- admin@example.com");

function credential() {
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
  return cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") });
}

const app = getApps().length ? getApps()[0] : initializeApp({ credential: credential() });
const auth = getAuth(app);
const user = await auth.getUserByEmail(email);
await auth.setCustomUserClaims(user.uid, { ...user.customClaims, admin: true, role: "admin" });
console.log(`Admin claim set for ${email}. Sign out and sign in again to refresh the token.`);
