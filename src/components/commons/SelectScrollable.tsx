import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-92 bg-white">
        <SelectValue placeholder="Hightlight" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
        <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
        <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
      </SelectContent>
    </Select>
  );
}
