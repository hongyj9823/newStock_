import React, {  useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

function AnnualNews(props){

const location =useLocation();
const {stockName}= location.state;
const {stockDate}= location.state;
const [loading, setLoading]=useState(true);

const [seriesArray, setSeriesArray] = useState({});
console.log(stockDate);
console.log(stockName);

useEffect(() => {   
    const fetchData = async () => {
    setLoading(true);
   const url="http://localhost:8000/db/pastNews/query="+stockName+'&date='+stockDate.split('-').join('').substr(2,7);
   console.log(url)
    try {
      const response = await axios.get( url );
      const seriesArray = response.data.data.map((item, idx) => {
        return {
          title: item.title,
          url: item.url
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
  },[stockDate]);//stockDate2가 갱신될때마다 실행




// console.log(stockName);
// console.log(stockDate);
 console.log(seriesArray)
//대기 중일 때
console.log(loading)
if (loading) {
  return  <p>Loading...</p>;
}
// if (loading2) {
//   return  <p>Loading...</p>;
// }

  console.log(seriesArray)
  return (
    <div >
  
    <p>annualpastnews</p>
    <b>{seriesArray[0].title}</b> <span>{seriesArray[0].url}</span>
    <b>{seriesArray[1].title}</b> <span>{seriesArray[1].url}</span>
    <b>{seriesArray[2].title}</b> <span>{seriesArray[2].url}</span>
    <b>{seriesArray[3].title}</b> <span>{seriesArray[3].url}</span>
    <b>{seriesArray[4].title}</b> <span>{seriesArray[4].url}</span>
    <b>{seriesArray[5].title}</b> <span>{seriesArray[5].url}</span>
    <b>{seriesArray[6].title}</b> <span>{seriesArray[6].url}</span>
    <b>{seriesArray[7].title}</b> <span>{seriesArray[7].url}</span>
    <b>{seriesArray[8].title}</b> <span>{seriesArray[8].url}</span>
    </div>
  ) 
}

export default AnnualNews;
