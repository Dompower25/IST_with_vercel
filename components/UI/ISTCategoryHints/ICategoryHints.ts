import { ISwitcherOptions } from '../hooks/ISTFiltersHook/common'

export interface ICategoryHints {
  hintsLimit: number
  hintsList: Array<ICategoryCollection>
  hintsCategoryCollection: Array<ICategory>
}

export type ICategory = {
  collectionName: string
  listedHintsId: number
  switcherOptions?: ISwitcherOptions
}

export interface ISTHint extends Omit<ICategory, 'collectionName'> {
  hintsList: Array<ICategoryCollection>
  hintsLimit: number
}

type ICategoryCollection = ICategoryItem[]

type ICategoryItem = {
  fieldName: string
}
