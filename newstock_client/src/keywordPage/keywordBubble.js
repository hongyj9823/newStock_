import React from 'react';


export default function KeywordBubble ({data, updater}){
    
    const tip = `
        <div style ="width : 40%; margin : 0 auto; font-family: 'Noto Sans KR', sans-serif;">
            <h1> ${data.keyword} </h1>
            <p> 관련주식: ${data.stocks} </p>
            <ul style = "list-style : none; padding-left : 0px;">
                <li> ${data.summary} </li>
            </ul>
        </div>
        `;

    function getColor(normalized) {
        let r = (normalized) * 100 + 100
        let b = r
        let g = r
        return "rgb(" + [r, g, b].join(",") + ")"
    }

    function handleBubbleClick() {
        updater(data)
    }

    return (
        <>
        <div className="childComponent" data-html={true} data-tip={tip} data-for = "bubble"
                style = {{backgroundColor : getColor(data.normalized)}} 
                onClick={handleBubbleClick}>
           {data.keyword}
        </div>
        </>
    );
}
