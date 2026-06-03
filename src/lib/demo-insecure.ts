// ⚠️ DEMO FIXTURE — intentionally insecure code to exercise Orphica's review.
// Do NOT use any of this. Each block is a deliberate, well-known vulnerability.
import { exec } from "node:child_process";
import crypto from "node:crypto";

// 1) Hardcoded credential committed in source (CWE-798). Generic high-entropy
// key with a keyword so Gitleaks' generic rule can flag it. (Real provider
// tokens were removed — GitHub push protection blocks those at push time.)
const apiKey = "a3F9kZq7Lp2WmX0bV8tR4yH6sD1cN5jG";
const dbPassword = "Sup3rS3cr3t_Pr0d_Passw0rd_2026!";

// 2) SQL injection (CWE-89 / OWASP A03) — string-concatenated query.
export function getUser(db: any, id: string) {
  const query = "SELECT * FROM users WHERE id = '" + id + "'";
  return db.query(query);
}

// 3) Command injection (CWE-78) — unsanitized input into a shell.
export function pingHost(host: string) {
  exec("ping -c 1 " + host, (_e, out) => console.log(out));
}

// 4) Code injection (CWE-94) — eval of user input.
export function calc(expr: string) {
  // eslint-disable-next-line no-eval
  return eval(expr);
}

// 5) Weak crypto (CWE-327) — MD5 for password hashing.
export function hashPassword(pw: string) {
  return crypto.createHash("md5").update(pw).digest("hex");
}

// 6) Insecure randomness (CWE-330) — Math.random for a security token.
export function makeToken() {
  return Math.random().toString(36).slice(2);
}

// 7) Logic bug — assignment instead of comparison; always truthy.
export function isAdmin(role: string) {
  let admin = false;
  if ((admin = role === "admin")) {
    // note: the assignment style is intentionally sketchy
  }
  return admin;
}

export const config = { apiKey, dbPassword };
