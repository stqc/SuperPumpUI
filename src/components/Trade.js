import React from "react";
import "./css/trade.css";
import { ApproveToken, ApproveRouter, ApproveUSD, swapToken, searchToken,f,castVote, splitLP,tokens } from "./connection.js";
import Search from "./images/search.png"
import SearchElement from "./searchElement.js";

export var changeUSD;
export var changeToken;
export var updateTable;
export var setCurrentSym;
export var externalChangeDisplayDEX;

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

    updateTable = changeTableData;
    changeUSD=updateUSDbal;
    changeToken=updateTokenBal;
    setCurrentSym=updateSymbol;
    externalChangeDisplayDEX=changeDisplayDEX;
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
            <input style={{height:"48px" ,width:"100%", fontFamily:"punk2"}} ref={searchBarRef} placeholder="Enter Token Address" onChange={(e)=>{
                

                let tokenItem =[];
                tokens.forEach(element => {
                    if(element.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())){
                        tokenItem.push(<SearchElement address={element.address} key={element.address} name={element.name} hideMain={showSearchBarOptions}/>)
                    }
                });
                SetSearchItems(tokenItem);

                if(e.target.value.length===0 || e.target.value.length===42){
                    showSearchBarOptions("none");
                }else{
                    showSearchBarOptions("initial");
                }
                
                
            }}></input>
            <div style={{display:SearchBarOptions,position:"absolute", height:"300px", background:"white", width:"95%",top:"70px", LEFT:"0", overflowY:"scroll",overflowX:"hidden"}}>
                {SearchItems}
            </div>
        </div>
        <div className="trade-main">
            
            <div className="chart" id="chrt">

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
                   <div className="opt-parent"><div className="opt">Market Cap (in FTM)</div><div className="ans">{Number(tableData.usdcpertoken)*(tableData.supply?Number(tableData.supply.replace(",","")):0)}</div></div>
                </div>

                    {displayDEX && <>
                   <p style={{fontSize:"0.8rem",fontFamily:"punk2", color:"green"}}> *Once the value of a token hits a market cap of 10 FTM, you may split the LP (allowed once).</p>
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
                                <a href="#" target="_blank">Documentation</a>|
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
                    <input placeholder="Enter Amount" ref={TradeAmount} type="number" min="0"></input>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        {buyBtnClass==="selector-btn-buy"?<span id="balance">FTM Wallet Balance:{usdBal}</span> :<span id="balance">Token Wallet Balance:{tokenBal}</span> }
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