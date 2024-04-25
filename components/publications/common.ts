export type TPublication = {
  id: string
  content: string
  pubDate: string
  title?: string
}

type TTitleType = 'title'
type TSubTitle = 'subtitle'

export type THeadingItem = {
  value: string
  hook: string
  type: TTitleType | TSubTitle
}

export interface IPublicationsList {
  publications: string[]
}
