import {
  indexedModal,
  modalStater,
  modalsBasics,
} from '@root/Hooks/useBaseModal/modalSetter'
import { TPublication } from '@root/components/publications/common'
import { Dispatch } from 'react'

type TMobileFilterModalSections = 'sections'
type TMobileFilterModalLists = 'list'
export type TMobileFilterModal =
  | TMobileFilterModalSections
  | TMobileFilterModalLists

export const toc_mobile_filters_modal = {
  typeName: 'toc_mobile_filters_modal',
  _header: '',
  _paragraph: '',
} as modalsBasics

type TArticle = {
  destination: string,
  title: string
  items: TPublication[]
}

export type TMobileFiltersSection = TArticle[]

export interface IMobileFiltersModal {
  articleSections: TMobileFiltersSection

  currentPage: TMobileFilterModal
  currentDestination: string

  pageSwitcher: Dispatch<TMobileFilterModal>

  titleSetter: Dispatch<string>
  paragraphSetter: Dispatch<string>
  destinationSetter: Dispatch<string>

  onClose: () => void
  translation: IMobileFiltersModalTranslation
}

export interface IMobileFiltersModalTranslation {
  close: string
  back: string

  sectionsList: {
    header: string
    paragraph: string
  }

  articlesList: {
    paragraph: string
  }
}
