import React, { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'

import BubbleUI from "react-bubble-ui";
import ReactTooltip from "react-tooltip";
import Child from "./keywordBubble";

import getKeywordDB from './keywordDBGetter'

import "react-bubble-ui/dist/index.css";
import "./keywordPanel.css";


export default function KeywordPanel() {
    const [keywords, setKeywordsComponent] = useState([])

    const options = {
        size : 200,
        minSize : 30,
        gutter : 8,
        provideProps : true,
        numCols : 4,
        fringeWidth : 140,
        yRadius : 100,
        xRadius : 350,
        cornerRadius : 50,
        showGuides : false,
        compact :true,
        gravitation : 5
    };
    
    useEffect(() => {
        ReactTooltip.rebuild()
    }, [keywords])

    async function handleRefresh(e) {
        const newsList = await getKeywordDB()
        console.log(newsList)
        setKeywordsComponent(newsList)
    }

    const children = keywords.map((keyword) => {
        return (
            <Child data = {keyword} className = "keywordBubble" key = {keyword.id} />
        );
    });

    return (
        <>
        <BubbleUI options = {options} className = "myBubbleUI" >
            {children}
        </BubbleUI>
        <ReactTooltip className = "eachBub" id = "bubble" effect ="solid" data-delayHide="0"/>
        <button onClick={handleRefresh}>Refresh</button>
        </>
    );
}