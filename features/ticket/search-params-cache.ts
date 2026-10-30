import { createSearchParamsCache, parseAsString } from "nuqs/server";

const searchParser = parseAsString
  .withDefault("")
  .withOptions({ shallow: false, clearOnDefault: true });

const sortParser = parseAsString
  .withDefault("newest")
  .withOptions({ shallow: false, clearOnDefault: true });

const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
});

export { searchParamsCache, searchParser, sortParser };
export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
