"use server";

import { getToken } from "@/lib/action";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const IsLoggedIn = async ({ children }: Props) => {
  const token = await getToken();

  console.log({ token });

  if (!token) redirect("/login");

  return <>{children}</>;
};
export default IsLoggedIn;
