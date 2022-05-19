import React, {  useState, useEffect } from 'react';
import dayjs from "dayjs";
import ApexCharts from 'react-apexcharts'
import App from '../App';
import { useLocation } from "react-router-dom";
import axios from 'axios';
//3. annualChartDBGetter 을 사용하여 주식 x의 값을 할당받고 캔들차트로 보여줌
//date 값 받아서 변환

function AnnualChart(props){

const location =useLocation();
//console.log('state', location.state);
const {dataPointIndex}= location.state;

const array=[
  '삼성전자', 'LG에너지솔루션', 'NAVER', '카카오', 'KB금융', 'SK', 'LG화학', 'SK이노베이션', '현대차', '기아',
            '삼성바이오로직스', '셀트리온', 'HMM', '대한항공', '삼성생명', '삼성화재', '두산에너빌리티', '한온시스템', '삼성물산', '이마트',
            'POSCO홀딩스', '고려아연', '리노공업', '동진쎄미켐', '셀트리온제약', '씨젠', 'CJ제일제당', '오리온', '미래에셋증권', '메리츠증권',
            '에코프로비엠', '에코프로', '셀트리온헬스케어', 'CJ프레시웨이', '에스에프에이', '고영', '알테오젠', '레고켐바이오', '엘앤에프', '대주전자재료',
            '천보', '솔브레인', '포스코케미칼', '쌍용C&E', '현대건설', 'GS건설', '스튜디오드래곤', 'JYP Ent.', '케이엠더블유', '서진시스템',
            '지씨셀', 'HLB생명과학', '카카오게임즈', '펄어비스', '안랩', '디어유', '오스템임플란트', '파크시스템스', '하림지주', '매일유업'
]
const [seriesArray, setSeriesArray] = useState({});
const [loading, setLoading]=useState(false);

const [options, setOptions]=useState({

  chart: {
    height: 350,
    type: 'candlestick',
    events:{
        click(event, chartContext, config, params) {
      //날짜 클릭 시 해당 뉴스 오버레이로 띄우기
       // console.log("annualChart");  

       // window.location.replace('http://localhost:3000/stock/annualchart/pastnews');
        } 
    }
 },
 title: {
   text: 'Annual Chart ' + array[dataPointIndex],
   align: 'left'
 },
 annotations: {
   xaxis: [
     {//이거는 표시하는 annotation 부분
       x: 'Oct 06 14:00',
       borderColor: '#00E396',
       label: {
         borderColor: '#00E396',
         style: {
           fontSize: '12px',
           color: '#fff',
           background: '#00E396'
         },
         orientation: 'horizontal',
         offsetY: 7,
         text: 'Annotation Test'
       }
     }
   ]
 },
 tooltip: {
   enabled: true,
 },
 xaxis: {
   type: 'datetime',
   labels: {
    //  formatter: function(val) {
    //    console.log(val);
    //    return [val.slice(0, 4), "-", val.slice(4, 6), "-", val.slice(6, 8)].join('');
   // }
    
   },
   tooltip: {
    enabled: false
  }
 },
 yaxis: {
   tooltip: {
     enabled: true
   }
 }
  })
  const [series, setSeries]=useState([{
    name: 'candle',
    data:
    []}])
console.log(seriesArray[0]);
 
  useEffect(() => {   
    const fetchData = async () => {
      setLoading(true);
      const url="http://localhost:8000/db/annual/stock="+array[dataPointIndex];
      try {
        const response = await axios.get( url );
        const seriesArray = response.data.data.map((item, idx) => {
            return {
              x: item.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
              y: [ parseFloat(item.start), parseFloat(item.max), parseFloat(item.min), parseFloat(item.end)]
            };                  
          });
          setSeriesArray(seriesArray); 
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(seriesArray)
  //대기 중일 때
  if (loading) {
    return <p>Loading...</p>;
  }
   return (
  <div id="chart">
    <ApexCharts 
    
    options={options} 
    series={  [{
      name: 'candle',
      data:
      [
      seriesArray[0],
      seriesArray[1],
       seriesArray[2],
      seriesArray[3],
      seriesArray[4],
      seriesArray[5],
      seriesArray[6],
       seriesArray[7],
      seriesArray[8],
      seriesArray[9],
      seriesArray[10],
      seriesArray[11],
       seriesArray[12],
      seriesArray[13],
      seriesArray[14],
      seriesArray[16],
      seriesArray[17],
       seriesArray[18],
      seriesArray[19],
      seriesArray[20],
      seriesArray[21],
    ]
  
    
    }]} 
    type="candlestick" 
    height={700} />
    
  </div>
  ) 
}
export default AnnualChart;