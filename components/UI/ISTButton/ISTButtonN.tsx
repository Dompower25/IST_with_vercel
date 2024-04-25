import React, {
  CSSProperties,
  FC,
  HTMLAttributes,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { commonStyles, mobileTrigger_size } from '../common'

import styles from './button.module.scss'
import common_styles from '../scss/common.module.scss'
import Image from 'next/image'
import { type } from 'os'

export enum direction {
  ltr = 'ltr',
  rtl = 'rtl',
}

type btnProps = { fillContainer?: boolean; borderSize?: string }
interface btnStyles extends commonStyles, btnProps {}

// STYLING TYPES
type shadowAction_focus = 'focus'
type shadowAction_hover = 'hover'
type solid_styling_postfix = 'solid'

// VIEW PROPS
type styling_accent_property = 'accent'
type styling_size_property = 'size'
type styling_solid_property = 'solid'

// COMPONENT PROPS
type stylingFor = Array<
  shadowAction_focus | shadowAction_hover | 'active' | 'constantly'
>

type size = 'S' | 'M' | 'L'
type accent = 'important' | 'secondary' | 'inactive'
type solid = 'filling' | 'gradient'
type theme = 'dark' | 'light'

interface options {
  solid: solid
}
interface ITitle {
  caption: string
}
interface IImage {
  id?: string
  src: string
}

interface IStyle extends Pick<CSSProperties, 'borderRadius' | 'borderWidth'> {}

interface btnSelfTheme {
  title: ITitle
  // image?: IImage;
  // direction?: direction;
  size: size
  accent: accent
  stylingFor?: stylingFor
  theme: theme
  options?: options
  style?: IStyle
  onClick?(ev?: React.MouseEvent): any
  mobileTriggerSize?: mobileTrigger_size
}

interface btnComponent extends btnSelfTheme {}

const IstButtonN: FC<btnComponent> = ({
  title,
  size,
  accent,
  theme,
  style,
  mobileTriggerSize,
  options,
  stylingFor,
  onClick,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)

  const removeStylingProps = useCallback(
    (
      property_type:
        | styling_size_property
        | styling_accent_property
        | styling_solid_property,
    ) => {
      if (!btnRef?.current) return

      const classList = btnRef.current.classList
      const classesToRemove = Array.from(classList).filter((className) =>
        className.includes(property_type),
      )

      classesToRemove.forEach((className) => {
        classList.remove(className)
      })
    },
    [btnRef],
  )

  const switchSizeProperty = useCallback(
    (property_type: styling_size_property, newProperty: size) => {
      if (!newProperty) return
      removeStylingProps(property_type)
      btnRef.current.classList.add(styles[`${property_type}_${newProperty}`])
    },
    [removeStylingProps],
  )

  const switchAccentProperty = useCallback(
    (property_type: styling_accent_property, newProperty: accent) => {
      if (!newProperty) return
      removeStylingProps(property_type)
      btnRef.current.classList.add(styles[`${property_type}_${newProperty}`])
    },
    [removeStylingProps],
  )

  const switchSolidProperty = useCallback(
    (property_type: styling_solid_property, newProperty: solid) => {
      if (!newProperty) return
      removeStylingProps(property_type)
      btnRef.current.classList.add(styles[`${property_type}_${newProperty}`])
    },
    [removeStylingProps],
  )

  // useEffect(() => {
  //   switchAccentProperty("accent", accent);
  // }, [accent, switchAccentProperty]);

  useEffect(() => {
    switchSizeProperty('size', size)
  }, [size, switchSizeProperty])

  useEffect(() => {
    options && options.solid
      ? switchSolidProperty('solid', options?.solid)
      : switchAccentProperty('accent', accent)
  }, [accent, options, switchSolidProperty, switchAccentProperty])

  return (
    <>
      <button
        style={{
          borderRadius: style?.borderRadius ? style?.borderRadius : '10px',
          ...style,
        }}
        className={`${styles.btn} 
        ${stylingFor
          ?.map((el) => {
            return styles[el]
          })
          .join('\t')} 
          ${mobileTriggerSize ? styles[mobileTriggerSize] : ''}`}
        ref={btnRef}
        onClick={(event) => (onClick ? onClick(event) : {})}
      >
        <div
          className={`${styles.btn_title}`}
          style={{
            flexGrow: !title ? 0 : 1,
          }}
        >
          {title?.caption ? title.caption : 'ISTButtonN'}
        </div>
      </button>
    </>
  )
}

export default IstButtonN
