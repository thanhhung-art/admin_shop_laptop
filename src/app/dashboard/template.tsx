import DashBoardLayout from "@/layouts/dashboard/layout";
import { checkauth } from "@/utils/fetch";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ReactElement } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";

export default async function Template({
  children,
}: {
  children: ReactElement;
}) {
  let data = { isadmin: false };
  try {
    const cookieStore = cookies();
    const authtoken = cookieStore.get("authtoken")?.value as string | undefined;
    data = await checkauth(authtoken);
    if (!data.isadmin) redirect("/auth/signIn");
  } catch (error) {
    if (isRedirectError(error) && data.isadmin) {
    } else redirect("/auth/signIn");
  }
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
