
import 'antd/dist/antd.css';
import "../assets/css/style.less"
import { Input, Select , Table, Button, Pagination, Col, Row } from 'antd'
// Design

import {useEffect,useState} from 'react';
//React

import { useRouter } from 'next/router'
//Next

import {replaceSpacesForRequest} from '../utils/functionsMain'
import {getAnimes} from './api/requests';
// Custom 



export default function Home() {

  const { Option } = Select;
  const router = useRouter()

  const [searchResult,setSearchResultList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const [searchText,setSearchText] = useState('');
  const [searchRating,setSearchRating] = useState('');
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
                <button className="ant-btn ant-btn-primary" key={data.id} onClick={ () => {
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

  const validateSelect = (value) => {
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
    callApiRequest();
  }

   const getFilteredData = async (searchString) => {
    setPaginationCount(false)
       if(!isLoading){
            let resp = await getAnimes(searchString);
            if(resp.request == 'ok'){
            setPaginationCount(resp.output.data.meta.count)
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






  return (
    <section className={'al-container-1 flex-column'}>
        <div className="al-page-info">
          <h1>Welcome to <span className="clr-trending">Search</span></h1>
          <p> You can use the Search field to look Animes by name or with a similar name, if you want you can also set the filter by content type (G,PG,R,R18) </p>
      </div> 

        <div className="al-page-filters">
            <Row className="justify-end"> 

              <Col  className='al-page-filter'>
                  <label>Name:</label>
                  <Input value={searchText} placeholder="Name"  onChange={(text) => {validateText(text)}}/>
                  <p>Search based on name  or reference</p>
              </Col>
              <Col  className="al-page-filter">
                <label>Rating:</label>
                <Select value={searchRating} style={{ }} allowClear onChange={validateSelect}>
                    <Option value="">All</Option>
                    <Option value="G">G</Option>
                    <Option value="PG">PG</Option>
                    <Option value="R">R</Option>
                    <Option value="R18">R18</Option>
                </Select>
              </Col>
              <div className="items-center flex">
                  <Button  type="clear" onClick={() => clearAndCallApiRequest()}>Clear</Button>
                  <Button  type="primary" onClick={() => callApiRequest()}>Search</Button>
            </div>

            </Row>
          
         
        </div>
        







    

        {(searchResult && searchResult.length > 0 && !isLoading) && 
            <div className="margin-top-4">
              
                <Pagination  defaultCurrent={currentPage} total={paginationCount} simple onChange={goToPageNumber} />
                 <Table pagination={false} columns={columns} dataSource={searchResult} />
                
            </div>
        }

        {(searchResult && searchResult.length == 0 && !isLoading) && 
            <div className="al-loading">
            No Data
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
