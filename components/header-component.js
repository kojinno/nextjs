
import 'antd/dist/antd.css';
import "../assets/css/style.less"

import {Menu} from 'antd'
import {useEffect} from 'react';
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  useEffect(() => {

  }, [])

  const { current } = '/';

  const handleMenuClick = (e) => {
    router.push(e.key)
  };



  return (
<div className="site-page-header-ghost-wrapper">

    <Menu onClick={ (e) => {handleMenuClick(e)}}   selectedKeys={[current]} mode="horizontal" className="al-container-2">
        <Menu.Item key="/" className={router.pathname == '/'? 'al-current-page': ''}>
          Trending
        </Menu.Item>
        <Menu.Item key="/search" className={router.pathname == '/search'? 'al-current-page': ''}>
          Search
        </Menu.Item>
        <Menu.Item key="/about" className={router.pathname == '/about'? 'al-current-page': ''}>
          About
        </Menu.Item>
     </Menu>  
  </div>
   
  )
}
