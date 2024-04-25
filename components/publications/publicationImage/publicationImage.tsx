/* eslint-disable @next/next/no-img-element */

import React, { Children, FC, useEffect } from 'react'
import { ReactElement, ReactNode } from 'react'
import Image from 'next/image'
import styles from "./publicationsImage.module.scss"

const ImageTypeName = 'img'
interface ImageContainerProps {
  children: ReactNode
}

export const PublicationImage: FC<ImageContainerProps> = ({ children }) => {
  const extractParagraphs = (child: ReactNode): ReactElement => {
    if (React.isValidElement(child) && child.type === 'p') {
      const paragraphChildren = React.Children.toArray(child.props.children)
      if (paragraphChildren && paragraphChildren.length >= 1)
        return extractParagraphs(paragraphChildren[0]) as ReactElement
      else return undefined as ReactElement
    }

    return child as ReactElement
  }

  return (
    <>
      {Children.map(children, (child: ReactElement) => {
        return extractParagraphs(child)?.type !== ImageTypeName ? (
          child
        ) : (
          <div
            className={styles.imageWrapper}
            style={{
              backgroundImage: `url(${extractParagraphs(child).props.src || ''})` /* Укажите путь к оригинальному изображению */,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              width: '100%',
              height: '350px',
              padding: '15px 0',
            }}
          >
            <div
              style={{
                width: 'fit-content',
                margin: '0 auto',
                borderRadius: '30px',
                position: 'relative',
                height: '100%',
                zIndex: '1',
                borderRight: 'inherit',
              }}
            >
              <div className={styles.targetImageContainer} />
              <img
                src={extractParagraphs(child).props.src || ''}
                alt=""
                style={{
                  visibility: 'hidden',
                  height: '100%',
                }}
              />

              <Image
                src={extractParagraphs(child).props.src || ''}
                quality={50}
                sizes={'350'}
                alt={extractParagraphs(child).props.alt}
                fill
                style={{
                  objectFit: 'cover',
                  borderRadius: 'inherit',
                }}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}
