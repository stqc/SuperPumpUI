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
                <div className="instructions">
                    <span id="heading" style={{fontWeight:"300"}}> Create a Token</span>
                    <p>FreshSwap allows you to create your BEP20 token in a matter of clicks with all the necessary features</p>
                    <ul>
                        <li>Type in your token name ( Think Fresh! )</li>
                        <li>Type in your ticker/symbol (eg. FRSH, BNB, ETH..etc)</li>
                        <li>Set the total/max supply of your token</li>
                        <li>Set the DAO threshold</li>
                        <li>Fill out any taxes you may wish to have on your token <span style={{
                            fontSize:"0.8rem",
                            
                        }}>(for any development tax such as marketing,salaries etc. click on add additional taxes and fill out the % along with the receving wallet)</span></li>
                        <li>Approve a small fee of $70 and then you just have to click on create your token!</li>
                    </ul>
                </div>
                <div className="token-form" >
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
                        
                        <div className="confirmation" style={{width:"auto"}}>
                            <div>
                                Add Additional Tax
                            </div>
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