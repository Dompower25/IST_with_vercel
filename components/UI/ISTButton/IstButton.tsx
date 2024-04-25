import styles from '../../../styles/UI_addons/IstButton.module.scss'
import React, { FC, useEffect, useRef, useState } from 'react'
import { CSSProperties } from 'react'
import { SetStateAction } from 'react'

type paddingsOptions = {
  horizontalPadding: number
  paddingFactor: number
}

type maxSizeType = {
  w?: string
  h?: string
}

type sizeType = {
  w?: string
  h?: string
}

type styleColor = {
  usualColor: string
  actionColor?: string
  fontColor?: string
}

interface buttonOptions {
  title: string
  maxSize?: maxSizeType
  size?: sizeType
  paddings?: paddingsOptions

  primary?: boolean

  styleColor?: styleColor
  borderSize?: number
  borderRadius?: string

  customStyles?: CSSProperties
  buttonAction?: (props: any) => any | void
}

const IstButton: FC<buttonOptions> = ({
  title = '',
  maxSize,
  size,
  paddings,
  primary,
  styleColor,
  borderSize,
  borderRadius,
  buttonAction,
  // customStyles
}) => {
  const [btnStyleColor, setStyleColor] = useState<styleColor>({
    usualColor: '#76ACE7',
    actionColor: '#4B5787',
    fontColor: '#ffffff',
  })

  const btnTitle = useRef(null)
  const btnSelf = useRef(null)

  const pastEmptyText = (textLength: number): string => {
    let newStr = new String()
    for (let i = 0; i < textLength; i++) {
      newStr += '⊠'
    }
    return newStr.toString()
  }

  const hoverAnimation = (isPrimary: boolean) => {
    if (!isPrimary) {
      // btnSelf.current.style.backgroundColor = btnStyleColor.actionColor;
      // btnSelf.current.style.borderColor = btnStyleColor.actionColor;
      btnSelf.current.style.boxShadow = `0px 0px 5px ${btnStyleColor.usualColor}`
    } else {
      // btnSelf.current.style.backgroundColor = btnStyleColor.actionColor;
      // btnSelf.current.style.borderColor = btnStyleColor.actionColor;
      btnSelf.current.style.boxShadow = `0px 0px 5px ${btnStyleColor.usualColor}`
    }
  }

  const unHoverAnimation = (isPrimary: boolean) => {
    if (!isPrimary) {
      btnSelf.current.style.backgroundColor = 'transparent'
      btnSelf.current.style.borderColor = btnStyleColor.usualColor
      btnSelf.current.style.boxShadow = `none`
    } else {
      btnSelf.current.style.backgroundColor = btnStyleColor.usualColor
      btnSelf.current.style.borderColor = btnStyleColor.usualColor
      btnSelf.current.style.boxShadow = 'none'
    }
  }

  useEffect(() => {
    if (
      styleColor &&
      /^#([0-9A-F]{3}){1,2}$/i.test(styleColor?.usualColor) &&
      /^#([0-9A-F]{3}){1,2}$/i.test(styleColor?.actionColor) &&
      /^#([0-9A-F]{3}){1,2}$/i.test(styleColor?.fontColor)
    )
      setStyleColor({
        usualColor: styleColor.usualColor,
        actionColor: styleColor.actionColor,
        fontColor: styleColor.fontColor,
      })
  }, [])

  return (
    <>
      <button
        className={styles.button}
        onClick={buttonAction}
        ref={btnSelf}
        style={{
          borderRadius: borderRadius ? borderRadius : '20px',

          maxWidth: maxSize?.w ? maxSize?.w : 'auto',
          maxHeight: maxSize?.h ? maxSize?.h : 'auto',

          width: size?.w ? size?.w : 'fit-content',
          height: size?.h ? size?.h : 'fit-content',

          padding: paddings
            ? paddings.horizontalPadding / paddings.paddingFactor
            : 0,

          border: borderSize
            ? `solid ${borderSize}px ${btnStyleColor.actionColor}`
            : `solid 3px ${btnStyleColor.usualColor}`,

          backgroundColor: primary ? btnStyleColor.usualColor : 'transparent',
        }}
      >
        <a className={styles.hiddenTitle} ref={btnTitle}>
          {pastEmptyText(title.length)}
        </a>

        <div className={styles.buttonTitle}>
          <p
            style={{
              width: 'auto',
              color: btnStyleColor?.fontColor,
              padding: '0px',
              margin: '0px',
              top: '0',
              bottom: '0',
            }}
          >
            {title}
          </p>
        </div>

        <div
          className={styles.actionsObserver}
          onMouseOver={() => hoverAnimation(primary)}
          onMouseLeave={() => unHoverAnimation(primary)}
        />
      </button>
    </>
  )
}

export default IstButton
