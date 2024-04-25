import { useCallback, useEffect, useState } from 'react'
import {
  IScrollSpyState,
  TSSPageConfig,
  TScrollPosition,
  createScrollSpyConfig,
  getCurrentPosition,
} from './scrollSpy'

type TSSConfigProps = Array<TSSPageConfig>

export const useScrollSpy = (config: TSSConfigProps) => {
  const [positions, setPositions] = useState<Array<TScrollPosition>>([])
  const [currentPosition, setCurrentPosition] = useState<TScrollPosition>()
  const [windowHeight, setWindowHeight] = useState<number>()

  useEffect(() => {
    const newPositions = [] as Array<TScrollPosition>
    config.map((page, i) => {
      if (!page?.page?.current) return

      const nConfig = createScrollSpyConfig(
        page.page.current,
        page.page.current.scrollTop,
        windowHeight,
        page.pageTag,
      )

      newPositions.push(nConfig)
    })

    setPositions(newPositions)

    // ======================================================== //
    // This list of dependencies can cause endless rendering.
    // It is important to leave the list without config and receive the
    // configuration only with 1 rendering of the hook
    // ======================================================== //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowHeight])

  useEffect(() => {
    if (!(positions?.length > 0)) return

    positions.map((el, i) => {
      el.percentInterval = {
        b: el.percentScroll - 1,
        e: positions[i + 1]?.percentScroll ?? null,
      }
    })
  }, [positions])

  useEffect(() => {
    if (typeof window === 'undefined') return
    setWindowHeight(document.body.offsetHeight)
  }, [])

  useEffect(() => {
    if (positions && positions?.length > 0) setCurrentPosition(positions[0])
  }, [positions])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => {
      setCurrentPosition(
        getCurrentPosition(window.scrollY, windowHeight, positions),
      )
    }

    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [positions, windowHeight])

  const getScrollSpy = useCallback(() => {
    return {
      currentPosition,
      positions,
    } as IScrollSpyState
  }, [currentPosition, positions])

  return { getScrollSpy, setCurrentPosition }
}
