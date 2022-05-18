import axios from 'axios';
import getstockDB from './stockDBGetter.js';

//annualChart 클릭 시, 해당 날짜를 인자로 받아 값을 받아오는 곳 db/pastNews/query=삼성전자&date=211004 
 


export default async function getannualChartDB() {

  //정보를 obj에 name과 code로 담아옴

    let retData
    try {
        
        retData = await axios.get("http://localhost:8000/db/annual/db/pastNews/query=삼성전자&date=211004");
        retData = retData.data.data
        console.log(retData)
    } catch (error) {
        console.error(error)
    }
        
    return retData;
}
