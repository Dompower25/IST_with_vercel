import { FC, useEffect } from 'react'
import ISTFiltersWrapper from '../../UI/ISTFiltersList/components/ISTFiltersWrapper'
import { ITranslation } from '../../../Hooks/useTranslation/ITranslation'
import useISTFiltersList from '../../UI/hooks/ISTFiltersHook/useISTFiltersList'
import { onFilterSwitchCustom_t } from '../../UI/hooks/ISTFiltersHook/common'
import ISTFiltersList from '../../UI/ISTFiltersList/components/ISTFiltersList'
import {
  getAdditionalFilter_filtersHelper,
  getNamedFiltersListItem_filtersHelper,
  isActiveNow_filtersHelper,
} from '../../../helpers/Catalog/filters'
import { INamesOfFiltersTranslation } from '../translations/catalogFilters'
import { TCatalogFiltersList } from './catalogFilters'


interface ICatalogFiltersList {
  translation: ITranslation<INamesOfFiltersTranslation>
  filtersList: TCatalogFiltersList
  filtersState: TCatalogFiltersList
  onSwitch: onFilterSwitchCustom_t<keyof TCatalogFiltersList>
}

export const CatalogFiltersList: FC<ICatalogFiltersList> = ({
  translation,
  filtersList: filters,
  filtersState,
  onSwitch,
}) => {
  const [mfg_filter, mfg_active, mfg_designation] =
    useISTFiltersList<TCatalogFiltersList>(
      'mfg',
      filters?.mfg?.map((el) => {
        return {
          fieldName: el,

          isActive: isActiveNow_filtersHelper(filtersState, 'mfg', el),
        }
      }),
    )

  const [types_filter, types_active, types_designation] =
    useISTFiltersList<TCatalogFiltersList>(
      'type',
      filters?.type?.map((el) => {
        return {
          fieldName: el,

          isActive: isActiveNow_filtersHelper(filtersState, 'type', el),
        }
      }),
    )

  const [units_filter, units_active, units_designation] =
    useISTFiltersList<TCatalogFiltersList>(
      'unit',
      filters?.unit?.map((el) => {
        return {
          fieldName: el,

          isActive: isActiveNow_filtersHelper(filtersState, 'unit', el),
        }
      }),
    )

  const [av_filter, av_active, av_designation] =
    useISTFiltersList<TCatalogFiltersList>(
      'available',
      filters?.available?.map((el) => {
        return {
          fieldName: getAdditionalFilter_filtersHelper(el, translation),

          isActive: isActiveNow_filtersHelper(filtersState, 'available', el),
        }
      }),
    )

  return (
    <>
      {/*Производители*/}
      <ISTFiltersWrapper
        title={translation.translation.namesOfFiltersList.manufacturer}
        isOpened={true}
        hasActives={mfg_active}
        mobileSettings={{
          type: 'dropdown',
          mobileSizeTrigger: 'LG_992',
        }}
      >
        <ISTFiltersList
          isCheckList={true}
          hookedData={mfg_filter}
          switcherOptions={{
            onSwitch,
            filterDesignation: mfg_designation,
          }}
        />
      </ISTFiltersWrapper>

      {/*Типы*/}

      <ISTFiltersWrapper
        title={translation.translation.namesOfFiltersList.type}
        isOpened={false}
        hasActives={types_active}
        mobileSettings={{
          type: 'dropdown',
          mobileSizeTrigger: 'LG_992',
        }}
      >
        <ISTFiltersList
          hookedData={types_filter}
          isCheckList={true}
          switcherOptions={{
            onSwitch,
            filterDesignation: types_designation,
          }}
        />
      </ISTFiltersWrapper>

      {/*Узлы*/}

      <ISTFiltersWrapper
        title={translation.translation.namesOfFiltersList.unit}
        isOpened={false}
        hasActives={units_active}
        mobileSettings={{
          type: 'dropdown',
          mobileSizeTrigger: 'LG_992',
        }}
      >
        <ISTFiltersList
          hookedData={units_filter}
          isCheckList={true}
          switcherOptions={{
            onSwitch,
            filterDesignation: units_designation,
          }}
        />
      </ISTFiltersWrapper>

      <ISTFiltersWrapper
        title={getNamedFiltersListItem_filtersHelper(
          av_designation,
          translation,
        )}
        isOpened={false}
        hasActives={av_active}
        mobileSettings={{
          type: 'dropdown',
          mobileSizeTrigger: 'LG_992',
        }}
      >
        <ISTFiltersList
          hookedData={av_filter}
          isCheckList={true}
          switcherOptions={{
            onSwitch,
            filterDesignation: av_designation,
          }}
        />
      </ISTFiltersWrapper>
    </>
  )
}
