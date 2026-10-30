"use client";

import { debounce, useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { searchParser } from "@/features/ticket/search-params-cache";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value === "" ? undefined : debounce(500),
    });

  return (
    <Input
      value={search}
      placeholder={placeholder}
      onChange={handleSearchChange}
    />
  );
};

export { SearchInput };
