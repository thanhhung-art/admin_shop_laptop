import DashBoardLayout from "@/layouts/dashboard/layout";
import { ReactNode } from "react";

export default async function Template({ children }: { children: ReactNode }) {
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
