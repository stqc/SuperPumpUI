import React from "react";
import "./css/trade.css";
import { ApproveToken, ApproveRouter, ApproveUSD, swapToken, searchToken,f,castVote, splitLP,tokens, getBalanceNoStr, searchedAddress, getBalanceETHnoSTR } from "./connection.js";
import Search from "./images/search.png"
import SearchElement from "./searchElement.js";

export var changeUSD;
export var changeToken;
export var updateTable;
export var setCurrentSym;
export var externalChangeDisplayDEX;
export var currentTableData;
export var externalTradeData;
export var externalUpdateTradeData;

const Trade=()=>{
    const [buyBtnClass,changeBuyClass]=React.useState('selector-btn-buy');
    const [sellBtnClass,changeSellClass]=React.useState('selector-btn');
    const [usdBal,updateUSDbal]=React.useState("0");
    const [tokenBal,updateTokenBal]=React.useState("0");
    const [tableData,changeTableData] = React.useState(    {name:null,supply:null,tokenperusdc:null,usdcpertoken:null,usdinpool:null,tokeninpool:null,buytax:null,saletax:null,dao:null,trade:true, DAOSup:null, yes:null, no:null}     );
    const [currentSymbol,updateSymbol] = React.useState('FTM');
    const [approveBTN,showApproveButton] = React.useState(false);
    const [selectedDEX,changeSelectedDEX]= React.useState();
    const [displayDEX,changeDisplayDEX] = React.useState(false);
    const [SearchBarOptions,showSearchBarOptions] = React.useState("none");
    const [SearchItems,SetSearchItems] = React.useState([]);
    const [estimatedToken,updateEstimatedTokens] = React.useState(0);
    const [estimatedFTM,updateEstimatedFTM] = React.useState(0);
    const [tradeData,updateTradeData] = React.useState([])

    updateTable = changeTableData();
    changeUSD=updateUSDbal;
    changeToken=updateTokenBal;
    setCurrentSym=updateSymbol;
    externalChangeDisplayDEX=changeDisplayDEX;
    currentTableData=tableData;
    externalTradeData=()=>{
        return tradeData
    };
    externalUpdateTradeData=updateTradeData;
    var TradeAmount = React.createRef();
    var searchBarRef = React.createRef();

    React.useEffect(()=>{


    },[])
    
    return(
        <div style={{marginTop:"4%"}}>
        <div className="search-bar-m">
                <div style={{padding:"0% 5%", background:"#1969FF",cursor:"pointer", borderRadius:"15px 0px 0px 15px"}} onClick={async ()=>{
                    console.log(searchBarRef.current.value)
                    await searchToken(searchBarRef.current.value);
                    f();
                }}>
                    <img style={{margin:"100% 0%"}} src={Search}/>
            </div>
            <input style={{height:"48px" ,width:"100%", fontFamily:"punk2"}} ref={searchBarRef} placeholder="Enter Token Address or Name" onChange={(e)=>{
                showSearchBarOptions("initial");

                let tokenItem =[];
                tokens.forEach(element => {
                    if(element.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())){
                        tokenItem.push(<SearchElement address={element.address} key={element.address} name={element.name} hideMain={showSearchBarOptions}/>)
                    }
                });
                SetSearchItems(tokenItem);

                if(e.target.value.length===0 || e.target.value.length===42){
                    showSearchBarOptions("none");
                }
                
            }}></input>
            <div style={{display:SearchBarOptions,position:"absolute", height:"300px", background:"#3a3a3a", borderRadius:"20px", border:"1px solid white", padding:"5px" ,  fontFamily:"punk2", width:"95%",top:"70px", LEFT:"0", overflowY:"scroll",overflowX:"hidden"}}>
                {SearchItems}
            </div>
        </div>
        <div className="trade-main">
            
            <div className="latest-tx">
                <div className="chart" id="chrt">

                </div>
                {/* <div className="tx-data">
                    <div style={{display:"flex",flexDirection:"column",maxHeight:"400px", overflowY:"scroll"}}>
                        {tradeData}
                    </div>
                </div> */}
            </div>
            <div className="token-info">
                <span className="title">Token Information Summary</span>
                <div className="sub-info">
                   <div className="opt-parent"> <div className="opt">Token Name</div><div className="ans">{tableData.name}</div></div>
                   <div className="opt-parent"><div className="opt">Total Supply</div><div className="ans">{tableData.supply}</div></div>
                   <div className="opt-parent"><div className="opt">Tokens/{currentSymbol}</div><div className="ans">{tableData.tokenperusdc}</div></div>
                   <div className="opt-parent"><div className="opt">{currentSymbol}/Token</div><div className="ans">{tableData.usdcpertoken}</div></div>
                   <div className="opt-parent"><div className="opt">{currentSymbol} In Pool</div><div className="ans">{tableData.usdinpool}</div></div>
                   <div className="opt-parent"><div className="opt">Token In Pool</div><div className="ans">{tableData.tokeninpool}</div></div>
                   <div className="opt-parent"><div className="opt">Buy Tax</div><div className="ans">{tableData.buytax}%</div></div>
                   <div className="opt-parent"><div className="opt">Sale Tax</div><div className="ans">{tableData.saletax}%</div></div>
                   <div className="opt-parent"><div className="opt">Market Cap (in FTM)</div><div className="ans">{tableData.mc}</div></div>
                   <div className="opt-parent" style={{cursor:"pointer"}} onClick={()=>{
                    window.open("https://dexscreener.com/fantom/"+tableData.poolad);
                   }}><div className="opt">View On</div><div className="ans">
                        <div style={{height:"70px",marginTop:"10px"}}>
                            <img height={"100%"} src="https://d1k8z2xrei817b.cloudfront.net/images/logo/dex-screener-ai-4f0aca60.png"/>
                        </div>
                    </div></div>
                   {/* <div className="opt-parent"><div className="opt">Links</div><div className="ans">{tableData.mc}</div></div> */}
                </div>

                    {displayDEX && <>
                   <p style={{fontSize:"0.8rem",fontFamily:"punk2", color:"green"}}> *Once the value of a token hits a market cap of 50,000 FTM, you may split the LP (allowed once).</p>
                    <select className="sort-selector" onChange={(e)=>{
                        changeSelectedDEX(e.target.value==="SpookySwap"?0:1);
                    }}>
                        <option disabled selected> Choose DEX</option>
                        <option>
                            SpookySwap
                        </option>
                        <option>SpiritSwap</option>
                    </select>
                <div className="confirmation"style={{fontSize:"0.8rem"}} onClick={()=>{
                    splitLP(selectedDEX);
                }}> <div>Add LP to External DEX</div></div></>}
            </div>
            <div className="footer">
                <span id="heading">
                    <span style={{color:"#1969FF"}}>
                        Super
                    </span>
                    <span style={{color:"#fafafa"}}>
                        Pump
                    </span>
                    <div className="footer-content">
                        <span id="sub-heading">Disclaimer</span>
                        <p style={{fontSize:"0.8rem"}}>The Information on this website, and other official SuperPump channels such as Discord, Twitter, and Telegram, is provided for education and
                            informational purposes only, without any express or implied warranty of any kind, including warranties of accuracy, completeness, or fitness for any
                            particular purpose. They are not intended to be and does not constitute financial advice, investment advice, trading advice or any other advice.
                            All Information is general in nature and is not specific to you the User or anyone else. </p>
                            <div className="links">
                                <a href="https://superpump-fun.gitbook.io/superpump.fun/" target="_blank">Documentation</a>|
                                <a href="https://twitter.com/SuperPumpFun" target="_blank">Twitter</a>|
                                <a href="https://t.me/SuperPumpOfficial" target="_blank">Telegram</a>
                            </div>
                            <p style={{margin:"auto", justifySelf:"flex-end", fontSize:"0.8rem"}}> &copy; SuperPump 2024 | All rights reserved</p>
                    </div>
                </span>
            </div>
            <div className="execution">
                {tableData.trade && <div className="buy-sell">
                    <div className={buyBtnClass} onClick={()=>{
                        changeBuyClass('selector-btn-buy');
                        changeSellClass('selector-btn')
                        showApproveButton(false)
                    }}>
                        Buy
                    </div>
                    <div className={sellBtnClass} onClick={()=>{
                        changeBuyClass('selector-btn');
                        changeSellClass('selector-btn-sell')
                        showApproveButton(true)
                    }}>
                        Sell
                    </div>
                </div>}
                {tableData.trade && <div className="buy-sell" style={{flexDirection:"column", marginTop:"2%"}}>
                    <input placeholder="Enter Amount" ref={TradeAmount} type="number" min="0" onChange={()=>{
                        buyBtnClass==="selector-btn-buy"?
                        updateEstimatedTokens(TradeAmount.current.value*tableData.tokenperusdc):
                        updateEstimatedFTM(TradeAmount.current.value*tableData.usdcpertoken)
                    }}></input>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        {buyBtnClass==="selector-btn-buy"?<span id="balance">FTM Wallet Balance: {usdBal}</span> :<span id="balance">Token Wallet Balance: {tokenBal}</span> }
                        <span style={{cursor:"pointer"}} id="balance" onClick={async()=>{
                            buyBtnClass==="selector-btn-buy"?TradeAmount.current.value=await getBalanceETHnoSTR():TradeAmount.current.value=await getBalanceNoStr(searchedAddress);
                            buyBtnClass==="selector-btn-buy"?
                            updateEstimatedTokens(TradeAmount.current.value*tableData.tokenperusdc):
                            updateEstimatedFTM(TradeAmount.current.value*tableData.usdcpertoken)
                        }}>MAX</span>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        {buyBtnClass==="selector-btn-buy"?<span id="balance">Estimated Tokens Received: {estimatedToken}</span> :<span id="balance">Estimated FTM Received: {estimatedFTM}</span> }
                        
                    </div>
                </div>}
                {tableData.trade && <div className="confirmation">
                    {approveBTN && <div onClick={()=>{
                        ApproveToken(tableData.poolad,TradeAmount.current.value);
                    }}>
                        Approve
                    </div>}
                    <div onClick={()=>{
                        sellBtnClass!=="selector-btn"? swapToken(TradeAmount.current.value,1):swapToken(TradeAmount.current.value,0);
                    }}>
                        Confirm
                    </div>
                </div>}
                {/* {!tableData.trade && <>
                        <div className="title" style={{color:"white", fontSize:"1.3rem"}}>
                            Liquidity Removal Vote Started, If you hold a DAO token please cast your vote below            
                        </div>
                        <div className="title" style={{color:"white" ,fontSize:"1rem"}}>
                            Votes in Favour: {tableData.yes}            
                        </div>
                        <div className="title" style={{color:"white",fontSize:"1rem"}}>
                            Votes Against: {tableData.no}            
                        </div>
                    <div className="confirmation" style={{alignItems:"center"}} >
                        <div onClick={()=>{
                            castVote(0);
                        }}>
                            Vote in Favour
                        </div>
                        <div onClick={()=>{
                            castVote(1);
                        }}>
                            Vote Against
                        </div>
                    </div></>} */}
            </div>
            
        </div>
        </div>
    )

}

export default Trade;