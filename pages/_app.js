// import '../styles/globals.css'
import {Layout} from 'antd'
import Header from '../components/header-component'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <img className="al-app-logo" src="/logo.png"></img>
    <Header></Header>
    <Component {...pageProps} />

  </Layout>
  )


}

export default MyApp

