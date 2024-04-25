import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import PublicationsLayout from '@root/layouts/publicationsLayout'

export const IndexPublications: NextPageWithLayout = () => {
  return <></>
}

const getLayout = (page: ReactElement) => {
  return <PublicationsLayout>{page}</PublicationsLayout>
}

IndexPublications.getLayout = getLayout
export default IndexPublications
