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
        <h1> headline </h1>
        <span> news summary related with ${data.keyword}</span>
        <p> ${data.stocks} </p>
        <ul>
            <li> ${data.summary} </li>
        </ul>
        `;

    function getColor(importance) {
        const max = 10000
        const min = 1000
        let r
        if (importance > max) r = 255
        else if (importance < min) r = 0
        else r = (importance - min) / (max - min) * 255

        let b = 255 - r
        let g = 0
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
