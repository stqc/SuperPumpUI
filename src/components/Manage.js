import React from "react";
import "./css/create.css";
import { ApproveUSD,pool,ApproveToken,addLiquidity,requestRemovalVote,claimBounty,createPool} from "./connection.js";

export var ManageVisibility; 
export var tradeStatus;
export var foundPool;
export var updateBal;
export var manageSymbol;
const Manage = ()=>{
    const [isVisible,updateVisible]=React.useState('none');
    ManageVisibility=updateVisible;
    const [buyBtnClass,changeBuyClass]=React.useState('selector-btn-buy');
    const [sellBtnClass,changeSellClass]=React.useState('selector-btn');
    const [tradingEnabled,updateTradeStatus]=React.useState(false);
    const [usdBal,updateUSDbal]=React.useState("0");
    const [tokenBal,updateTokenBal]=React.useState("0");
    const [poolFound,updateFoundStatus]=React.useState(true);
    const [adTax,updateAddtx]=React.useState([]);
    const [Taxes,addMoreTax]=React.useState([]);
    const [wallets,addMoreWallets]=React.useState([]);
    const [currentSymbol,updateSymbol] = React.useState('USDT');
    const [pairedWith,updatePair]=React.useState(null);

    manageSymbol=updateSymbol;
    foundPool=updateFoundStatus;
    tradeStatus=updateTradeStatus;
    updateBal=[updateUSDbal,updateTokenBal];
    var USDamount = React.createRef();
    var tokenAmount = React.createRef();
    var DAO = React.createRef();
    var LP = React.createRef();
    var Token = React.createRef();
    

    function s(){
        document.getElementById("mng").style.width="0";
    }
    return (
        
            <div className="manage-slider" id="mng" style={{display:"grid"}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer"}} onClick={()=>{
                        updateVisible('none');
                        updateAddtx([]);
                        addMoreTax([]);
                        addMoreWallets([]);
                        s();
                    }}> {'< Back'}</p></div>
                <div className="instructions" >
                    <span id="heading" style={{fontWeight:"300"}}> Manage Token</span>
                    <p>{poolFound?"Easily manage your token & liquidity with FreshSwap!":"Fill Out The Following Details To Have Your Project Trade on FreshSwap"}</p>
                </div>
                <div id="main-con-manage">
                        {!poolFound && <><div className="form-options">
                            <p>Token Address</p>
                            <input placeholder="Enter Your Token Address Here" ref={Token}min="0"></input>
                            <p>DAO Threshold</p>
                            <input type="number" ref={DAO} placeholder="DAO Threshold cannot be set to 0 or more than 2% of total supply" min="0"></input>
                            <div className="form-options">
                            <p>Pair With (Choose One):</p>
                            <div style={{display:"flex"}}><input style={{alignSelf:"flex-start"}} type="checkbox" value="Ethereum" onClick={()=>{updatePair(0)}}></input> wBNB</div>
                            <div style={{display:"flex"}}><input style={{alignSelf:"flex-start"}} type="checkbox" value="USDT" onClick={()=>{updatePair(1)}}></input>USDT</div>
                            </div>
                            <p>Auto Liquidity Tax % (if any)</p>
                            <input type="number" ref={LP} placeholder="0" min="0"></input>
                        </div>
                        <div className="form-options" style={{borderTop:"1px solid white",marginTop:"1%"}}>
                                {adTax}
                                <p style={{cursor:"pointer"}} onClick={()=>{
                                    var tax = React.createRef();
                                    var wallet = React.createRef();
                                    console.log(pairedWith)
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
                        <div className="confirmation">
                            <div onClick={()=>{
                                createPool(Token.current.value,Taxes,wallets,LP.current.value?LP.current.value:"0",DAO.current.value?DAO.current.value:"0",pairedWith);
                            }}>Create Pool</div>
                        </div></>}
                        
                        {poolFound && <div className="execution" style={{padding:"2%", width:"inherit"}}>
                           <div className="buy-sell">
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
                            {sellBtnClass==='selector-btn' && <>
                            <div className="buy-sell" style={{flexDirection:"column", marginTop:"2%"}}>
                                <input placeholder="Enter Amount" ref={USDamount} type="number" min="0"></input>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <span id="balance">{currentSymbol} Wallet Balance: {usdBal}</span>
                                    <span id="balance" style={{cursor:"pointer"}}>MAX</span>
                                </div>
                            </div>
                            <div className="buy-sell" style={{flexDirection:"column", marginTop:"2%"}}>
                                <input placeholder="Enter Amount" ref={tokenAmount} type="number" min="0"></input>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <span id="balance">Token Wallet Balance: {tokenBal}</span>
                                    <span id="balance" style={{cursor:"pointer"}}>MAX</span>
                                </div>
                            </div>
                                <div className="confirmation" style={{justifyContent:"space-evenly"}}>
                                    <div onClick={()=>{
                                        ApproveUSD(currentSymbol=="USDT"?1:0,pool._address,USDamount.current.value);
                                    }}>Approve {currentSymbol}</div>
                                    <div onClick={()=>{
                                        ApproveToken(pool._address,tokenAmount.current.value);
                                    }}>Approve Token</div>
                                     <div onClick={()=>{
                                        addLiquidity(USDamount.current.value,tokenAmount.current.value);
                                     }}
                                    >Add Liquidity</div>
                                </div>
                                
                            </>}{
                                sellBtnClass!=="selector-btn" && <>
                                    <div className="confirmation">
                                        <div onClick={()=>{
                                            requestRemovalVote();
                                        }}>
                                            {tradingEnabled? "Request Liquidity Removal":"Remove Liquidity"}
                                        </div>
                                    </div>
                                
                                </>
                            }
                         {/*Tax management starts here*/}   
                        </div>}
                        <div className="confirmation">
                                    <div onClick={()=>{
                                        claimBounty();
                                    }}>Claim Collected Taxes</div>
                                </div>
                </div>
                
            </div>

    )

}

export default Manage;