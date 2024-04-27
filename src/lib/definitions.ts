import z from "zod";
import { SessionOptions } from "iron-session";

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export interface SessionData {
  userId?: string;
  isadmin?: boolean;
  isLoggedIn?: boolean;
  authtoken?: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  userId: "",
  isadmin: false,
  authtoken: "",
};

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "session_token",
  cookieOptions: {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  },
};
