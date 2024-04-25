import React, { FC } from 'react'
import common_styles from '../scss/common.module.scss'

interface componentWrapper {
  title: string
  children: React.ReactNode
  wrapperClass?: string
}

const IstComponentWrapper: FC<componentWrapper> = ({
  title,
  wrapperClass,
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div className={common_styles.title}>{title}</div>
      <div className={wrapperClass ? wrapperClass : ''}>{children}</div>
    </div>
  )
}

export default IstComponentWrapper
