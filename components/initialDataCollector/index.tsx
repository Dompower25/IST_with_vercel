import { FC, useEffect, useState } from 'react'

import getOurContactsData, {
  GET_OUR_CONTACTS_QUERY,
  IOurContacts,
  IOurContactsVars,
  TContactsData,
} from '../../queries/landingFeatures/ourContactsQuery'
import { useLazyQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { setContactData } from '../../store/slices/contactsSlice/contactsSlice'
import { getData } from '../../queries/fetch/getData'
import { useRouter } from 'next/router'
import {
  addCurrency,
  setCurrencyById,
  setRegion,
} from '../../store/slices/regionSlice/regionSlice'
import { EN_LOCALE, RU_LOCALE, new_EN_Currency } from '../../locales/locales'

export const InitialDataCollector: FC = () => {
  const CURRENCY_FETCH = process.env.NEXT_PUBLIC_CURRENCY_FETCH
  const CURRENCY_PERCENT_DIFF = process.env.NEXT_PUBLIC_CURRENCY_PERCENT_DIFF

  const [currencyMultiplier, setCurrencyMultiplier] = useState<number>(0)

  const { locale } = useRouter()
  const dispatch = useDispatch()

  // GETTING CONTACTS DATA
  const [initialFetch] = useLazyQuery<IOurContacts, IOurContactsVars>(
    GET_OUR_CONTACTS_QUERY,
  )

  useEffect(() => {
    if (!locale) {
      console.error("LOCALE IS UNDEFINED");
      return
    }

    initialFetch({
      variables: {
        code: locale,
      },
    }).then((res) => {
      if (!res.data) return
      const contactsData = getOurContactsData(res.data)
      if (contactsData) dispatch(setContactData(contactsData))
    })
  }, [dispatch, initialFetch, locale])

  // CURRENCY AND REGION
  useEffect(() => {
    async function getMultiplier() {
      await getData<TCurrencyValues>(CURRENCY_FETCH).then((curr) => {
        let diff = Math.abs(curr.Valute.USD.Previous - curr.Valute.USD.Value)

        let percentDiff = (diff / curr.Valute.USD.Previous) * 100

        percentDiff >= Number(CURRENCY_PERCENT_DIFF)
          ? setCurrencyMultiplier(1 / curr.Valute.USD.Value)
          : setCurrencyMultiplier(1 / curr.Valute.USD.Previous)
      })
    }

    if (currencyMultiplier <= 0) {
      getMultiplier()
    }
  }, [CURRENCY_FETCH, CURRENCY_PERCENT_DIFF, currencyMultiplier])

  // - Add currency
  useEffect(() => {
    if (!(currencyMultiplier > 0)) return
    dispatch(addCurrency(new_EN_Currency(currencyMultiplier, 1)))
    switch (locale) {
      case EN_LOCALE:
        dispatch(setCurrencyById(1))
        break
      case RU_LOCALE:
        dispatch(setCurrencyById(0))
        break
    }
  }, [currencyMultiplier, dispatch, locale])

  useEffect(() => {
    switch (locale) {
      case EN_LOCALE:
        dispatch(setRegion(EN_LOCALE))
        break
      case RU_LOCALE:
        dispatch(setRegion(RU_LOCALE))
        break
    }
  }, [dispatch, locale])

  return null
}
