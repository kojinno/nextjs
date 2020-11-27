
const parseHTML = require('html-react-parser');


export function getTextShort(string) {
    let sizeLimit = 120;
    let shortString = string;
    let postString = '';
    if(typeof shortString === 'number'){
        shortString= `${shortString}` 
    }
    if (typeof shortString === 'string' || shortString instanceof String){
        if(shortString.length > sizeLimit){
            postString = '<span class="al-tag-details">[...more]</span>'
        }
        shortString = shortString.slice(0,sizeLimit)
    }else{
        shortString= 'no description available'
    }
   
    return parseHTML(shortString + postString);
}