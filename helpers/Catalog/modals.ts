import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'

export const catalogHasFilters_modalsHelper = (
  catalogData: TCatalogFiltersList,
): boolean => {
  let _hasFilters: boolean = false

  for (const [key, value] of Object.entries(catalogData))
    if (value && value.length > 0) _hasFilters = true

  return _hasFilters
}
