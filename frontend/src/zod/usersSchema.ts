import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username is requred",
    }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Email is invalid",
    }),
    password: z.string().min(2),
    cpassword: z.string().min(2),
    avatar: z.custom((v) => v instanceof FileList).optional(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Confirm password do not match",
    path: ["cpassword"],
  });
export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
