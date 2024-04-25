import { useAppSelector } from '@root/Hooks/reduxSettings'
import styles from './publicationDesc.module.scss'
import { FC, useEffect } from 'react'
import { THeadingItem } from '../common'

type TPubDescription = {
  title: string
  publications: THeadingItem[]
}

export const PublicationDescription: FC<TPubDescription> = ({
  title,
  publications,
}) => {
  const pubHeading = useAppSelector((selector) => selector.pubHeading)

  return pubHeading.title && pubHeading.headingItems ? (
    <div className={styles.headingPublicationsWrapper}>
      <div className={styles.headingTitle}>{title}</div>
      {publications
        ? publications.map((el, i) => {
            return (
              <div
                key={`${i}_heading_elem_pub`}
                className={`${styles[el.type]}`}
              >
                <a href={`#${el.hook}`}>{el.value}</a>
              </div>
            )
          })
        : null}
    </div>
  ) : null
}
