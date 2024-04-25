import React, { CSSProperties, FC, ReactNode, useEffect, useMemo } from 'react'
import styles from '@root/styles/Modals/popUp/puWrapper.module.scss'

interface puWrapper {
  style?: Pick<CSSProperties, 'padding'>
  children?: ReactNode
  onClose: () => void
  header: string
  paragraph: string
}

const PuWrapper: FC<puWrapper> = ({
  header,
  paragraph,
  children,
  style,
  onClose,
}) => {
  return (
    <>
      <div className={styles.default_pu_bg} />
      <div className={`${styles.modalBase}`}>
        <div className={styles.modalHeader}>
          {header}
          <span>{paragraph}</span>
          <button className={styles.closer} onClick={onClose} />
        </div>
        <div className={styles.contentWrapper} style={style}>
          {children}
        </div>
      </div>
    </>
  )
}

export default PuWrapper
