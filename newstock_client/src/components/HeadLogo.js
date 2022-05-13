import React, { Component } from 'react' ;
import Clock from 'react-live-clock';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import '../App.css'

const StyledHeader = styled.header`
    font-size : 40px;
    width : 300 px;
    text-align : center;
    
    margin-top : 20px;
`;

const StyledWrap = styled.div`
    
    margin : 0 auto;
`;

const Button = styled.button`
    float : right;
    margin-right : 10px;
    border : none;
    border-radius:15px;
    padding : 2px 10px;
    background : white;
    transition-duration : 0.4s;
    font-size : 15px;
    text-align : center;
    &:hover {
        background: black;
        color : white;
    }
`;
class HeadLogo extends Component {
    render() {
        return (
            <StyledWrap>
                <StyledHeader> { this.props.title } </StyledHeader>
                <hr className = 'hrcss'></hr>
                <Clock format = {'YYYY.MM.DD'} timezone ={'Asia/Seoul'} style = {{margin : '10px'}}/>
                <Link to="/stock"><Button>Stock</Button></Link>
                <Link to ="/"><Button>News</Button></Link>
                <hr className = 'hrcss' ></hr>
            </StyledWrap>
        );
    }
}

export default HeadLogo;
