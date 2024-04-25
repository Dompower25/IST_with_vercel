import xss, { IFilterXSSOptions } from 'xss'
import ReactHtmlParser from 'react-html-parser'
import { ReactNode } from 'react'
import React from 'react'
import { THeadingItem } from '@root/components/publications/common'

type TParsedContent = ReactNode & TNode
type TNode = {
  props: { children: unknown }
  id: string
}

type THeadingParams = {
  titleTagName: string
  subtitleTagName: string
}

type THeading = Pick<THeadingItem, 'type'>

export const useParsePublications = (parserOptions: IFilterXSSOptions) => {
  const parsePublication = (content: string): TParsedContent => {
    const filtered = xss(content, parserOptions)
    return ReactHtmlParser(filtered)
  }

  const getHeadingFields = (
    content: TParsedContent,
    idFindingKey: string,
    headingTagsOptions: THeadingParams = {
      titleTagName: 'h2',
      subtitleTagName: 'h3',
    },
  ): THeadingItem[] => {
    let headingFields: THeadingItem[] = []

    const traverse = (node: TParsedContent) => {
      if (React.isValidElement(node)) {
        const elementType = node.type as string
        const elementProps: any = node.props
        const fullId = elementProps?.id as string
        const headingChildren = elementProps?.children

        if (!fullId || !headingChildren) return
        if (fullId && fullId.includes(idFindingKey)) {
          let headingType: THeading = {
            type: 'title',
          }
          switch (elementType?.toLocaleLowerCase()) {
            case undefined:
              break
            case headingTagsOptions.titleTagName:
              headingType = {
                type: 'title',
              }
              break
            case headingTagsOptions.subtitleTagName:
              headingType = {
                type: 'subtitle',
              }
              break
          }

          const headingValue =
            Array.isArray(headingChildren) &&
            typeof headingChildren[0] === 'string'
              ? headingChildren[0]
              : ''

          headingFields.push({
            value: headingValue,
            hook: fullId,
            type: headingType.type,
          })
        }
      }

      if (Array.isArray(node)) node.forEach(traverse)
      else if (React.isValidElement(node)) traverse(node.props.children)
    }

    traverse(content)
    return headingFields
  }

  return {
    parsePublication,
    getHeadingFields,
  }
}
