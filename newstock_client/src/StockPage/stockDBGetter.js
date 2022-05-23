import axios from 'axios';

export default async function getstockDB() {
    let retData
    try {
        retData = await axios.get("http://localhost:8000/db/stocks");
        retData = retData.data.data
       
    } catch (error) {
        console.error(error)
    }
        
    return retData;
}
