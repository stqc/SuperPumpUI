import React from "react";
import "./css/trade.css";
import { ApproveToken, ApproveUSD, swapToken } from "./connection.js";

export var updateTable;
const Trade=()=>{
    const [buyBtnClass,changeBuyClass]=React.useState('selector-btn-buy');
    const [sellBtnClass,changeSellClass]=React.useState('selector-btn');
    const [tableData,changeTableData] = React.useState(    {name:null,supply:null,tokenperusdc:null,usdcpertoken:null,usdinpool:null,tokeninpool:null,buytax:null,saletax:null,dao:null}     );
    updateTable = changeTableData;
    var TradeAmount = React.createRef();
    
    return(
        <div className="trade-main">
            <div className="chart" id="chrt">

            </div>
            <div className="token-info">
                <span className="title">Token Information Summary</span>
                <div className="sub-info">
                    <div className="opt">Token Name:</div><div className="ans">{tableData.name}</div>
                    <div className="opt">Total Supply:</div><div className="ans">{tableData.supply}</div>
                    <div className="opt">Tokens/USDC:</div><div className="ans">{tableData.tokenperusdc}</div>
                    <div className="opt">USDC/Token:</div><div className="ans">{tableData.usdcpertoken}</div>
                    <div className="opt">USD In Pool:</div><div className="ans">{tableData.usdinpool}</div>
                    <div className="opt">Token In Pool:</div><div className="ans">{tableData.tokeninpool}</div>
                    <div className="opt">Buy Tax:</div><div className="ans">{tableData.buytax}</div>
                    <div className="opt">Sale Tax:</div><div className="ans">{tableData.saletax}</div>
                    <div className="opt">DAO Threshold</div><div className="ans">{tableData.dao}</div>
                </div>
            </div>
            <div className="footer">
                <span id="heading">
                    <span style={{color:"#91E564"}}>
                        Fresh
                    </span>
                    <span style={{color:"#F9C04C"}}>
                        Swap
                    </span>
                    <div className="footer-content">
                        <span id="sub-heading">Disclaimer</span>
                        <p style={{fontSize:"0.8rem"}}>The Information on this website, and other official FreshSwap channels such as Discord, Twitter, and Telegram, is provided for education and
                            informational purposes only, without any express or implied warranty of any kind, including warranties of accuracy, completeness, or fitness for any
                            particular purpose. They are not intended to be and does not constitute financial advice, investment advice, trading advice or any other advice.
                            All Information is general in nature and is not specific to you the User or anyone else. </p>
                            <div className="links">
                                <a href="#">Whitepaper</a>|
                                <a href="#">Discord</a>|
                                <a href="#">Twitter</a>|
                                <a href="#">Telegram</a>
                            </div>
                            <p style={{margin:"auto", justifySelf:"flex-end", fontSize:"0.8rem"}}> &copy; FreshSwap 2023 | All rights reserved</p>
                    </div>
                </span>
            </div>
            <div className="execution">
                <div className="buy-sell">
                    <div className={buyBtnClass} onClick={()=>{
                        changeBuyClass('selector-btn-buy');
                        changeSellClass('selector-btn')
                    }}>
                        Buy
                    </div>
                    <div className={sellBtnClass} onClick={()=>{
                        changeBuyClass('selector-btn');
                        changeSellClass('selector-btn-sell')
                    }}>
                        Sell
                    </div>
                </div>
                <div className="buy-sell" style={{flexDirection:"column", marginTop:"2%"}}>
                    <input placeholder="Enter Amount" ref={TradeAmount} type="number" min="0"></input>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <span id="balance">Wallet Balance: </span>
                        <span id="balance" style={{cursor:"pointer"}}>MAX</span>
                    </div>
                </div>
                <div className="confirmation">
                    <div onClick={()=>{
                        sellBtnClass!=="selector-btn"? ApproveToken(tableData.poolad,TradeAmount.current.value):ApproveUSD(tableData.poolad,TradeAmount.current.value);
                    }}>
                        Approve
                    </div>
                    <div onClick={()=>{
                        sellBtnClass!=="selector-btn"? swapToken(TradeAmount.current.value,1):swapToken(TradeAmount.current.value,0);
                    }}>
                        Confirm
                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default Trade;