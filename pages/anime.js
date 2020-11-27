
import 'antd/dist/antd.css';
import "../assets/css/style.less"
import {PageHeader, Collapse, BackTop} from 'antd'
import {renderIcon} from '../utils/icons'
// Design

import {getAnimeDetails} from './api/requests';
//Api

import {capitalize} from '../utils/functionsMain'
//Custom Functions

import {useEffect,useState} from 'react';
//React

import { useRouter } from 'next/router'
//Next


import CategoriesRender from '../components/render-categories-component'
import ReviewsRender from '../components/render-reviews-component'
//Custom



export default function Anime() {


  const router = useRouter()
  const { Panel } = Collapse;
  
  const [selectedAnimeData,setSelectedAnimeData] = useState(false);
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true)
    if(router.query.identifier){
      let route_params = (router.query.identifier).split('_')
      getAnimeData(route_params)
    }

  }, [router])

   const getAnimeData = async (route_params) => {
      let anime_id =''; 
      if(router.query.identifier){
        let route_params = (router.query.identifier).split('_')
        if( !isNaN(route_params[0])){
          anime_id = route_params[0];
        }
      }
     
     
      let resp = await getAnimeDetails(anime_id);
      if(resp.request == 'ok'){
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

  
      {( (selectedAnimeData  && selectedAnimeData != 'no-data') && !isLoading  ) && 
          <div className="al-page-detail-info">

            {selectedAnimeData.attributes && 
              <div>


                {selectedAnimeData.attributes.coverImage &&
                  <img src={selectedAnimeData.attributes.coverImage.small}></img>
                }


                {selectedAnimeData.attributes.youtubeVideoId && 
                    <div>
                      <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${selectedAnimeData.attributes.youtubeVideoId}`}></iframe> 
                    </div>
                  }
                   
                    <h1 className="clr-trending">
                        {selectedAnimeData.attributes.titles.ja_jp &&
                          <span className="font-1 block clr-text-grey">
                          {selectedAnimeData.attributes.titles.ja_jp}
                          </span>
                        }
                       {selectedAnimeData.attributes.canonicalTitle}
                      
                     
                    </h1>
                    <h2 className="fat">{selectedAnimeData.attributes.averageRating} <span className="clr-trending"> / 100</span> </h2>

                  <div className="al-page-detail-info-body text-left">
                    {selectedAnimeData.attributes.status &&
                       <p>
                       <label className="al-label-highlight">Status:</label>
                       {capitalize(selectedAnimeData.attributes.status)}</p>
                    }
                      {selectedAnimeData.attributes.subtype &&
                    <p>
                      <label className="al-label-highlight">Type:</label>
                      {capitalize(selectedAnimeData.attributes.subtype)}</p>
                    }  
                    
                    {selectedAnimeData.attributes.synopsis &&
                    <p>
                      <label className="al-label-highlight">Synopsis:</label>
                      {selectedAnimeData.attributes.synopsis}</p>
                    }  
                        
                    {selectedAnimeData.attributes.ageRatingGuide &&
                           <p>
                           <label className="al-label-highlight">Recomendation:</label>
                           {selectedAnimeData.attributes.ageRatingGuide}</p>
                    }
                  </div>  

                 



                  <div className="al-page-detail-info-extra">
                  <label className="al-label-highlight">Extra Information</label>
                  <Collapse accordion className="margin-top-3">
                      {selectedAnimeData.relationships.categories.links.self &&
                        <Panel header="Categories" key="1">
                          <CategoriesRender categoriesLink={selectedAnimeData.relationships.categories.links.related}></CategoriesRender>
                        </Panel>
                      }

                         {selectedAnimeData.relationships.reviews.links.related &&
                        <Panel header="Reviews" key="2">
                            <ReviewsRender reviewsLink={selectedAnimeData.relationships.reviews.links.related}></ReviewsRender>
                       </Panel>
                      }
                    
                  </Collapse>

                  </div>
                    
            </div>
          }
              


          </div> 

      }

          { (!selectedAnimeData || isLoading ) &&
        <div className="al-loading">
          Loading
        </div>
      }
       {(( !selectedAnimeData || selectedAnimeData == 'no-data' || !selectedAnimeData.attributes) && !isLoading) && 
        <div className="al-loading">
          {console.log(selectedAnimeData)}
          No Data
        </div>
      }



    <BackTop>
      {renderIcon('top')}
    </BackTop>
    </section>

    
  )
}
