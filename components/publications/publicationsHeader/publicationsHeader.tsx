import { FC, MutableRefObject, useCallback, useState } from 'react'
import styles from './publicationsHeader.module.scss'
import { BaseHeader, THeaderNavigationItem } from './baseHeader/baseHeader'
import { useRouter } from 'next/router'
import mobileLogo from '@root/public/brand/svg/Color logo - no background.svg'
import defLogo from '@root/public/brand/svg/Color logo - no background.svg'
import { useAppDispatch } from '@root/Hooks/reduxSettings'
import { toc_contacts_modal } from '@root/components/modals/popUp/store/contacts/IContactsModal'
import { puModalOpenByName } from '@root/store/slices/modalSlice/modalSlice'
import { IArticles_translation } from '@root/layouts/publicationsLayout'
import { toc_mobile_filters_modal } from '@root/components/modals/popUp/store/mobileFilters/IMobileFilters'

export interface IPublicationHeader_translation extends IArticles_translation {
  searchPlaceholder: string
  navPublications: string
  navWebsite: string
  navCatalog: string
  navContacts: string
}

interface IPublicationHeader {
  translation: IPublicationHeader_translation
  parentRef: MutableRefObject<HTMLDivElement>
  headerSize: number
}

export const PublicationsHeader: FC<IPublicationHeader> = ({
  parentRef,
  headerSize,
  translation,
}) => {
  // const [searchState, setSearchState] = useState<string>('')
  const dispatch = useAppDispatch()

  const headerBottomGap = 30
  const router = useRouter()

  const onNavigate = useCallback(
    (property: string) => {
      router.push(property, undefined)
    },
    [router],
  )

  const openContactsModal = useCallback(() => {
    const contactsModalName = toc_contacts_modal
    if (contactsModalName && contactsModalName.typeName)
      dispatch(puModalOpenByName(contactsModalName.typeName))
  }, [dispatch])

  const openAllArticles = useCallback(() => {
    const filtersModalName = toc_mobile_filters_modal
    if (filtersModalName && filtersModalName.typeName)
      dispatch(puModalOpenByName(filtersModalName.typeName))
  }, [dispatch])

  const articlesOptions: THeaderNavigationItem[] = [
    {
      title: translation?.allArticles || 'All articles',
      isActive: false,
      property: '',
      onClick: openAllArticles,
    },
    // {
    //   title: translation?.articleStructure || 'Article structure',
    //   isActive: false,
    //   property: '',
    //   onClick: () => {},
    // },
  ]
  const headerNavigation: THeaderNavigationItem[] = [
    {
      title: translation?.navPublications || 'Publications',
      selectionState: true,
      property: '/publications',
      onClick: onNavigate,
    },
    {
      title: translation?.navWebsite || 'Website',
      property: '/',
      onClick: onNavigate,
    },
    {
      title: translation?.navCatalog || 'Catalog',
      property: '/products',
      onClick: onNavigate,
    },
    {
      title: translation?.navContacts || 'Contacts',
      property: '',
      onClick: openContactsModal,
    },
  ]

  return (
    <BaseHeader
      navigationItems={[headerNavigation, articlesOptions]}
      headerSize={{
        size: headerSize || 70,
        parentRef,
        headerBottomGap,
      }}
      logo={{
        default: defLogo,
        mobile: mobileLogo,
        action: () => {
          onNavigate('/')
        },
      }}
      mobileTriggerSize={'SM_576'}
    >
      <div className="row w-100 h-100">
        <div
          // className={
          //   'col-12 col-sm-10 col-md-7 col-xl-3 d-flex justify-content-end align-items-center'
          // }
          className={'d-none d-sm-flex justify-content-end align-items-center'}
        >
          {headerNavigation.map((el, idx) => {
            return (
              <div
                key={`${idx}_nav_item_${el.property}`}
                className={`${styles.navItem} ${el.selectionState ? styles.active : ''}`}
                onClick={() => {
                  el?.onClick(el.property, idx)
                }}
              >
                {el.title}
              </div>
            )
          })}
          {/* <IstInput
            actualData={searchState}
            outDataSetter={setSearchState}
            placeholder={translation?.searchPlaceholder || 'Search'}
            inputType={inputTypesVars.any_string}
            required={false}
            style={{
              borderRadius: '12px',
              height: '50px',
            }}
          /> */}
        </div>
        {/* <div
          className={
            'col-0 col-xl-9 d-none d-xl-flex justify-content-end align-items-center h-100'
          }
        >
          {headerNavigation.map((el, idx) => {
            return (
              <div
                key={`${idx}_nav_item_${el.property}`}
                className={`${styles.navItem} ${el.selectionState ? styles.active : ''}`}
                onClick={() => {
                  el?.onClick(el.property, idx)
                }}
              >
                {el.title}
              </div>
            )
          })}
        </div> */}
      </div>
    </BaseHeader>
  )
}
