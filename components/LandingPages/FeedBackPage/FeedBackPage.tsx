import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import styles from '../../../styles/FeedBackPage/feedBack.module.scss'
import cstm_adaptive_comments from '../../UI/ISTComment/adaptiveForShortened.module.scss'

import StyledContentWrapper from '../../UI/styledContentWrapper/StyledContentWrapper'
import ISTInput, { inputTypesVars } from '../../UI/ISTInput/ISTInput'
import ISTSelect from '../../UI/ISTSelect/ISTSelect'
import ISTTextArea from '../../UI/ISTTextArea/ISTTextArea'
import ISTButtonN from '../../UI/ISTButton/ISTButtonN'

import megaphone_img from '../../../public/LandingPages/FeedBack/IstComment/megaphone_w_cl.png'

import ISTComponentWrapper from '../../UI/ComponentWrapper/ISTComponentWrapper'
import RatingSelector, {
  rating,
  IRatingList,
} from './ratingSelector/RatingSelector'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_RATING_ITEMS } from '../../../queries/landingFeatures/feedbackPage/rating'
import Image from 'next/image'

import {
  GET_FEEDBACK_CATEGORIES,
  getFB_CategoriesArr,
  IFeedBackCategories,
  IFeedBackCategoriesVars,
} from '../../../queries/landingFeatures/feedbackPage/getFeedbackCategories'

import {
  GET_FEEDBACK_REVIEWS,
  getFB_Reviews,
  IFeedBackReviews,
  IFeedBackReviewsVars,
  reviewItem,
} from '../../../queries/landingFeatures/feedbackPage/getFB_Reviews'
import useBaseModal from '../../../Hooks/useBaseModal/useBaseModal'
import FeedBack_modal from '../../DefaultModals/LandingFeedBack/FeedBack_modal'
import { IQueryPaginationVariable } from '../../../queries/common'
import useISTReviews from '../../UI/ISTComment/hook/useISTReviews'
import feedback_ru from '../../../locales/feedBackPage/ru'
import feedback_en from '../../../locales/feedBackPage/en'
import { useTransition } from '../../../Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '../../../locales/locales'
import { useRouter } from 'next/router'
import { useISTInputFelt } from '@root/components/UI/ISTInput/useISTInputFelt'
import { toc_gratitude_message } from '@root/components/modals/popUp/store/gratitude/IGratitudeModal'
import { puModalOpenByName } from '@root/store/slices/modalSlice/modalSlice'
import { useAppDispatch } from '@root/Hooks/reduxSettings'

export interface IFeedBackPage_translation {
  header: string
  name: string
  namePlaceHolder: string
  phone: string
  phonePlaceholder: string
  enterData: string
  category: string
  feedBack: string
  feedBackPlaceholder: string
  rating: string
  sendButton: string
  showReviews: string
  allReviews: string
}

