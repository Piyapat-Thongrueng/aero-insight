import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const handleCreateAccount = () => {
    console.log("Navigate to sign up");
    onClose();
  };

  const handleLogin = () => {
    console.log("Navigate to login");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-lg bg-white rounded-3xl p-8 sm:p-10">
        {/* Close Button */}
        <AlertDialogCancel className="absolute right-4 top-4 p-0 border-0 bg-transparent hover:bg-gray-50 cursor-pointer">
          <X className="h-6 w-6 text-brown-600 hover:text-brown-800" />
        </AlertDialogCancel>

        {/* Header */}
        <AlertDialogHeader className="space-y-4 pt-4">
          <AlertDialogTitle className="text-2xl sm:text-4xl font-bold text-brown-600 text-center">
            Create an account to continue
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Footer */}
        <AlertDialogFooter className="flex flex-col gap-4 mt-8 sm:flex-col">
          {/* Create Account Button */}
          <Button
            onClick={handleCreateAccount}
            className="w-full bg-brown-600 hover:bg-brown-500 text-white rounded-full py-6 text-base sm:text-lg font-medium cursor-pointer"
          >
            Create account
          </Button>

          {/* Login Link */}
          <AlertDialogDescription className="text-center text-brown-500 text-sm sm:text-base">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
              className="text-brown-600 font-semibold hover:underline cursor-pointer"
            >
              Log in
            </button>
          </AlertDialogDescription>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;
