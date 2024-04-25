import { IRegionSlice_item } from '../store/slices/regionSlice/IRegionSlice'
import { IRegionsListType } from '../store/slices/common/regionsListType'

export const RU_LOCALE = 'ru-RU'
export const EN_LOCALE = 'en-US'

export const new_EN_Currency = (multiplier: number, currencyId: number) => {
  return {
    currencyMultiplier: multiplier,
    targetRegion: 'en-US',
    currencySymbol: '$',
    currencyName: 'USD',
    currencyId: currencyId,
  } as IRegionSlice_item<IRegionsListType>
}
