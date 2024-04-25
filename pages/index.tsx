import { ReactElement, useEffect, useRef } from 'react'
import { catalogClient } from '../Apollo/catalogClient'
import FeedBackPage from '../components/LandingPages/FeedBackPage/FeedBackPage'
import HelloPage from '../components/LandingPages/HelloPage/HelloPage'
import OurPartnersPage, {
  IOurPartnersPage_translation,
} from '../components/LandingPages/OurPartners/OurPartnersPage'
import ProductDemo, {
  IProductDemo_translation,
} from '../components/LandingPages/ProductDemo/ProductDemo'
import { getPageOfLandingByIdentifier_landingHelper } from '../helpers/Pages/landingContent_actions'
import { RU_LOCALE, EN_LOCALE } from '../locales/locales'
import {
  GET_LANDING_PAGE_CONTENT,
  ILandingFromQuery,
} from '../queries/landingPages/landingPage'

import ru_ourPartnersPage from '../locales/ourPartnersPage/ru'
import en_ourPartnersPage from '../locales/ourPartnersPage/en'
import ru_productDemo from '../locales/productDemo/ru'
import en_productDemo from '../locales/productDemo/en'
import { useTransition } from '../Hooks/useTranslation/useTranslation'
import TrackerBody from '../components/pageTracker/trackerBody'
import PageTracker from '../components/pageTracker/pageTracker'
import { useScrollSpy } from '../Hooks/useScrollSpy'
import DefaultLandingPage from '../components/LandingPages/DefaultLandingPage'
import {
  pageTracker_en_translation,
  pageTracker_ru_translation,
} from '../locales/pages/landing/pageTracker/locales'
import { IPageTracker_translation } from '../locales/pages/landing/pageTracker/IPageTrackerTranslation'
import {
  getGalleryOfPage_landingHelper,
  getLandingGalleryOfPage_landingHelper,
  getPageBackgroundMatrix_landingHelper,
} from '../helpers/Pages/landingContent_redefining'
import { NextPageWithLayout } from './_app'
import { LandingLayout } from '../layouts/landingLayout'
import { useRouter } from 'next/router'

