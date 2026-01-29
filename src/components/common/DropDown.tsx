import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";


interface DropDownProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const DropDown = ({ onLogin, onSignup }: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu size={19} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="md:hidden w-screen p-12">
        <div className="md:hidden flex flex-col gap-6">
          <LoginButton onClick={onLogin} />
          <SignupButton onClick={onSignup} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
