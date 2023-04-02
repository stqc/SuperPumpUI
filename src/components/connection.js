import Web3 from "web3";
import { buttonName } from "./Nav";
import { updateTable,changeToken,changeUSD, setCurrentSym } from "./Trade";
import { tradeStatus,foundPool, updateBal, manageSymbol } from "./Manage";
import { notifContent,notifDisplay } from "./notification";
import { notifContentAd,notifDisplayAd } from "./dataNotif";
import { changeBTNameMob } from "./MobMenu";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let ref= urlParams.get('ref');
export var pool;
export var searchedAddress;
var tokenName;
var Datafeed;
const web3Handler = window.ethereum?new Web3(window.ethereum):new Web3("https://goerli-rollup.arbitrum.io/rpc")

var connectedAccounts;
var poolAddress;
var sub;
var currentSym;
const IBEP20 = require("./ABI/IBEP20.json");
const TokenCreator = require("./ABI/TokenCreator.json");
const FactoryABI = require("./ABI/Factory.json");
const PoolABI = require("./ABI/Pool.json");
const BountyABI = require("./ABI/Bounty.json");
var USD = new web3Handler.eth.Contract(IBEP20);
const Factory = new web3Handler.eth.Contract(FactoryABI,"0x2AE35904E85d2C63EAB3DbCA46C17319bBcB85c4");
export const connect= async ()=>{
    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccounts =await web3Handler.eth.getAccounts();
    buttonName(connectedAccounts[0].slice(0,10)+"...");
    changeBTNameMob(connectedAccounts[0].slice(0,10)+"...");
    notifDisplay('flex');
        notifContent(`Connected to ${connectedAccounts[0]}`);
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    console.log(connectedAccounts);
    try{changeUSD((await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());
    }catch(e){}
    try{updateBal[0]((await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());}catch(e){}
    try{                updateBal[1](await getBalance(searchedAddress));
        changeToken(await getBalance(searchedAddress));

    }catch(e){}
    const subscription = web3Handler.eth.subscribe(
        "newBlockHeaders",
        async (err, result) => {
            try{changeUSD((await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());}catch(e){}
            try{updateBal[0]((await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());}catch(e){}
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

export const ApproveUSD = async(pair,addressToApprove,amount)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var pairWith;
        pair==0?pairWith=await Factory.methods.showNative().call():pairWith=await Factory.methods.showUSD().call()
        USD=new web3Handler.eth.Contract(IBEP20,pairWith);
        await USD.methods.approve(addressToApprove,Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
        notifDisplay('flex');
        notifContent('Approval Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    }
}

export const ApproveToken = async(addressToApprove,amount)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        await token.methods.approve(addressToApprove,Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
        notifDisplay('flex');
        notifContent('Approval Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    }
}

export const createToken = async(name,symbol,supply,pair,additionalTaxes,wallets,LPtax,DAO)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var TokenCr = new web3Handler.eth.Contract(TokenCreator,"0xCc2BD28B9e8571A006287bD947B1e7Fbe13bC969");
        console.log(wallets,additionalTaxes,pair)
        if(additionalTaxes.length>0){
            for(var i=0; i<additionalTaxes.length; i++){
                additionalTaxes[i]=Number(additionalTaxes[i].current.value)*10;
                wallets[i]=wallets[i].current.value;
            }
        }
        
        ref===null?ref="0x0000000000000000000000000000000000000000":ref=ref;
        console.log(additionalTaxes,wallets,pair)
        
        await TokenCr.methods.createSimpleToken(name,symbol,pair,supply,additionalTaxes,wallets,LPtax*10,Web3.utils.toWei(String(DAO)),ref).send({from:connectedAccounts[0]});
        var ad=await TokenCr.methods.lastTkCreated(connectedAccounts[0]).call();
        console.log(additionalTaxes)
        console.log(await TokenCr.methods.lastTkCreated(connectedAccounts[0]).call());
        notifDisplayAd('flex');
        notifContentAd(`Token Created Successfully at Address: ${ad}`);
    }

}

export const getBalance = async(address)=>{
    var token = new web3Handler.eth.Contract(IBEP20,address);
    return (Number(await token.methods.balanceOf(connectedAccounts[0]).call())/10**await token.methods.decimals().call()).toLocaleString();
}

export const searchToken = async(address)=>{
    searchedAddress = address;
    try{changeToken(await getBalance(searchedAddress));}catch(e){}
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
        var pairWith = await pool.methods.BaseAddress().call();
        USD=new web3Handler.eth.Contract(IBEP20,pairWith);
        currentSym=await USD.methods.symbol().call();
        setCurrentSym(currentSym);
        manageSymbol(currentSym);
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
            trade: await pool.methods.tradingEnabled().call(),
            DAOSup:await pool.methods.totalSupply().call(),
            yes:await pool.methods.yesVotes().call(),
            no: await pool.methods.noVotes().call()
        }
        tokenName=data.name;
        try{updateBal[0]((await USD.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());}catch(e){}
        try{updateBal[1]((await token.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());}catch(e){}
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
            trade: await pool.methods.tradingEnabled().call(),
            DAOSup:await pool.methods.totalSupply().call(),
            yes:await pool.methods.yesVotes().call(),
            no: await pool.methods.noVotes().call()
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
    token=(Number(token)*10**decimals).toLocaleString('fullwide', { useGrouping: false });
    console.log(token)
    await pool.methods.addLiquidity(token,Web3.utils.toWei(usd)).send({from:connectedAccounts[0]});
    alert("Liquidity added Successfully")
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
        notifDisplay('flex');
        notifContent('Transaction Successful!');
        await new Promise(r => setTimeout(r, 5000));
        notifDisplay('none');
    }else{
        var tok = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var decimals=await tok.methods.decimals().call();
        amount=(Number(amount)*10**decimals).toLocaleString('fullwide', { useGrouping: false });
        console.log(amount);
        await pool.methods.sellToken_qLx(amount).send({from:connectedAccounts[0]});
        notifDisplay('flex');
        notifContent('Transaction Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    }
}

export const claimBounty=async()=>{
    var bountyAddress = await pool.methods.not().call();
    console.log(bountyAddress);
    var bountyContract = new web3Handler.eth.Contract(BountyABI,bountyAddress);
    await bountyContract.methods.onTradeCompletion().send({from:connectedAccounts[0]});
    notifDisplay('flex');
        notifContent('Transaction Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
}

export const createPool=async(token,additionalTaxes,wallets,LPtax,DAO,pair)=>{
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
        await TokenCr.methods.createPool(token,additionalTaxes,wallets,pair,LPtax*10,Web3.utils.toWei(String(DAO)),ref).send({from:connectedAccounts[0]});
        notifDisplay('flex');
        notifContent('Pool Creation Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    }
}

export const castVote= async (vote)=>{
    await pool.methods.vote(vote).send({from:connectedAccounts[0]});
    notifDisplay('flex');
        notifContent('Vote Casted Successfully!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
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
            symbol: tokenName+"/"+currentSym,
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
