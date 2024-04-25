import { useCallback, useEffect, useState } from 'react'
import { ICheckBoxItem, IST_IFilterListItem } from '../../ISTFiltersList/common'
import { IST_HookedData } from './common'

const useISTFiltersList = <DES_T>(
  designation?: keyof DES_T,
  initialFilters?: IST_IFilterListItem[],
): [IST_HookedData, boolean, keyof DES_T] => {
  const [filters, filtersUpdater] = useState<ICheckBoxItem[]>(
    initialFilters
      ? initialFilters.map((el, index) => {
          return {
            ...el,
            idx: index,
          } as ICheckBoxItem
        })
      : [],
  )
  const [hasActives, setActives] = useState<boolean>(false)

  const HasActives = useCallback((): boolean => {
    return !!filters.find((el) => el.isActive)
  }, [filters])

  useEffect(() => {
    if (filters) setActives(HasActives())
  }, [HasActives, filters])

  return [
    {
      fields: filters,
      fieldsSetter: filtersUpdater,
    } as IST_HookedData,

    hasActives,
    designation ? designation : null,
  ]
}

export default useISTFiltersList
