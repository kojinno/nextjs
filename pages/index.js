
import 'antd/dist/antd.css';
import "../assets/css/style.less"
import {Card, Row} from 'antd'
//Design

import {useEffect,useState} from 'react';
import { useRouter } from 'next/router';
//React

import Link from 'next/link'
// Next


import {getTrending} from './api/requests';
//Custom


import SimpleCard from '../components/card-simple-component'
//Custom Component


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
          <p>
            Looking for the best of the best? Well, that's subjetive, but below you can find some of the Top Anime to Keep you up to date with what everyone is talking about.
            
            Didn't find what you were looking for? try our <span className="al-link-1"><Link href="/search">Search Page</Link> </span>for a full list</p>
      </div> 
      { (!trendingList || isLoading ) &&
        <div className="al-loading">
          Loading
        </div>
      }
      {(trendingList && trendingList.length > 0 && !isLoading  ) && 
        <Row className="justify-center">
             {trendingList.map(item => (
                <SimpleCard item={item} goToDetailPage={(data) => goToDetailPage(data)}></SimpleCard>
              ))}
        </Row>
      }
       {(trendingList && trendingList.length == 0 && !isLoading) && 
        <div>
          No Data
        </div>
      }
    

    </section>

    
  )
}
