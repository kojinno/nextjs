import axios from 'axios';

export const getTrending = async () =>{
     let responseObj = {}
    try {
        await axios.get(`https://kitsu.io/api/edge/trending/anime?fields[anime]=canonicalTitle,subtype,slug,coverImage,synopsis,totalLength,averageRating,description`, 
        { } )
        .then(res => {
            if(res != Error){
              responseObj.output = res;
              responseObj.request = 'ok';
            }else{
              responseObj.output = res;
              responseObj.request = 'error';
            }
        }).catch((error) => {
          responseObj.output = error;
          responseObj.request = 'error';
        });
    
    } catch (error) {
        console.log(`catch ${error}`);
    }

    return responseObj;
    
      
}

export const getAnimes = async (searchString) =>{
  let apiString = `${searchString}`
  let responseObj = {}

 try {
     await axios.get(apiString, 
     { } )
     .then(res => {
         if(res != Error){
           responseObj.output = res;
           responseObj.request = 'ok';
         }else{
           responseObj.output = res;
           responseObj.request = 'error';
         }
     }).catch((error) => {
       responseObj.output = error;
       responseObj.request = 'error';
     });
 
 } catch (error) {
     console.log(`catch ${error}`);
 }

 return responseObj;
 
   
}

export const getAnimeDetails = async (id) => {
  let responseObj = {}
  try {
      await axios.get(`https://kitsu.io/api/edge/anime/${id}`, 
      { } )
      .then(res => {
          if(res != Error){
            responseObj.output = res;
            responseObj.request = 'ok';
          }else{
            responseObj.output = res;
            responseObj.request = 'error';
          }
      }).catch((error) => {
        responseObj.output = error;
        responseObj.request = 'error';
      });
  
  } catch (error) {
      console.log(`catch ${error}`);
  }

  return responseObj;
}