const Index: NextPageWithLayout<ILandingFromQuery> = (data) => {
  {
    /* ================================= */
    /* 🌎 TRANSLATION BLOCK FOR PAGES 🌎 */
    /* 👇 =========================== 👇 */
  }

  const ourPartnersPage_translation =
    useTransition<IOurPartnersPage_translation>([
      { locale: RU_LOCALE, translation: ru_ourPartnersPage },
      { locale: EN_LOCALE, translation: en_ourPartnersPage },
    ])

  const productDemo_translation = useTransition<IProductDemo_translation>([
    { locale: RU_LOCALE, translation: ru_productDemo },
    { locale: EN_LOCALE, translation: en_productDemo },
  ])

  const pageTracker_translation = useTransition<IPageTracker_translation>([
    { locale: RU_LOCALE, translation: pageTracker_ru_translation },
    { locale: EN_LOCALE, translation: pageTracker_en_translation },
  ])

  const helloPageRef = useRef<HTMLDivElement>()
  const ourProductsPage = useRef<HTMLDivElement>()
  const feedbackPage = useRef<HTMLDivElement>()
  const ourFriendsPage = useRef<HTMLDivElement>()
  const router = useRouter()

  const { getScrollSpy } = useScrollSpy([
    {
      page: helloPageRef,
      pageTag: pageTracker_translation.translation.helloPageTag,
    },
    {
      page: ourProductsPage,
      pageTag: pageTracker_translation.translation.ourProductsPageTag,
    },
    {
      page: feedbackPage,
      pageTag: pageTracker_translation.translation.feedbackPageTag,
    },
    {
      page: ourFriendsPage,
      pageTag: pageTracker_translation.translation.ourPartnersPageTag,
    },
  ])

  return (
    <>
      {/* ========================= */}
      {/* MAIN PAGE [LANDING PAGES] */}
      {/* 👇 =================== 👇 */}

      {getPageOfLandingByIdentifier_landingHelper('hello_page', data)?.map(
        (elem, index) => (
          <DefaultLandingPage
            ref={helloPageRef}
            key={`${index}_${elem.page_identifier}`}
            landingDescription={{
              title: elem.landing_label[0]?.main_label,
              subTitle: elem.landing_label[0]?.subtitle,
              titleOffset: 120,
            }}
          >
            <HelloPage
              gallery={getGalleryOfPage_landingHelper(elem)?.slides ?? []}
            />
          </DefaultLandingPage>
        ),
      )}

      {/* ============================ */}
      {/* OUR PRODUCTS [LANDING PAGES] */}
      {/* 👇 ====================== 👇 */}

      {getPageOfLandingByIdentifier_landingHelper(
        'product_demo_page',
        data,
      )?.map((elem, index) => (
        <DefaultLandingPage
          ref={ourProductsPage}
          key={`${index}_${elem.page_identifier}`}
          landingDescription={{
            title: elem.landing_label[0]?.main_label,
            subTitle: elem.landing_label[0]?.subtitle,
            titleOffset: 80,
          }}
          pageBackground={getPageBackgroundMatrix_landingHelper(elem, [
            {
              contentDistance: 0.6,
              contentOffset: { left: -200, top: 0 },
            },
            {
              contentDistance: 0.4,
              contentOffset: { left: -100, top: 0 },
            },
            {
              contentDistance: 0.65,
              contentOffset: { left: -100, top: 0 },
            },
            {
              contentDistance: 0.4,
              contentOffset: { left: -100, top: 0 },
            },
            {
              contentDistance: 0.8,
              contentOffset: { left: -100, top: -40 },
            },
          ])}
        >
          <ProductDemo
            gallery={getLandingGalleryOfPage_landingHelper(elem)?.slides ?? []}
            onClick={(action) => {
              action ? router.push(action) : null
            }}
            translation={productDemo_translation?.translation}
          />
        </DefaultLandingPage>
      ))}

      {/* ============================= */}
      {/* FEEDBACK PAGE [LANDING PAGES] */}
      {/* 👇 ======================== 👇 */}

      {getPageOfLandingByIdentifier_landingHelper('feedback_page', data)?.map(
        (elem, index) => (
          <DefaultLandingPage
            ref={feedbackPage}
            key={`${index}_${elem.page_identifier}`}
            landingDescription={{
              title: elem.landing_label[0]?.main_label,
              titleOffset: 80,
            }}
          >
            <FeedBackPage />
          </DefaultLandingPage>
        ),
      )}

      {/* ================================ */}
      {/* OUR FRIENDS PAGE [LANDING PAGES] */}
      {/* 👇 ========================== 👇 */}

      {getPageOfLandingByIdentifier_landingHelper('our_partners', data)?.map(
        (elem, index) => (
          <DefaultLandingPage
            ref={ourFriendsPage}
            key={`${index}_${elem.page_identifier}`}
            landingDescription={{
              title: elem.landing_label[0]?.main_label,
              subTitle: elem.landing_label[0]?.subtitle,
              titleOffset: 80,
            }}
            pageBackground={getPageBackgroundMatrix_landingHelper(elem, [
              {
                contentDistance: 0.6,
                contentOffset: { left: -100, top: 0 },
              },
              {
                contentDistance: 0.4,
                contentOffset: { left: -50, top: 0 },
              },
              {
                contentDistance: 0.8,
                contentOffset: { left: -50, top: 0 },
              },
              {
                contentDistance: 0.56,
                contentOffset: { left: -50, top: 0 },
              },
              {
                contentDistance: 0.6,
                contentOffset: { left: -50, top: -40 },
              },
            ])}
          >
            <OurPartnersPage
              translation={ourPartnersPage_translation?.translation}
              gallery={getGalleryOfPage_landingHelper(elem)?.slides ?? []}
            />
          </DefaultLandingPage>
        ),
      )}

      <TrackerBody>
        <PageTracker state={getScrollSpy()} />
      </TrackerBody>
    </>
  )
}

{
  /* =============================== */
  /* SPECIFY THE LAYOUT FOR THE PAGE */
  /* 👇 ========================== 👇 */
}
const getLayout = (page: ReactElement) => {
  return <LandingLayout>{page}</LandingLayout>
}

export async function getServerSideProps(context: { locale: string }) {
  const { locale } = context

  const { data } = await catalogClient.query<ILandingFromQuery>({
    query: GET_LANDING_PAGE_CONTENT,
    variables: {
      lang: locale,
    },
  })

  return {
    props: data,
  }
}

Index.getLayout = getLayout
export default Index
