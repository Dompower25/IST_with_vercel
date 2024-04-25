import React, { CSSProperties, FC, useRef, useState } from 'react'
import styles from './select.module.scss'
import common_styles from '../scss/common.module.scss'

import Image from 'next/image'
import selector_img from '../Sources/selector.svg'

interface ISelect {
  title?: string
  caption?: string
  options?: Array<string>

  style?: customStyles
}

type customStyles = Pick<
  CSSProperties,
  'borderRadius' | 'background' | 'border' | 'height'
>

const defaultStyles = {
  borderRadius: '25px 89px 89px 89px',
  border: '2px solid #8BC2FF',
  background: 'linear-gradient(90.57deg, #151A20 0%, #2C3641 100%)',
  height: '50px',
} as customStyles

const IstSelect: FC<ISelect> = ({
  options = Array<string>(),
  title,
  caption,

  style,
}) => {
  const selectorRef = useRef<HTMLSelectElement>(null)
  const [actActual, setActual] = useState<number>(0)
  const [dropdownIsActive, setDropdown] = useState<boolean>(false)

  const onHoverHandler = (e: React.MutableRefObject<HTMLSelectElement>) => {
    e.current?.classList.add(`${styles.select_hovered}`)
  }

  const onUnHoverHandler = (e: React.MutableRefObject<HTMLSelectElement>) => {
    e.current?.classList.remove(`${styles.select_hovered}`)
  }

  return (
    <>
      <div className={common_styles.title}>{title}</div>

      <div className={common_styles.caption}>{caption}</div>

      <div
        className={styles.select_wrapper}
        style={{
          height: style?.height ?? defaultStyles.height,
        }}
      >
        <div
          className={styles.select_choose}
          onMouseMove={() => onHoverHandler(selectorRef)}
          onMouseLeave={() => onUnHoverHandler(selectorRef)}
          onClick={() => setDropdown(!dropdownIsActive)}
        >
          <div className={styles.choose_label}>{options[actActual]}</div>
          <div
            className={`${styles.choose_arrow} ${dropdownIsActive ? styles.active : ''}`}
          >
            <Image
              src={selector_img}
              alt={'Arrow_selector'}
              fill={true}
              style={{
                objectPosition: 'center',
                objectFit: 'contain',
                padding: '13px',
              }}
            />
          </div>
        </div>

        <select
          className={`${styles.select_container} ${common_styles.hover_action} ${common_styles.focus_action}`}
          style={{
            border: style?.border ?? defaultStyles.border,
            background: style?.background ?? defaultStyles.background,
            borderRadius: style?.borderRadius ?? defaultStyles.borderRadius,
          }}
          ref={selectorRef}
        />

        <div
          className={`${styles.dropdown} ${!dropdownIsActive ? styles.hidden : ''}`}
        >
          <ul>
            {options.map((elem, index) => {
              return (
                <li
                  key={`${index}_selector_option`}
                  onClick={() => setActual(index)}
                >
                  {elem}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default IstSelect
