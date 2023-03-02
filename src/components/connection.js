import Web3 from "web3";
import { buttonName } from "./Nav";
import { updateTable,changeToken,changeUSD } from "./Trade";
import { tradeStatus,foundPool, updateBal } from "./Manage";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let ref= urlParams.get('ref');
export var pool;
export var searchedAddress;
var tokenName;
var Datafeed;
const web3Handler = window.ethereum?new Web3(window.ethereum):new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

var connectedAccounts;
var poolAddress;
var sub;
const IBEP20 = require("./ABI/IBEP20.json");
const TokenCreator = require("./ABI/TokenCreator.json");
const FactoryABI = require("./ABI/Factory.json");
const PoolABI = require("./ABI/Pool.json");
const BountyABI = require("./ABI/Bounty.json");
const USD = new web3Handler.eth.Contract(IBEP20,"0x787D83593389bC1e827fB92D41071856908E1141");
const Factory = new web3Handler.eth.Contract(FactoryABI,"0x93643117727259381320804E485a849B9D9409Db");
export const connect= async ()=>{
    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccounts =await web3Handler.eth.getAccounts();
    buttonName(connectedAccounts[0].slice(0,10)+"...");
    console.log(connectedAccounts);

    const subscription = web3Handler.eth.subscribe(
        "newBlockHeaders",
        async (err, result) => {
            changeUSD("$"+(await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());
            updateBal[0]("$"+(await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());
            if(searchedAddress!=null){ 
                await updatePool();  
                changeToken(await getBalance(searchedAddress));
                updateBal[1](await getBalance(searchedAddress))
                var data = await pool.methods.showTradeData().call();
                var newd=[]
                for(var i=1; i<data.length; i++){
                newd.push({
                    time:Number(data[i][0])*1000,
                    open:Number(data[i][1])/1e18,
                    high:Number(data[i][3])/1e18,
                    low:Number(data[i][2])/1e18,
                    close:Number(data[i][4])/1e18,
                    volume:Number(data[i][5])/1e18,
                })
            }
                newd.reverse();
                sub(newd[0]);
            }
             }
       );
    
}   

export const ApproveUSD = async(addressToApprove,amount)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        await USD.methods.approve(addressToApprove,Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
    }
}

export const ApproveToken = async(addressToApprove,amount)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        await token.methods.approve(addressToApprove,Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
    }
}

export const createToken = async(name,symbol,supply,additionalTaxes,wallets,LPtax,DAO)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var TokenCr = new web3Handler.eth.Contract(TokenCreator,"0x9b8213165792E8efFdB17C90Fa8BAA97a97376b0");
        console.log(wallets)
        if(additionalTaxes.length>0){
            for(var i=0; i<additionalTaxes.length; i++){
                additionalTaxes[i]=Number(additionalTaxes[i].current.value)*10;
                wallets[i]=wallets[i].current.value;
            }
        }
        console.log(wallets);
        ref===null?ref="0x0000000000000000000000000000000000000000":ref=ref;
        await TokenCr.methods.createSimpleToken(name,symbol,supply,additionalTaxes,wallets,LPtax*10,Web3.utils.toWei(String(DAO)),ref).send({from:connectedAccounts[0]});
        console.log(await TokenCr.methods.lastTkCreated(connectedAccounts[0]).call());
    }

}

export const getBalance = async(address)=>{
    var token = new web3Handler.eth.Contract(IBEP20,address);
    return (Number(await token.methods.balanceOf(connectedAccounts[0]).call())/10**await token.methods.decimals().call()).toLocaleString();
}

export const searchToken = async(address)=>{
    searchedAddress = address;
    poolAddress=null;
    poolAddress = await Factory.methods.showPoolAddress(address).call();
    pool=null;
    if(poolAddress==="0x0000000000000000000000000000000000000000"){
        alert("Token Pool Doesn't Exist Yet");
        foundPool(false);
    }
    else{
        foundPool(true);
        pool = new web3Handler.eth.Contract(PoolABI,poolAddress);
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var tkinpool= (Number(await token.methods.balanceOf(pool._address).call())/10**await(token.methods.decimals().call())).toLocaleString();
        var USDinpool = (Number(await(USD.methods.balanceOf(pool._address).call()))/1e18).toLocaleString(); 
        var data = {
            poolad:pool._address,
            name: await token.methods.name().call(),
            supply: (Number(await token.methods.totalSupply().call())/10**await token.methods.decimals().call()).toLocaleString(),
            tokeninpool: tkinpool,
            usdinpool: USDinpool,
            tokenperusdc: tkinpool=="0"?"Not Set":await pool.methods.tokenPerUSD().call()/1e18,
            usdcpertoken:USDinpool=="0"?"Not Set":await pool.methods.USDPerToken().call()/1e18,
            buytax:await pool.methods.viewBuyTax().call()/10,
            saletax:await pool.methods.viewSellTax().call()/10,
            dao:(await pool.methods.DAOThreshold().call()/1e18).toLocaleString(),
            trade: await pool.methods.tradingEnabled().call()
        }
        tokenName=data.name;
        updateTable(data);
        tradeStatus(data.trade);
}


}

