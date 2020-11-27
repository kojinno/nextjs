
import 'antd/dist/antd.css';
import "../assets/css/style.less"

import {PageHeader} from 'antd'
import {getAnimeDetails} from './api/requests';
// import moment from 'moment'



import {useEffect,useState} from 'react';

import { useRouter } from 'next/router'




export default function Anime() {


  const router = useRouter()
  
  const [selectedAnimeData,setSelectedAnimeData] = useState(false);
  const [isLoading,setIsLoading] = useState(true);

  // const { current } = '/';



  useEffect(() => {
    setIsLoading(true)
    getAnimeData()

  }, [])

   const getAnimeData = async () => {
      let anime_id =''; 
      if(router.query.identifier){
        let route_params = (router.query.identifier).split('_')
        if( !isNaN(route_params[0])){
          anime_id = route_params[0];
        }
      }
     
     
      let resp = await getAnimeDetails(anime_id);
      if(resp.request == 'ok'){
        console.log(resp.output.data.data)
        setSelectedAnimeData(resp.output.data.data)
      }else{
        setSelectedAnimeData('no-data')
        alert('Error Loading Anime Data, Please Check your URL or try again in a few minutes')
      }
      setTimeout(function() {
        setIsLoading(false)
      }, 1100);
      
   }


  return (
  
    <section className={'al-container-1 flex-column'}>
        <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title=""
      subTitle="Back"
    >
    </PageHeader> 

      { (!selectedAnimeData || isLoading ) &&
        <div className="al-loading">
          Loading
        </div>
      }
      {( (selectedAnimeData  && selectedAnimeData != 'no-data') && !isLoading  ) && 
          <div className="al-page-datil-info">
            {selectedAnimeData.attributes && 
              <div>
                    {selectedAnimeData.attributes.coverImage &&
                      <img src={selectedAnimeData.attributes.coverImage.small}></img>
                    }
                    <h1> {selectedAnimeData.attributes.canonicalTitle}</h1>
                    <h2>{selectedAnimeData.attributes.averageRating} / 100 </h2>

                  <div className="al-page-datil-info-body text-left">
                    <p>
                      <label>Status:</label>
                      {selectedAnimeData.attributes.status}</p>
                    {/* <p>Last Updated: {moment(selectedAnimeData.attributes.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p> */}
                  </div>   

                  <div className="al-page-datil-info-body text-left">
                    <p>
                      <label>Synopsis:</label>
                      {selectedAnimeData.attributes.synopsis}</p>
                  </div>   
                    
            </div>
          }
              


          </div> 

      }
       {(( !selectedAnimeData || selectedAnimeData == 'no-data' || !selectedAnimeData.attributes) && !isLoading) && 
        <div className="al-loading">
          No Data
        </div>
      }

    

    </section>

    
  )
}
