import styles from './index.module.scss'
import { FC, CSSProperties } from 'react'

interface ICheckBoxStyles
  extends Pick<CSSProperties, 'borderRadius' | 'margin' | 'width'> {}

interface IProductSelector {
  state: boolean
  onSelect: (...props: any) => any
  style?: ICheckBoxStyles
}

export const ProductItemSelector: FC<IProductSelector> = ({
  state,
  onSelect,
  style,
}) => {
  return (
    <>
      <div
        className={styles.CheckBoxContainer}
        onClick={onSelect}
        style={{
          width: style?.width ? style?.width : '35px',
          margin: style?.margin ? style?.margin : undefined,
        }}
      >
        <div
          className={styles.checkmark_container}
          style={{
            borderRadius: style?.borderRadius ? style?.borderRadius : '100%',
          }}
        >
          <div
            className={`${styles.checkmark} ${state ? styles.active : ''}`}
          />
        </div>
      </div>
    </>
  )
}
