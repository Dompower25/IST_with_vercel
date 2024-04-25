import React, { FC } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { IMapViewer, getCenterLocation } from './MapLocator'

const YandexMap: FC<IMapViewer> = ({ location, zoom }) => {
  const defaultState = {
    center: getCenterLocation(location),
    zoom: zoom,
  }

  return (
    <>
      <YMaps>
        <Map defaultState={defaultState} width={'100%'} height={'100%'}>
          <Placemark geometry={getCenterLocation(location)} />
        </Map>
      </YMaps>
    </>
  )
}

export default YandexMap
