import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';
import "../assets/css/style.less"

import {Card, Col, Row} from 'antd'
import {getTrending} from './api/requests';
import {getTextShort} from '../utils/functionsMain';;

import Link from 'next/link'


import {useEffect,useState} from 'react';

import { useRouter } from 'next/router'


// const getApiData = () => {
//   return 'zas'
// }

export default function Home() {


  const router = useRouter()
  const [trendingList,setTrendingList] = useState(false);
  const [isLoading,setIsLoading] = useState(true);

  const { current } = '/';

  const goToDetailPage = (page) => {
    router.push(`anime?identifier=${page}`)
  };

  useEffect(() => {
    getTrendingData()
  }, [])

   const getTrendingData = async () => {
      let resp = await getTrending();
      if(resp.request == 'ok'){
        setTrendingList(resp.output.data.data)
        console.log(resp.output.data.data[0])
      }else{
        setTrendingList([])
        alert('Error Loading Trending Data, Please try again in a few minutes')
      }
      setIsLoading(false)
   }


  return (
    <section className={'al-container-1 flex-column'}>
      <div className="al-page-info">
          <h1>Welcome to <span className="clr-trending">Trending</span></h1>
          <p>Phasellus pharetra venenatis posuere. Duis commodo a ipsum sed feugiat. Nam sodales purus efficitur condimentum aliquet. Nunc vel sodales nulla. Integer risus turpis, elementum commodo lectus sit amet, semper mattis tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo egestas diam eget vulputate. Integer eros libero, ornare nec vehicula in, consectetur mollis tortor. Aenean imperdiet imperdiet ultricies. Vestibulum nec pellentesque purus. Duis quis sem scelerisque, condimentum diam nec, egestas leo. Aenean efficitur sagittis sem. Suspendisse facilisis, erat in tempor cursus, leo mauris condimentum risus, interdum congue magna sapien nec odio. Donec ut nisi vel sapien vulputate fermentum ut vel metus. Morbi porttitor tortor non magna mattis, sed efficitur massa consectetur. </p>
      </div> 
      { (!trendingList || isLoading ) &&
        <div className="al-loading">
          Loading
        </div>
      }
      {(trendingList && trendingList.length > 0 && !isLoading  ) && 
        <Row className="justify-center">
          
             {trendingList.map(item => (
               <div className='al-card-columns al-cards-custom' key={item.id}>
                               <Card onClick={() => {goToDetailPage( `${item.id}_${item.attributes.slug}`)}} title={item.attributes.canonicalTitle} bordered={false} style={{ }}>
                               <img src={item.attributes.coverImage.tiny}></img>
                               <div className="al-card-main-info text-right">
                                  <span> {item.attributes.averageRating} / 100 </span>
                                  <span> Espistodes:   <span>  {item.attributes.totalLength}</span></span>
                               </div>
                               <p className="al-card-main-description">{ getTextShort(item.attributes.synopsis)}</p>
                             </Card>
                             </div>
              ))}
        </Row>
      }
       {(trendingList && trendingList.length == 0 && !isLoading) && 
        <div>
          No Data
        </div>
      }

{/* import { Card } from 'antd';

ReactDOM.render(
  <div className="site-card-border-less-wrapper">
    <Card title="Card title" bordered={false} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>,
  mountNode, */}
        {/* <Head>
          <title>The Anime List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>


       

       <main className={'al-container-1 flex-column'}>
          <header>
            <nav>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/">
              <a>Trending</a>
            </Link>
            <Link href="/search">
              <a>search</a>
            </Link>
            </nav>
          </header>
          <p>menu</p>





        </main>

        <footer className={'text-center'}>
          <p>© TheAnimeList. All rights reserved </p>
        </footer>  */}








      {/* <h1 className="index">Testing stuff</h1> */}
  {/* <p>{getApiData()}</p> */}
  {/* <p>{myHook}</p> */}
      {/* <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
      
    

    </section>

    
  )
}
