import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';
import "../assets/css/style.less"

import { Input, Select , Table, Tag, Space, Pagination } from 'antd'
import {getTrending,getAnimes} from './api/requests';
import {getTextShort} from '../utils/functionsMain';;

import Link from 'next/link'


import {useEffect,useState} from 'react';

import { useRouter } from 'next/router'



export default function Home() {

  const { Option } = Select;
  const router = useRouter()

  const [searchResult,setSearchResultList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const [searchText,setSearchText] = useState('');
  const [searchRating,setSearchRating] = useState('');
  const [paginationObj,setPaginationObj] = useState('');
  const [paginationCount,setPaginationCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);


  const goToDetailPage = (page) => {
    router.push(`anime?identifier=${page}`)
  };




  const columns = [
  
    {
        title: 'Title',
        dataIndex: 'attributes',
        key: '1',
        render: attributes => <p key={attributes.canonicalTitle + 1}>{attributes.canonicalTitle}</p>,
      },
      {
        title: 'Type',
        dataIndex: 'attributes',
        key: '2',
        render: data => <p key={data.subtype + 2}>{data.subtype}</p>,
      },
      {
        title: 'Details',
        dataIndex: '',
        key: '3', 
        render: data => 
            <>
                <button key={data.id} onClick={ () => {
                    goToDetailPage(`${data.id}_${data.attributes.slug}`) 
                }}>
                   View Details
                </button>
            </>
        
      },
      

    
  ];



  useEffect(() => {
    callApiRequest()
  }, [])

  const validateText = (text) => {
    setSearchText(text.target.value)
  
  }

  function validateSelect(value) {
    let selected = value;
    if(selected){
        setSearchRating(value)
    }else{
        setSearchRating('')
    }
  }

  const callApiRequest = (offsetAmount) => {
      let offset = 0;
      if(offsetAmount && offsetAmount > 0){
        offset = offsetAmount;
      }else{
        setCurrentPage(1);
      }
      setIsLoading(true)
      let searchString = '';
      let ratingFilter = searchRating != '';
      let textFilter = searchText != '';


      if(textFilter || ratingFilter){
          searchString = '';
          if(textFilter){
              searchString = searchString + `&&filter[text]=${replaceSpacesForRequest(searchText)}`;
          }
          if(ratingFilter){
              searchString = searchString +`&&filter[ageRating]=${searchRating}`;
          }
      }
      searchString = `https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=${offset}&${searchString}&fields[anime]=canonicalTitle,subtype,slug`
      getFilteredData(searchString)
  }


  const clearAndCallApiRequest = () => {
    setSearchResultList('');
    setSearchRating('');
    setSearchText('');
  }

   const getFilteredData = async (searchString) => {
    setPaginationObj(false)
    setPaginationCount(false)
       if(!isLoading){
            let resp = await getAnimes(searchString);
            if(resp.request == 'ok'){

            setPaginationCount(resp.output.data.meta.count)
            // checkPaginationObj(resp.output.data.links)
            // addKeysToData(resp.output.data.data)
            setSearchResultList(resp.output.data.data)
            }else{
            setSearchResultList([])
                alert('Error Loading Search Result, Please try again in a few minutes')
            }
            setIsLoading(false)
       }
       
     
   }
   
   const goToPageNumber = (paginationNumber) => {
       setCurrentPage(paginationNumber)
       let skipAmount = paginationNumber * 10;
       callApiRequest(skipAmount);
   }

//    const checkPaginationObj = (data) => {
//         let paginationObj = {};

//         if(data && data.next){
//             paginationObj.next = data.next;
//         }else{
//             paginationObj.next = false;
//         }
//         if(data.links && data.last){
//             paginationObj.last = data.last;
//         }else{
//             paginationObj.last = false;
//         }
//         if(data.fist && data.first){
//             paginationObj.first = data.first;
//         }else{
//             paginationObj.first = false;
//         }
//         if(data.prev && data.prev){
//             paginationObj.prev = data.prev;
//         }else{
//             paginationObj.prev = false;
//         }
//         setPaginationObj(paginationObj)
//    }

//    const addKeysToData =(data) => {
//        let dataWithKeys = [];
//         for (let [i] in data) {
//             let item = data[i];
//             let obj = {};
//             obj.key = Number(i);
//             if(item.attributes.subtype){
//                 obj.subtype = item.attributes.subtype;
//             }
//             if(item.attributes.canonicalTitle){
//                 obj.canonicalTitle = item.attributes.canonicalTitle;
//             }
//             obj.pathToDetails = `${item.id}_${item.attributes.slug}`;
//             dataWithKeys.push(
//               obj,
//             )
//         }
//         setSearchResultList(dataWithKeys)
//         setTimeout(function() {
//             setIsLoading(false)
//           }, 900);
//    }

   const replaceSpacesForRequest = (text) => {
     return text.replace(/ /g, '%20');
   }


  return (
    <section className={'al-container-1 flex-column'}>
        <div className="al-page-info">
          <h1>Welcome to <span className="clr-trending">Search</span></h1>
          <p> You can use the Search field to look Animes by name or with a similar name, if you want you can also set the filter by content type (G,PG,R,R18) </p>
      </div> 

        <div className="al-page-filters">
            <div className='al-page-filter'>
                <label>Name:</label>
                <Input value={searchText} placeholder="Text Search"  onChange={(text) => {validateText(text)}}/>
                 <p>Search based on name or description</p>
            </div>
            <div className="al-page-filer">
            <Select value={searchRating} style={{ }} allowClear onChange={validateSelect}>
                <Option value="">All</Option>
                <Option value="G">G</Option>
                <Option value="PG">PG</Option>
                <Option value="R">R</Option>
                <Option value="R18">R18</Option>
            </Select>
            </div>
        </div>
        <div className="">
            <button onClick={() => callApiRequest()}>Search</button>
            <button onClick={() => clearAndCallApiRequest()}>Clear</button>
        </div>




        {(searchResult && searchResult.length == 0 && !isLoading) && 
            <div className="al-loading">
            No Data
            </div>
        }

        {(searchResult && searchResult.length > 0 && !isLoading) && 
            <div>
                <Pagination  defaultCurrent={currentPage} total={paginationCount} simple onChange={goToPageNumber} />
                 <Table pagination={false} columns={columns} dataSource={searchResult} />
                
            </div>
        }

        {(isLoading) && 
            <div className="al-loading">
            Loading
            </div>
        }










    

    </section>

    
  )
}
