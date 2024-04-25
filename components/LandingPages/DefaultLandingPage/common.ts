// LANDING PAGE INTERFACE
export interface ILandingPage {
  children?: React.ReactNode
  landingDescription?: TDescription
  pageBackground?: IPageBackground
  pageHook?: string
}

// - PAGE DESCRIPTION
type TDescription = {
  title: string
  subTitle?: string
  titleOffset?: number
}

// - PAGE BACKGROUND
export interface IPageBackground {
  backgroundItems: Array<TElementContent>
  backgroundCrossFilling: boolean
}

// -- BACKGROUND ITEM
export interface ILandingBackgroundItem extends TElementContent {}

// -- BACKGROUND MATRIX SIZE
export type TBackgroundMatrixSize = {
  colsNum: number
  rowsNum: number
}

// -- ELEMENT OF THE BACKGROUND MATRIX
export type TMatrixElement = {
  size: number
  content?: TElementContent
}

// -- CONTENT TYPE OF THE BACKGROUND MATRIX ELEMENT
export type TElementContent = {
  data: string
  contentDistance: number
  contentOffset: { top: number; left: number }
}
