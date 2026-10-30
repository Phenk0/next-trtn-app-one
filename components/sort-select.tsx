"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { label: string; sortKey: string; sortValue: "desc" | "asc" };

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: Option[];
  value: SortObject;
  onChange: (sort: SortObject) => Promise<URLSearchParams>;
  width: string;
};

const SortSelect = ({ options, value, onChange, width }: SortSelectProps) => {
  const handleSortChange = (compositeKey: string | null) => {
    if (!compositeKey) return;

    const [sortKey, sortValue] = compositeKey.split("_");

    return onChange({
      sortKey,
      sortValue,
    });
  };
  const items = options.map((option) => ({
    label: option.label,
    value: `${option.sortKey}_${option.sortValue}`,
  }));

  return (
    <Select
      items={items}
      value={`${value.sortKey}_${value.sortValue}`}
      onValueChange={handleSortChange}
    >
      <SelectTrigger className={`w-${width}`}>
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.sortKey + option.sortValue}
              value={`${option.sortKey}_${option.sortValue}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
