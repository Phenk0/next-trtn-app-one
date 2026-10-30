"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortParser } from "@/features/ticket/search-params-cache";

type Option =
  { label: "Newest"; value: "newest" } | { label: "Bounty"; value: "bounty" };

interface SortSelectProps {
  options: Option[];
  width: string;
}

const SortSelect = ({ options, width }: SortSelectProps) => {
  const [sort, setSort] = useQueryState("sort", sortParser);

  const handleSortChange = async (value: string | null) => {
    await setSort(value);
  };

  return (
    <Select items={options} value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className={`w-${width}`}>
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
