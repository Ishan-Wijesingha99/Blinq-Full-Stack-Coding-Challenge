import Head from 'next/head'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
       
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
