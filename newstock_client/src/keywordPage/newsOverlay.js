import React from "react";

export default function NewsOverlay({props, updater}) {
    //console.log(props)
    const OVERLAY_STYLE  ={
        position : "fixed",
        display : "flex",
        justifyContent : "center",
        top : "10%",
    };
    const CONTENT_STYLE = {
        width : "100%",
        height : "80%",
        zIndex : "1000",
        overflowY : "auto",
        fontFamily: '"Noto Sans KR", sans-serif'
    }
    function handleOverlay() {
        updater({})
    }
    


    function getStocks() {
        let stocks_string = ""
        props.stocks.forEach((stock) => {
            stocks_string += "# " + stock + "  "
        })
        return stocks_string
    }

    

    return (
        <>
        <div className = "modal" style = {OVERLAY_STYLE}>
            <div onClick={handleOverlay} className="overlay"></div>
            <div className="modal-content" style = {CONTENT_STYLE}>
                <h1> {props.keyword} </h1>
                <div> 키워드와 연관된 주식 변동량: {props.importance} </div>
                <div> 관련 주식: {getStocks()} </div>
                <ul style = {{listStyle : "none", paddingLeft : "0px"}}>
                    {props.summary.map((item, index) => {
                        return <li style = {{padding : "10px 0px"}}key = {index}> 
                        <span style = {{backgroundColor : "grey", borderRadius : "5px",color :"white",padding : "2px 5px", fontSize : "12px"}}>
                            요약 {index+1}</span> {item}</li>
                    })}
                </ul>
                {props.news.map((item, index) => {
                    return <ul key = {index} > News {index + 1}
                        <li key = {2*index}>{item.title}</li>
                        {/* <li style = {{listStyle : "none"}} key = {2*index+1}>{item.url}</li> */}
                        <a href = {item.url} target="_blank">{item.url}</a>
                    </ul>
                })}
            </div>
        </div>
        </>
    )   

};
