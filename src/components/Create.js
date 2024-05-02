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
    const [taxes,updateTax] = React.useState(false);
    const [previewImage,SetPreviewImage] = React.useState("");
    const [twitter,setTwitter] = React.useState();
    const [telegram,setTelegram] = React.useState();

    function s(){
        document.getElementById("crt").style.width="0";
        tokenName.current.value=null;
        symbol.current.value=null;
        supply.current.value=null;
        LP.current.value=null;
    }
    return (
        
            <div className="manage-slider" id="crt"style={{display:'grid'}}>
                 <div style={{ display:"flex",justifyContent:"flex-start", fontFamily:"cyberPUNK", padding:"0% 2% ",fontWeight:"900",fontSize:"1rem"}}><p style={{cursor:"pointer", marginLeft:"1%"}} onClick={()=>{
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
                            <p>X (Twitter)</p>
                            <input  placeholder="Enter Your X Profile Handle" onChange={(e)=>{
                                setTwitter(e.target.value);
                            }}></input>
                        </div>
                        <div className="form-options">
                            <p>Telegram</p>
                            <input  placeholder="Enter Your Telegram group URL" onChange={(e)=>{
                                setTelegram(e.target.value);
                            }}></input>
                        </div>
                        <div className="form-options" style={{display:"flex", flexDirection:"row", gap:"50px"}}>
                            <div  style={{width:"100%"}}>
                            <p>Token Image URL</p>
                            <input  placeholder="Enter URL with Token Image" onChange={(e)=>{
                                    SetPreviewImage(e.target.value);
                            }} style={{width:"100%"}} ref={BuyTax}></input></div>
                            <div style={{height:"100px",width:"100px", marginTop:"20px"}}><img height={"100%"} width={"100%"} src={previewImage}></img></div>
                        </div>
                        <div className="form-options">
                            <p>Token Supply</p>
                            <input type="number" min="1" ref={supply} placeholder="Enter Max/Total Supply"></input>
                        </div>
                       
                        <div className="form-options">
                            <p>Taxes (1% LP 1% Burn and 1% Marketing)</p> 
                            {/* <input type="number" ref={BuyTax} placeholder="Tax on buys has to be less than 30%" ></input> */}
                            <select style={{fontFamily:"punk2", fontSize:"1.2rem",padding:"5px 2px",borderRadius:"10px",backgroundColor:"#D3D3D3"}} onChange={(e)=>{
                                e.currentTarget.value==="Enable"?updateTax(true):updateTax(false)
                            }}>
                                <option>Disable</option>
                                <option>Enable</option>
                            </select>
                        </div>
                        {/* <div className="form-options">
                            <p>Sell Tax</p>
                            <input type="number" ref={SellTax}  placeholder="Tax on sells has to be less than 30%" min="0" ></input>
                        </div> */}

                        <div className="form-options">
                            <p>Initial LP ({">"}=1 FTM)</p>
                            <input type="number" ref={LP}  placeholder="Amount of FTM to be added for LP" min="0" ></input>
                        </div>

                        <div className="form-options">
                            <p>*Token Creation has a fee of 10FTM</p>
                        </div>
                        <div className="confirmation" style={{marginTop:"auto"}}>
                        {/* <div onClick={()=>{
                            let lpamount = Number(LP.current.value)
                            
                            ApproveUSD(1,"0x34FeFa818e3ee8Ae2304c5396a02E11aA27C610f",(lpamount+70).toString());
                        }}>
                            Approve
                        </div> */}

    
                        
                        <div onClick={async ()=>{
                            console.log(wallets,Taxes)
                            createToken(tokenName.current.value,symbol.current.value,supply.current.value,taxes,LP.current.value,BuyTax.current.value,telegram,twitter);
                            
                            
                        }}>
                            Create Token
                        </div>
                    </div>
                        
                </div>
                
            </div>

    )

}

export default Create;