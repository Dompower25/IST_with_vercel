import { useQuery } from '@apollo/client'
import ISTFiltersWrapper from '@root/components/UI/ISTFiltersList/components/ISTFiltersWrapper'
import useISTFiltersList from '@root/components/UI/hooks/ISTFiltersHook/useISTFiltersList'
import {
  GET_PUBLICATIONS,
  IPublicationQ,
} from '@root/queries/publications/publicationActions'
import { FC, useCallback, useEffect, useState } from 'react'
import { IPublicationsList, TPublication } from '../common'
import { queriedToPublicationListFormat_pubRedefining } from '@root/helpers/publications/pub_redefining'
import ISTFiltersList from '@root/components/UI/ISTFiltersList/components/ISTFiltersList'
import { dateToGeneralFormat_commonHelper } from '@root/helpers/common'
import { useRouter } from 'next/router'
import { onFilterSwitchCustom_t } from '@root/components/UI/hooks/ISTFiltersHook/common'
import { useAppSelector } from '@root/Hooks/reduxSettings'
import { useDispatch } from 'react-redux'
import { setSectionList } from '@root/store/slices/publicationArticlesSlice/publicationArticlesSlice'
import { INamesOfPublicationSectionsTranslation } from '../translations/publicationsItems'

export type TPublicationListsField = {
  uuid: string
  field: string
}

interface IHookedPublications {
  title: string
  publicationsList: TPublication[]
  initialListState: boolean
  currentPubId: string
  pagePush: (uuid: string) => void
}

const HookedPublications: FC<IHookedPublications> = ({
  title,
  publicationsList,
  initialListState,
  currentPubId,
  pagePush,
}) => {
  const [pagesHookedData, pageHasActive, pagesDest] =
    useISTFiltersList<IPublicationsList>(
      'publications',
      publicationsList
        ? publicationsList.map((el, index) => ({
            fieldName:
              el?.title ||
              dateToGeneralFormat_commonHelper(el.pubDate) ||
              `Post №${index}`,
            isActive: el?.id === currentPubId,
          }))
        : [],
    )

  const onGetPublication: onFilterSwitchCustom_t = useCallback(
    (_, __, name) => {
      const currentPub = publicationsList.find((el) => el.title === name)
      if (!currentPub) return
      const newUUID = currentPub.id
      pagePush(newUUID)
    },
    [pagePush, publicationsList],
  )

  return publicationsList ? (
    <>
      <ISTFiltersWrapper
        title={title}
        isOpened={initialListState}
        mobileSettings={{
          mobileSizeTrigger: 'SM_576',
          type: 'dropdown',
        }}
      >
        <ISTFiltersList
          isCheckList={false}
          hookedData={pagesHookedData}
          switcherOptions={{
            filterDesignation: pagesDest,
            onSwitch: onGetPublication,
          }}
        />
      </ISTFiltersWrapper>
    </>
  ) : null
}

interface IPublicationsListComponent {
  translation: INamesOfPublicationSectionsTranslation
}

export const PublicationsList: FC<IPublicationsListComponent> = ({
  translation,
}) => {
  const articles = useAppSelector((selector) => selector.pubArticles)
  const dispatch = useDispatch()

  const { query, push } = useRouter()
  const { uuid } = query as { uuid: string }

  const {
    data: pubsList,
    loading: loadingPubsList,
    error: errorPubsList,
  } = useQuery<IPublicationQ>(GET_PUBLICATIONS, {
    fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    if (!pubsList || errorPubsList) return
    const publications = queriedToPublicationListFormat_pubRedefining(pubsList)
    if (!publications) return

    dispatch(
      setSectionList([
        {
          title: translation.sections.publications,
          destination: 'publications_hard_destination',
          items: [...publications],
        },
      ]),
    )
  }, [dispatch, errorPubsList, pubsList, translation])

  return (
    <>
      {articles?.sections?.map((section, si) =>
        section ? (
          <HookedPublications
            key={`${si}_section_articles_pubs`}
            title={section?.title}
            publicationsList={[...section.items]}
            currentPubId={uuid || ''}
            initialListState
            pagePush={(pageId) => {
              push(`/publications/${pageId}`)
            }}
          />
        ) : null,
      )}
    </>
  )
}
