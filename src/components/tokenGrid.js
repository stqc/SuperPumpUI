import React from "react";
import { Factory, tradeFromHome,web3Handler } from "./connection";

export default function TokenGrid(props){
    const PoolABI = require("./ABI/Pool.json");
    const IBEP20 = require("./ABI/IBEP20.json");

    const [currentPrice,updatePrice] = React.useState(0);
    const [currentSupply,updateSupply] =React.useState(0);

    React.useEffect(()=>{
        const x = async()=>{
            let pool = await Factory.methods.showPoolAddress(props.address).call();
            let pool_ = new web3Handler.eth.Contract(PoolABI,pool);
            // console.log(pool_)
            let price = await pool_.methods.USDPerToken().call()/1e18 ;
            let token = new web3Handler.eth.Contract(IBEP20,props.address);
            let supply = await token.methods.totalSupply().call()/1e18;
            updatePrice(price);
            updateSupply(supply);
        }
        x();
    })

    return(
        <div className="popular-token">
            <div style={{height:"100px", width:"100px"}}>
                <img src={props.image} alt="token-image" height={"100%"} width={"100%"}/>
            </div>
            <h4>{props.name}</h4>
            <h5 style={{margin:0}}>Total Supply</h5>
            <h5 style={{margin:"10px", color:"rgb(211, 211, 211)"}}>{currentSupply.toLocaleString()}</h5>
            <h5 style={{margin:0}}>Current Price:</h5>
            <h5 style={{margin:"10px", color:"rgb(211, 211, 211)"}}>{currentPrice} FTM</h5>
            <h5 style={{margin:0}}>Market Cap</h5>
            <h5 style={{margin:"10px", color:"rgb(211, 211, 211)"}}>{(currentPrice*currentSupply).toLocaleString()} FTM</h5>
            <div style={{display:"flex"}}>
                <div style={{height:"25px", widoth:"25px"}} onClick={()=>{
                    window.open(props.tg)
                }}>
                    <img width="100%" height="100%" src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram-app--v1"/>
                </div>
                <div style={{height:"25px", widoth:"25px"}} onClick={()=>{
                    window.open("https://twitter.com/"+props.twitter)
                }}>
                    <img width="100%" height="100%" src="https://img.icons8.com/fluency/48/twitterx--v1.png" alt="twitterx--v1"/>
                </div>
                
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