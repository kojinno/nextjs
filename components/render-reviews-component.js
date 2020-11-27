
import { Tag } from 'antd';
import {useEffect,useState} from 'react';
import {getGenericRequest} from '../pages/api/requests'
import {returnHtml} from '../utils/functionsMain'

export default function RenderReviews({reviewsLink}) {

const [reviewsData,setReviewsData]= useState(false);
const [isLoading,setIsLoading]= useState(true);

useEffect(() => {
    getReviewsData(reviewsLink)
}, [])


const getReviewsData = async (path) => {
   
    let resp = await getGenericRequest(path);
    if(resp.request == 'ok'){

     setReviewsData(resp.output.data.data)
    }else{
      setReviewsData('no-data')
      alert('Error Loading Reviews Data, Please try again in a few minutes')
    }
    setTimeout(function() {
      setIsLoading(false)
    }, 1100);
    
 }





  return (
               <div className=''>
                   {(isLoading || !reviewsData || reviewsData == 'no-data') &&
                    <div>
                        <p> Loading Information </p>
                    </div>
                   }
                   { !isLoading && reviewsData && reviewsData != 'no-data' &&
                    <div className="">

                        {(reviewsData).map(item => (
                            <div className="al-review-block">
                              <div>
                                 {returnHtml(item.attributes.contentFormatted)}
                              </div>
                             <p className="al-review-block-source"> <span>Source: </span>{item.attributes.source}</p>
                            </div>
                        ))} 
                        {reviewsData.length == 0 &&
                          <p>Reviews not available</p>
                        }
                    </div>
                   }
                </div>
    
  )
}
