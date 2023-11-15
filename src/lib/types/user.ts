export type User = {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  pin: string | null;
};

export type NewUser = Pick<User, "id" | "email" | "pin">;
