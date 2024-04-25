import { FC, useEffect } from 'react'
import { PublicationImage } from '../publicationImage/publicationImage'
import { handleHeadingElements_pubRedefining } from '@root/helpers/publications/pub_redefining'
import { useParsePublications } from '@root/Hooks/publications/useParsePublication/useParsePublications'
import { useDispatch } from 'react-redux'
import { setHeading } from '@root/store/slices/publicationDescSlice/publicationDescSlice'

interface IPublicationWrapper {
  HTMLContent: string
  title: string
}

export const PublicationWrapper: FC<IPublicationWrapper> = ({
  HTMLContent,
  title,
}) => {
  const dispatch = useDispatch()
  const _idFindingKey = 'idFindingKey'
  const { parsePublication, getHeadingFields } = useParsePublications({
    whiteList: {
      img: ['src', 'alt'],
      span: ['class', 'type'],
      a: ['href', 'target'],
      strong: [''],

      h2: [],
      h3: [],
      em: [],
      p: [],
      hr: [],

      ul: [],
      li: [],
      ol: [],
    },
    onIgnoreTag: () => {
      return ''
    },
    onTag: (tag, name, value) => {
      const newItem = handleHeadingElements_pubRedefining(
        tag,
        value.isClosing,
        value.sourcePosition,
        _idFindingKey,
      )
      return newItem
    },
  })

  const parsedHTML = parsePublication(HTMLContent)

  useEffect(() => {
    const headingFields = getHeadingFields(parsedHTML, _idFindingKey)
    if (!(headingFields?.length > 0)) return
    dispatch(
      setHeading({
        title: title,
        headingItems: headingFields,
      }),
    )
  }, [dispatch, getHeadingFields, parsedHTML, title])

  return (
    <PublicationImage>
      <h1
        style={{
          marginBottom: '25px',
        }}
      >
        {title}
      </h1>
      {parsedHTML}
    </PublicationImage>
  )
}
