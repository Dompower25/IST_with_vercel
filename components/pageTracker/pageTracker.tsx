import React, { FC } from 'react'
import { IScrollSpyState } from '../../Hooks/useScrollSpy/scrollSpy'
import TrackerPoint from './trackerPoint'

interface IScrollTracker {
  state: IScrollSpyState
}

const PageTracker: FC<IScrollTracker> = ({ state }) => {
  return (
    <>
      {state
        ? state.positions.map((elem, i) => {
            return (
              <TrackerPoint
                index={i + 1}
                isActual={elem === state.currentPosition}
                key={`${i}_scrollPoint`}
                scrollTo={elem.y}
                content={elem.tag}
              />
            )
          })
        : null}
    </>
  )
}

export default PageTracker
