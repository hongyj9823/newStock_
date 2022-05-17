import React from "react";

export default function NewsOverlay({props, updater}) {
    console.log(props)

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
        <div className = "modal">
            <div onClick={handleOverlay} className="overlay"></div>
            <div className="modal-content">
                <h1> {props.keyword} </h1>
                <div> importance: {props.importance} </div>
                <div> related stocks: {getStocks()} </div>
                <ul> Summary
                    {props.summary.map((item, index) => {
                        return <li key = {index}> {index}: {item} </li>
                    })}
                </ul>
                {props.news.map((item, index) => {
                    return <ul key = {index}> News {index + 1}
                        <li key = {2*index}>{item.title}</li>
                        <li key = {2*index+1}>{item.url}</li>
                    </ul>
                })}
            </div>
        </div>
        </>
    )   

};
