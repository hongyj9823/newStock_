import React, { Component,Link } from 'react';
import ReactApexChart from "react-apexcharts";
import '../App.css';

export default class TreemapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
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
        }
      ],
      options: {
        legend: {
          show: false
        },
        chart: {
          events:{
            click(event, chartContext, config, params) {
        
                console.log("treemapChart");  
                window.location.replace('http://localhost:3000/stock/annualchart');
               
       
        }
  }
          // toolbar : {
          //   show : false
          // },
          // height: 350,
          // type: 'treemap'
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
        }
      },
    };
  }
  
  render() {
    return(
      <ReactApexChart 
      options={this.state.options} 
      series={this.state.series} 
      type="treemap" 
      height = {600} />
    );
  }
}