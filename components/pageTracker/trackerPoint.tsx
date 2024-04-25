import React, { FC } from 'react'

interface IScrollSpyPoint {
  index: number
  isActual: boolean
  scrollTo: number
  content: string
}

const TrackerPoint: FC<IScrollSpyPoint> = ({
  index,
  isActual,
  scrollTo,
  content,
}) => {
  const scrollToPosition = () => {
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div
        className={`trackerPoint ${isActual ? 'is_active_position' : ''}`}
        onClick={() => scrollToPosition()}
      >
        <div className={'trackerPoint_content'}>
          <p>{index < 10 ? `0${index}` : index}</p>
          <a>{content}</a>
        </div>
      </div>
    </>
  )
}

export default TrackerPoint
