import React from "react";
import { searchToken } from "./connection";

export default function SearchElement(props){

return(
    <div style={{display:"flex",borderBottom:"1px solid black", flexDirection:"column", cursor:"pointer"}} onClick={()=>{
        searchToken(props.address);
        props.hideMain("none");
    }}>
        <h4 style={{margin:"2px"}}>{props.name}</h4>
        <h6 style={{margin:"2px"}}>{props.address}</h6>
    </div>
)

}