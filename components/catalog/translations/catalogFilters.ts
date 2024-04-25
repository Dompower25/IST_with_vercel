import { IAvailableAdditionalFilter } from '../Filters/Additional/Available/IAvailableAdditionalFilter'

interface INamesOfFiltersList {
  manufacturer: string
  unit: string
  type: string
  available: string
}

export interface INamesOfFiltersTranslation {
  available: IAvailableAdditionalFilter
  namesOfFiltersList: INamesOfFiltersList
}
