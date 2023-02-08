import React from "react";
import "./css/create.css";
export var CreateVisibility; 
const Create = ()=>{
    const [isVisible,updateVisible]=React.useState('none');
    CreateVisibility=updateVisible;
    return (
        
            <div className="manage-slider" style={{display:isVisible}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer"}} onClick={()=>{
                        updateVisible('none');
                    }}>X</p></div>
                
                <div className="token-form" >
                    <span id="heading" style={{fontWeight:"500"}}>Create A Token</span>
                        <div className="form-options">
                            <p>Token Name</p>
                            <input  placeholder="Enter Token Name"></input>
                        </div>
                        <div className="form-options">
                            <p>Token Symbol/Ticker</p>
                            <input  placeholder="Enter Token Symbol/Ticker"></input>
                        </div>
                        <div className="form-options">
                            <p>Token Supply</p>
                            <input type="number" min="1"  placeholder="Enter Max/Total Supply"></input>
                        </div>
                        <div className="form-options">
                            <p>DAO Threshold</p>
                            <input type="number"  placeholder="1" ></input>
                        </div>
                        <div className="form-options">
                            <p>Auto liquidity Tax % (if any)</p>
                            <input type="number"  placeholder="0" min="0" ></input>
                        </div>
                        <div className="form-options">
                            <p>Auto Burn Tax % (if any)</p>
                            <input type="number"  placeholder="0" min="0"></input>
                        </div>
                        <div className="form-options">
                            <p>Additional Tax % (for example Marketing tax + Development tax)</p>
                            <input type="number"  placeholder="0" min="0"></input>
                        </div>
                        
                </div>
                <div className="confirmation">
                        <div>
                            Approve
                        </div>
                        <div>
                            Create Token
                        </div>
                    </div>
            </div>

    )

}

export default Create;