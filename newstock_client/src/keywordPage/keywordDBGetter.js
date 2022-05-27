import axios from 'axios';

export default async function getKeywordDB() {
    let retData
    try {
        retData = await axios.get("http://localhost:8000/db/keywords");
        retData = retData.data.data

        let max = retData[0].importance
        let min = retData[0].importance

        for (let singleData of retData) {
            if (max < singleData.importance)
                max = singleData.importance
            else if (min > singleData.importance)
                min = singleData.importance
        }

        if (max != min)
            for (let i = 0; i < retData.length; i++) 
                retData[i].normalized = (retData[i].importance - min) / (max - min)
        else
            for (let i = 0; i < retData.length; i++)
                retData[i].normalized = 0.5

    } catch (error) {
        console.error(error)
    }
        
    return retData;
}
