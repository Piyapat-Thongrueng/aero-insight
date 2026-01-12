import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectScrollableProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectScrollable({
  value,
  onValueChange,
}: SelectScrollableProps) {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-white py-6 px-3 text-body-1 border border-brown-300 cursor-pointer">
        <SelectValue placeholder="Hightlight" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category}
            value={category}
            className="cursor-pointer"
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
