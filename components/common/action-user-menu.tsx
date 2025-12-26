import React from "react";
import { ISignUpSchema } from "@/features/Auth/SignUp/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

interface ManualUser {
  data: ISignUpSchema;
}

interface GoogleUser {
  name?: string;
  email?: string;
}

interface ActionUserMenuProps {
  data: ManualUser | GoogleUser;
  logoutHandler: () => void;
}

const ActionUserMenu: React.FC<ActionUserMenuProps> = (props) => {
  const { data, logoutHandler } = props;

  const displayName =
    data && "data" in data ? data.data.username : (data as any)?.name || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={logoutHandler} className="w-full cursor-pointer">
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionUserMenu;
