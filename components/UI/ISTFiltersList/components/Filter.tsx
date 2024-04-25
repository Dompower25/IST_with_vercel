import React, { FC, useState } from 'react'
import styles from '../styles/filtersList.module.scss'
import { IST_FilterItem } from '../common'

const Filter: FC<IST_FilterItem> = ({
  fieldName,
  isActive,
  isCheckBox,
  idx,
  onFilterSwitch,
}) => {
  // const [describing, setDescribing] = useState<boolean>(false)

  // const hideDescribing = () => {
  //   setDescribing(false)
  // }

  // const activeDescribing = () => {
  //   setDescribing(true)
  // }

  return (
    <div
      className={`${styles.filter}`}
      onClick={() => {
        onFilterSwitch(idx)
      }}
      // onMouseEnter={activeDescribing}
      // onMouseLeave={hideDescribing}
    >
      <div className={styles.columnField}>
        <div
          className={`${styles.fieldName} ${isActive ? styles.activeText : ''}`}
        >
          {fieldName}
        </div>
        {/* {describing ? (
          <span className={styles.describingFilter}>{fieldName}</span>
        ) : null} */}
      </div>

      {isCheckBox ? (
        <div
          className={`${styles.checkPoint} ${
            isActive ? styles.activeCheckBoxPoint : ''
          }`}
        >
          {isActive ? '-' : '+'}
        </div>
      ) : null}
    </div>
  )
}

export default Filter
