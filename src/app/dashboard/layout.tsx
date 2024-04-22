import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkauth_url = process.env.NEXT_PUBLIC_CHECKAUTH_URL || "";
async function checkauth(authtoken: string): Promise<{ isadmin: boolean }> {
  if (authtoken) {
    const res = await fetch(checkauth_url, {
      headers: {
        Authorization: `Bearer ${authtoken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return { isadmin: false };
    return res.json();
  }
  return { isadmin: false };
}

export default async function DashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  try {
    const authtoken = await cookieStore.get("authtoken");
    if (authtoken?.value) {
      let data = { isadmin: false };
      data = await checkauth(authtoken?.value);
      if (!data.isadmin) return redirect("/auth/signIn");
    } else return redirect("/auth/signIn");
  } catch (err) {
    console.log(err);
  }

  return <>{children}</>;
}
