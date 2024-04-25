import Image from 'next/image'
import React, { FC } from 'react'
import styles from './ICatalogHelperButton.module.scss'

interface ICatalogHelperButton {
  idx: number
  icon: string
  title: string
  isCurrent: boolean
  action: React.Dispatch<number>
  foo: (...props: any) => any
}

const CatalogHelper: FC<ICatalogHelperButton> = ({
  idx,
  title,
  icon,
  isCurrent,
  action,
  foo,
}) => {
  return (
    <div>
      <div
        className={`${styles.mobile_helper_button} ${
          isCurrent ? styles.active : ''
        }`}
        onClick={() => {
          action(idx)
          foo()
        }}
      >
        <Image src={icon} alt={title} />
        <div className={styles.title}>{title}</div>
        <br />
      </div>
    </div>
  )
}

export default CatalogHelper
