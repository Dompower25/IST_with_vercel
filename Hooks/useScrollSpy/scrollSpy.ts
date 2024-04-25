import { MutableRefObject } from 'react'

type TInterval = {
  b: number
  e: number
}

export type TScrollPosition = {
  y: number
  percentScroll: number
  percentInterval?: TInterval
  tag?: string
}

export interface IScrollSpyState {
  positions: Array<TScrollPosition>
  currentPosition: TScrollPosition
}

export type TSSPageConfig = {
  page: MutableRefObject<HTMLDivElement>
  pageTag?: string
}

export const createScrollSpyConfig = (
  elem: Element,
  scrollY: number,
  pageSize: number,
  tag?: string,
) => {
  function GetOffset(el: Element) {
    if (!el) return
    const position = el.getBoundingClientRect()
    return {
      top: position.top + scrollY,
    }
  }

  const newSSConfig: TScrollPosition = {
    percentScroll: (GetOffset(elem)?.top * 100) / pageSize,
    y: GetOffset(elem)?.top,
    tag: tag ?? 'Page name',
  }

  return newSSConfig
}

export const getCurrentPosition = (
  scrollY: number,
  pageSize: number,
  positions: Array<TScrollPosition>,
): TScrollPosition => {
  const dynamicPosition: TScrollPosition = {
    y: scrollY,
    percentScroll: (scrollY * 100) / pageSize,
  }

  let currentPosition = {} as TScrollPosition

  positions.map((pos, i) => {
    if (
      dynamicPosition.percentScroll >= pos.percentInterval.b &&
      (dynamicPosition.percentScroll < pos.percentInterval.e ||
        pos.percentInterval.e === null)
    ) {
      currentPosition = pos
    }
  })
  return currentPosition
}
