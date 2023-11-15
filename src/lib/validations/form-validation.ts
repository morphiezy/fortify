import z from "zod";

export const formSchema = z.object({
  name: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(4, "String must contain at least 4 characters"),
  account: z
    .string()
    .regex(
      /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9\s]+)$/,
      "Please enter email or username",
    ),
  platform: z.string().min(1, "Minimal platform length 1"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
