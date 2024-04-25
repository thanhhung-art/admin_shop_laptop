import DashBoardLayout from "@/layouts/dashboard/layout";
import { cookies } from "next/headers";
import { ReactElement } from "react";

export default async function Template({
  children,
}: {
  children: ReactElement;
}) {
  const cookieStore = await cookies();
  const authtoken = cookieStore.get("authtoken")?.value as string | undefined;
  return <DashBoardLayout authtoken={authtoken}>{children}</DashBoardLayout>;
}
