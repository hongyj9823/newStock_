import React from 'react'
import { useLocation } from "react-router-dom";


//import { useLocation } from "react-router-dom";
// annualNewsDBGetter 에서 받아온 해당 날짜의 뉴스를 오버레이로 보여주는 곳 안되면 걍 페이지이동해서 보여주기 ^^

export default function AnnualNews (props) {

     const location =useLocation();
     
     console.log('state', location.state);
     const {stockName}= location.state;
     const {stockDate}= location.state;
     
     //stockDate '2021-04-21' 형식으로 오기때문에  '-' 제외 가공 필요
     //stockDate=
     // useEffect(() => {   
     //      const fetchData = async () => {
     //      setLoading(true);
     //      const url="http://localhost:8000/db/db/pastNews/query="+stockName+'&date='+stockDate+'db/keywords';

     //      try {
     //        const response = await axios.get( url );
     //        const seriesArray = response.data.data.map((item, idx) => {
     //          return {
     //            x: item.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
     //            y: [ parseFloat(item.start), parseFloat(item.max), parseFloat(item.min), parseFloat(item.end)]
     //          };                  
     //        });
     //        setSeriesArray(seriesArray); 
     //      } 
     //      catch (e) {
     //        console.log(e);
     //      }
     //      setLoading(false);
     //    };
     //    fetchData();
     //    }, []);
        
     //    //대기 중일 때
     //    if (loading) {
     //      return <p>Loading...</p>;
     //    }




        return (
           <div>
                <p> annualNews</p>  
           </div>
            
       )   

};
 