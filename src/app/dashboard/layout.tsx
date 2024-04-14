import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CHECKAUTH_URL = process.env.CHECKAUTH_URL || "";

async function checkauth(authtoken: string): Promise<{ isadmin: boolean }> {
  const res = await fetch(CHECKAUTH_URL, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return { isadmin: false };
  return res.json();
}

export default async function DashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const authtoken = cookieStore.get("authtoken");
  if (authtoken?.value) {
    const data = await checkauth(authtoken?.value || "");
    if (!data.isadmin) return redirect("/auth/signIn");
  } else return redirect("/auth/signIn");

  return <>{children}</>;
}
