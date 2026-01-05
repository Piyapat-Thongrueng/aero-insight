import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function InputDemo() {
  return (
    <div className="relative w-full">
      <Input type="email" placeholder="Search" className="bg-white py-6 px-3 text-body-1 border border-brown-300" />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 w-4 h-4 md:w-5 md:h-5" />
    </div>
  );
}
