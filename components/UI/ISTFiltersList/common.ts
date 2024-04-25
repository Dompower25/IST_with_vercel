import { ReactNode } from 'react'
import { mobileTrigger_size } from '../common'
import {
  IFilterType,
  IST_HookedData,
  ISwitcherOptions,
  onFilterSwitchDefault_t,
} from '../hooks/ISTFiltersHook/common'

export type mobileOpenType_dropdown = 'dropdown'
export type mobileOpenType_transfer = 'transfer'

// BASE FILTER_ITEM TYPE

export interface ICheckBoxItem extends IFilterType {
  isCheckBox: boolean
}

//UI FILTER ITEM TYPES
export type IST_IFilterListItem =
  | Omit<ICheckBoxItem, 'isActive' | 'idx' | 'isCheckBox'>
  | { isActive?: boolean }

export interface IST_FilterList {
  hookedData: IST_HookedData
  switcherOptions: ISwitcherOptions
  isCheckList?: boolean
}

export interface IST_FilterItem extends ICheckBoxItem {
  onFilterSwitch: onFilterSwitchDefault_t
}

//MOBILE UI TYPES
type mobileSettings = mobileSettings_transfer | mobileSettings_dropdown

export interface mobileSettings_transfer {
  type: mobileOpenType_transfer
  mobileSizeTrigger: mobileTrigger_size
  onTransfer: (...props) => any
}

export interface mobileSettings_dropdown {
  type: mobileOpenType_dropdown
  mobileSizeTrigger: mobileTrigger_size
}

export interface IST_IFiltersWrapper {
  children?: ReactNode
  title: string
  mobileSettings?: mobileSettings
  hasActives?: boolean
  isOpened: boolean
}

//Actions

export const getMobileSettings_triggerSize = (
  mobileSettings: mobileSettings,
): mobileTrigger_size => {
  if (mobileSettings && mobileSettings.mobileSizeTrigger)
    return mobileSettings.mobileSizeTrigger
  else return 'SM_576'
}

export const getMobileSettings_isTransfer = (
  mobileSettings: mobileSettings,
): boolean => {
  return (
    mobileSettings && mobileSettings.type && mobileSettings.type === 'transfer'
  )
}
