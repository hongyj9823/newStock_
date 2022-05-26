import axios from 'axios';

export default async function dayChartDB(stock) {
    let retData
    try {
        retData = await axios.get("http://127.0.0.1:8000/db/daily");
        retData = retData.data.data
       
    } catch (error) {
        console.error(error)
    }
        
    return retData;
}