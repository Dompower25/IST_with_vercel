import { ICategoryMFG_Q } from './MFG/mfgCategoryQuery'
import { Type_category } from './Type/typeCategoryQuery'
import { Unit_category } from './Unit/unitCategoryQuery'
import GeneralQuery from './GENERAL_CATEGORY_Q.graphql'

export interface IGeneralCategoryQuery
  extends ICategoryMFG_Q,
    Type_category,
    Unit_category {}

export const GENERAL_CATEGORY_QUERY = GeneralQuery
