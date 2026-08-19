import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectItemType {
  label: string;
  value: string;
}

interface SelectDemoProps {
  items: SelectItemType[];
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  onchange?: (value: string) => void;
}

export function SelectDemo({
  items,
  defaultValue,
  placeholder,
  label,
  onchange,
}: SelectDemoProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onchange}>
      <SelectTrigger className="h-10! w-48 rounded-lg border border-border bg-card text-text dark:border-dark-border dark:bg-dark-card dark:text-dark-text cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="rounded-lg border-border bg-card dark:border-dark-border dark:bg-dark-card capitalize">
        <SelectGroup>
          {label && (
            <SelectLabel className="text-text-secondary dark:text-dark-text-secondary">
              {label}
            </SelectLabel>
          )}
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="cursor-pointer text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white capitalize"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
