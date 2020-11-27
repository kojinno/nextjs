
// import 'antd/dist/antd.css';
// import "../assets/css/style.less"
import {Card} from 'antd'
import {getTextShort} from '../utils/functionsMain';;


export default function Home({item,goToDetailPage}) {
  return (
               <div className='al-card-columns al-cards-custom' key={item.id}>
                               <Card onClick={() => {goToDetailPage( `${item.id}_${item.attributes.slug}`)}} title={item.attributes.canonicalTitle} bordered={false} style={{ }}>
                               <img src={item.attributes.coverImage.tiny}></img>
                               <div className="al-card-main-info text-right">
                                  <span> {item.attributes.averageRating} / 100 </span>
                                  <span> Espistodes:   <span>  {item.attributes.totalLength}</span></span>
                               </div>
                               <p className="al-card-main-description">{ getTextShort(item.attributes.synopsis)}</p>
                             </Card>
                </div>
    
  )
}
