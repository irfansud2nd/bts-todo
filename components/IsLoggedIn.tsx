"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const IsLoggedIn = ({ children }: Props) => {
  const token = sessionStorage.getItem("token");
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const lastPathname = splittedPathname[splittedPathname.length - 1];
  const router = useRouter();

  if (lastPathname != "login" && lastPathname != "register" && !token)
    router.push("/login");

  return <>{children}</>;
};
export default IsLoggedIn;
