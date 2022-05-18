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
    x: '카카오',
    y: 19
  },
  {
    x: 'SK하이닉스',
    y: 14
  },
  {
    x: '현대차',
    y: 5
  },
  {
    x: '네이버',
    y: 8
  },
  {
    x: '우진',
    y: 13
  },
  {
    x: 'CS',
    y: 7
  },
  {
    x: '대한제당우',
    y: 15
  },
  {
    x: '카카오뱅크',
    y: 14
  },
  {
    x: '기업은행',
    y: 8
  },
  {
    x: 'KT',
    y: 28
  },
  {
    x: 'SK텔레콤',
    y: 19
  },
  {
    x: '삼천리',
    y: 29
  },
  {
    x:'케이씨',
    y:20
  },
  {
    x:'스카이라이프',
    y : 17
  },
  {
    x:'GS',
    y : 13
  },
  {
    x : '대한전선',
    y : 12
  },
  {
    x:'평화홀딩스',
    y:15
  },
  {
    x:'화승알앤에이',
    y : 16
  },
  {
    x : '신풍제약우',
    y : 19
  }
]
}]

)
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