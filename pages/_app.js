
import {Layout} from 'antd'
import Head from 'next/head';
import Header from '../components/header-component'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>The Anime List</title>
      </Head>
    <Link href="/">
    <img className="al-app-logo pointer" src="/logo.png"></img>
    </Link>
    <Header></Header>
    <Component {...pageProps} />

  </Layout>
  )


}

export default MyApp

