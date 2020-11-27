
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

export function replaceSpacesForRequest(text) {
    return text.replace(/ /g, '%20');
}

export function capitalize(text){
    return text.slice(0,1).toUpperCase() + text.slice(1,text.length)
}

export function returnHtml(text){
    return parseHTML(text);
}







