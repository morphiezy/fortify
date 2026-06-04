export type Credential = { name: string; username: string };

// Filter the credential list by a query (matches name or username).
export function filterCredentials(items: Credential[], query: string): Credential[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (c) => c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q),
  );
}
