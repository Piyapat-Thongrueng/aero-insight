import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

export const DropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 cursor-pointer">
          <Menu size={19} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="md:hidden w-screen p-12">
        <div className="md:hidden flex flex-col gap-6">
          <LoginButton />
          <SignupButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
