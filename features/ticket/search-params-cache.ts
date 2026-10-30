import { createSearchParamsCache, parseAsString } from "nuqs/server";

const searchParser = parseAsString
  .withDefault("")
  .withOptions({
    shallow: false,
    clearOnDefault: true,
    limitUrlUpdates: { method: "debounce", timeMs: 500 },
  });

const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
});

const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export { searchParamsCache, searchParser, sortOptions, sortParser };
export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
