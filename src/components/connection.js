import Web3 from "web3";
import { buttonName } from "./Nav";
import { updateTable } from "./Trade";
import { tradeStatus } from "./Manage";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let ref= urlParams.get('ref');
export var pool;
export var searchedAddress;

const web3Handler = window.ethereum?new Web3(window.ethereum):new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

var connectedAccounts;
const IBEP20 = require("./ABI/IBEP20.json");
const TokenCreator = require("./ABI/TokenCreator.json");
const FactoryABI = require("./ABI/Factory.json");
const PoolABI = require("./ABI/Pool.json");
const BountyABI = require("./ABI/Bounty.json");
const USD = new web3Handler.eth.Contract(IBEP20,"0x787D83593389bC1e827fB92D41071856908E1141");

export const connect= async ()=>{
    await window.ethereum.request({method:"eth_requestAccounts"});
    connectedAccounts =await web3Handler.eth.getAccounts();
    buttonName(connectedAccounts[0].slice(0,10)+"...");
    console.log(connectedAccounts);
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
        var TokenCr = new web3Handler.eth.Contract(TokenCreator,"0xfB426c459b7718b154B59c9270fE286D03f408F1");
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
    return (Number(await token.balanceOf(connectedAccounts[0]).call())/1e18).toLocaleString();
}

export const searchToken = async(address)=>{
    searchedAddress = address;
    var Factory = new web3Handler.eth.Contract(FactoryABI,"0x06871F546146395f14a33153374B1cb3b8fcA521");
    var poolAddress = await Factory.methods.showPoolAddress(address).call();
    pool=null;
    if(poolAddress==="0x0000000000000000000000000000000000000000"){
        alert("Token Pool Doesn't Exist Yet");
    }
    else{
        
        pool = new web3Handler.eth.Contract(PoolABI,poolAddress);
        var token = new web3Handler.eth.Contract(IBEP20,searchedAddress);
        var tkinpool= (Number(await token.methods.balanceOf(pool._address).call())/1e18).toLocaleString();
        var USDinpool = (Number(await(USD.methods.balanceOf(pool._address).call()))/1e18).toLocaleString(); 
        var data = {
            poolad:pool._address,
            name: await token.methods.name().call(),
            supply: (Number(await token.methods.totalSupply().call())/1e18).toLocaleString(),
            tokeninpool: tkinpool,
            usdinpool: USDinpool,
            tokenperusdc: tkinpool=="0"?"Not Set":await pool.methods.tokenPerUSD().call()/1e18,
            usdcpertoken:USDinpool=="0"?"Not Set":await pool.methods.USDPerToken().call()/1e18,
            buytax:await pool.methods.viewBuyTax().call()/10,
            saletax:await pool.methods.viewSellTax().call()/10,
            dao:(await pool.methods.DAOThreshold().call()/1e18).toLocaleString()
        }
        updateTable(data);
        tradeStatus(await pool.methods.tradingEnabled().call());
}


}

export const addLiquidity =async(usd,token)=>{
    await pool.methods.addLiquidity(Web3.utils.toWei(token),Web3.utils.toWei(usd)).send({from:connectedAccounts[0]});
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
        await pool.methods.sellToken_qLx(Web3.utils.toWei(amount)).send({from:connectedAccounts[0]});
    }
}