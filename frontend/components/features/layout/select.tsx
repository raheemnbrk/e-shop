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
  value?: string;
  placeholder?: string;
  defaultValue?: string;   
  label?: string;
  onchange?: (value: string) => void;
}

export function SelectDemo({
  items,
  value,
  placeholder,
  label,
  onchange,
}: SelectDemoProps) {
  return (
    <Select value={value} onValueChange={onchange}>
      <SelectTrigger className="h-10! w-48 cursor-pointer rounded-lg border border-border bg-card text-text dark:border-dark-border dark:bg-dark-card dark:text-dark-text">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="rounded-lg border-border bg-card capitalize dark:border-dark-border dark:bg-dark-card">
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
              className="cursor-pointer capitalize text-text data-highlighted:bg-primary data-highlighted:text-white dark:text-dark-text"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}