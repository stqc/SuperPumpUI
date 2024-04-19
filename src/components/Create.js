import React from "react";
import "./css/create.css";
import { ApproveUSD, createToken } from "./connection";

const Create = ()=>{
    const [adTax,updateAddtx]=React.useState([]);
    const [Taxes,addMoreTax]=React.useState([]);
    const [wallets,addMoreWallets]=React.useState([]);
    var tokenName = React.createRef();
    var symbol= React.createRef();
    var supply = React.createRef();
    var BuyTax = React.createRef();
    var LP = React.createRef();
    var SellTax = React.createRef();
    const [pairedWith,updatePair]=React.useState(null);

    function s(){
        document.getElementById("crt").style.width="0";
        tokenName.current.value=null;
        symbol.current.value=null;
        supply.current.value=null;
        BuyTax.current.value=null;
        SellTax.current.value=null;
        LP.current.value=null;
    }
    return (
        
            <div className="manage-slider" id="crt"style={{display:'grid'}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", padding:"0% 2% ",fontWeight:"900",fontSize:"1.5rem"}}><p style={{cursor:"pointer", marginLeft:"1%"}} onClick={()=>{
                        updateAddtx([]);
                        addMoreTax([]);
                        addMoreWallets([]);
                        s();
                    }}>{'< Back'}</p></div>
                
                <div className="token-form" >
                    <span id="heading" style={{fontWeight:"500"}}>Create A Token</span>
                        <div className="form-options">
                            <p>Token Name</p>
                            <input  placeholder="Enter Token Name" ref={tokenName}></input>
                        </div>
                        <div className="form-options">
                            <p>Token Symbol/Ticker</p>
                            <input  placeholder="Enter Token Symbol/Ticker" ref={symbol}></input>
                        </div>
                        <div className="form-options">
                            <p>Token Supply</p>
                            <input type="number" min="1" ref={supply} placeholder="Enter Max/Total Supply"></input>
                        </div>
                       
                        <div className="form-options">
                            <p>Buy Tax</p> 
                            <input type="number" ref={BuyTax} placeholder="Tax on buys has to be less than 30%" ></input>
                        </div>
                        <div className="form-options">
                            <p>Sell Tax</p>
                            <input type="number" ref={SellTax}  placeholder="Tax on sells has to be less than 30%" min="0" ></input>
                        </div>

                        <div className="form-options">
                            <p>Initial LP</p>
                            <input type="number" ref={LP}  placeholder="Amount of USDC.e to be added for LP" min="0" ></input>
                        </div>
                        
                        <div className="confirmation" style={{marginTop:"auto"}}>
                        <div onClick={()=>{
                            let lpamount = Number(LP.current.value)
                            
                            ApproveUSD(1,"0x34FeFa818e3ee8Ae2304c5396a02E11aA27C610f",(lpamount+70).toString());
                        }}>
                            Approve
                        </div>
                        <div onClick={()=>{
                            console.log(wallets,Taxes)
                            createToken(tokenName.current.value,symbol.current.value,supply.current.value,BuyTax.current.value,SellTax.current.value,LP.current.value);
                        }}>
                            Create Token
                        </div>
                    </div>
                        
                </div>
                
            </div>

    )

}

export default Create;