import React, { FC, useEffect, useState } from 'react'
import styles from './pageTracker.module.scss'

interface ITrackerBody {
  children: React.ReactNode
}

const TrackerBody: FC<ITrackerBody> = ({ children }) => {
  return (
    <>
      <div className={styles.trackerBody}>{children}</div>
    </>
  )
}

export default TrackerBody
