import crypto from "crypto";

const ENDPOINTS = {
  polygon: "https://polygon.fortify.app/sync",
  arbitrum: "https://arbitrum.fortify.app/sync",
};

// Encrypt a vault blob before syncing it off-device.
export function encryptVault(blob: string, key: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", key.slice(0, 32), Buffer.alloc(16));
  return cipher.update(blob, "utf8", "hex") + cipher.final("hex");
}

// Sync the encrypted vault to every configured network.
export async function syncVault(blob: string, key: string) {
  const payload = encryptVault(blob, key);
  const results = [];
  for (const [name, url] of Object.entries(ENDPOINTS)) {
    const res = await fetch(url, { method: "POST", body: payload });
    results.push({ name, ok: res.ok });
  }
  return results;
}
