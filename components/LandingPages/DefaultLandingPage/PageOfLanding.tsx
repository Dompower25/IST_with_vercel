import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import styles from './pageOfLanding.module.scss'
import useWindowDimensions, {
  IWindowSizes,
} from '../../../Hooks/useWindowsDimensions'

import {
  ILandingPage,
  TBackgroundMatrixSize,
  TElementContent,
  TMatrixElement,
} from './common'

const DefaultLandingPage: FC<Partial<ILandingPage>> = ({
  children,
  landingDescription,
  pageBackground,
  pageHook,
}) => {
  const { width, height } = useWindowDimensions()

  const [windowSize, setWindowSize] = useState<IWindowSizes>(null)
  const [rowsBlockSize, setRowsBlockSize] = useState<number>(null)

  const [backMatrix, setBackMatrix] = useState<TBackgroundMatrixSize>(null)
  const [elemsInMatrix, setElemsInMatrix] = useState<Array<TMatrixElement>>([])

  const [elemsContent, setElemsContent] = useState<Array<TElementContent>>([])
  const [bgCrossFilling, setBgCrossFilling] = useState<boolean>(true)

  const defPage = useRef(null)
  const mainLabel = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!mainLabel || !mainLabel.current) return
    mainLabel.current.innerHTML = landingDescription.title
  }, [landingDescription, mainLabel])

  useEffect(() => {
    function difference(a, b) {
      return Math.abs(a - b)
    }

    setWindowSize((prev) => {
      const nHeight = prev?.height
      const nWidth = prev?.width
      if (!nWidth || !nHeight)
        return {
          height,
          width,
        }

      return difference(nHeight, height) > 100 ||
        difference(nWidth, width) > 100
        ? {
            height,
            width,
          }
        : prev
    })
  }, [width, height])

  useEffect(() => {
    if (pageBackground) {
      setElemsContent(pageBackground.backgroundItems)
      setBgCrossFilling(pageBackground.backgroundCrossFilling)
    }
  }, [pageBackground])

  useEffect(() => {
    setBackMatrix({
      rowsNum: 3,
      colsNum: 3,
    })
  }, [windowSize])

  useEffect(() => {
    if (windowSize && backMatrix && elemsContent?.length > 0) {
      const blockSize = windowSize.height / backMatrix.rowsNum
      const itemsInMatrix = backMatrix.colsNum * backMatrix.rowsNum

      const newArr = new Array<TMatrixElement>()

      let contentIndex = 0

      for (let i = 0; i < itemsInMatrix; i++) {
        if (bgCrossFilling)
          if (i % 2 === 0) {
            newArr.push({
              size: blockSize,
              content: {
                data:
                  elemsContent.length >= contentIndex
                    ? elemsContent[contentIndex].data
                    : null,
                contentDistance:
                  elemsContent.length >= contentIndex
                    ? elemsContent[contentIndex].contentDistance
                    : null,
                contentOffset:
                  elemsContent.length >= contentIndex
                    ? elemsContent[contentIndex].contentOffset
                    : null,
              },
            })
          } else {
            newArr.push({
              size: blockSize,
            })
            contentIndex--
          }
        else {
          newArr.push({
            size: blockSize,
            content: {
              data:
                elemsContent.length >= contentIndex
                  ? elemsContent[contentIndex].data
                  : null,
              contentDistance:
                elemsContent.length >= contentIndex
                  ? elemsContent[contentIndex].contentDistance
                  : null,
              contentOffset:
                elemsContent.length >= contentIndex
                  ? elemsContent[contentIndex].contentOffset
                  : null,
            },
          })
        }

        contentIndex++
      }

      setElemsInMatrix(newArr)
      setRowsBlockSize(blockSize * backMatrix.rowsNum + blockSize / 2)
    }
  }, [windowSize, backMatrix, elemsContent, bgCrossFilling])

  const parallax = useCallback((e) => {
    const getItems = (inArr: NodeListOf<Element>): any => {
      if (inArr?.length > 0) return inArr
      return null
    }
    const bgElems = getItems(document.querySelectorAll(`.landing_bg_item`))

    if (bgElems) {
      bgElems.forEach((elem) => {
        const speed = elem.getAttribute('data-speed')

        const x =
          (window.innerWidth - e.pageX * (5 - (1 - parseFloat(speed)) * 10)) /
          100
        const y =
          (window.innerWidth - e.pageY * (5 - (1 - parseFloat(speed)) * 10)) /
          100

        elem.style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    }
  }, [])

  // HANDLE MOUSE MOVING
  useEffect(() => {
    document.addEventListener('mousemove', parallax)
    return () => {
      document.addEventListener('mousemove', parallax)
    }
  }, [parallax])

  // - - - - - - - - - - - - - - - - - - - - - - - -

  return (
    <>
      <div className={styles.defaultLandingPage} id={pageHook} ref={defPage}>
        <div
          // BACKGROUND MATRIX CONTAINER
          style={{
            position: 'absolute',
            top: '0',
            left: 'auto',
            right: '0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'end',
            minHeight: '100px',
            minWidth: '100px',
            zIndex: 0,

            maxWidth: `${
              rowsBlockSize ? rowsBlockSize.toString() + 'px' : 'auto'
            }`,
          }}
        >
          {elemsInMatrix
            ? elemsInMatrix.map((elem, index) => (
                <div
                  style={{
                    width:
                      elem.size * backMatrix.colsNum <= width
                        ? elem.size
                        : width / backMatrix.colsNum - 10 + 'px',
                    height: elem.size,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={`${index}_backElem`}
                >
                  {elem.content ? (
                    <div
                      style={{
                        opacity: elem.content.contentDistance,
                        width: `${elem.content.contentDistance * 150}%`,
                        height: `${elem.content.contentDistance * 150}%`,

                        filter: `blur(${
                          10 - elem.content.contentDistance * 10
                        }px)`,

                        maxWidth: '120%',
                        maxHeight: '120%',

                        transformOrigin: 'center',
                        transform: `translate(${elem.content.contentOffset.left}px, ${elem.content.contentOffset.top}px)`,
                        position: 'relative',
                      }}
                    >
                      <div
                        data-speed={elem.content?.contentDistance}
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        }}
                      >
                        {/*{elem.size}*/}
                        <Image
                          src={elem.content.data}
                          alt={`${index}_backItem`}
                          fill
                          sizes={'100%'}
                          priority={false}
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>

        <div className={`row`}>
          <div className={'col-md-7 d-flex flex-column h-100'}>
            <h1
              ref={mainLabel}
              style={{
                paddingTop: landingDescription?.titleOffset ?? 0,
              }}
            />
            <h2>{landingDescription?.subTitle}</h2>
          </div>
        </div>

        <div
          className={'row d-flex position-static'}
          style={{
            minHeight: '70vh',
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default DefaultLandingPage
