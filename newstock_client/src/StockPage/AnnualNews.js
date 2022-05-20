import React, {useState,useEffect} from 'react'
import Modal from 'react-modal'
import axios from 'axios';

// annualNewsDBGetter 에서 받아온 해당 날짜의 뉴스를 오버레이로 보여주는 곳 안되면 걍 페이지이동해서 보여주기 ^^
//modal 도전
// 주식 이름, 주식 날짜 들어옴
export default function AnnualNews (props) {

console.log(props.stockName);
console.log(props.stockDate);

const [modalIsOpen, setmodalIsOpen] =useState(true);
const [seriesArray, setSeriesArray] = useState({});
const [loading, setLoading]=useState(false);


useEffect(() => {   

  const fetchData = async () => {
  setLoading(true);
//stockDate '2021-04-21' 형식을 20210421 형식으로 바꿔야함
  const url="http://localhost:8000/db/pastNews/query="+props.stockName+'&date='+props.stockDate.split('-').join('').substr(2,7);
  console.log(url);
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
  }, []);

//대기 중일 때
if (loading) {
  return <p>Loading...</p>;
}

console.log(seriesArray[0].x);
console.log(modalIsOpen);


  return (   
    <div className='AnnualNews'>
          <Modal isOpen={modalIsOpen}>
    
        <h1>Title</h1>
        <p>This is a customizable modal.</p>
        {/* <h2>{seriesArray[0].title}</h2>
        <p>{seriesArray[0].url}</p>
        <h2>{seriesArray[1].x}</h2>
        <p>{seriesArray[1].y}</p>
        <h2>{seriesArray[2].x}</h2>
        <p>{seriesArray[2].y}</p>
        <h2>{seriesArray[3].x}</h2>
        <p>{seriesArray[3].y}</p>
        <h2>{seriesArray[4].x}</h2>
        <p>{seriesArray[4].y}</p>
        <h2>{seriesArray[5].x}</h2>
        <p>{seriesArray[5].y}</p> */}
       <div>
       <button onClick={()=>setmodalIsOpen(false)}>close</button>
       </div>
      
      </Modal>
    </div>
 )   
};
 