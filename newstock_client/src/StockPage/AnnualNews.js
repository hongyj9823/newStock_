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
   //console.log(url)
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

if (loading) {
  return  <p>Loading...</p>;
}
  const aTagStyle = {
    color : "white",
    textDecoration : "none",
    backgroundColor : "#B5B6B8",
    borderRadius : "5px",
    margin : "10px",
    fontSize : "10px",
    padding : "5px",
  };
  const rendering = ()=> {
    const result = [];
    for (let i = 0 ; i < 9 ; i++) 
    {
      result.push(<div style = {{margin : "15px"}}>
        <b>{seriesArray[i].title}</b>
        <a href = {seriesArray[i].url} target = "_blank" style = {aTagStyle}><b>원문보기</b></a>
        </div>)
    }
    return result;
  };
  console.log(seriesArray)
  return (
    <div style = {{margin : "10px"}}>
      <h1>Annual Past News</h1>
      <div className = "sepcificDateNews">{rendering()}</div>
    </div>
  ) 
}
export default AnnualNews;
