import React, {  useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import "./AnnualNews.css";

function AnnualNews(props){

const location =useLocation();
const {stockName}= location.state;
const {stockDate}= location.state;
const [loading, setLoading]=useState(true);

const [seriesArray, setSeriesArray] = useState({});
const [seriesArray1, setSeriesArray1] = useState({});
const [seriesArray2, setSeriesArray2] = useState({});

let newstockDate= moment(stockDate, "YYYY-MM-DD").format("YYYY.MM.DD")
let newstockDateplus1= moment(stockDate, "YYYY-MM-DD").add(1, 'days').format("YYYY.MM.DD")
let newstockDateminus1= moment(stockDate, "YYYY-MM-DD").subtract(1, 'days').format("YYYY.MM.DD")

useEffect(() => {   
    const fetchData = async () => {
      setLoading(true);
      const url="http://localhost:8000/db/pastNews/query="+stockName+'&date='+stockDate.split('-').join('').substr(2,7);
      const url1="http://localhost:8000/db/pastNews/query="+stockName+'&date='+String(parseInt(stockDate.split('-').join('').substr(2,7))-1);
      const url2="http://localhost:8000/db/pastNews/query="+stockName+'&date='+String(parseInt(stockDate.split('-').join('').substr(2,7))+1);
      try {
        const response = await axios.get( url );
        const response1 = await axios.get( url1 );
        const response2 = await axios.get( url2 );
        const seriesArray = response.data.data.map((item, idx) => {
          return {
            title: item.title,
            url: item.url
          };                  
        });
        const seriesArray1 = response1.data.data.map((item, idx) => {
          return {
            title: item.title,
            url: item.url
          };                  
        });
        const seriesArray2 = response2.data.data.map((item, idx) => {
          return {
            title: item.title,
            url: item.url
          };                  
        });
        setSeriesArray(seriesArray);     
        setSeriesArray1(seriesArray1);    
        setSeriesArray2(seriesArray2);    
      } 
      catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  },[stockDate]);//stockDate2가 갱신될때마다 실행

if (loading) {
  return  <p>Loading...</p>;
}

const rendering = (arr)=> {
  const result = [];
  for (let i = 0 ; i < 9 ; i++) 
  {
    result.push(
      <li><a href={arr[i].url} target= '_blank'>{arr[i].title}</a></li>
    )
  }
    return result;
  };
  
  return (
  <>          
  < h3 align="center">Annual Past News</h3> 
    <div class="parent" >
      <div class="child setting">
        <h3 align="center"><b>{newstockDateminus1}</b></h3>
        <ol>
          {rendering(seriesArray1)}
        </ol>
      </div>
      {/* 하루전 */}
      <div class="childcolor setting"> 
        <h3 align="center">{newstockDate}</h3>
        <ol >
          {rendering(seriesArray)}
        </ol>
      </div>
      {/* 하루후 */}
      <div class="child setting" >
      <h3 align="center"><b>{newstockDateplus1}</b></h3>
        <ol>
          {rendering(seriesArray2)}
        </ol>
      </div>
    </div>   
  </>
  ) 
}
export default AnnualNews;
