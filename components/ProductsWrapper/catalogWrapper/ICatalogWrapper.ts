import { Dispatch, MutableRefObject } from 'react'
import { IPaginationParameters } from '../../../Hooks/usePagination/common'
import { ITranslation } from '@root/Hooks/useTranslation/ITranslation'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'
import { ICatalog } from '@root/components/catalog/abstract/ISTCatalog'
import { IRequestFailureTranslation } from '@root/components/catalog/translations/emptyResult'

/**
 * @typedef {string} MobileStyles - A string representing the style classes for the mobile version.
 * Format: "wrapper-1 wrapper-sm-2 wrapper-lg-3".
 */

export interface ICatalogWrapper {
  emptySearchingResultTranslation: ITranslation<IRequestFailureTranslation>

  initialPagination?: Pick<IPaginationParameters, 'limit'>

  containerScrollRef: MutableRefObject<HTMLDivElement>
  additionalForwarding: string

  /**
   * Style classes for the mobile version.
   * @type {MobileStyles}
   * @example "wrapper-1 wrapper-sm-2 wrapper-lg-3"
   */
  mobileStyles: string

  filtersList: TCatalogFiltersList
  catalog: ICatalog<TCatalogFiltersList>
  onFilter?: (
    catalog: ICatalog<TCatalogFiltersList>,
    filtersList,
  ) => TCatalogFiltersList

  loadingSetter: (state: boolean) => void
  onException?: (message: string) => void
  isEmptyResult?: (empty: boolean) => void
}
