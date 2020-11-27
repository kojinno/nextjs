
import { Tag } from 'antd';
import {useEffect,useState} from 'react';
import {getGenericRequest} from '../pages/api/requests'

export default function RenderCategories({categoriesLink}) {

const [categoriesData,setCategoriesData]= useState(false);
const [isLoading,setIsLoading]= useState(true);

useEffect(() => {
    getCategoriesData(categoriesLink)
}, [])


const getCategoriesData = async (path) => {
   
    let resp = await getGenericRequest(path);
    if(resp.request == 'ok'){

     setCategoriesData(resp.output.data.data)
    }else{
      setCategoriesData('no-data')
      alert('Error Loading Categories Data, Please try again in a few minutes')
    }
    setTimeout(function() {
      setIsLoading(false)
    }, 1100);
    
 }





  return (
               <div className=''>
                   {(isLoading || !categoriesData || categoriesData == 'no-data') &&
                    <div>
                        <p> Loading Information </p>
                    </div>
                   }
                   { !isLoading && categoriesData && categoriesData != 'no-data' &&
                    <div>
                        {(categoriesData).map(item => (
                            <Tag>{item.attributes.slug}</Tag>
                        ))} 

                        {categoriesData.length == 0 &&
                          <p>Categories not available</p>
                        }
                    </div>
                   }
                </div>
    
  )
}
