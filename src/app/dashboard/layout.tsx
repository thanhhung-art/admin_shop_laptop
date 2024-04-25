import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkauth } from "@/utils/fetch";

export default async function layout({
  children,
}: {
  children: ReactNode;
}) {
  // const cookieStore = await cookies();
  // const authtoken = cookieStore.get("authtoken");

  // let data = { isadmin: false };
  // data = await checkauth(authtoken?.value);
  // if (!data.isadmin) return redirect("/auth/signIn");

  return <>{children}</>;
}