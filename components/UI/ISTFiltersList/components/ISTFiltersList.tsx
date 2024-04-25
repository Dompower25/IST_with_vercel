import React, { FC, useCallback, useEffect, useState } from 'react'
import Filter from './Filter'
import { IST_FilterList } from '../common'
import {
  IFilterType,
  onFilterSwitchDefault_t,
  onSetListsFieldDefault_t,
} from '../../hooks/ISTFiltersHook/common'

const ISTFiltersList: FC<IST_FilterList> = ({
  hookedData,
  switcherOptions,
  isCheckList,
}) => {
  const setFiltersField: onSetListsFieldDefault_t = useCallback(
    (idx) => {
      if (!hookedData || !hookedData?.fields || !(hookedData.fields.length > 0))
        return

      const fields = [...hookedData.fields]
      let editingFilter = switcherOptions
        ? ({} as Parameters<typeof switcherOptions.onSwitch>)
        : null

      fields.map((el) => {
        const activeState = el.idx === idx
        el.isActive = activeState

        editingFilter && activeState
          ? (editingFilter = [
              idx,
              true,
              el.fieldName ? el.fieldName : '',
              switcherOptions.filterDesignation,
            ])
          : null
      })

      if (editingFilter && switcherOptions)
        switcherOptions.onSwitch(...editingFilter)

      hookedData.fieldsSetter(fields)
    },
    [hookedData, switcherOptions],
  )

  const switchFilterState: onFilterSwitchDefault_t = useCallback(
    (idx) => {
      if (!hookedData || !hookedData?.fields || !(hookedData.fields.length > 0))
        return

      const filters = [...hookedData.fields]
      let editingFilter = switcherOptions
        ? ({} as Parameters<typeof switcherOptions.onSwitch>)
        : null

      filters.map((el) => {
        if (el.idx === idx) {
          const nState = !el.isActive

          filters[idx] = {
            ...el,
            isActive: nState,
          }

          editingFilter
            ? (editingFilter = [
                idx,
                nState,
                el.fieldName ? el.fieldName : '',
                switcherOptions.filterDesignation,
              ])
            : null
        }
      })

      if (editingFilter && switcherOptions)
        switcherOptions.onSwitch(...editingFilter)

      hookedData.fieldsSetter(filters)
    },
    [hookedData, switcherOptions],
  )

  const getFiltersView = (data: IFilterType[]) => {
    return (
      <>
        {data?.map((filter, i) => (
          <Filter
            idx={filter.idx}
            fieldName={filter.fieldName}
            isCheckBox={
              typeof isCheckList === 'undefined' ? false : isCheckList
            }
            isActive={filter.isActive}
            key={`filterItem_${i}_key`}
            onFilterSwitch={
              isCheckList === true ? switchFilterState : setFiltersField
            }
          />
        ))}
      </>
    )
  }

  return hookedData?.fields && hookedData?.fields.length > 0
    ? getFiltersView(hookedData.fields)
    : null
}

export default ISTFiltersList
