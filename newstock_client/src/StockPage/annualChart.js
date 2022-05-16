import React, { Component } from 'react'
import ApexCharts from 'react-apexcharts'


export default class annualstock extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      },
      {
        name: "Data2",
        data: [1, 4, 15, 41, 69, 32, 39, 31, 48]
      }],

      options: {  
        chart: {
         
            events:{
                click(event, chartContext, config, params) {
                    console.log(config.seriesIndex);
                    console.log(config.dataPointIndex); 
                    
                    console.log("annualstock");  
    
                    window.location.replace('http://localhost:3000/stock/annualchart:keyword') ;
           
                
                    
        }
            }
        },
        // chart: {
        //     //      dataPointSelection: (event, chartContext, config) => {
        //     //     console.log(chartContext, config);
        //     // }
        // },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        tooltip: {
             intersect: true,
             shared: false
        }
      }
    }
  }
  render() {
    return (
      <ApexCharts
        options={this.state.options}
        series={this.state.series}
        typs='line'
        
        height={600}
        />
    );
  }
}