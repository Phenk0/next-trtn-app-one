"use client";

import { useQueryStates } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions, sortParser } from "@/features/ticket/search-params-cache";

type Option = { label: string; sortKey: string; sortValue: "desc" | "asc" };

interface SortSelectProps {
  options: Option[];
  width: string;
}

const SortSelect = ({ options, width }: SortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSortChange = async (compositeKey: string | null) => {
    if (!compositeKey) return;

    const [sortKey, sortValue] = compositeKey.split("_");

    await setSort({
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
      value={`${sort.sortKey}_${sort.sortValue}`}
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
