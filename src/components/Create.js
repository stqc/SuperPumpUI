import React from "react";
import "./css/create.css";
import { ApproveUSD, createToken } from "./connection";

const Create = ()=>{
    const [adTax,updateAddtx]=React.useState([]);
    const [Taxes,addMoreTax]=React.useState([]);
    const [wallets,addMoreWallets]=React.useState([]);
    var tokenName = React.createRef();
    var symbol= React.createRef();
    var supply = React.createRef();
    var DAO = React.createRef();
    var LP = React.createRef();
    const [pairedWith,updatePair]=React.useState(null);

    function s(){
        document.getElementById("crt").style.width="0";
        tokenName.current.value=null;
        symbol.current.value=null;
        supply.current.value=null;
        DAO.current.value=null;
        LP.current.value=null;
    }
    return (
        
            <div className="manage-slider" id="crt"style={{display:'grid'}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer", marginLeft:"1%"}} onClick={()=>{
                        updateAddtx([]);
                        addMoreTax([]);
                        addMoreWallets([]);
                        s();
                    }}>{'< Back'}</p></div>
                
                <div className="token-form" >
                    <span id="heading" style={{fontWeight:"500"}}>Create A Token</span>
                        <div className="form-options">
                            <p>Token Name</p>
                            <input  placeholder="Enter Token Name" ref={tokenName}></input>
                        </div>
                        <div className="form-options">
                            <p>Token Symbol/Ticker</p>
                            <input  placeholder="Enter Token Symbol/Ticker" ref={symbol}></input>
                        </div>
                        <div className="form-options">
                            <p>Token Supply</p>
                            <input type="number" min="1" ref={supply} placeholder="Enter Max/Total Supply"></input>
                        </div>
                        <div className="form-options">
                            <p>Pair With (Choose One):</p>
                            <div style={{display:"flex"}}><input style={{alignSelf:"flex-start"}} type="checkbox" value="Ethereum" onClick={()=>{updatePair(0)}}></input> wETH</div>
                            <div style={{display:"flex"}}><input style={{alignSelf:"flex-start"}} type="checkbox" value="USDT" onClick={()=>{updatePair(1)}}></input>USDT</div>
                        </div>
                        <div className="form-options">
                            <p>DAO Threshold</p> 
                            <input type="number" ref={DAO} placeholder="Enter DAO Threshold (has to be between 0.1% and 1% of total supply)" ></input>
                        </div>
                        <div className="form-options">
                            <p>Auto liquidity Tax % (if any)</p>
                            <input type="number" ref={LP}  placeholder="0" min="0" ></input>
                        </div>
                        <div className="form-options" style={{borderTop:"1px solid white",marginTop:"1%"}}>
                                {adTax}
                                <p style={{cursor:"pointer"}} onClick={()=>{
                                    var tax = React.createRef();
                                    var wallet = React.createRef();
                                    updateAddtx(adTax.concat([
                                        <>
                                          <input  style={{marginTop:"2%"}} key={adTax.length+"tx"} ref ={tax} type="number"  placeholder="Enter Tax Percentage" min="0"></input>
                                          <input style={{ marginTop:"1%"}} key={adTax.length+"add"} ref={wallet} placeholder="Enter Receiving Wallet"></input>
                                        </>
                                        ]
                                    ));
                                    addMoreTax(Taxes.concat([tax]));
                                    addMoreWallets(wallets.concat([wallet]));
                                }}>+ Add Additional Tax ?(for example Marketing tax, Development tax etc.)</p>
                            
                        </div>
                        <div className="confirmation" style={{marginTop:"auto"}}>
                        <div onClick={()=>{
                            ApproveUSD(1,"0xCc2BD28B9e8571A006287bD947B1e7Fbe13bC969","100");
                        }}>
                            Approve
                        </div>
                        <div onClick={()=>{
                            console.log(wallets,Taxes)
                            createToken(tokenName.current.value,symbol.current.value,supply.current.value,pairedWith,Taxes,wallets,LP.current.value?LP.current.value:"0",DAO.current.value?DAO.current.value:"0");
                        }}>
                            Create Token
                        </div>
                    </div>
                        
                </div>
                
            </div>

    )

}

export default Create;