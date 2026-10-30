"use client";

import { useQueryState } from "nuqs";
import { SearchInput } from "@/components/search-input";
import { searchParser } from "@/features/ticket/search-params-cache";

const TicketSearchInput = () => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      placeholder="Search tickets ..."
      value={search}
      onChange={setSearch}
    />
  );
};

export { TicketSearchInput };
