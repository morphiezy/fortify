import { useState } from "react";
import { syncVault } from "../lib/vault-sync";

type SyncStatus = "idle" | "syncing" | "done" | "error";

// React hook that triggers a vault sync and tracks its status.
export function useVaultSync(key: string) {
  const [status, setStatus] = useState<SyncStatus>("idle");
  async function sync(blob: string) {
    setStatus("syncing");
    try {
      await syncVault(blob, key);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }
  return { status, sync };
}
