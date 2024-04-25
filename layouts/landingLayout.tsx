import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Header, { IHeader_translation } from '../components/Header/Header'
import { useRouter } from 'next/router'
import Footer, { IFooter_translation } from '../components/Footer/Footer'
import { useTransition } from '../Hooks/useTranslation/useTranslation'
import styles from '../styles/layouts/landingLayout.module.scss'
import { EN_LOCALE, RU_LOCALE } from '../locales/locales'
import {
  footer_currency_en_translation,
  footer_currency_ru_translation,
  footer_en_translation,
  footer_language_en_translation,
  footer_language_ru_translation,
  footer_ru_translation,
} from '../locales/footer/locales'
import {
  header_en_translation,
  header_ru_translation,
} from '../locales/header/locales'
import { useDispatch } from 'react-redux'
import {
  hintsModalSetSearch,
  hintsModalSetState,
  loadingModalAddToQueue,
  loadingModalSetState,
  puModalOpenByName,
} from '../store/slices/modalSlice/modalSlice'
import {
  loadingModalCatalogHints,
  loadingModalCategoriesHints,
} from '../store/boilerplates/loadingModalBP'
import { useAppSelector } from '../Hooks/reduxSettings'
import { toc_contacts_modal } from '@root/components/modals/popUp/store/contacts/IContactsModal'
import { setCurrencyById } from '@root/store/slices/regionSlice/regionSlice'
import {
  ICurrencySpec,
  ILanguageSpec,
} from '@root/components/region/IRegionSpecList'

type ILandingLayout = {
  children: ReactNode
}

export const LandingLayout: FC<ILandingLayout> = ({ children }) => {
  const [searchString, setSearchString] = useState<string>('')
  const router = useRouter()

  const dispatch = useDispatch()
  const contacts = useAppSelector((state) => state.contacts)
  const region = useAppSelector((state) => state.region)

  const headerTranslation = useTransition<IHeader_translation>([
    { locale: RU_LOCALE, translation: header_ru_translation },
    { locale: EN_LOCALE, translation: header_en_translation },
  ])

  const footerTranslation = useTransition<IFooter_translation>([
    {
      locale: EN_LOCALE,
      translation: footer_en_translation,
    },
    {
      locale: RU_LOCALE,
      translation: footer_ru_translation,
    },
  ])

  const footerCurrencyTranslation = useTransition<ICurrencySpec>([
    {
      locale: EN_LOCALE,
      translation: footer_currency_en_translation,
    },
    {
      locale: RU_LOCALE,
      translation: footer_currency_ru_translation,
    },
  ])

  const footerLanguageTranslation = useTransition<ILanguageSpec>([
    {
      locale: EN_LOCALE,
      translation: footer_language_en_translation,
    },
    {
      locale: RU_LOCALE,
      translation: footer_language_ru_translation,
    },
  ])

  const handleForwarding = useCallback(
    (forwardingPath) => {
      router.push(`/${forwardingPath}`, `/${forwardingPath}`, {
        shallow: false,
      })
    },
    [router],
  )

  // LANDING SEARCH HANDLING
  // * searchString is updated with a delay after finishing typing
  useEffect(() => {
    dispatch(hintsModalSetSearch(searchString))
  }, [dispatch, searchString])

  // EMPTY SEARCH REQUEST HANDLING
  useEffect(() => {
    if (!searchString || !(searchString.length > 0))
      dispatch(
        loadingModalSetState({
          name: loadingModalCategoriesHints,
          state: false,
        }),
      )
  }, [dispatch, searchString])

  const openContactsModal = useCallback(() => {
    const contactsModalName = toc_contacts_modal
    if (contactsModalName && contactsModalName.typeName)
      dispatch(puModalOpenByName(contactsModalName.typeName))
  }, [dispatch])

  const isCurrentCurrency = useCallback(
    (key: string) => {
      if (!region?.region) return false
      const currentCurrencyId = region.currentCurrencyId
      return key === region.currency[currentCurrencyId]?.targetRegion
    },
    [region],
  )

  const onSelectCurrency = useCallback(
    (key: string) => {
      let currencyId = 0
      switch (key) {
        case RU_LOCALE:
          currencyId = 0
          break

        case EN_LOCALE:
          currencyId = 1
          break
      }

      dispatch(setCurrencyById(currencyId))
    },
    [dispatch],
  )

  const switchRegion = (locale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <div className={styles.landingContent}>
      {/* HEADER */}
      <div className={`row fixed-top`}>
        <Header
          translation={headerTranslation?.translation}
          // - CUSTOM BUTTONS
          buttonsDefs={{
            logo: () => {
              handleForwarding('./')
            },
            cart: () => {
              handleForwarding('./cart')
            },
            contacts: openContactsModal,
          }}
          // - BASIC CONTROLS
          basicDefs={{
            catalogOpener: () => {
              handleForwarding('./products')
            },
            searchField: {
              setRequest: setSearchString,
              requestSetterDelay: 500,

              onFocus: () => {
                dispatch(hintsModalSetState(true))
              },

              onChange: () => {
                dispatch(
                  loadingModalAddToQueue([
                    loadingModalCategoriesHints,
                    loadingModalCatalogHints,
                  ]),
                )
              },
            },
          }}
        />
      </div>

      {/* CONTENT  */}
      <div className={styles.contentContainer}>
        <div
          id="searchHintsSpace"
          style={{ position: 'relative', zIndex: '10' }}
        />
        <div className={'content-container'}>{children}</div>
      </div>

      {/* FOOTER */}

      <div className={`content-container ${styles.stickyFooterContainer}`}>
        <Footer
          translation={footerTranslation?.translation}
          contactsData={{
            phones: contacts.phone_numbers.map((el) => {
              return el.phone_item
            }),
            mails: contacts.emails.map((el) => {
              return el.email_item
            }),
            addresses: contacts.addresses.map((el) => {
              return {
                addressName: el.address_name,
                addressCoordinates: el.address_map,
              }
            }),
          }}
          currency={{
            translation: footerCurrencyTranslation?.translation,
            isCurrent: isCurrentCurrency,
            onSelect: onSelectCurrency,
          }}
          language={{
            translation: footerLanguageTranslation?.translation,
            isCurrent: () => {
              return false
            },
            onSelect: switchRegion,
          }}
        />
      </div>
    </div>
  )
}
