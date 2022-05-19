import React, { useState, useEffect } from 'react'

import BubbleUI from "react-bubble-ui";
import ReactTooltip from "react-tooltip";
import Child from "./keywordBubble";
import NewsOverlay from "./newsOverlay"

import { useInterval } from '../Hooks/useInterval'
import getKeywordDB from './keywordDBGetter'

import "react-bubble-ui/dist/index.css";
import "./keywordPanel.css";


export default function KeywordPanel() {
    const [keywords, setKeywordsComponent] = useState([])
    const [overlay, setOverlay] = useState({})



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

    useEffect(() => {
    }, [overlay])

    useInterval(loadData, 1000);

    async function loadData() {
        const newsList = await getKeywordDB()
        setKeywordsComponent(newsList)
    }



    function updateOverlay(data) {
        setOverlay(data)
    }


    const children = keywords.map((keyword, index) => {
        return (
            <Child data = {keyword} updater = {updateOverlay} className = "keywordBubble" key = {index} />
        );
    });



    if (Object.entries(overlay).length !== 0) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
        <BubbleUI options = {options} className = "myBubbleUI" >
            {children}
        </BubbleUI>
        <ReactTooltip className = "eachBub" id = "bubble" effect ="solid" data-delayHide="0"/>
        {
            (Object.entries(overlay).length !== 0) ? 
            (<NewsOverlay props = {overlay} updater = {updateOverlay}/>) : (<></>)
        } 
        </>
    );
}