const FeedBackPage: FC = ({}) => {
  const dispatch = useAppDispatch()
  // Local state
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  // const [rating, setRating] = useState<rating>(null)
  const [reviewsDataList, setReviewsDataList] = useState<Array<reviewItem>>([])
  const [findingId, setFindingId] = useState<number | string>(null)
  const [reviewsPagination] = useState<IQueryPaginationVariable>({
    limit: 8,
    offset: 0,
  })

  const openGratitude = useCallback(() => {
    const gratitudeModal = toc_gratitude_message
    if (gratitudeModal && gratitudeModal.typeName)
      dispatch(puModalOpenByName(gratitudeModal.typeName))
  }, [dispatch])

  const { checkFields } = useISTInputFelt()
  const nameRef = useRef(null)
  const phoneRef = useRef(null)

  const sendRequest = useCallback(() => {
    const fieldsIsFelt = checkFields([
      {
        refObj: nameRef,
        required: true,
      },
      {
        refObj: phoneRef,
        required: true,
      },
    ])

    if (fieldsIsFelt) openGratitude()
  }, [checkFields, openGratitude])

  const currentTranslationFeedbackPage =
    useTransition<IFeedBackPage_translation>([
      { locale: RU_LOCALE, translation: feedback_ru },
      { locale: EN_LOCALE, translation: feedback_en },
    ])

  const [modalComponent, ModalView] = useBaseModal()
  const { printComments, desiredReview, desiredEvent } = useISTReviews()
  const FBRatingItems = useQuery<IRatingList>(GET_RATING_ITEMS, {})
  const { locale } = useRouter()

  const FBCategoryItems = useQuery<
    IFeedBackCategories,
    IFeedBackCategoriesVars
  >(GET_FEEDBACK_CATEGORIES, {
    fetchPolicy: 'network-only',
    variables: {
      code: locale,
    },
  })

  const authToken = process.env.NEXT_PUBLIC_REVIEWS_ACCESS
  const [initialFetch, query] = useLazyQuery<
    IFeedBackReviews,
    IFeedBackReviewsVars
  >(GET_FEEDBACK_REVIEWS, {
    variables: {
      code: locale,
      limit: reviewsPagination.limit,
      offset: reviewsPagination.offset,
    },
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    initialFetch().then((res) => {
      if (!res?.data) return
      if (res.data) {
        const commentList = getFB_Reviews(res.data)
        if (reviewsDataList.length < reviewsPagination.limit)
          setReviewsDataList(() => [...reviewsDataList, ...commentList])
      }
    })
  }, [initialFetch, reviewsDataList, reviewsPagination])

  useEffect(() => {
    if (modalComponent) {
      modalComponent.editModal(
        currentTranslationFeedbackPage?.translation.allReviews,
        '',
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // OPEN FULL COMMENTS LIST
  const handleAllReviews = () => {
    setFindingId(null)
    modalComponent.switch(true)
  }

  desiredEvent.event = function () {
    modalComponent.switch(true)
    setFindingId(desiredReview.getId())
  }

  return (
    <>
      <div className={'col-12 col-md-5 col-xl-7'}>
        <div className={styles.feedBack_container}>
          {/*REVIEWS LIST*/}

          {printComments({
            data: reviewsDataList,
            uniqueKeyDesignation: 'onPage_review',
            customAdaptiveStyles: cstm_adaptive_comments,
            listWrapperClassName: styles.fb_review_items_wrapper,
            componentInnerStyles: {
              margin: '10px',
              marginBottom: '17px',
            },
          })}

          {/*---*/}
          <div
            className={styles.mob_show_all}
            onClick={() => {
              handleAllReviews()
            }}
          >
            <ISTButtonN // что за кнопка?
              theme="dark"
              accent="secondary"
              size="S"
              stylingFor={['hover']}
              style={{ borderRadius: '15px', borderWidth: '2px' }}
              options={{ solid: 'gradient' }}
              title={{ caption: '' }}
            />

            <div className={styles.mob_show_all_data}>
              <div className={styles.sar_caption}>
                {currentTranslationFeedbackPage?.translation.sendButton}
              </div>

              <div>
                <Image
                  src={megaphone_img}
                  alt={'megaphone image background'}
                  fill={true}
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'right',
                    paddingRight: '10px',
                    paddingBottom: '10px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.allReviewsBtn} d-none d-md-block`}>
          <ISTButtonN
            theme="dark"
            accent="secondary"
            size="S"
            stylingFor={['hover']}
            style={{ borderRadius: '15px', borderWidth: '2px' }}
            options={{ solid: 'gradient' }}
            title={{
              caption: currentTranslationFeedbackPage?.translation.allReviews,
            }}
            onClick={(ev) => {
              handleAllReviews()
            }}
          />
        </div>
      </div>

      <div className={'col-12 col-md-7 col-xl-5'}>
        <div className={styles.feedBack_data}>
          <StyledContentWrapper
            title={currentTranslationFeedbackPage?.translation.header}
            style={{
              borderRadius: '0px 46px 46px 0px',
              boxShadow: '14px 14px 22px -13px #151A20',
            }}
          >
            {/* <div className={styles.tempUnav}> */}
            {/* <span>Временно недоступно | Temporarily unavailable</span> */}
            <div className={styles.feedback_inputs}>
              {/*NAME FIELD*/}
              <div className={styles.field_container}>
                <ISTInput
                  inputType={inputTypesVars.any_string}
                  placeholder={
                    currentTranslationFeedbackPage?.translation.namePlaceHolder
                  }
                  required={true}
                  outDataSetter={setName}
                  actualData={name}
                  style={{
                    height: '47px',
                    borderRadius: '25px 89px 89px 89px',
                  }}
                  title={currentTranslationFeedbackPage?.translation.name}
                  ref={nameRef}
                />
              </div>

              {/*PHONE FIELD*/}
              <div className={styles.field_container}>
                <ISTInput
                  inputType={inputTypesVars.phone}
                  placeholder={
                    currentTranslationFeedbackPage?.translation.phonePlaceholder
                  }
                  required={true}
                  outDataSetter={setEmail}
                  actualData={email}
                  style={{
                    height: '47px',
                    borderRadius: '25px 89px 89px 89px',
                  }}
                  inputCaption={
                    currentTranslationFeedbackPage?.translation.enterData
                  }
                  title={currentTranslationFeedbackPage?.translation.phone}
                  ref={phoneRef}
                />
              </div>

              {/*CATEGORY SELECTOR*/}

              <div className={styles.field_container}>
                <ISTSelect
                  title={currentTranslationFeedbackPage?.translation.category}
                  options={getFB_CategoriesArr(FBCategoryItems.data)}
                />
              </div>

              {/*MESSAGE FIELD*/}
              <div className={styles.field_container}>
                <ISTTextArea
                  placeholder={
                    currentTranslationFeedbackPage?.translation
                      .feedBackPlaceholder
                  }
                  title={currentTranslationFeedbackPage?.translation.feedBack}
                  outDataSetter={setMessage}
                  actualData={message}
                  style={{
                    borderRadius: '10px 25px 25px 25px',
                    height: '130px',
                    maxHeight: '150px',
                    minHeight: '50px',
                  }}
                />
              </div>

              {/*SEND FEEDBACK BTN*/}
              <div className={styles.feedback_bottom_comp}>
                <div className={styles.selector_wrapper}>
                  <ISTComponentWrapper
                    title={currentTranslationFeedbackPage?.translation.rating}
                    wrapperClass={styles.feedback_selector}
                  >
                    <RatingSelector
                      inputList={FBRatingItems?.data}
                      getCurrent={() => {}}
                    />
                  </ISTComponentWrapper>
                </div>

                <div className={styles.feedback_btn_container}>
                  <div className={styles.feedback_btn}>
                    <ISTButtonN
                      onClick={sendRequest}
                      theme="dark"
                      accent="secondary"
                      size="S"
                      stylingFor={['hover']}
                      style={{ borderRadius: '15px', borderWidth: '2px' }}
                      options={{ solid: 'gradient' }}
                      title={{
                        caption:
                          currentTranslationFeedbackPage?.translation
                            .sendButton,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </StyledContentWrapper>
        </div>
      </div>

      <ModalView
        alignStyle={{
          vertical: 'end',
        }}
      >
        <FeedBack_modal
          puCloser={() => {
            modalComponent.switch(false)
          }}
          initialList={reviewsDataList}
          pagination={reviewsPagination}
          query={query}
          header={modalComponent.getHeader}
          findingId={findingId}
          locale={locale}
        />
      </ModalView>
    </>
  )
}

export default FeedBackPage
