
import {Layout} from 'antd'
import Head from 'next/head';
import Header from '../components/header-component'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>The Anime List</title>
      </Head>
    <img className="al-app-logo" src="/logo.png"></img>
    <Header></Header>
    <Component {...pageProps} />

  </Layout>
  )


}

export default MyApp

