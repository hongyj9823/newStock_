import React,{useState, useEffect} from 'react';
import axios from "axios";
import Test from './components/test.js';
import HeadLogo from './components/HeadLogo.js';
import Footer from './components/Footer.js';
import MyComponent from './components/MyComponent.js';
import { keywords } from './components/keywords.js';
import TreemapChart from './components/TreemapChart.js';
import { Routes, Route } from 'react-router-dom';
import Dailynews from './components/Dailynews.js';
import './App.css';



function App() {
 


  // const url="http://localhost:8000/db/keywords";
  // //useEffect(()=>{
  //   fetch(url).then((res)=>res.json())
  //   .then((response) => console.log("response:", response))

//  })
  

    //   const {  items } = this.state;
    //   <ul>
    //   {items.map(item => (
    //     <li key={item.id}>
    //       {item.name} {item.price}
    //     </li>
    //   ))}
    // </ul>
  //   const [text, setText] = useState([]);
  //   axios.get("http://localhost:8000/db/keywords")
  //   .then((response) => {
  //     console.log(response);
  //  //setText([...response.data]);
    
  // })
  //  .catch(function (error) {
  //   console.log(error);
  //    }); 

  return (
 



    // {text.map((e) => (
    //   <div>
    //     {e.keyword}
    //   </div>
    // ))}


    <div className = 'Frame'>
      
        <HeadLogo title = "newStock" />

        <Routes>
          <Route path = "/" element = {<MyComponent data = {keywords}/>}></Route>
          <Route path =  "/stock" element = {<TreemapChart/>}></Route>
          <Route path = "/topic/:keyword" element = {<Dailynews />}></Route>
        </Routes>
  
      <Footer/>
   
      </div>


  );
}

export default App;
