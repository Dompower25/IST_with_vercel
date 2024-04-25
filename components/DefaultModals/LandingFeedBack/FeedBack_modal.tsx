import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../../styles/Modals/feedBack/feedBackModal.module.scss'
import Image from 'next/image'
import fb_closer_img from '../../../public/LandingPages/FeedBack/FullList/PU_closer.svg'

import fullList_comments_adaptive from '../../../styles/FeedBackPage/feedbackFullList/fullListCommentsAdaptive.module.scss'
import show_all_img from '../../../public/LandingPages/FeedBack/FullList/show_all.svg'
import {
  getFB_Reviews,
  reviewItem,
} from '../../../queries/landingFeatures/feedbackPage/getFB_Reviews'
import { IQueryPaginationVariable } from '../../../queries/common'
import { QueryResult } from '@apollo/client'
import useISTReviews from '../../UI/ISTComment/hook/useISTReviews'

interface FB_Modal {
  initialList: Array<reviewItem>
  pagination: IQueryPaginationVariable
  query: QueryResult
  locale: string

  puCloser: () => any
  header: string
  findingId?: number | string
}

const FeedBackModal: FC<FB_Modal> = ({
  initialList,
  pagination,
  query,
  puCloser,
  header,
  findingId,
  locale,
}) => {
  const fb_wrapper = useRef<HTMLDivElement>(null)
  const reviews_wrapper = useRef<HTMLDivElement>(null)
  const desiredRef = useRef<HTMLDivElement>(null)

  const [listIsDeployed, setListDeployed] = useState<boolean>(false)

  const [reviewsList, setReviewsList] = useState<Array<reviewItem>>(initialList)
  const [reviewsPagination, setReviewsPagination] =
    useState<IQueryPaginationVariable>(pagination)
  const [isLoading, setLoading] = useState<boolean>(false)

  const { printComments } = useISTReviews()

  const handleCloser = () => {
    puCloser()
  }

  const openFullList = useCallback(() => {
    if (!listIsDeployed) {
      setListDeployed(true)
      if (fb_wrapper && fb_wrapper.current)
        fb_wrapper.current.classList.add(styles.deployed_wrapper)
    }
  }, [fb_wrapper, listIsDeployed])

  useEffect(() => {
    if (findingId) openFullList()
  }, [findingId, openFullList])

  useEffect(() => {
    if (desiredRef && desiredRef.current) {
      if (reviews_wrapper && reviews_wrapper.current) {
        // desiredRef.current.style.border = "solid 1px red";
        const offsetTop = desiredRef.current.offsetTop
        const scrollerK = reviews_wrapper.current.offsetHeight / 2

        if (listIsDeployed) {
          reviews_wrapper.current.scrollTo({
            left: 0,
            top: offsetTop - scrollerK,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [listIsDeployed, reviews_wrapper, desiredRef])

  // [LOAD MORE]: Scroll handler
  const onLoadMore = useCallback(() => {
    if (!reviewsList || !reviewsPagination || !query) return
    query
      .fetchMore({
        variables: {
          code: locale || '',
          limit: pagination.limit || 0,
          offset: pagination.offset + pagination.limit || 0,
        },
      })
      .then((el) => {
        if (el.loading) {
          setLoading(true)
        } else if (el.data) {
          setLoading(false)
          const newData = getFB_Reviews(el.data)
          setReviewsList((current) => [...reviewsList, ...newData])

          setReviewsPagination({
            ...reviewsPagination,
            offset: reviewsPagination.offset + reviewsPagination.limit,
          })
        }
      })
  }, [locale, pagination, query, reviewsList, reviewsPagination])

  const onReviewsWrapperScroll = useCallback(() => {
    if (reviews_wrapper.current) {
      const win = reviews_wrapper.current
      if (win.scrollHeight - win.scrollTop === win.clientHeight) onLoadMore()
    }
  }, [onLoadMore])

  useEffect(() => {
    if (reviews_wrapper && reviews_wrapper.current) {
      const win = reviews_wrapper.current

      win.addEventListener('scroll', onReviewsWrapperScroll)
      return () => {
        win.removeEventListener('scroll', onReviewsWrapperScroll)
      }
    }
  }, [onReviewsWrapperScroll])
  // - - - - - - - - - - - - -

  //LOADING
  useEffect(() => {
    if (reviews_wrapper && reviews_wrapper.current) {
      isLoading
        ? reviews_wrapper.current.classList.add(styles.loading_state)
        : reviews_wrapper.current.classList.remove(styles.loading_state)
    }
  }, [reviews_wrapper, isLoading])
  // - - - - - - -- - - - - -

  return (
    <>
      {/*MODAL BACKGROUND*/}
      <div className={styles.fb_modal_bg} />

      <div
        className={styles.feedback_data_wrapper}
        ref={fb_wrapper}
        onWheel={() => openFullList()}
        onTouchMove={() => openFullList()}
      >
        <div className={styles.feedback_closer} onClick={() => handleCloser()}>
          <Image
            src={fb_closer_img}
            alt={'close this window'}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              padding: '10px',
            }}
          />
        </div>

        <div className={styles.feedback_data}>
          <div className={styles.feedback_data_header}>
            <div className={styles.feedback_title}>{header}</div>
          </div>

          <div className={styles.feedback_comments} ref={reviews_wrapper}>
            {printComments({
              data: reviewsList,
              uniqueKeyDesignation: 'modal_review_item',
              customAdaptiveStyles: fullList_comments_adaptive,
              listWrapperClassName: styles.fb_comments_wrapper,
              everyItemWrapperClassName: styles.fb_comment_container,
              desiredId: findingId,
              desiredRef: desiredRef,
            })}
          </div>

          <div className={styles.feedback_more_comments} onClick={openFullList}>
            <Image
              src={show_all_img}
              alt={'show all comments'}
              className={styles.feedback_more_comments_img}
              width={30}
              height={18}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedBackModal
