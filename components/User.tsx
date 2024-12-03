import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "@/lib/session";
import LogoutButton from "./LogoutButton";

const User = async () => {
  const session = await getServerSession();
  if (!session) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="hover:brightness-110 transition">
          <AvatarImage src="" alt={session.username} />
          <AvatarFallback>{session.username.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default User;
