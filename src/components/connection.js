import Web3 from "web3";
import { buttonName } from "./Nav";
import { updateTable,changeToken,changeUSD, setCurrentSym, externalChangeDisplayDEX, currentTableData } from "./Trade";
import { tradeStatus,foundPool, updateBal, manageSymbol } from "./Manage";
import { notifContent,notifDisplay } from "./notification";
import { notifContentAd,notifDisplayAd, updateHeading } from "./dataNotif";
import { changeBTNameMob } from "./MobMenu";
import { updateHomePage } from "../App";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let ref= urlParams.get('ref');
export var pool;
export var searchedAddress;
var tokenName;
var Datafeed;
export const web3Handler = window.ethereum?new Web3(window.ethereum):new Web3("https://rpc.ftm.tools")

var connectedAccounts;
var poolAddress;
var sub;
var currentSym="USDC.e";
const IBEP20 = require("./ABI/IBEP20.json");
const TokenCreator = require("./ABI/TokenCreator.json");
const FactoryABI = require("./ABI/Factory.json");
const PoolABI = require("./ABI/Pool.json");
const BountyABI = require("./ABI/Bounty.json");
const RouterABI = require("./ABI/router.json");

var USD = new web3Handler.eth.Contract(IBEP20,"0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83");
export const Factory = new web3Handler.eth.Contract(FactoryABI,"0x1AcfB7a6abe647E9fCD0d2A1783a4C0c920E4051");
const router = new web3Handler.eth.Contract(RouterABI,"0x0B327771A7B85Ec4E2Ed78a8A09f6021891fAdf6")

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
    try{
        // if(currentSym=="USDC.e"){
            
            changeUSD(
                
            (await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());
            changeToken(await getBalance(searchedAddress));

        // }else{
        //     if(currentSym=="WBNB"){
        //          console.log(await web3Handler.eth.getBalance(connectedAccounts[0])/1e18);
        //     changeUSD(await web3Handler.eth.getBalance(connectedAccounts[0])/1e18);
        //     }    
        
    }catch(e){}
    try{updateBal[0]((await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());}catch(e){}
    try{                updateBal[1](await getBalance(searchedAddress));
        changeToken(await getBalance(searchedAddress));

    }catch(e){}
    const subscription = web3Handler.eth.subscribe(
        "newBlockHeaders",
        async (err, result) => {
            // console.log(result)
            try{
                // if(currentSym=="USDT"){
                    changeUSD(
                    (await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());
                // }else{
                //     if(currentSym=="WBNB"){
                //         changeUSD(await web3Handler.eth.getBalance(connectedAccounts[0])/1e18);
                //     }    
                // }
            }catch(e){}
            try{updateBal[0]((await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());}catch(e){}
            if(searchedAddress!=null){ 
                console.log("e");
                await updatePool();  
                try{
                changeToken(await getBalance(searchedAddress));}
                catch(e){
                    console.log(e);
                }
                // updateBal[1](await getBalance(searchedAddress))
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

export const ApproveRouter = async(amount)=>{
    var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
    await token.methods.approve("0x0B327771A7B85Ec4E2Ed78a8A09f6021891fAdf6",Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
}


export const splitLP = async(dex)=>{
    await pool.methods.addLPToExternalDEX(dex).send({from:connectedAccounts[0]});
}


export const createToken = async(name,symbol,supply,tax,LP,image)=>{
    if(!connectedAccounts){
        alert("Please Connect Your Wallet First!");
    }else{
        var TokenCr = new web3Handler.eth.Contract(TokenCreator,"0x61469077Bd214FC0818B11182506F0E78c3efE8B");
        // console.log(wallets,additionalTaxes,pair)
        // if(additionalTaxes.length>0){
        //     for(var i=0; i<additionalTaxes.length; i++){
        //         try{
        //         additionalTaxes[i]=Number(additionalTaxes[i].current.value)*10;}catch(e){}
        //         try{wallets[i]=wallets[i].current.value;}catch(e){}
        //     }
        // }
        
        ref===null?ref="0x0000000000000000000000000000000000000000":ref=ref;
        // console.log(additionalTaxes,wallets,pair)
        
        await TokenCr.methods.createSimpleToken(name,symbol,0,supply,tax,ref,Web3.utils.toWei(LP)).send({from:connectedAccounts[0],value:Web3.utils.toWei((Number(LP)+10).toString())});
        var ad=await TokenCr.methods.lastTkCreated(connectedAccounts[0]).call();
        // console.log(additionalTaxes)
        console.log(await TokenCr.methods.lastTkCreated(connectedAccounts[0]).call());
        const body = JSON.stringify({
            address:ad,
            image:image,
            name:name
        })
        const options = {method:"POST",body:body,headers:{"Content-Type":"application/json"}}

        await fetch("https://superpumpbackend.vercel.app/insert_new_token",options).then(async e=>{
            e=await e.json()
        })

        notifDisplayAd('flex');
        notifContentAd(`Token Created Successfully at Address: ${ad}`);
        await updateHomePage(false)
        searchToken(ad);

       
    }

}

export const getBalance = async(address)=>{
    var token = new web3Handler.eth.Contract(IBEP20,address);
    return (Number(await token.methods.balanceOf(connectedAccounts[0]).call())/10**await token.methods.decimals().call()).toLocaleString();
}

export const getBalanceNoStr = async(address)=>{
    var token = new web3Handler.eth.Contract(IBEP20,address);
    return (Number(await token.methods.balanceOf(connectedAccounts[0]).call())/10**await token.methods.decimals().call());
}

export const getBalanceETHnoSTR = async()=>{
    return (Number(await web3Handler.eth.getBalance(connectedAccounts[0]))/10**18);
}

export const searchToken = async(address)=>{
    searchedAddress = address;
    try{changeToken(await getBalance(searchedAddress));}catch(e){}
    poolAddress=null;
    poolAddress = await Factory.methods.showPoolAddress(address).call();
    pool=null;
    if(poolAddress==="0x0000000000000000000000000000000000000000"){
        alert("Token Pool Doesn't Exist Yet");
        // foundPool(false);
    }
    else{
        // foundPool(true);
        pool = new web3Handler.eth.Contract(PoolABI,poolAddress);
        var pairWith = await pool.methods.BaseAddress().call();
        console.log(pairWith);
        USD=new web3Handler.eth.Contract(IBEP20,pairWith);
        // currentSym=await USD.methods.symbol().call();
        // setCurrentSym(currentSym);
        // manageSymbol(currentSym);
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var tkinpool= (Number(await token.methods.balanceOf(pool._address).call())/10**await(token.methods.decimals().call())).toLocaleString();
        var USDinpool = (Number(await(USD.methods.balanceOf(pool._address).call()))/1e18).toLocaleString(); 
        let mc =  (await token.methods.totalSupply().call()/1e18* await pool.methods.USDPerToken().call()/1e18);

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
            trade: await pool.methods.tradingEnabled().call(),
            mc:mc

        }
        tokenName=data.name;
       
        try{updateBal[0]((await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());}catch(e){}
        try{updateBal[1]((await token.methods.balanceOf(connectedAccounts[0]).call()/1e18).toLocaleString());}catch(e){}
        updateTable(data);
        // tradeStatus(data.trade);
        await f();
        let ben = await pool.methods.beneficieryAddress().call();
        console.log(ben)
        ben==connectedAccounts[0]?externalChangeDisplayDEX(true):externalChangeDisplayDEX(false);
}


}

const updatePool=async()=>{

    poolAddress = await Factory.methods.showPoolAddress(searchedAddress).call();
    if(poolAddress==="0x0000000000000000000000000000000000000000"){
        console.log("Token Pool Doesn't Exist Yet");
        // foundPool(false);
    }
    else{
        // foundPool(true);
        pool = new web3Handler.eth.Contract(PoolABI,poolAddress);
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var tkinpool= (Number(await token.methods.balanceOf(pool._address).call())/10**await(token.methods.decimals().call())).toLocaleString();
        var USDinpool = (Number(await(USD.methods.balanceOf(pool._address).call()))/1e18).toLocaleString(); 
        let mc =  (await token.methods.totalSupply().call()/1e18* await pool.methods.USDPerToken().call()/1e18);

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
            trade: await pool.methods.tradingEnabled().call(),
            mc:mc
        }
        tokenName=data.name;
        updateTable(data);
        // tradeStatus(data.trade);

        try{

            changeUSD((await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());
            changeToken(await getBalance(searchedAddress));
            
        }
        catch(e){

        }
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
        // if(currentSym!="USDT"){
        //     await router.methods.wrapAndBuy(pool._address,searchedAddress).send({from:connectedAccounts[0],value:Web3.utils.toWei(amount)});
        // }else{
            var tok = new web3Handler.eth.Contract(IBEP20,searchedAddress);
            let userBalance = await tok.methods.balanceOf(connectedAccounts[0]).call()/1e18;
            let number = parseFloat(currentTableData.supply.replace(/,/g, ''));
            console.log(connectedAccounts[0])
            let newusdc = parseFloat(currentTableData.usdinpool.replace(/,/g,""))+Number(amount);
            console.log(newusdc)
            let newPrice = parseFloat(currentTableData.tokeninpool,/,/g,"")/newusdc;
            console.log(newPrice*amount,number)
            console.log(userBalance,userBalance+newPrice*amount)
            
            if(newPrice*amount>(0.2*number)){

                notifDisplayAd("flex")
                notifContentAd("Transaction Might Fail as You Maybe Trying to Purchase more than 20% of the total supply (try a lower amount)");

            }
            else if(userBalance>(0.2*number) || userBalance+newPrice*amount>(0.2*number)){
                notifDisplayAd("flex")
                notifContentAd("Transaction Might Fail as You may already own 20% of the supply or will after the transaction (try a lower amount)");
            }
           

            
            await pool.methods.buyToken_Qdy(Web3.utils.toWei(amount)).send({from:connectedAccounts[0],value:Web3.utils.toWei(amount)});
        // }
        notifDisplay('flex');
        notifContent('Transaction Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    }else{
        var tok = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var decimals=await tok.methods.decimals().call();
        amount=(Number(amount)*10**decimals).toLocaleString('fullwide', { useGrouping: false });
        console.log(amount);
        // if(currentSym!=="USDT"){
        //     await router.methods.sellAndUnwrap(pool._address,searchedAddress,amount).send({from:connectedAccounts[0]});
        // }else{
            await pool.methods.sellToken_qLx(amount).send({from:connectedAccounts[0]});
        // }
        notifDisplay('flex');
        notifContent('Transaction Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
    }
    const body = JSON.stringify({address:searchedAddress})
    const options = {method:"POST",headers:{"Content-Type":"application/json"},body:body}

    await fetch("https://superpumpbackend.vercel.app/new_trade",options)
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
        var TokenCr = new web3Handler.eth.Contract(TokenCreator,"0x26Bc6Fa4B85340c44b7B317d51dA53AAEdDbEb41");
        console.log(wallets,additionalTaxes)
        var decimals=await new web3Handler.eth.Contract(IBEP20,token).methods.decimals().call();
        DAO = (DAO*10**decimals).toLocaleString("fullwide",{useGrouping:false});
        console.log(DAO/10**decimals);
        console.log(DAO>=(await new web3Handler.eth.Contract(IBEP20,token).methods.totalSupply().call())*0.1/100);
        console.log(pair);
        if(additionalTaxes.length>0){
            for(var i=0; i<additionalTaxes.length; i++){
                try{additionalTaxes[i]=Number(additionalTaxes[i].current.value)*10;}catch(e){}
                try{wallets[i]=wallets[i].current.value}catch(e){}
            }
        }
        console.log(wallets,token,additionalTaxes,pair);
        ref===null?ref="0x0000000000000000000000000000000000000000":ref=ref;
        await TokenCr.methods.createPool(token,additionalTaxes,wallets,pair,web3Handler.LPtax,DAO,ref).send({from:connectedAccounts[0]});
        notifDisplay('flex');
        notifContent('Pool Creation Successful!');
        await new Promise(r => setTimeout(r, 2000));
        notifDisplay('none');
        searchToken(token);

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
                    volume:Number(data[i][5]),
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
            symbol: tokenName+"/FTM",
            autosize:true,
            container_id:"chrt", 
            library_path: '/charting_library/',
            client_id:"SUPERPUMP",
            user_id:"SUPERPUMP",
            datafeed:Datafeed,
            disabled_features: ['use_localstorage_for_settings'],
            interval:"60",
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

export const showRef=()=>{
    notifDisplayAd('flex');
    updateHeading("FreshSwap Referrals!")
    notifContentAd([<span style={{fontSize:"1.2rem", textAlign:"left"}}>Earn with FreshSwap referrals! for every project that launches with your referral link you can earn upto 25% of our fees!</span>,<br></br>,<br/>,
    <span style={{fontSize:"1.2rem"}}>
        Once a project is confirmed to launch on FreshSwap using the unique referral code below, you automatically get 10% of all fees generated by the project for the first month.
        <br/>
        Apart from the base 10%, referrers can earn extra based on the teir the volume of the  project they refer falls in:
        <ul style={{color:"#91E564"}}>
            <li>
            $1M to $2M volume: 2.5% (10%+2.5%)
            </li>
            <li>    
            $2M to $5M volume: 6% (10%+6%)
            </li>
            <li>
            $5M and above: 15% (10%+15%)
            </li>

        </ul>
    </span>
    
    ,<br/>,<br/>
    ,connectedAccounts?<span style={{fontSize:"1.2rem"}}>You referral link is: <span style={{color:"#91E564",overflowWrap:"break-word"}}>https://bsc.freshswap.app/?ref={connectedAccounts[0]}</span></span>:<span>Please connect your wallet to find your referral link!</span>])
}


window.addEventListener("load",async ()=>{
    const subscription = web3Handler.eth.subscribe(
        "newBlockHeaders",
        async (err, result) => {
            // console.log(result)
            try{
                // if(currentSym=="USDT"){
                    changeUSD(
                    (await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());
                // }else{
                //     if(currentSym=="WBNB"){
                //         changeUSD(await web3Handler.eth.getBalance(connectedAccounts[0])/1e18);
                //     }    
                // }
            }catch(e){}
            try{updateBal[0]((await web3Handler.eth.getBalance(connectedAccounts[0])/1e18).toLocaleString());}catch(e){}
            if(searchedAddress!=null){ 
                // console.log("e");
                await updatePool();  
                try{
                changeToken(await getBalance(searchedAddress));}
                catch(e){
                    console.log("not connected")
                }
                // updateBal[1](await getBalance(searchedAddress))
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
})


export const tradeFromHome = async (address)=>{
    updateHomePage(false)
    searchToken(address)
}


export let tokens;

window.addEventListener("load",async ()=>{

    fetch("https://superpumpbackend.vercel.app/get_all_tokens").then(async e=>{
        tokens = await e.json()

        console.log(tokens)
    })

})