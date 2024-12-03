"use client";
import { logout } from "@/lib/actions/authActions";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const LogoutButton = () => {
  return <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>;
};
export default LogoutButton;
