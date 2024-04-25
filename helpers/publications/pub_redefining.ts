import { TPublication } from '@root/components/publications/common'
import { IPublicationPageProps } from '@root/pages/publications/[uuid]'
import { IPublicationQ } from '@root/queries/publications/publicationActions'

export const queriedToPageFormat_pubRedefining = (
  queried: IPublicationQ,
  uuid: string,
): IPublicationPageProps => {
  if (!queried || !(queried.publications?.length > 0)) return
  const page = queried.publications.find((el) => el.id === uuid)
  return page
    ? ({
        HTMLContent: page.content,
        date: page.date_created,
        title: page.title,
      } as IPublicationPageProps)
    : ({
        date: 'Unknown date',
        title: 'Empty publication',
        HTMLContent: '<span class="warn">Empty publication</span>',
      } as IPublicationPageProps)
}

export const queriedToPublicationListFormat_pubRedefining = (
  queried: IPublicationQ,
): TPublication[] => {
  return queried.publications.map((el) => {
    if (!el) return
    return {
      title: el.title,
      id: el.id,
      content: el.content,
      pubDate: el.date_created,
    } as TPublication
  })
}

export const handleHeadingElements_pubRedefining = (
  tagName: string,
  isClosing: boolean,
  position: number,
  idFindingKey: string
) => {
  const main = 'h2'
  const secondary = 'h3'

  const generateId = (heading: string, position: string) => {
    return `<${heading} id='${heading}_${idFindingKey}_${position.toString()}'>`
  }

  switch (tagName.toLocaleLowerCase()) {
    case main:
      return !isClosing ? generateId(main, position.toString()) : null
    case secondary:
      return !isClosing ? generateId(secondary, position.toString()) : null
  }
}
