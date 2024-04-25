import { TCatalogFiltersList } from '../catalogFilters';

// TYPE OF FILTERS FROM QUERY STRING
type TSearchFilter = { search: string }
export type TQueriedFilters = TCatalogFiltersList & TSearchFilter

export const queryIsEmpty = (query: TSearchFilter): boolean => {
  for (let key in query) if (query[key]) return false
  return true
}

export const queryFiltersToState = (
  query: TSearchFilter,
): TCatalogFiltersList => {
  let newFilters = {} as TCatalogFiltersList
  for (let key in query) {
    const lkey = key as keyof TSearchFilter
    if (query[lkey] && lkey !== 'search') newFilters[lkey] = query[lkey]
  }
  return newFilters
}
