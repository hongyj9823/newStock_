import React from 'react';
import HeadLogo from './components/HeadLogo.js';
import KeywordPanel from './keywordPage/keywordPanel.js';
import DailyNews from './keywordPage/newsOverlay.js';
import TreemapChart from './StockPage/TreemapChart.js';
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
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
