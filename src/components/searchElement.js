import React from "react";
import { searchToken } from "./connection";

export default function SearchElement(props){

return(
    <div style={{display:"flex",borderBottom:"1px solid white", flexDirection:"column", cursor:"pointer", color:"white",padding:"2px"}} onClick={()=>{
        searchToken(props.address);
        props.hideMain("none");
    }}>
        <p style={{margin:"2px", fontWeight:"600", fontSize:"0.8rem"}}>{props.name}</p>
        <p style={{margin:"2px", fontWeight:"600", fontSize:"0.8rem"}}>{props.address}</p>
    </div>
)

}