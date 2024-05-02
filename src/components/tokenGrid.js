import React from "react";
import { Factory, tradeFromHome,web3Handler } from "./connection";

export default function TokenGrid(props){
    const PoolABI = require("./ABI/Pool.json");
    const IBEP20 = require("./ABI/IBEP20.json");

    const [currentPrice,updatePrice] = React.useState(0);
    const [currentSupply,updateSupply] =React.useState(0);
    const [owner,updateOwner] = React.useState();

    React.useEffect(()=>{
        const x = async()=>{
            let pool = await Factory.methods.showPoolAddress(props.address).call();
            let pool_ = new web3Handler.eth.Contract(PoolABI,pool);
            // console.log(pool_)
            let price = await pool_.methods.USDPerToken().call()/1e18 ;
            let token = new web3Handler.eth.Contract(IBEP20,props.address);
            let supply = await token.methods.totalSupply().call()/1e18;
            let owner = await pool_.methods.beneficieryAddress().call();
            updatePrice(price);
            updateSupply(supply);
            updateOwner(owner);
        }
        x();
    })

    return(
        <div className="popular-token">
            <div style={{height:"100px", width:"100px"}} onClick={()=>{
                tradeFromHome(props.address);
            }}>
                <img src={props.image} alt="token-image" height={"100%"} width={"100%"}/>
            </div>
            <h4 onClick={()=>{
                tradeFromHome(props.address);
            }}>{props.name}</h4>
            <h5 style={{margin:0}}>Market Cap</h5>
            <h5 style={{margin:"10px", color:"rgb(211, 211, 211)"}}>$ {(currentPrice*currentSupply*props.ftm).toLocaleString()}</h5>
            <h5 style={{margin:0}}>Creator Wallet</h5>
            <h5 style={{margin:"10px", color:"rgb(211, 211, 211)", maxWidth:"100px",overflowX:"hidden", boxShadow:" 0px 0px 10px 1px white", cursor:"pointer", clipPath:"inset(0px -10px 0px -10px)", borderRadius:"10px"}} onClick={()=>{
                window.open("https://ftmscan.com/address/"+owner)
            }}>{owner}.....  </h5>

            <div style={{display:"flex",gap:"20px",width:"100%",justifyContent:"center"}}>
               {props.tg && <div style={{height:"25px", widoth:"25px"}} onClick={()=>{
                    window.open(props.tg)
                }}>
                    <img width="100%" height="100%" src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1"/>
                </div>}
               {props.twitter && <div style={{height:"25px", width:"25px"}} onClick={()=>{
                    window.open("https://twitter.com/"+props.twitter)
                }}>
                    <img width="100%" height="100%" src="https://img.icons8.com/fluency/48/twitterx--v1.png" alt="twitterx--v1"/>
                </div>}
                {props.address && <div style={{height:"25px", width:"25px"}} onClick={()=>{
                    window.open("https://ftmscan.com/token/"+props.address)
                }}>
                    <img width="100%" height="100%" src="https://cryptologos.cc/logos/fantom-ftm-logo.png?v=032" alt="ftm--v1"/>
                </div>}
                
            </div>

            <button
    onClick={() => {
        tradeFromHome(props.address);
    }}
    style={{
        border: "3px solid black",
        background: "#1969FF",
        color: "white",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        outline: "none",
        zIndex: "0",
        borderRadius:"15px",
        // transform: "skewX(-30deg)",
        fontFamily:"punk2",
        // textShadow:"-5px 2px black",
        fontWeight:"500",
        // boxShadow:"8px 8px white",
        marginBottom:"10px"
    }}
>
    <span
        style={{
            position: "relative",
            zIndex: "1",
            transform:"scewX(0deg)"
        }}
    >
        Trade
    </span>
    
</button>

        </div>
    )
}