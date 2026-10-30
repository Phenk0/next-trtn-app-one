"use client";

import { useQueryStates } from "nuqs";
import { SortSelect } from "@/components/sort-select";
import { sortOptions, sortParser } from "@/features/ticket/search-params-cache";

const options = [
  { label: "Newest", sortKey: "createdAt", sortValue: "desc" as const },
  { label: "Oldest", sortKey: "createdAt", sortValue: "asc" as const },
  { label: "Bounty", sortKey: "bounty", sortValue: "desc" as const },
];

const TicketSortSelect = () => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return (
    <SortSelect
      options={options}
      value={sort}
      onChange={setSort}
      width="full"
    />
  );
};
export { TicketSortSelect };
