import React, { CSSProperties, FC } from 'react'
import styles from './styledContentWrapper.module.scss'

type customStyles = Pick<CSSProperties, 'borderRadius' | 'boxShadow'>

interface IContentWrapper {
  title?: string
  style?: customStyles | undefined

  children: React.ReactNode
}

const defaultStyles: customStyles = {
  borderRadius: '46px 46px 46px 0px',
  boxShadow: '14px 14px 22px -13px rgba(0, 0, 0, 0.21)',
} as CSSProperties

const StyledContentWrapper: FC<IContentWrapper> = ({
  children,

  title,
  style,
}) => {
  return (
    <>
      <div
        className={styles.wrapper_container}
        style={style ?? { ...defaultStyles }}
      >
        <div className={styles.wrapper_header}>{title}</div>
        {children}
      </div>
    </>
  )
}

export default StyledContentWrapper
