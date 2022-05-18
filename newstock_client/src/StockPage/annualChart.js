import React, { Component, useState, useEffect } from 'react';
import dayjs from "dayjs";
import ApexCharts from 'react-apexcharts'
import App from '../App';
import getannualChartDB from './AnnualChartDBGetter.js'
import { useLocation } from "react-router-dom";
//3. annualChartDBGetter 을 사용하여 주식 x의 값을 할당받고 캔들차트로 보여줌
//date 값 받아서 변환

function AnnualChart(props){

  const location =useLocation();
console.log('state', location.state);
const {dataPointIndex}= location.state;

  //console.log(dataPointIndex);

  const [stocks,setStocksComponent] = useState([])

  const [options, setOptions]=useState({

  chart: {
    height: 350,
    type: 'candlestick',
    events:{
        click(event, chartContext, config, params) {
      //날짜 클릭 시 해당 뉴스 오버레이로 띄우기
        console.log("annualChart");  

        window.location.replace('http://localhost:3000/stock/annualchart/pastnews');
        } 
    }
 },
 title: {
   text: 'CandleStick Chart - Category X-axis',
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
    //    return dayjs(val).format('MMM DD HH:mm')
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
  data: [
    //seriesArray
  ]
  }
])   
  
 

// useEffect(() =>  {
//   const stocklist = getannualChartDB(props.dataPointIndex)
//   setStocksComponent({stocklist})
//     const seriesArray = stocks.map(obj => {
//     let newObj = {};
//     newObj['x'] =obj.date;
//     newObj['y'] = [obj.start*1,obj.max*1,obj.min*1, obj.end*1];
// })});

useEffect(()=>{console.log(location);},[location]);

  return (
  <div id="chart">
    <ApexCharts 
    options={options} 
    series={series} 
    type="candlestick" 
    height={700} />
  </div>
  )
}
export default AnnualChart;