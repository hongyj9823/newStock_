import axios from 'axios';

/*
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
*/

export default async function getKeywordDB() {
    let retData
    try {
        retData = await axios.get("http://localhost:8000/db/keywords");
        retData = retData.data.data
    } catch (error) {
        console.error(error)
    }
        
    return retData;
}
