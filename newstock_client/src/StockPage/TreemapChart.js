import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";
import '../App.css';
import getstockDB from './stockDBGetter';
import getDailyPriceDB from './dayChartDBGetter';

export default function TreemapChart () {
  const [stocks,setStocksComponent] = useState([]);
  const [timeprices,setPrices] = useState([]);

  useEffect( () => {
    async function loadStock() {
      const stockList = await getstockDB();
      setStocksComponent(stockList);
    }
    loadStock();
  },[]);

  useEffect( () => {
  async function loadPrice() {
    const pricePerTime = await getDailyPriceDB('HMM');
    setPrices(pricePerTime);
   };
   loadPrice();
  },[]);
  
  function setPropsD(arr){
    let chartWidth = 300 * 0.8 ;
    let chartHeight = 170 * 0.6 ; 
    let intervalX = chartWidth/arr.length;
    let maxPrice = arr.reduce((prev,curr) => prev.price > curr.price ? prev.price :curr.price);
    let minPrice = arr.reduce((prev,curr) => prev.price < curr.price ? prev.price : curr.price);
    let result = arr.reduce((acc,cur,idx) => {
      let isFirst = idx ===0;
      console.log(maxPrice, minPrice);
      if (isFirst) return 'M'+(intervalX*idx+30)+' '+((1-(cur.price-29450)/(maxPrice-29450))*(chartHeight) +17);
      return acc + ' L'+(intervalX*idx+30) +' '+ ((1-(cur.price-29450)/(maxPrice-29450))*(chartHeight)+17);
    },'');
    return result;

  };
  
  const seriesArray = stocks.map(obj => {
    let newObj = {};
    newObj['x'] =obj.name;
    newObj['y'] = obj.price>10000? obj.price/10: obj.price*1;
    newObj['rate'] = obj.rate;
    
    console.log(timeprices);
    newObj['d'] = setPropsD(timeprices);
    return newObj;
  });
  const colors = stocks.map(obj => {
    let g = 40;
    let b = g ;
    let r = g + parseInt(obj.rate*40);
    if (r>255) { r =255;}
    return "rgb(" + [r, g, b].join(",") + ")"
  });

  const options = {
    series: [
      {
        data: seriesArray
      }
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        events:{
        
        },
        toolbar : {
          show : false
        },
        fontFamily : 'Belvetica, Arial, sans-serit',
        height: 550,
        type: 'treemap'
      },
      title: {
        //text: 'Distibuted Treemap (different color for each cell)',
        // align: 'center'
      },
      colors: colors,
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      },
      tooltip : {
        enabled :true,
        custom : function Custom({series,seriesIndex,dataPointIndex,w}) {
          let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex] ;
          //console.log(data.d);
          var startPoint = "10%";
          var endPoint = "80%";
          return '<svg width = " 300px" height = "170px">' +
          '<line x1="'+ startPoint+ '"y1 ="' + endPoint + '" x2="'+startPoint+'" y2="'+startPoint+'" stroke = "black"/>'+
          '<line x1="'+startPoint+'" y1 = "'+endPoint+'" x2 ="90%" y2 ="'+endPoint+'" stroke = "black"/>'+
          '<path d ="' + data.d +'"'+ 
          'fill = "none" stroke= "#5885F5" stroke-width="1">' +
          '</path>'+
          '<g><text x ="10%" y = "90%">'+ data.x + ':' + data.rate +'</text></g>'+
          '</svg>'
          }
      }
    },
};

  return(
    <>
    <ReactApexChart 
    options={options.options} 
    series={options.series} 
    type="treemap" 
    height = {550} />
    
    </>
  );
}