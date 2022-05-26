import React, {  useState, useEffect } from 'react';
import { useLocation,Link} from "react-router-dom";
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

let newstockDate= moment(stockDate, "YYYY-MM-DD").format("MMM Do YY")
let newstockDateplus1= moment(stockDate, "YYYY-MM-DD").add(1, 'days').format("MMM Do YY")
let newstockDateminus1= moment(stockDate, "YYYY-MM-DD").subtract(1, 'days').format("MMM Do YY")


useEffect(() => {   
    const fetchData = async () => {
    setLoading(true);
   const url="http://localhost:8000/db/pastNews/query="+stockName+'&date='+stockDate.split('-').join('').substr(2,7);
   const url1="http://localhost:8000/db/pastNews/query="+stockName+'&date='+String(parseInt(stockDate.split('-').join('').substr(2,7))-1);
   const url2="http://localhost:8000/db/pastNews/query="+stockName+'&date='+String(parseInt(stockDate.split('-').join('').substr(2,7))+1);
   console.log(url1)
   console.log(url2)
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
  console.log(seriesArray)
  return (
<>          
< h3 align="center">Annual Past News</h3> 
  <div class="parent" >
    <div class="child">
      <h3 align="center"><b>{newstockDateminus1}</b></h3>
      <ol>
        <li><a href={seriesArray1[0].url} target= '_blank'>{seriesArray1[0].title} </a></li>
        <li><a href={seriesArray1[1].url}target= '_blank'> {seriesArray1[1].title}</a></li>
        <li><a href={seriesArray1[2].url}target= '_blank'> {seriesArray1[2].title}</a></li>
        <li> <a href={seriesArray1[3].url}target= '_blank'> {seriesArray1[3].title}</a></li>
        <li><a href={seriesArray1[4].url} target= '_blank'> {seriesArray1[4].title}</a></li>
        <li> <a href={seriesArray1[5].url}target= '_blank'> {seriesArray1[5].title}</a></li>
        <li> <a href={seriesArray1[6].url}target= '_blank'> {seriesArray1[6].title}</a></li>
        <li><a href={seriesArray1[7].url}target= '_blank'> {seriesArray1[7].title}</a></li>
        <li> <a href={seriesArray1[8].url}target= '_blank'> {seriesArray1[8].title}</a></li>
        <li><a href={seriesArray1[9].url}target= '_blank'> {seriesArray1[9].title}</a></li>
      </ol>
    </div>
    {/* 하루전 */}
    <div class="childcolor"> 
      <h3 align="center">{newstockDate}</h3>
      <ol >
        <li><a href={seriesArray[0].url} target= '_blank'>{seriesArray[0].title} </a></li>
        <li><a href={seriesArray[1].url}target= '_blank'> {seriesArray[1].title}</a></li>
        <li><a href={seriesArray[2].url}target= '_blank'> {seriesArray[2].title}</a></li>
        <li> <a href={seriesArray[3].url}target= '_blank'> {seriesArray[3].title}</a></li>
        <li><a href={seriesArray[4].url} target= '_blank'> {seriesArray[4].title}</a></li>
        <li> <a href={seriesArray[5].url}target= '_blank'> {seriesArray[5].title}</a></li>
        <li> <a href={seriesArray[6].url}target= '_blank'> {seriesArray[6].title}</a></li>
        <li><a href={seriesArray[7].url}target= '_blank'> {seriesArray[7].title}</a></li>
        <li> <a href={seriesArray[8].url}target= '_blank'> {seriesArray[8].title}</a></li>
        <li><a href={seriesArray[9].url}target= '_blank'> {seriesArray[9].title}</a></li>
      </ol>
    </div>
  {/* 하루후 */}
    <div class="child" >
     <h3 align="center"><b>{newstockDateplus1}</b></h3>
      <ol>
        <li><a href={seriesArray2[0].url} target= '_blank'>{seriesArray2[0].title} </a></li>
        <li><a href={seriesArray2[1].url}target= '_blank'> {seriesArray2[1].title}</a></li>
        <li><a href={seriesArray2[2].url}target= '_blank'> {seriesArray2[2].title}</a></li>
        <li> <a href={seriesArray2[3].url}target= '_blank'> {seriesArray2[3].title}</a></li>
        <li><a href={seriesArray2[4].url} target= '_blank'> {seriesArray2[4].title}</a></li>
        <li> <a href={seriesArray2[5].url}target= '_blank'> {seriesArray2[5].title}</a></li>
        <li> <a href={seriesArray2[6].url}target= '_blank'> {seriesArray2[6].title}</a></li>
        <li><a href={seriesArray2[7].url}target= '_blank'> {seriesArray2[7].title}</a></li>
        <li> <a href={seriesArray2[8].url}target= '_blank'> {seriesArray2[8].title}</a></li>
        <li><a href={seriesArray2[9].url}target= '_blank'> {seriesArray2[9].title}</a></li>
      </ol>
    </div>
  </div>   
</>
  ) 
}
export default AnnualNews;
