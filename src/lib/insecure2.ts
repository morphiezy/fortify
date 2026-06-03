// ⚠️ DEMO FIXTURE round 2 — intentionally insecure. Do not use.

// XSS (CWE-79) — untrusted input into innerHTML.
export function render(el: HTMLElement, userInput: string) {
  el.innerHTML = "<div>" + userInput + "</div>";
}

// Path traversal (CWE-22) — user-controlled path read from disk.
import fs from "node:fs";
export function readUserFile(name: string) {
  return fs.readFileSync("/data/" + name, "utf8");
}

// Open redirect (CWE-601).
export function redirect(res: any, url: string) {
  res.writeHead(302, { Location: url });
  res.end();
}

// SQL injection (CWE-89).
export function find(db: any, name: string) {
  return db.query(`SELECT * FROM t WHERE name = '${name}'`);
}

// New commit: insecure deserialization (CWE-502).
export function load(input: string) {
  return Function('"use strict";return (' + input + ')')();
}

// trivial tweak for incremental check
export const VERSION = "1.0.1";
