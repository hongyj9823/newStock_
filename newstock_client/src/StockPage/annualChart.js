import React, {  useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts'
import { useNavigate, useLocation } from "react-router-dom";

import axios from 'axios';
import Modal from 'react-modal'



function AnnualChart(props){

const location =useLocation();
const {Index}= location.state;
const [loading, setLoading]=useState(false);
const [loading2, setLoading2]=useState(false);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [stockName, setstockName] = useState();
const [stockDate, setstockDate] = useState();
   //         const stockName=(array[Index]);
    //         const stockDate=w.config.series[0].data[dataPointIndex].x;
    //         setstockName(array[Index])
    //         setstockDate(w.config.series[0].data[dataPointIndex].x);

            
    // setSeriesArray2(seriesArray2); 
           
    //         //const seriesArray3=fetchData2.bind(seriesArray2);
            
    //         //console.log(array[Index]);
    //         //console.log(w.config.series[0].data[dataPointIndex].x);
            
    //         console.log(seriesArray2[0]);
    //              return '<ul>' +
    //              '<li><b>STOCK</b>: ' + stockName + '</li>' +
    //               '<li><b>DATE</b>: ' + stockDate + '</li>' +
    //               //'<li><b>TITLE</b>: \'' + seriesArray2[0].title + '\'</li>' +
    //              //'<li><b>URL</b>: \'' + seriesArray2[0].url + '\'</li>' +
    //              '</ul>';

//const navigate=useNavigate(); 
 
const array=[
  '삼성전자', 'LG에너지솔루션', 'NAVER', '카카오', 'KB금융', 'SK', 'LG화학', 'SK이노베이션', '현대차', '기아',
            '삼성바이오로직스', '셀트리온', 'HMM', '대한항공', '삼성생명', '삼성화재', '두산에너빌리티', '한온시스템', '삼성물산', '이마트',
            'POSCO홀딩스', '고려아연', '리노공업', '동진쎄미켐', '셀트리온제약', '씨젠', 'CJ제일제당', '오리온', '미래에셋증권', '메리츠증권',
            '에코프로비엠', '에코프로', '셀트리온헬스케어', 'CJ프레시웨이', '에스에프에이', '고영', '알테오젠', '레고켐바이오', '엘앤에프', '대주전자재료',
            '천보', '솔브레인', '포스코케미칼', '쌍용C&E', '현대건설', 'GS건설', '스튜디오드래곤', 'JYP Ent.', '케이엠더블유', '서진시스템',
            '지씨셀', 'HLB생명과학', '카카오게임즈', '펄어비스', '안랩', '디어유', '오스템임플란트', '파크시스템스', '하림지주', '매일유업'
]
const [seriesArray, setSeriesArray] = useState({});
useEffect(() => {   
  const fetchData = async () => {
  setLoading(true);
  const url="http://localhost:8000/db/annual/stock="+array[Index];
  console.log(url);
  try {
    const response = await axios.get( url );
    const seriesArray = response.data.data.map((item, idx) => {
      return {
        x: item.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
        y: [ parseFloat(item.start), parseFloat(item.max), parseFloat(item.min), parseFloat(item.end)]
      };                  
    });
    setSeriesArray(seriesArray); 
  } 
  catch (e) {
    console.log(e);
  }
  setLoading(false);
};
fetchData();
},[Index]);

const [seriesArray2, setSeriesArray2] = useState({

});
//과거뉴스 불러옴
useEffect(() => {   
  const fetchData2 = async () => {
  setLoading2(true);
 const url2="http://localhost:8000/db/pastNews/query="+stockName+'&date='+stockDate.split('-').join('').substr(2,7);
  console.log(url2);
  try {
    const response2 = await axios.get( url2 );
    const seriesArray2 = response2.data.data.map((item, idx) => {
      return {
        title: item.title,
        url: item.url
      };                  
    });
    setSeriesArray2(seriesArray2); 
    
  } 
  catch (e) {
    console.log(e);
  }
  setLoading2(false);
};

console.log(seriesArray2);
fetchData2();
},[stockDate]);//stockDate2가 갱신될때마다 실행

const [options, setOptions]=useState({
  chart: {
    height: 350,
    type: 'candlestick',
   
 },

 title: {
  text: 'Annual Chart ' + array[Index],
  align: 'left'
},
tooltip: {},
xaxis:{},
yaxis: {}
})

const [series, setSeries]=useState([{
    name: 'candle',
    data:
    []}])


// console.log(stockName);
// console.log(stockDate);
// console.log(seriesArray2)
//대기 중일 때

if (loading) {
  return  <p>Loading...</p>;
}
if (loading2) {
  return  <p>Loading...</p>;
}
  return (
    <div id="chart">
      <ApexCharts 
        options={{
          chart: {
            height: 350,
            type: 'candlestick',
            events:{
              click: function(event, chartContext, config) {
                setModalIsOpen(true);
                console.log(event);
                console.log(config);
                console.log(modalIsOpen);
              const stockName=(array[Index]);
              const dataPointIndex2= config.dataPointIndex;
            const stockDate=config.config.series[0].data[config.dataPointIndex].x;
            console.log(stockDate);
            console.log(stockName);
            console.log(config.dataPointIndex);
            setstockName(array[Index])
            setstockDate(config.config.series[0].data[config.dataPointIndex].x);
                //doubleclick 
                //if (event.detail === 2) console.log('doubleclick');
              }
              },
         },
         title: {
           text: 'Annual Chart ' + array[Index],
           align: 'left'
         },
         tooltip: {
          enabled: true,
        },
         xaxis: {
           type: 'datetime',
           tooltip: {
            enabled: true
          }
         },
         yaxis: {
           tooltip: {
             enabled: true
           }
         }
          }} 
        series={[{
          name: 'candle',
          data: seriesArray
         }]} 
        type="candlestick" 
        height={700} />


         <div>
               <Modal isOpen={modalIsOpen}>
               <h2><b>STOCK</b>: {stockName} </h2>
         <b>DATE</b>:{stockDate} 
       <ul> 
         
          <li>TITLE 1 : {seriesArray2[0].title} </li>
          <li>URL 1 : {seriesArray2[0].url} </li>
          <li>TITLE 2 : {seriesArray2[1].title} </li>
          <li>URL 2 : {seriesArray2[1].url} </li>
          <li>TITLE 3 : {seriesArray2[2].title} </li>
          <li>URL 3 : {seriesArray2[2].url} </li>
          <li>TITLE 4 : {seriesArray2[3].title} </li>
          <li>URL 4 : {seriesArray2[3].url} </li>
          <li>TITLE 5 : {seriesArray2[4].title} </li>
          <li>URL 5 : {seriesArray2[4].url} </li>
          <li>TITLE 6 : {seriesArray2[5].title} </li>
          <li>URL 6 : {seriesArray2[5].url} </li>
          <li>TITLE 7 : {seriesArray2[6].title} </li>
          <li>URL 7 : {seriesArray2[6].url} </li>
          <li>TITLE 8 : {seriesArray2[7].title} </li>
          <li>URL 8 : {seriesArray2[7].url} </li>
          <li>TITLE 9 : {seriesArray2[8].title} </li>
          <li>URL 9 : {seriesArray2[8].url} </li>
          <li>TITLE 10 : {seriesArray2[9].title} </li>
          <li>URL 10 : {seriesArray2[9].url} </li>


      </ul>
       
        <button onClick={()=> setModalIsOpen(false)}>CLOSE</button>
      </Modal>
      </div>


    </div>
  ) 
}
export default AnnualChart;