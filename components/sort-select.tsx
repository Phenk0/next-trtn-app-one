"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option =
  { label: "Newest"; value: "newest" } | { label: "Bounty"; value: "bounty" };

interface SortSelectProps {
  defaultValue: string;
  options: Option[];
  width: string;
}

const SortSelect = ({ options, defaultValue, width }: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== defaultValue) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      items={options}
      value={searchParams.get("sort")?.toString() || defaultValue}
      onValueChange={handleSortChange}
    >
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
