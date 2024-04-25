import { PayloadAction } from '@reduxjs/toolkit'
import { IRegionSlice, IRegionSlice_item } from './IRegionSlice'
import { IRegionsListType } from '../common/regionsListType'
import { createGenericSlice } from '../genericSlice'

const initialState = {
  region: 'ru-RU',
  currentCurrencyId: 0,

  currency: [
    {
      targetRegion: 'ru-RU',
      currencyMultiplier: 1,
      currencySymbol: '₽',
      currencyName: 'RUB',
      currencyId: 0,
    },
  ],
} as IRegionSlice<IRegionsListType>

const regionSlice = createGenericSlice('regionSlice', initialState, {
  addCurrency(
    state,
    action: PayloadAction<IRegionSlice_item<IRegionsListType>>,
  ) {
    const newCurrencyId = action.payload.currencyId
    if (!state.currency.find((el) => el.currencyId === newCurrencyId))
      state.currency.push(action.payload)
  },

  addCurrencyAndApply(
    state,
    action: PayloadAction<IRegionSlice_item<IRegionsListType>>,
  ) {
    const newCurrencyId = action.payload.currencyId
    if (!state.currency.find((el) => el.currencyId === newCurrencyId))
      state.currency.push(action.payload)

    const foundCurrency = state.currency.find(
      (el) => el.targetRegion === action.payload.targetRegion,
    )
    if (!foundCurrency) {
      return
    }

    state.currentCurrencyId = foundCurrency.currencyId
  },

  setCurrencyById(state, action: PayloadAction<number>) {
    const foundCurrency = state.currency.find(
      (el) => el.currencyId === action.payload,
    )

    state.currentCurrencyId = foundCurrency
      ? foundCurrency.currencyId
      : state.currentCurrencyId
  },

  switchCurrency(state) {
    const newCurrency = state.currentCurrencyId + 1
    const firstCurrency = state.currency[0]
      ? state.currency[0].currencyId
      : state.currentCurrencyId

    state.currentCurrencyId =
      state.currency.length - 1 >= newCurrency ? newCurrency : firstCurrency
  },

  setRegion(state, action: PayloadAction<IRegionsListType>) {
    state.region = action.payload
  },

  setCurrencyMultiplier(
    state,
    action: PayloadAction<{
      currencyId: number
      multiplier: number
    }>,
  ) {
    const foundCurrencyIdx = state.currency.findIndex(
      (el) => el.currencyId === action.payload.currencyId,
    )

    if (foundCurrencyIdx > -1)
      state.currency[foundCurrencyIdx]
        ? (state.currency[foundCurrencyIdx].currencyMultiplier =
            action.payload.multiplier)
        : null
  },
})

export const {
  addCurrency,
  setCurrencyById,
  switchCurrency,
  setRegion,
  addCurrencyAndApply,
  setCurrencyMultiplier,
} = regionSlice.actions

export default regionSlice.reducer
