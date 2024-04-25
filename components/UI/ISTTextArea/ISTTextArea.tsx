import React, { CSSProperties, FC, useState } from 'react'

import styles from './textArea.module.scss'
import common_styles from '../scss/common.module.scss'

import { commonStyles } from '../common'

type textAreaStyles = Pick<CSSProperties, 'maxHeight' | 'minHeight'>
interface ITextAreaStyles extends commonStyles, textAreaStyles {}

const defaultStyles = {
  borderRadius: '89px',
  height: '120px',
  maxHeight: '100%',
  minHeight: '50px',
} as ITextAreaStyles

interface ITextArea {
  title?: string
  caption?: string
  placeholder: string

  outDataSetter: React.Dispatch<string>
  actualData: string

  style?: ITextAreaStyles
}

const IstTextArea: FC<ITextArea> = ({
  title,
  caption,
  placeholder,
  outDataSetter,
  actualData,

  style,
}) => {
  const [strtingLgth, setStringLgth] = useState<number>(0)

  const handleWrite = (e: HTMLTextAreaElement) => {
    const lng = e.value.length
    if (lng <= 250) {
      setStringLgth(e.value.length)
      outDataSetter(e.value)
    }
  }

  return (
    <>
      <div className={styles.area_container}>
        <div className={common_styles.title}>{title}</div>

        <div className={common_styles.caption}>{caption}</div>

        <textarea
          placeholder={placeholder}
          onChange={(e) => handleWrite(e.target)}
          value={actualData}
          className={`${common_styles.hover_action} ${common_styles.focus_action}`}
          style={{
            width: '100%',

            height: style?.height ?? defaultStyles.height,
            minHeight: style?.minHeight ?? defaultStyles.minHeight,
            maxHeight: style?.maxHeight ?? defaultStyles.maxHeight,

            borderRadius: style?.borderRadius ?? defaultStyles.borderRadius,
          }}
        />

        <div className={styles.length_limiter}>{strtingLgth}/250</div>
      </div>
    </>
  )
}

export default IstTextArea
