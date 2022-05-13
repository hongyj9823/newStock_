import axios from 'axios';
import React,{Component} from 'react';

class Test extends React.Component{
    state = {
        arr:[]
    };

getMyData=async()=>{
    let retData = await axios.get("http://localhost:8000/db/keywords");
    retData = retData.data.data;
    console.log(JSON.stringify(retData));
    this.setState({arr:retData});
  
}

componentDidMount(){
    console.log("in componentDidMount");
    this.getMyData();
}

render(){
   // console.log(JSON.stringify(this.state.arr));
    return(
        <div>
            {
                this.state.arr.map((myMap)=>{
                    return  <p key={myMap.importance}>summary: {myMap.summary}</p>;
                })
            }
        </div>
    );
}
}

export default Test;

// getMyData=async()=>{
//     let retData = await axios.get("http://localhost:8000/db/keywords");
//     retData = retData.data;
//     console.log(JSON.stringify(retData));
//     this.setState({arr:retData});
// }

// componentDidMount(){
//     console.log("in componentDidMount");
//     this.getMyData();
// }

// render(){
//     return(
//         <div>
//             {
//                 this.state.arr.map((myMap)=>{
//                     return <p key={myMap.importance}>name: {myMap.keyword}</p>;
//                 })
//             }
//         </div>
//     );
// }