import { FC } from 'react'
import styles from './mobileHeaderItem.module.scss'
import { THeaderNavigationItem } from '../baseHeader/baseHeader'

interface INavigationItem extends THeaderNavigationItem {
  id: number
}

export const MobileHeaderItem: FC<INavigationItem> = ({
  id,
  title,
  property,
  onClick,
  isActive,
  selectionState,
}) => {
  return (
    <button
      onClick={() => onClick(property, id)}
      className={`
        ${styles.itemContainer} 
        ${selectionState ? styles.selected : ''} 
        ${isActive ? styles.active : ''}
      `}
    >
      {title}
    </button>
  )
}
