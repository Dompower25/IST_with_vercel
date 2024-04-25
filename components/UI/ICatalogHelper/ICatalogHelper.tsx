import React, { CSSProperties, FC, useState } from 'react'
import styles from './ICatalogHelper.module.scss'
import CatalogHelperButton from './ICatalogHelperButton'

type customStyle = Pick<CSSProperties, 'zIndex'>

interface ISTBottomMenuItem {
  icon: string
  title: string
  actionFoo?: (...props: any) => any
}

interface ISTBottomMenu {
  items: Array<ISTBottomMenuItem>
  style?: customStyle
}

const ICatalogHelper: FC<ISTBottomMenu> = ({ items, style }) => {
  const [currentHelper, setCurrentHelper] = useState<number>(null)

  return (
    <div className={styles.catalog_help_mobile} style={style ? style : null}>
      <div className={styles.catalog_help_mobile_options}>
        {items?.map((el, i) => {
          return (
            <CatalogHelperButton
              idx={i}
              key={`HELPER_${i}`}
              title={el.title}
              icon={el.icon}
              isCurrent={currentHelper === i}
              action={setCurrentHelper}
              foo={el.actionFoo}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ICatalogHelper
