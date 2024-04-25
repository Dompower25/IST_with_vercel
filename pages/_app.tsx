import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { catalogClient } from '../Apollo/catalogClient'
import { Provider } from 'react-redux'
import store from '../store/store'
import NextProgress from 'next-progress'
import { AppProps } from 'next/app'
import { FC, ReactElement, ReactNode } from 'react'
import MainLayout from '../layouts/mainLayout'
import '../styles/global.scss'
import '../styles/bootstrap.min.css'
import '../styles/typography.scss'
import { InitialDataCollector } from '../components/initialDataCollector'
import localFont from 'next/font/local'

export interface NextPageWithLayout<T = unknown> extends FC<T> {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const roboto = localFont({
  src: [
    {
      path: '../public/fonts/roboto/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/roboto/Roboto-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/roboto/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/roboto/Roboto-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Provider store={store}>
      <Head>
        <title>IST ELEVATOR</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <NextProgress
        delay={300}
        height={'3px'}
        color={'#8BC2FF'}
        options={{ showSpinner: false }}
        disableSameRoute={true}
      />

      <ApolloProvider client={catalogClient}>
        {/* GETTING GENERAL DATA */}
        <InitialDataCollector />
        {/* DISPLAYING CONTENT */}
        <main className={roboto.className}>
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </main>
      </ApolloProvider>
    </Provider>
  )
}
