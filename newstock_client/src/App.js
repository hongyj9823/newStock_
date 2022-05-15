import React from 'react';
import HeadLogo from './components/HeadLogo.js';
import KeywordPanel from './keywordPage/keywordPanel.js';
import TreemapChart from './StockPage/TreemapChart.js';
import AnnualChart from './StockPage/annualChart.js';
import AnnualNews from './StockPage/annualNews.js';
import Footer from './components/Footer.js';
import { Routes, Route } from 'react-router-dom';
import './App.css';



function App() {

  return (
    <div className = 'Frame'>
      <HeadLogo title = "newStock" />
      <Routes>
        <Route path = "/" element = {<KeywordPanel/>}/>
        <Route path = "/stock" element = {<TreemapChart/>}/>
        <Route path = "/stock/annualchart/:keyword" element = {<AnnualNews/>}></Route>  
        <Route path =  "/stock/annualchart" element = {<AnnualChart/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
