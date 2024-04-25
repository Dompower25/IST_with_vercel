import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { reviewItem } from '../../../../queries/landingFeatures/feedbackPage/getFB_Reviews'
import { cstmStyles } from '../../common'
import ISTComment, { styleProps } from '../ISTComment'

interface IPrintComments {
  data: Array<reviewItem>
  uniqueKeyDesignation: string
  customAdaptiveStyles?: cstmStyles
  listWrapperClassName?: string
  everyItemWrapperClassName?: string
  componentInnerStyles?: styleProps

  desiredRef?: ForwardedRef<HTMLDivElement>
  desiredId?: number | string
}

interface desired {
  id: string
  found: boolean
}

interface desiredReview {
  getId: () => string
  wasFound: () => boolean
}

interface desiredEvent {
  event: (...props: any) => any
}

const useISTReviews = () => {
  const desired = {
    id: '0',
    found: false,
  } as desired

  const desiredReview = {} as desiredReview
  const desiredEvent = {} as desiredEvent

  desiredReview.getId = function (des: desired = desired) {
    return des.id
  }

  desiredReview.wasFound = function (des: desired = desired) {
    return des.found
  }

  const callBack = (id: string): void => {
    desired.id = id
    desiredEvent.event ? desiredEvent.event() : {}
  }

  const foundSetter = (isDesired: boolean): boolean => {
    if (!desired.found) desired.found = isDesired

    return isDesired
  }

  const printComments = (options: IPrintComments) => {
    function getOutComment(el: reviewItem, i: number) {
      return (
        <ISTComment
          key={`fb_page_review_item_${i}_${options.uniqueKeyDesignation}`}
          name={el?.name ?? 'John Doe'}
          rate={el?.rating_src ?? ''}
          comment={
            el?.message ??
            'Lorem ipsum dolor sit amet, ' +
              'consectetur adipiscing elit. Nullam elementum ac ' +
              'nunc ultricies luctus. Aenean nec tempor justo. '
          }
          category={el?.category ?? 'Category get err'}
          customAdaptiveStyles={options.customAdaptiveStyles ?? null}
          style={options.componentInnerStyles ?? {}}
          desiredRef={options.desiredRef ?? null}
          isDesired={foundSetter(
            el.id.toString() === options.desiredId?.toString(),
          )}
          event={() => callBack(el.id.toString())}
        />
      )
    }

    return (
      <div className={`${options.listWrapperClassName ?? ''}`}>
        {options.data?.map((el, i) => {
          if (!options.everyItemWrapperClassName) return getOutComment(el, i)
          else
            return (
              <div
                className={options.everyItemWrapperClassName}
                key={`fb_page_wrapped_review_item_${i}_${options.uniqueKeyDesignation}`}
              >
                {getOutComment(el, i)}
              </div>
            )
        })}
      </div>
    )
  }

  return {
    printComments,
    desiredReview,
    desiredEvent,
  }
}

export default useISTReviews
