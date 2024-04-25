import { Dispatch, FC, useCallback, useEffect, useRef, useState } from 'react'
import useBaseModal from '../../../Hooks/useBaseModal/useBaseModal'
import styles from './searchHints.module.scss'
import { CatalogWrapper } from '../../ProductsWrapper/catalogWrapper/catalogWrapper'
import {
  emptyResult_en_translation,
  emptyResult_ru_translation,
} from '../../../locales/catalog/locales'
import { EN_LOCALE, RU_LOCALE } from '../../../locales/locales'
import { useTransition } from '../../../Hooks/useTranslation/useTranslation'
import {
  SearchHintsWrapper,
  TOnCategorySelect,
} from '../../searchHintsWrapper/searchHintsWrapper'
import { useDispatch } from 'react-redux'
import { loadingModalSetState } from '../../../store/slices/modalSlice/modalSlice'
import IstButtonN from '../../UI/ISTButton/ISTButtonN'
import {
  searchHints_en_translation,
  searchHints_ru_translation,
} from '../../../locales/modals/searchHints/locales'
import { INamesOfFiltersTranslation } from '../../catalog/translations/catalogFilters'
import {
  loadingModalCatalogHints,
  loadingModalCategoriesHints,
} from '../../../store/boilerplates/loadingModalBP'
import { IRequestFailureTranslation } from '@root/components/catalog/translations/emptyResult'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'

export interface ISearchHintsModal {
  state: boolean
  targetContainerId: string
  searchRequest: string
  onShowMore?: (request: string) => void
  onSelectCategory?: TOnCategorySelect
  closer?: () => void
}

export type THintsModalTranslation = Pick<
  INamesOfFiltersTranslation,
  'namesOfFiltersList'
> & { showMoreButton: string; tooltipsHiderText: string }

const SearchHintsModal: FC<ISearchHintsModal> = ({
  state,
  targetContainerId,
  searchRequest,
  onShowMore,
  onSelectCategory,
  closer,
}) => {
  // COMMON TRANSLATIONS
  const searchHintsTranslation = useTransition<THintsModalTranslation>([
    { locale: RU_LOCALE, translation: searchHints_ru_translation },
    { locale: EN_LOCALE, translation: searchHints_en_translation },
  ])

  // CATALOG TRANSLATION (EMPTY RESULT)
  const emptyResultTranslation = useTransition<IRequestFailureTranslation>([
    { locale: RU_LOCALE, translation: emptyResult_ru_translation },
    { locale: EN_LOCALE, translation: emptyResult_en_translation },
  ])

  const dispatch = useDispatch()
  const catalogInitialFilters: TCatalogFiltersList = {
    mfg: [''],
    unit: [''],
    type: [''],
    available: [''],
  }

  // MODAL
  const searchHintsModalTN = 'searchHintsModal'
  const [modalComponent, ModalView] = useBaseModal(
    'APP_BODY_WRAPPER',
    targetContainerId,
    {
      modals: [
        {
          typeName: searchHintsModalTN,
          _header: '',
          _paragraph: '',
        },
      ],
    },
  )

  const switchModal = useCallback(() => {
    modalComponent.switch(state)
  }, [modalComponent, state])

  useEffect(() => {
    switchModal()
  }, [switchModal])

  // HINTS LOADING HANDLER
  const categoriesLoadingStateSetter = (state: boolean) => {
    dispatch(
      loadingModalSetState({
        name: loadingModalCategoriesHints,
        state,
      }),
    )
  }

  const catalogLoadingStateSetter = (state: boolean) => {
    dispatch(
      loadingModalSetState({
        name: loadingModalCatalogHints,
        state,
      }),
    )
  }

  // CATEGORIES EMPTY RESULT HANDLER
  const categoriesContainer = useRef<HTMLDivElement>(null)
  const setCategoriesEmptyResult = useCallback(
    (state: boolean) => {
      if (!categoriesContainer || !categoriesContainer.current) return
      const unvisClassName = styles.unvis
      state
        ? categoriesContainer.current.classList.add(unvisClassName)
        : categoriesContainer.current.classList.remove(unvisClassName)
    },
    [categoriesContainer],
  )

  return (
    <ModalView
      style={{
        minWidth: 'unset',
        width: '100%',
        minHeight: 'unset',
        height: '100%',
        zIndex: 'unset',
      }}
    >
      <div className={`${styles.searchHintsModal} content-container`}>
        <div className={`${styles.hintsContainer}`}>
          {/* SHADED AREA */}
          <div className={styles.hintsBG} onClick={closer ? closer : null} />
          {/* TOOLTIPS HELPER */}
          <div className={styles.hideTooltips} onClick={closer ? closer : null}>
            {searchHintsTranslation.translation.tooltipsHiderText}
          </div>
          <div className={styles.hintsList} ref={categoriesContainer}>
            <SearchHintsWrapper
              searchRequest={!searchRequest ? '' : searchRequest}
              modalState={state}
              loadingSetter={(state) => categoriesLoadingStateSetter(state)}
              hintsTranslation={searchHintsTranslation}
              isEmptyResult={setCategoriesEmptyResult}
              onCategorySelect={onSelectCategory}
            />
          </div>
          <div className={styles.productsList}>
            <div className={styles.list}>
              <CatalogWrapper
                emptySearchingResultTranslation={emptyResultTranslation}
                loadingSetter={(state) => catalogLoadingStateSetter(state)}
                filtersList={catalogInitialFilters}
                catalog={{
                  filters: catalogInitialFilters,
                  search: !searchRequest ? '' : searchRequest,
                }}
                onFilter={() => catalogInitialFilters}
                additionalForwarding={'./products'}
                initialPagination={{ limit: 9 }}
                containerScrollRef={undefined}
                mobileStyles={'wrapper-1 wrapper-sm-2 wrapper-lg-3'}
              />
            </div>
            <div className={styles.showMoreContainer}>
              <IstButtonN
                theme="dark"
                accent="secondary"
                size="S"
                options={{
                  solid: 'gradient',
                }}
                title={{
                  caption: searchHintsTranslation.translation.showMoreButton,
                }}
                style={{
                  borderRadius: '12px',
                }}
                onClick={() =>
                  onShowMore
                    ? onShowMore(!searchRequest ? '' : searchRequest)
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </ModalView>
  )
}

export default SearchHintsModal
