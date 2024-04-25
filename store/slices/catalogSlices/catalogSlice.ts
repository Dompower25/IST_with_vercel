import { PayloadAction } from '@reduxjs/toolkit'
import { createGenericSlice } from '../genericSlice'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'
import { ISTCatalogCreate } from '@root/components/catalog/abstract/ISTCatalog'

const initialState = ISTCatalogCreate<TCatalogFiltersList>({
  filters: <TCatalogFiltersList>{},
  search: '',
})

const CatalogQuerySlice = createGenericSlice(
  'catalogQuerySlice',
  initialState,
  {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    updateFilters(state, action: PayloadAction<TCatalogFiltersList>) {
      state.filters = { ...action.payload }
    },
  },
)

export const { setSearch, updateFilters } = CatalogQuerySlice.actions

export default CatalogQuerySlice.reducer
