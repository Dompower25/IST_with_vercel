import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Meta/favicon32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Meta/favicon.ico"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Meta/apple-touch-icon.png"
        />
        <link rel="manifest" href="/Meta/site.webmanifest" />

        <link
          rel="mask-icon"
          href="/Meta/safari-pinned-tab.svg"
          color="#2c3641"
        />
      </Head>
      <body id={'APP_BODY_WRAPPER'}>
        <div id="LoadingSpace" style={{ zIndex: '20', position: 'relative' }} />
        <div id="PopUpBase" style={{ zIndex: '10', position: 'relative' }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
