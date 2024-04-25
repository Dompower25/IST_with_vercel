import { FC, ReactNode, useRef, useState } from 'react'
import styles from '@root/styles/publications/publications.module.scss'
import { PublicationsList } from '@root/components/publications/publicationsList/PublicationsList'
import {
  IPublicationHeader_translation,
  PublicationsHeader,
} from '@root/components/publications/publicationsHeader/publicationsHeader'
import { PublicationDescription } from '@root/components/publications/publicationDescription/publicationDescription'
import { useAppSelector } from '@root/Hooks/reduxSettings'
import { useTransition } from '@root/Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '@root/locales/locales'
import {
  publicationsHeader_en_translation,
  publicationsHeader_ru_translation,
} from '@root/locales/publications/header/locales'
import { INamesOfPublicationSectionsTranslation } from '@root/components/publications/translations/publicationsItems'
import {
  publications_sections_en_translation,
  publications_sections_ru_translation,
} from '@root/locales/publications/locales'

export interface IArticles_translation {
  allArticles: string
  articleStructure: string
}

export const PublicationsLayout: FC<{
  children: ReactNode
}> = ({ children }) => {
  const pubs = useAppSelector((sel) => sel.pubHeading)
  const parentRef = useRef<HTMLDivElement>(null)
  const headerSize = 70

  const publicationsHeaderTranslation =
    useTransition<IPublicationHeader_translation>([
      {
        locale: RU_LOCALE,
        translation: publicationsHeader_ru_translation,
      },
      {
        locale: EN_LOCALE,
        translation: publicationsHeader_en_translation,
      },
    ])

  const publicationsSectionsTranslation =
    useTransition<INamesOfPublicationSectionsTranslation>([
      {
        locale: RU_LOCALE,
        translation: publications_sections_ru_translation,
      },
      {
        locale: EN_LOCALE,
        translation: publications_sections_en_translation,
      },
    ])

  return (
    <>
      <div
        className={'position-fixed fixed-top'}
        style={{
          zIndex: '1',
        }}
      >
        <PublicationsHeader
          translation={publicationsHeaderTranslation.translation}
          parentRef={parentRef}
          headerSize={headerSize}
        />
      </div>

      <div className={'content-container'}>
        <div className={`row ${styles.publications}`} ref={parentRef}>
          <div
            className={'col-0 col-xl-3 p-0 d-none d-xl-block position-relative'}
          >
            <div
              style={{
                alignSelf: 'flex-start',
                position: 'sticky',
                top: `${headerSize + 20}px`,
              }}
            >
              <PublicationsList
                translation={publicationsSectionsTranslation.translation}
              />
            </div>
          </div>
          <div className={'col-12 col-xl-7 p-3 pl-xl-5 pr-xl-5'}>
            {children}
          </div>
          <div className={`col-0 col-xl-2 d-none d-xl-block p-0`}>
            <div
              style={{
                alignSelf: 'flex-start',
                position: 'sticky',
                top: `${headerSize + 20}px`,
              }}
            >
              <PublicationDescription
                title={pubs.title}
                publications={pubs.headingItems}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PublicationsLayout
