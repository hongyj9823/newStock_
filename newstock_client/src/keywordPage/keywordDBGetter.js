import axios from 'axios';

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
