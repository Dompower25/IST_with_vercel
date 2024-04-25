import { useEffect, useState } from 'react'
import { filterExclude_filtersHelper } from '../../helpers/Catalog/filters'
import { IProductFiltersVariables } from '../../queries/products/productActions'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'
import { ICatalog } from '@root/components/catalog/abstract/ISTCatalog'

export const useCatalogFiltering = (
  filtersList: TCatalogFiltersList,
  catalog: ICatalog<TCatalogFiltersList>,
  search: string,
) => {
  const [outFilters, setOutFilters] = useState<IProductFiltersVariables>({
    offset: 0,
    search: '',
  } as IProductFiltersVariables)

  useEffect(() => {
    const newState = {
      mfg:
        catalog.filters.mfg && catalog.filters.mfg?.length > 0
          ? filterExclude_filtersHelper(catalog.filters.mfg, filtersList.mfg)
          : [''],

      unit:
        catalog.filters.unit && catalog.filters.unit?.length > 0
          ? filterExclude_filtersHelper(catalog.filters.unit, filtersList.unit)
          : [''],

      type:
        catalog.filters.type && catalog.filters.type?.length > 0
          ? filterExclude_filtersHelper(catalog.filters.type, filtersList.type)
          : [''],

      available:
        catalog.filters.available && catalog.filters.available?.length > 0
          ? filterExclude_filtersHelper(
              catalog.filters.available,
              filtersList.available,
            )
          : [''],
    } as Pick<TCatalogFiltersList, 'mfg' | 'unit' | 'type' | 'available'>

    setOutFilters((prev) => {
      return {
        ...prev,
        ...newState,
        offset: 0,
      }
    })
  }, [catalog, filtersList])

  useEffect(() => {
    setOutFilters((prev) => {
      return {
        ...prev,
        search,
        offset: 0,
      }
    })
  }, [search])

  return {
    filteredData: outFilters,
  }
}
