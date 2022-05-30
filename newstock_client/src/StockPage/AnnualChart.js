import React, {  useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';


function AnnualChart(props){

const location =useLocation();
const {Index}= location.state;
const [loading, setLoading]=useState(false);

const navigate=useNavigate();
const array=[
  '삼성전자', 'LG에너지솔루션', 'NAVER', '카카오','KB금융', 'SK', 'LG화학', 'SK이노베이션','현대차','기아', '삼성바이오로직스', '셀트리온',
  'HMM', '대한항공', '삼성생명','삼성화재', '두산에너빌리티','한온시스템','삼성물산','이마트','POSCO홀딩스',  
  '고려아연',   '리노공업', '동진쎄미켐','셀트리온제약','씨젠','CJ제일제당','오리온',  '미래에셋증권', '메리츠증권','에코프로비엠', 
   '에코프로',  '셀트리온헬스케어','CJ프레시웨이', '에스에프에이','고영', '알테오젠','레고켐바이오',  '엘앤에프', '대주전자재료', '천보',
   '솔브레인','포스코케미칼','쌍용C&E', '현대건설', 'GS건설','스튜디오드래곤','JYP Ent.','케이엠더블유','서진시스템','지씨셀','HLB생명과학',
   '카카오게임즈', '펄어비스', '안랩', '디어유','오스템임플란트',  '파크시스템스', '하림지주',   '매일유업'
]
const [seriesArray, setSeriesArray] = useState({});

useEffect(() => {   
  const fetchData = async () => {
  setLoading(true);
  const url="http://localhost:8000/db/annual/stock="+array[Index];
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
    data:[]}])

if (loading) {
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
                if (event.detail === 2)         
                {  
                  //console.log(config)
                    navigate('/stock/annualchart/pastnews',{
                   state:{
                       stockName : array[Index],
                       stockDate : config.config.series[0].data[config.dataPointIndex].x
                     }});
               }}
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
    
    </div>
  ) 
}
export default AnnualChart;