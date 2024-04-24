import React from "react";
import { tradeFromHome } from "./connection";
export default function TokenGrid(props){
    return(
        <div className="popular-token">
            <div style={{height:"100px", width:"100px"}}>
                <img src={props.image} alt="token-image" height={"100%"} width={"100%"}/>
            </div>
            <h4>{props.name}</h4>
            <button onClick={()=>{
                tradeFromHome(props.address)
            }}>Trade</button>
        </div>
    )
}