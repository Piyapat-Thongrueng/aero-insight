import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  return (
    <Select>
      <SelectTrigger className="w-full bg-white py-6 px-3 text-body-1 border border-brown-300">
        <SelectValue placeholder="Hightlight" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
