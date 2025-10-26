import { useState, useMemo } from 'react';

type SortFn<T> = (a: T, b: T) => number;
type FilterFn<T> = (item: T) => boolean;

export function useFilterSortPaginate<T>(
  items: T[],
  filterFn: FilterFn<T>,
  sortFn: SortFn<T> | null,
  pageSize: number
) {
  const [currentPage, setCurrentPage] = useState(0);

  const filtered = useMemo(() => (items ?? []).filter(filterFn), [items, filterFn]);
  const sorted = useMemo(
    () => (sortFn ? [...filtered].sort(sortFn) : filtered),
    [filtered, sortFn]
  );

  const pageCount = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  return {
    paginated,
    filtered,
    sorted,
    pageCount,
    currentPage,
    setCurrentPage,
    total: sorted.length,
  };
}
