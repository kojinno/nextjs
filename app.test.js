
const parseHTML = require('html-react-parser');


 function getTextShort(string) {
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



test('mock test', () => {
  let longText = "this is a very very very very very very very very very very very very very very very very very very very very very, like really, very very very very very very very very very very very very very very very very very very very very very, long text";
  let toString = JSON.stringify(getTextShort(longText)[1]);
  expect(toString).toContain(`[...more]`)
});

test('mock test 2', () => {
  let shortText = "this is a short text";
  expect(getTextShort(shortText)).toBe(shortText)
});




