import React from 'react';
import {Link} from "react-router-dom";
import styled, {keyframes} from 'styled-components';

export default function ChildComponent ({data}){
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
    return (
        <>
        <div className = "childComponent" data-tip = {data.data} data-for = "bubble"
         style = {{backgroundColor : data.color + "d0",}} >
            <button style={{ backgroundColor : 'rgb(0,0,0,0)', border : 'none'}}>
                <StyledLink to ={{pathname : `/topic/${data.data}`, state : {keyword : data.data}}}>
                    {data.data}
                </StyledLink>
            </button>
        </div>
        </>
    );
}  