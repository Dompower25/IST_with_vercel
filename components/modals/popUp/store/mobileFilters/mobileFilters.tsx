import { FC, useCallback, useEffect, useState } from 'react'
import { IMobileFiltersModal, TMobileFiltersSection } from './IMobileFilters'
import styles from '@root/styles/Modals/popUp/mobileFilters/mobileFilters.module.scss'
import ISTFiltersWrapper from '@root/components/UI/ISTFiltersList/components/ISTFiltersWrapper'
import { TPublication } from '@root/components/publications/common'
import ISTFiltersList from '@root/components/UI/ISTFiltersList/components/ISTFiltersList'
import useISTFiltersList from '@root/components/UI/hooks/ISTFiltersHook/useISTFiltersList'
import { onFilterSwitchCustom_t } from '@root/components/UI/hooks/ISTFiltersHook/common'
import { dateToGeneralFormat_commonHelper } from '@root/helpers/common'
import IstButtonN from '@root/components/UI/ISTButton/ISTButtonN'
import { useRouter } from 'next/router'

// Filters List
interface IFiltersList<T extends TMobileFiltersSection> {
  filtersList: T
  onTransfer: (page: string, destination: string) => void
}

const FiltersList: FC<IFiltersList<TMobileFiltersSection>> = ({
  filtersList,
  onTransfer,
}) => {
  return (
    <div>
      {filtersList?.map((section, si) =>
        section ? (
          <ISTFiltersWrapper
            key={`${si}_modal_filter`}
            title={section.title}
            isOpened={false}
            mobileSettings={{
              mobileSizeTrigger: 'XXL_1400',
              type: 'transfer',
              onTransfer: () => {
                onTransfer(section.title, section.destination)
              },
            }}
          />
        ) : null,
      )}
    </div>
  )
}

// FiltersPage
interface IFilterPage {
  publications: TPublication[]
  onClose: () => void
}

interface IPublicationsList {
  publications: string
}

const FilterPage: FC<IFilterPage> = ({ publications, onClose }) => {
  const router = useRouter()

  const pagePush = useCallback(
    (page: string) => {
      const isUUID = (str: string): boolean => {
        const uuidRegex =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        return uuidRegex.test(str)
      }

      let currentPath = router.asPath
      let pathSegments = currentPath.split('/')

      for (let i = pathSegments.length - 1; i >= 0; i--) {
        if (isUUID(pathSegments[i])) {
          pathSegments = pathSegments.slice(0, i)
          break
        }
      }

      pathSegments.push(page)
      const newUrl = pathSegments.join('/')
      onClose()
      router.push(newUrl)
    },
    [onClose, router],
  )

  const [pagesHookedData, pageHasActive, pagesDest] =
    useISTFiltersList<IPublicationsList>(
      'publications',
      publications
        ? publications.map((el, index) => ({
            fieldName:
              el?.title ||
              dateToGeneralFormat_commonHelper(el.pubDate) ||
              `Post №${index}`,
            isActive: false,
          }))
        : [],
    )

  const onGetPublication: onFilterSwitchCustom_t = useCallback(
    (_, __, name) => {
      const currentPub = publications.find((el) => el.title === name)
      if (!currentPub) return
      const newUUID = currentPub.id
      pagePush(newUUID)
    },
    [pagePush, publications],
  )

  return (
    <>
      <ISTFiltersList
        isCheckList={false}
        hookedData={pagesHookedData}
        switcherOptions={{
          filterDesignation: pagesDest,
          onSwitch: onGetPublication,
        }}
      />
    </>
  )
}

// MAIN COMPONENT
export const MobileFiltersModal: FC<IMobileFiltersModal> = ({
  articleSections,
  currentPage,
  currentDestination,

  pageSwitcher,
  titleSetter,
  paragraphSetter,
  destinationSetter,

  translation,

  onClose,
}) => {
  const transfer = useCallback(
    (page: string, des: string) => {
      paragraphSetter(translation.articlesList?.paragraph || '')
      destinationSetter(des)
      pageSwitcher('list')
      titleSetter(page)
    },
    [
      destinationSetter,
      pageSwitcher,
      paragraphSetter,
      titleSetter,
      translation,
    ],
  )

  const goToSections = useCallback(() => {
    titleSetter(translation.sectionsList.header || '')
    paragraphSetter(translation.sectionsList.paragraph || '')
    destinationSetter(null)
    pageSwitcher('sections')
  }, [
    destinationSetter,
    pageSwitcher,
    paragraphSetter,
    titleSetter,
    translation,
  ])

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersWrapper}>
        {currentPage === 'sections' ? (
          <FiltersList filtersList={articleSections} onTransfer={transfer} />
        ) : null}

        {currentPage === 'list' ? (
          <FilterPage
            onClose={onClose}
            publications={articleSections
              .find((el) => el.destination === currentDestination)
              ?.items?.map((item, i) => {
                return {
                  id: item.id,
                  title: item.title,
                  content: '',
                  pubDate: '',
                }
              })}
          />
        ) : null}
      </div>
      <div>
        <IstButtonN
          title={
            currentPage === 'list'
              ? {
                  caption: translation.back,
                }
              : {
                  caption: translation.close,
                }
          }
          size={'S'}
          accent={'important'}
          theme={'dark'}
          onClick={() => {
            switch (currentPage) {
              case 'list':
                goToSections()
                break
              case 'sections':
                onClose()
                break
            }
          }}
        />
      </div>
    </div>
  )
}
