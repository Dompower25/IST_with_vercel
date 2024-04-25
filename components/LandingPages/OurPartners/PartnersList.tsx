import styles from '../../../styles/OurPartners/ourPartnersParticles.module.scss'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import useWindowDimensions from '../../../Hooks/useWindowsDimensions'
import { string } from 'prop-types'
import { IGallery } from '../GalleryTypes'
import Image from 'next/image'

export enum sliderPositionVar {
  bottom = 'column',
  side = 'row',
}

//

type adaptiveSizes = {
  windowWidth: number
  rows: number
  cols: number
  sliderOption: sliderPositionVar
  maxWidth?: string
}

interface IPartnersList {
  items: IGallery
  layout: Array<adaptiveSizes>
}

const PartnersList: FC<IPartnersList> = ({ items, layout }) => {
  const [actualSlide, setActualSlide] = useState(0)
  const [slides, setSlides] = useState<Array<IGallery>>(null)
  const [slideSize, setSlideSize] = useState<number>(8)

  const [styleOption, setStyleOption] = useState<adaptiveSizes>({
    rows: 2,
    cols: 4,
    windowWidth: 991.98,
    sliderOption: sliderPositionVar.bottom,
    maxWidth: '400px',
  })

  const [itemSize, setItemSize] = useState<number>(10)

  const { width } = useWindowDimensions()

  const listBlock = useRef(null)
  const pointersBlock = useRef(null)
  const partnersList_item = useRef(null)

  useEffect(() => {
    if (styleOption) {
      setSlideSize(styleOption.rows * styleOption.cols)
    }
  }, [styleOption])

  useEffect(() => {
    const outSlides: Array<IGallery> = []

    if (items && slideSize) {
      for (let i = 0; i < items.slides.length; i += slideSize) {
        const chunk = items.slides.slice(i, i + slideSize)
        const newSlide: IGallery = {
          slides: chunk,
        }

        outSlides.push(newSlide)
      }
    }
    setSlides(outSlides)
  }, [items, slideSize])

  useEffect(() => {
    if (layout && layout.length > 0) {
      layout.sort((a, b) => (a.windowWidth > b.windowWidth ? 1 : -1))

      layout.map((style) => {
        if (style.windowWidth <= width) {
          setStyleOption(style)
        }
      })
    }
  }, [width, layout])

  useEffect(() => {
    if (listBlock && styleOption) {
      const parentSize = listBlock.current.clientWidth
      const colsNum = Math.floor(slideSize / styleOption.rows)
      const itemSize = Math.floor(parentSize / colsNum) - 5

      setItemSize(itemSize)
    }
  }, [listBlock, width, styleOption, slideSize])

  const switchActPage = (newPageIndex: number) => {
    const pageNow = actualSlide

    if (listBlock.current) {
      const onePageW = listBlock.current.offsetWidth
      const actScroll = Math.abs(newPageIndex - pageNow) * onePageW

      if (pageNow < newPageIndex) listBlock.current.scrollLeft += actScroll
      else if (pageNow > newPageIndex) listBlock.current.scrollLeft -= actScroll
    }
    setActualSlide(newPageIndex)
  }

  return (
    <>
      <div
        style={{
          height: styleOption.rows * itemSize + 50,
          maxWidth: styleOption.maxWidth ? styleOption.maxWidth : null,
        }}
      >
        <div
          className={styles.partnersList_content}
          style={{
            display: 'flex',
            flexDirection: styleOption ? styleOption.sliderOption : 'column',
          }}
        >
          <div className={styles.partnersList} ref={listBlock}>
            {slides
              ? slides.map((elem, index) => (
                  <div
                    className={styles.partnersPage}
                    key={`${index}_partPage`}
                    style={{
                      justifyContent:
                        elem.slides.length === slideSize
                          ? 'center'
                          : 'flex-start',
                    }}
                  >
                    {elem.slides.map((slide, i_slide) => (
                      <div
                        className={styles.partnersList_item}
                        key={`slide_item_${i_slide}`}
                        style={{
                          width: itemSize,
                          height: itemSize,
                        }}
                      >
                        <div className={styles.item_image_container}>
                          <Image
                            src={slide.image}
                            alt={slide.image}
                            fill={true}
                            style={{
                              objectFit: 'contain',
                              objectPosition: 'center',
                            }}
                            priority={false}
                            sizes={'auto'}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              : null}
          </div>

          <div
            className={`${styles.listPointer} ${styleOption.sliderOption === sliderPositionVar.side ? styles.column : null}`}
            ref={pointersBlock}
          >
            {slides && slides.length > 1
              ? slides.map((elem, index) => (
                  <div
                    className={styles.pointerBody}
                    key={`${index}_pointer`}
                    onMouseOver={() => switchActPage(index)}
                  >
                    <div
                      className={`${styles.pointer} 
                                        ${index === actualSlide ? styles.active : null}`}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default PartnersList
