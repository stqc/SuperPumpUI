import React from "react";
import "./css/create.css";
export var ManageVisibility; 
const Manage = ()=>{
    const [isVisible,updateVisible]=React.useState('none');
    ManageVisibility=updateVisible;
    const [buyBtnClass,changeBuyClass]=React.useState('selector-btn-buy');
    const [sellBtnClass,changeSellClass]=React.useState('selector-btn');
    function s(){
        document.getElementById("mng").style.width="0";
    }
    return (
        
            <div className="manage-slider" id="mng" style={{display:"grid"}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer"}} onClick={()=>{
                        updateVisible('none');
                        s();
                    }}>X</p></div>
                <div className="instructions" >
                    <span id="heading" style={{fontWeight:"300"}}> Manage Token</span>
                    <p>FreshSwap allows you to manage your token's liquidity and taxes all in one place!</p>
                </div>
                <div style={{padding:"2%"}}>
                        <div className="form-options">
                            <p>So you have just created a token and want to launch with FreshSwap? Go ahead and fill these two fields, once done click on Set DAO Threshold and finally Set Pool Address</p>
                            <p>Token Address</p>
                            <input placeholder="Enter Your Token Address Here" min="0"></input>
                            <p>DAO Threshold</p>
                            <input type="number"  placeholder="DAO Threshold cannot be set to 0 or more than 10% of total supply" min="0"></input>
                        </div>
                        <div className="confirmation">
                            <div>Set DAO Threshold</div>
                            <div>Set Pool Address</div>
                        </div>
                        {/* <div className="confirmation">
                            <div>Manage Liquidity</div>
                            <div>Update Buy Tax</div>
                            <div>Update Sale Tax</div>
                        </div> */}
                        <div className="execution" style={{padding:"2%", width:"inherit"}}>
                           {/*LP adding starts here */} {/* <div className="buy-sell">
                                <div className={buyBtnClass} onClick={()=>{
                                    changeBuyClass('selector-btn-buy');
                                    changeSellClass('selector-btn')
                                }}>
                                    Add Liquidity
                                </div>
                                <div className={sellBtnClass} onClick={()=>{
                                    changeBuyClass('selector-btn');
                                    changeSellClass('selector-btn-sell')
                                }}>
                                    Remove Liquidity
                                </div>
                            </div>
                            <div className="buy-sell" style={{flexDirection:"column", marginTop:"2%"}}>
                                <input placeholder="Enter USD Amount" type="number" min="0"></input>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <span id="balance">Wallet Balance: $2,000</span>
                                    <span id="balance" style={{cursor:"pointer"}}>MAX</span>
                                </div>
                            </div>
                            <div className="buy-sell" style={{flexDirection:"column", marginTop:"2%"}}>
                                <input placeholder="Enter Token Amount" type="number" min="0"></input>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <span id="balance">Wallet Balance: 2,000</span>
                                    <span id="balance" style={{cursor:"pointer"}}>MAX</span>
                                </div>
                            </div>
                                <div className="confirmation" style={{justifyContent:"space-evenly"}}>
                                    <div>Approve USD</div>
                                    <div>Approve Token</div>
                                    <div>Add Liquidity</div>
                                </div> */} {/*LP adding ends here */}
                         {/*Tax management starts here*/}   <div className="tax-update">
                                <div className="form-options">
                                    <p>Auto Liquidity Tax %</p>
                                    <input placeholder="Enter New Value or Leave Blank For No Change"></input>
                                    <p>Burn Tax %</p>
                                    <input placeholder="Enter New Value or Leave Blank For No Change"></input>
                                    <p>Additional Tax %</p>
                                    <input placeholder="Enter New Value or Leave Blank For No Change"></input>
                                    <div className="confirmation">
                                        <div>Update Taxes</div>
                                    </div>
                                </div>{/* Tax management ends here */}
                            </div>
                        </div>

                </div>
                
            </div>

    )

}

export default Manage;