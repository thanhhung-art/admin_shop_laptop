import DashBoardLayout from "@/layouts/dashboard/layout";
import { ReactElement } from "react";

export default async function Template({
  children,
}: {
  children: ReactElement;
}) {
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
