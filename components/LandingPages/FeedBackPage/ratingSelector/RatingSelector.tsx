import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../../../styles/FeedBackPage/RatingSelector/ratingSelector.module.scss'
import Image from 'next/image'
import moreEmoji from '../../../../public/Components/RatingSeector/more.svg'
import closerImg from '../../../../public/Components/RatingSeector/closer.svg'
import { element } from 'prop-types'

export interface IRatingList {
  rating?: Array<rating>
}

export type rating = {
  src: string
  tags: Array<string>
  advantage: boolean
}

type selectedStatus = {
  selected: boolean
}

interface selector {
  inputList: IRatingList
  getCurrent?: React.Dispatch<rating>
}

interface selectedItem extends rating, selectedStatus {}

const RatingSelector: FC<selector> = ({ inputList, getCurrent }) => {
  const [listOpen, setListOpen] = useState<boolean>(false)

  const [advantageEmoji, setAdvantage] = useState<Array<selectedItem>>(null)
  const [allEmoji, setAllEmoji] = useState<Array<selectedItem>>(null)

  // const handleUserKeyPress = useCallback(event => {
  //     if(!event.target?.classList.contains(
  //         styles.listOfRatings || styles.
  //     )){
  //         setListOpen(false);
  //     }
  // }, []);
  //
  // useEffect(() => {
  //     window.addEventListener("click", handleUserKeyPress);
  //     return () => {
  //         window.removeEventListener("click", handleUserKeyPress);
  //     };
  // }, [handleUserKeyPress]);

  useEffect(() => {
    if (inputList) {
      const advEm: Array<selectedItem> = []
      inputList.rating.map((e, i) => {
        if (e.advantage) advEm.push({ selected: false, ...e })
      })
      setAdvantage(advEm)

      const all: Array<selectedItem> = []
      inputList.rating.map((e, i) => {
        all.push({ selected: false, ...e })
      })
      setAllEmoji(all)
    }
  }, [inputList])

  const select = (item: selectedItem, fromFullList: boolean) => {
    function setSel(
      arr: Array<selectedItem>,
      item: selectedItem,
    ): Array<selectedItem> {
      const newArr: Array<selectedItem> = []

      arr.map((e, i) => {
        if (e.src === item.src) newArr.push({ ...e, selected: true })
        else newArr.push({ ...e, selected: false })
      })

      return newArr
    }

    if (fromFullList) {
      const newAdv: Array<selectedItem> = advantageEmoji

      let objEx: boolean = false
      newAdv.map((e, i) => {
        if (item.src === e.src) {
          e.selected = true
          objEx = true
        }
      })
      if (!objEx) {
        newAdv.unshift(item)
        if (newAdv.length > 3) newAdv.pop()
      }

      setAdvantage(setSel(newAdv, item))
      setAllEmoji(setSel(allEmoji, item))
    } else {
      setAllEmoji(setSel(allEmoji, item))
      setAdvantage(setSel(advantageEmoji, item))
    }

    if (getCurrent) getCurrent({ ...item })
  }

  return (
    <div className={styles.component_body}>
      <div
        className={`${styles.listOfRatings} ${!listOpen ? styles.l_hidden : ''}`}
      >
        {/*CLOSER*/}
        <div className={styles.closer_btn} onClick={() => setListOpen(false)}>
          <Image
            src={closerImg}
            alt={'closer_emoji_l_block_img'}
            fill={true}
            style={{
              objectPosition: 'center',
              objectFit: 'contain',
              padding: '8px',
            }}
          />
        </div>

        {/*EMOJI LIST*/}
        <div className={styles.itemsWrapper}>
          {allEmoji?.map((e, i) => (
            <div
              key={`${i}_l_rating_item`}
              className={styles.ratingItemWrapper_l}
              onClick={() => select(e, true)}
            >
              <div
                className={`${styles.rating_item_l} ${e.selected ? styles.selected : ''}`}
              >
                <Image
                  src={e.src}
                  alt={e.tags.join('-')}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*SMALL SELECTOR*/}

      <div
        className={`${styles.rating_container} ${listOpen ? styles.sm_hidden : ''}`}
      >
        {advantageEmoji?.map((elem, i) => (
          <div
            key={`${i}_emoji_sm_item`}
            className={`${styles.rating_item} ${elem.selected ? styles.selected : ''}`}
            onClick={() => {
              select(elem, false)
            }}
          >
            <Image
              src={elem.src}
              alt={elem.tags.join('-')}
              fill={true}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ))}

        <div
          className={`${styles.rating_item} 
                ${styles.select_btn}`}
          onClick={() => setListOpen(true)}
        >
          <Image
            src={moreEmoji}
            alt={'more_emoji_img'}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              padding: '5px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RatingSelector
