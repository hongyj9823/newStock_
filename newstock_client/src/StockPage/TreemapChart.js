import React, { Component,useState, useLocation} from 'react';
import ReactApexChart from "react-apexcharts";
import {Route, Link ,} from "react-router-dom";
import AnnualChart from './AnnualChart.js';
import App from "../App"
import { useNavigate } from "react-router-dom";

function TreemapChart () {

  const navigate=useNavigate();

const [series, setSeries]=useState([{
  data: [
  {
    x: '삼성전자',
    y: 30
  },
  {
    x: 'LG에너지솔루션',
    y: 19
  },
  {
    x: 'NAVER',
    y: 14
  },
  {
    x: '카카오',
    y: 5
  },
  {
    x: 'KB금융',
    y: 8
  },
  {
    x: 'SK',
    y: 13
  },
  {
    x: 'LG화학',
    y: 7
  },
  {
    x: 'SK이노베이션',
    y: 15
  },
  {
    x: '현대차',
    y: 14
  },
  {
    x: '기아',
    y: 8
  },
  {
    x: '삼성바이오로직스',
    y: 28
  },
  {
    x: '셀트리온',
    y: 19
  },
  {
    x: 'HMM',
    y: 29
  },
  {
    x:'대한항공',
    y:20
  },
  {
    x:'삼성생명',
    y : 17
  },
  {
    x:'삼성화재',
    y : 13
  },
  {
    x : '두산에너빌리티',
    y : 12
  },
  {
    x:'한온시스템',
    y:15
  },
  {
    x:'삼성물산',
    y : 16
  },
  {
    x : '이마트',
    y : 19
  }
]
}])
const [options, setOptions]=useState({
  legend: {
    show: false
  },
  chart: {
    events:{ click(event, chartContext, config)
      {
       
        navigate('/stock/annualchart',{
          state:{
            dataPointIndex: config.dataPointIndex
          }

        });
      }


     }
  },
  title: {
    // text: 'Distibuted Treemap (different color for each cell)',
    // align: 'center'
  },
  colors: [
    '#3B93A5',
    '#F7B844',
    '#ADD8C7',
    '#EC3C65',
    '#CDD7B6',
    '#C1F666',
    '#D43F97',
    '#1E5D8C',
    '#421243',
    '#7F94B0',
    '#EF6537',
    '#C0ADDB'
  ],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false
    }
  }})

  return(
  <ReactApexChart 
  options={options} 
  series={series} 
  type="treemap" 
  height = {600} />
  );
}
export default TreemapChart;