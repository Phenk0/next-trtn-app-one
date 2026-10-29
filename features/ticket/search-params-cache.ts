import { createSearchParamsCache, parseAsString } from "nuqs/server";

const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
});

export { searchParamsCache };
export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
