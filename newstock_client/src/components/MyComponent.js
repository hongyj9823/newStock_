import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import ReactTooltip from "react-tooltip";
import Child from "./ChildComponent";
import "./myComponent.css";


export default function MyComponent(props) {
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
    
    const children = props.data.map((data) => {
        return (
            <>
            <Child data = {data} className = "child" key = {data.key} ></Child>
            </>    
        );
    });

    return (
        <>
        <BubbleUI options = {options} className = "myBubbleUI" >
            {children}
        </BubbleUI>
        <ReactTooltip className = "eachBub" id = "bubble" effect ="solid" data-delayHide="0"
        getContent = {(dataTip) => 
            <>
            <h1> headline </h1>
            <span> news summary related with {dataTip}</span>
            <p> I can be red </p>
            <ul>
                <li> or blue </li>
                <li> or black </li>
                <li> or white </li>
            </ul>
            </>
        }
        />
        </>
    );
}