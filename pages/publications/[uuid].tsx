import PublicationsLayout from '@root/layouts/publicationsLayout'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import { PublicationWrapper } from '@root/components/publications/publicationWrapper/publicationWrapper'
import { catalogClient } from '@root/Apollo/catalogClient'
import {
  GET_PUBLICATION_BY_ID,
  IPublicationQ,
} from '@root/queries/publications/publicationActions'
import { queriedToPageFormat_pubRedefining } from '@root/helpers/publications/pub_redefining'

export interface IPublicationPageProps {
  HTMLContent: string
  date: string
  title: string
}

export const PublicationPage: NextPageWithLayout = (
  page: IPublicationPageProps,
) => {
  return (
    <>
      <PublicationWrapper HTMLContent={page.HTMLContent} title={page.title} />
    </>
  )
}

const getLayout = (page: ReactElement) => {
  return <PublicationsLayout>{page}</PublicationsLayout>
}

export const getServerSideProps = async (context: {
  query: { uuid: string }
}) => {
  const { uuid } = context.query

  const { data } = await catalogClient.query<IPublicationQ>({
    query: GET_PUBLICATION_BY_ID,
    variables: {
      id: uuid,
    },
    fetchPolicy: 'network-only',
  })

  return {
    props: queriedToPageFormat_pubRedefining(data, uuid),
  }
}

PublicationPage.getLayout = getLayout
export default PublicationPage
