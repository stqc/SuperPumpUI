import React from "react";
import "./css/create.css";
export var ManageVisibility; 
const Manage = ()=>{
    const [isVisible,updateVisible]=React.useState('none');
    ManageVisibility=updateVisible;
    return (
        
            <div className="manage-slider" style={{display:isVisible}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer"}} onClick={()=>{
                        updateVisible('none');
                    }}>X</p></div>
                <div className="instructions">
                    <span id="heading" style={{fontWeight:"300"}}> Manage Token</span>
                    <p>FreshSwap allows you to manage your token's liquidity and taxes all in one place!</p>
                </div>
                
            </div>

    )

}

export default Manage;