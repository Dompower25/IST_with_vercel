export interface IRegionSlice<REGION_TYPE> {
  region: REGION_TYPE | string
  currentCurrencyId: number
  currency: Array<IRegionSlice_item<REGION_TYPE>>

  // getCurrentCurrency?: (data: IRegionSlice<REGION_TYPE>) => IRegionSlice_item | null
}

export interface IRegionSlice_item<REGION_TYPE> {
  targetRegion: REGION_TYPE
  currencyMultiplier: number
  currencySymbol: string
  currencyName: string
  currencyId: number
}
