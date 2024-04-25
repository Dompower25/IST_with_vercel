import styles from '../../../../styles/LandingStyles/GalleryComponent/gallery.module.scss'
import Image from 'next/image'
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IGallery } from '../../GalleryTypes'

const Gallery: FC<IGallery> = ({ slides, triggerMobileSize }) => {
  const galleryText = useRef<HTMLParagraphElement>(null)
  const componentWrapper = useRef<HTMLDivElement>(null)
  const galleryItemsWrapperRef = useRef<HTMLDivElement>(null)

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const gallerySelectorClassName = styles.galleryWrapper

  useEffect(() => {
    if (!galleryText?.current) return
    galleryText.current.innerHTML = slides[currentSlide]?.title
  }, [currentSlide, slides])

  const getAllGalleryObjects = useCallback(
    (className: string) => {
      if (!componentWrapper?.current) return
      return componentWrapper.current.querySelectorAll(`.${className}`)
    },
    [componentWrapper],
  )

  const classAdderForElems = (list: NodeListOf<Element>, className: string) => {
    if (!list) return
    list.forEach((item) => {
      item.classList.add(className)
    })
  }

  const classRemoverForElems = (
    list: NodeListOf<Element>,
    className: string,
  ) => {
    if (!list) return
    list.forEach((item) => {
      item.classList.remove(className)
    })
  }

  const hideSlide = useCallback(() => {
    classRemoverForElems(
      getAllGalleryObjects(gallerySelectorClassName),
      styles.show,
    )
  }, [gallerySelectorClassName, getAllGalleryObjects])

  const showSlide = useCallback(() => {
    classAdderForElems(
      getAllGalleryObjects(gallerySelectorClassName),
      styles.show,
    )
  }, [gallerySelectorClassName, getAllGalleryObjects])

  const switchSlide = useCallback(
    (newSlide: number) => {
      hideSlide()
      setTimeout(() => {
        setCurrentSlide(newSlide)
      }, 150)
    },
    [hideSlide],
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newSlide = (currentSlide + 1) % slides.length
      switchSlide(newSlide)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [currentSlide, slides.length, switchSlide])

  const GallerySlides: FC<{
    wrapperClassname?: string
  }> = useCallback(
    ({ wrapperClassname }) => {
      if (!slides || !slides[currentSlide]) return
      return (
        <div
          className={`${
            wrapperClassname ? wrapperClassname : ''
          } ${gallerySelectorClassName}`}
        >
          <Image
            onLoadingComplete={showSlide}
            src={slides[currentSlide]?.image}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt="Gallery_background"
            priority={true}
            sizes={'auto'}
          />
          <div className={styles.galleryShadow} />
        </div>
      )
    },
    [currentSlide, gallerySelectorClassName, showSlide, slides],
  )

  useEffect(() => {
    if (!galleryItemsWrapperRef?.current) return

    const activePoint = galleryItemsWrapperRef.current.querySelector(
      `.${styles.active}`,
    )

    if (!activePoint) return

    const scrollLeftValue =
      activePoint instanceof HTMLElement
        ? activePoint.offsetLeft - galleryItemsWrapperRef.current.scrollLeft
        : 0

    galleryItemsWrapperRef.current.scrollTo({
      top: 0,
      left: scrollLeftValue,
      behavior: 'smooth',
    })
  }, [currentSlide, galleryItemsWrapperRef])

  return (
    <div
      ref={componentWrapper}
      className={
        triggerMobileSize ? styles[`mainWrapper_${triggerMobileSize}`] : ''
      }
    >
      <div className={styles.galleryMobile}>
        <GallerySlides />
      </div>
      <div className={styles.galleryContainer}>
        <div>
          <div>
            <GallerySlides wrapperClassname={styles.galleryImage} />

            <div className={styles.content}>
              <div className={styles.contentWrapper}>
                <p ref={galleryText} />
              </div>
            </div>

            <div className={styles.galleryList}>
              <div className={styles.galleryItemsWrapper}>
                <div ref={galleryItemsWrapperRef}>
                  {slides.map(({}, point_i) => {
                    return (
                      <div key={`${point_i}_gal_point`}>
                        <button
                          className={
                            point_i === currentSlide
                              ? `${styles.galleryPoint} ${styles.active}`
                              : `${styles.galleryPoint}`
                          }
                          onClick={() => {
                            point_i !== currentSlide
                              ? switchSlide(point_i)
                              : null
                          }}
                        >
                          <div className={styles.imageWrapper}>
                            <Image
                              src={slides[point_i].image}
                              alt={`${point_i}_galleryPoint`}
                              fill
                              style={{
                                opacity:
                                  point_i === currentSlide ? '100%' : '60%',
                              }}
                              priority={true}
                              sizes={'auto'}
                            />
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
