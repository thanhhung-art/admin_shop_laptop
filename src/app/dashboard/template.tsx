import DashBoardLayout from "@/layouts/dashboard/layout";
import { checkauth } from "@/utils/fetch";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ReactElement } from "react";

export default async function Template({
  children,
}: {
  children: ReactElement;
}) {
  const cookieStore = await cookies();
  const authtoken = cookieStore.get("authtoken")?.value as string | undefined;
  const { isadmin } = await checkauth(authtoken);
  if (!isadmin) redirect("/auth/signIn");
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
