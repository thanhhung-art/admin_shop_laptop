"use server";

import { SignupFormSchema } from "@/lib/definitions";
import { getSession } from "@/lib/session";

export async function signin(formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return { message: "fetch failed" };
  }

  const user = await res.json();

  if (!user.data || !user.data.authtoken || !user.data.isadmin) {
    return {
      message: "An error occurred while login.",
    };
  }

  // create session cookie
  const session = await getSession();
  session.authtoken = user.data.authtoken;
  session.isLoggedIn = true;
  session.isadmin = true;
  await session.save();
  return {
    message: "success",
  };
}
