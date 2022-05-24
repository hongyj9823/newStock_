import React from 'react';
import {Link} from "react-router-dom";
import styled, {keyframes} from 'styled-components';

export default function KeywordBubble ({data, updater}){
    const blinking = keyframes`
        0% {
            opacity : 1;
        }
        50% {
            opacity : 0;
        }
        100% {
            opacity ; 1;
        }
    `;
    const StyledLink = styled(Link)`
        text-decoration : none ;
        color : black;
        font-size : 20px;
        &:hover {
            animation : ${blinking} .75s linear infinite;
        }
    `;
    const tip = `
        <h1> ${data.keyword} </h1>
        <p> 관련주식: ${data.stocks} </p>
        <ul>
            <li> ${data.summary} </li>
        </ul>
        `;

    function getColor(importance) {
        const max = 10000
        const min = 1000
        let r
        if (importance > max) r = 200
        else if (importance < min) r = 100
        else r = (importance - min) / (max - min) * 100 + 100

        let b = r
        let g = r
        return "rgb(" + [r, g, b].join(",") + ")"
    }

    function handleBubbleClick() {
        updater(data)
    }

    return (
        <div className="childComponent" data-html={true} data-tip={tip} data-for = "bubble"
                style = {{backgroundColor : getColor(data.importance)}} 
                onClick={handleBubbleClick}>
            {data.keyword}
        </div>
    );
}