const updatePool=async()=>{

    poolAddress = await Factory.methods.showPoolAddress(searchedAddress).call();
    if(poolAddress==="0x0000000000000000000000000000000000000000"){
        console.log("Token Pool Doesn't Exist Yet");
        foundPool(false);
    }
    else{
        foundPool(true);
        pool = new web3Handler.eth.Contract(PoolABI,poolAddress);
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var tkinpool= (Number(await token.methods.balanceOf(pool._address).call())/10**await(token.methods.decimals().call())).toLocaleString();
        var USDinpool = (Number(await(USD.methods.balanceOf(pool._address).call()))/1e18).toLocaleString(); 
        var data = {
            poolad:pool._address,
            name: await token.methods.name().call(),
            supply: (Number(await token.methods.totalSupply().call())/10**await token.methods.decimals().call()).toLocaleString(),
            tokeninpool: tkinpool,
            usdinpool: USDinpool,
            tokenperusdc: tkinpool=="0"?"Not Set":await pool.methods.tokenPerUSD().call()/1e18,
            usdcpertoken:USDinpool=="0"?"Not Set":await pool.methods.USDPerToken().call()/1e18,
            buytax:await pool.methods.viewBuyTax().call()/10,
            saletax:await pool.methods.viewSellTax().call()/10,
            dao:(await pool.methods.DAOThreshold().call()/1e18).toLocaleString(),
            trade: await pool.methods.tradingEnabled().call()
        }
        tokenName=data.name;
        updateTable(data);
        tradeStatus(data.trade);

    }
}

export const addLiquidity =async(usd,token)=>{
    var tok = new web3Handler.eth.Contract(IBEP20,searchedAddress);
    console.log(token)
    var decimals=await tok.methods.decimals().call();
    console.log(decimals)
    token=Number(token)*10**decimals;
    console.log(token)
    token=String(token);
    await pool.methods.addLiquidity(token,Web3.utils.toWei(usd)).send({from:connectedAccounts[0]});
    alert("LP added Successfully")
}

export const requestRemovalVote = async ()=>{
    if(await pool.methods.tradingEnabled().call()){
        await pool.methods.requestLPRemovalDAO().send({from:connectedAccounts[0]});
        alert("voting started");
    }else{
        await pool.methods.removeLP().send({from:connectedAccounts[0]});
    }
}

export const swapToken= async(amount,action)=>{

    if(action===0){
        await pool.methods.buyToken_Qdy(Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
    }else{
        var tok = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var decimals=await tok.methods.decimals().call();
        amount=Number(amount)*10**decimals
        await pool.methods.sellToken_qLx(amount).send({from:connectedAccounts[0]});
    }
}

export const claimBounty=async()=>{
    var bountyAddress = await pool.methods.not().call();
    console.log(bountyAddress);
    var bountyContract = new web3Handler.eth.Contract(BountyABI,bountyAddress);
    await bountyContract.methods.onTradeCompletion().send({from:connectedAccounts[0]});
}

export const createPool=async(token,additionalTaxes,wallets,LPtax,DAO)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var TokenCr = new web3Handler.eth.Contract(TokenCreator,"0x9b8213165792E8efFdB17C90Fa8BAA97a97376b0");
        console.log(wallets)
        if(additionalTaxes.length>0){
            for(var i=0; i<additionalTaxes.length; i++){
                additionalTaxes[i]=Number(additionalTaxes[i].current.value)*10;
                wallets[i]=wallets[i].current.value;
            }
        }
        console.log(wallets);
        ref===null?ref="0x0000000000000000000000000000000000000000":ref=ref;
        await TokenCr.methods.createPool(token,additionalTaxes,wallets,LPtax*10,Web3.utils.toWei(String(DAO)),ref).send({from:connectedAccounts[0]});
    }
}
export const f=()=>{
    Datafeed={
        /* mandatory methods for realtime chart */
        onReady: cb => {console.log("hello")
        setTimeout(()=>cb({supported_resolutions:["1", "3", "5", "15", "30", "60", "120",   "240", "D"]}))},
        resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => 
        {console.log(symbolName)
        onSymbolResolvedCallback({
        name:symbolName,
        volume_precision:18,
        timezone:'Etc/UTC',
        intraday_multipliers:["1"],
        supported_resolutions:["1","5","15","60","360","720","D"],
        type:'crypto',
        minmov:1,
        session:"24x7",
        data_status:'streaming',
        has_intraday:true})
        return;
    },
        getBars: async(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback, firstDataRequest) =>
        {   
            var data = await pool.methods.showTradeData().call();
            var newd=[]
            for(var i=1; i<data.length; i++){
                newd.push({
                    time:Number(data[i][0])*1000,
                    open:Number(data[i][1])/1e18,
                    high:Number(data[i][3])/1e18,
                    low:Number(data[i][2])/1e18,
                    close:Number(data[i][4])/1e18,
                    volume:Number(data[i][5])/1e18,
                })
            }
         if(newd.length===periodParams.countBack){
            onHistoryCallback(newd,{noData:false});
           }else{
            var news=[]
            for(var i=1; i<data.length; i++){
                if(data[i][0]<periodParams.to){
                news.push({
                    time:Number(data[i][0])*1000,
                    open:Number(data[i][1])/1e18,
                    high:Number(data[i][3])/1e18,
                    low:Number(data[i][2])/1e18,
                    close:Number(data[i][4])/1e18,
                    volume:Number(data[i][5])/1e18,
                })}
            }
            onHistoryCallback(news,{noData:false});
           }


         }
         ,subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => 
         {
        sub=onRealtimeCallback;
    },
         unsubscribeBars: subscriberUID => {console.log("unsub")}
        }
    
        

    const options={
            debug:false,
            symbol: tokenName+'/USDC',
            autosize:true,
            container_id:"chrt", 
            library_path: '/charting_library/',
            client_id:"FreshSwap",
            user_id:"FreshSwap",
            datafeed:Datafeed,
            disabled_features: ['use_localstorage_for_settings'],
            interval:"1",
            overrides: {
                "paneProperties.background": "#000000",
                "paneProperties.vertGridProperties.color": "#363c4e",
                "paneProperties.horzGridProperties.color": "#363c4e",
                "symbolWatermarkProperties.transparency": 0,
                "scalesProperties.textColor" : "#AAA",
                "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
                "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
               }
        }
    const widget= new window.TradingView.widget(options);
        
}
