export interface ICatalogFilter<FILTER_TYPE> {
  key: keyof FILTER_TYPE
  filter: FILTER_TYPE[keyof FILTER_TYPE]
}

export type ICatalog<T> = {
  search?: string
  filters?: T
}

export const ISTCatalogCreate = <FT>(catalog?: ICatalog<FT>): ICatalog<FT> => {
  return catalog
    ? catalog
    : ({
        filters: <FT>{},
      } as ICatalog<FT>)
}

export const ISTCatalogUpdateFilter = <FT>(
  filter: ICatalogFilter<FT>,
  object: ICatalog<FT>,
) => {
  object.filters[filter.key] = filter.filter
}
