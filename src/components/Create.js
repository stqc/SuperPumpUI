import React from "react";
import "./css/create.css";

const Create = ()=>{
    const [adTax,updateAddtx]=React.useState([]);

    function s(){
        document.getElementById("crt").style.width="0";
    }
    return (
        
            <div className="manage-slider" id="crt"style={{display:'grid'}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer", marginLeft:"1%"}} onClick={()=>{
                        updateAddtx([]);
                        s();
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
                        <div className="form-options" style={{borderTop:"1px solid white",marginTop:"1%"}}>
                                {adTax}
                                <p style={{cursor:"pointer"}} onClick={()=>{
                                    updateAddtx(adTax.concat([
                                        <>
                                          <input  style={{marginTop:"2%"}} type="number"  placeholder="Enter Tax Percentage" min="0"></input>
                                          <input style={{ marginTop:"1%"}} placeholder="Enter Receiving Wallet"></input>
                                        </>
                                        ]
                                    ));
                                }}>+ Add Additional Tax ?(for example Marketing tax, Development tax etc.)</p>
                            
                        </div>
                        <div className="confirmation" style={{marginTop:"auto"}}>
                        <div>
                            Approve
                        </div>
                        <div>
                            Create Token
                        </div>
                    </div>
                        
                </div>
                
            </div>

    )

}

export default Create;