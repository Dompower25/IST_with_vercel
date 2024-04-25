import { FC } from 'react'
import styles from './geometryViewer.module.scss'
import Image from 'next/image'

type TGeometryDescription = {
  description: string
  regexLineBreaker?: RegExp
}

interface IGeometryViewer {
  geometryImage: string
  description?: TGeometryDescription
}

export const GeometryViewer: FC<IGeometryViewer> = ({
  geometryImage,
  description,
}) => {
  return (
    <div className={styles.viewerContainer}>
      <div className={styles.image}>
        <div className={styles.imageContainer}>
          <Image
            src={geometryImage}
            alt={'Geometry image'}
            fill
            style={{
              objectFit: 'contain',
              objectPosition: 'center',
              mixBlendMode: 'multiply',
            }}
          />
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionContainer}>
          {description && description.regexLineBreaker
            ? description.description
                .split(description.regexLineBreaker)
                .map((el) => {
                  return <a key={`${el}_sizes_d`}>{el}</a>
                })
            : description && !description.regexLineBreaker
              ? description.description
              : ''}
        </div>
      </div>
    </div>
  )
}
