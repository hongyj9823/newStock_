import axios from 'axios';


//주식 x의 1년 차트 값을 JSON 파일으로부터 받아오는 곳
 
//2. treemap chart로부터 x의 값을 받아서 해당 http://localhost:8000/db/annual/stock=x를 호출해서


export default async function getannualChartDB(props) {
console.log(props.dataPointIndex);
  //정보를 obj에 name과 code로 담아옴
    const array=['삼성전자', ''];

    let retData
    try {
        
        retData = await axios.get("http://localhost:8000/db/${array[dataPointIndex]}");
        retData = retData.data.data
        console.log(retData)
    } catch (error) {
        console.error(error)
    }
        
    return retData;
}

// 값 받아올 때 참고
// const [stocks,setStocksComponent] = useState([])
  
// async function handleRefresh(e) {
//   const stocklist = await getstockDB()
//   setStocksComponent(stocklist)
// }
// const seriesArray = stocks.map(obj => {
//     let newObj = {};
//     newObj['x'] =obj.name;
//     newObj['y'] = obj.code*1;

//    console.log(obj.name);
//     return newObj;
//   });