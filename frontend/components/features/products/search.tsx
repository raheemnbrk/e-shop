"use client";

import { Input } from "@/components/ui/input";
import { SelectDemo, SelectItemType } from "../layout/select";

export default function Search() {
  const items: SelectItemType[] = [
    { label: "newest first", value: "newest" },
    { label: "price:low to high", value: "lower price" },
    { label: "price:high to low", value: "higher price" },
    { label: "name", value: "name" },
  ];
  return (
    <div className="flex items-center gap-6">
      <Input
        placeholder="Enter product name..."
        className="focus-visible:ring-primary focus-visible:border-primary h-12 bg-card"
      />
      <SelectDemo items={items} defaultValue={items[0].value} label="Sort by" />
    </div>
  );
}
