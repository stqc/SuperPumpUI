import React from "react";
import "./css/mob.css";
import Wallet from "./images/wallet2.png";
import { connect, showRef } from "./connection.js";
import { updateHomePage } from "../App.js";
import { notifContentAd, notifDisplayAd, updateHeading } from "./dataNotif.js";

export var changeMobMen;
export var changeBTNameMob;
function s(){
    document.getElementById("crt").style.width="100vw";
}
function s1(){
    document.getElementById("mng").style.width="100vw";
}
const MobMenu= ()=>{
const [MobMen,changeMob]=React.useState('none');
const [btnName,setBTNname]=React.useState('Connect Wallet');
changeBTNameMob=setBTNname;
changeMobMen=changeMob;
    return (
        <div className="mobile-menu" style={{top:MobMen}}>
            <p style={{color: "black", cursor:"pointer"}} onClick={()=>{
                changeMob('-2000px');
            }}>X</p>
            <div style={{margin:"5%", fontWeight:900,cursor:"pointer", color:"Black", fontSize:"1.8rem"}} onClick={()=>{
                // s1();
                updateHomePage(false);
                changeMob('-2000px')
                
            }}>
                Trade
            </div>
            <div style={{margin:"5%", fontWeight:900,cursor:"pointer", color:"Black", fontSize:"1.8rem"}}   onClick={()=>{
            notifDisplayAd("flex");
            updateHeading("Guide")
            notifContentAd(<ul style={{textAlign:"left"}}>
                <li>Connect Your Wallet</li>
                <li>Click on Create Token</li>
                <li>Fill In The Information</li>
                <li>Click Create Token</li>
                <li>Confirm The Transaction and Grow Your Meme!</li>
                <li>40% of the Liquidity Will be Added to The Dex of Your Choice When Your Token Hits 50,000 FTM Market Cap</li>

            </ul>)
        }}>
            How To Guide
        </div>
            <div style={{margin:"5%", fontWeight:900,cursor:"pointer", color:"Black", fontSize:"1.8rem"}} onClick={()=>{
                s();
                changeMob('-2000px')
            }}>
                Create Token
            </div>
            
            <div style={{margin:"5%", fontWeight:900, color:"black", fontSize:"1.8rem", cursor:"pointer"}} onClick={()=>{
                showRef();
                changeMob('-2000px')
                
            }}>
                <span style={{color:"#1969FF"}}>Super</span>Pump Referrals
            </div>
            <div className="connect-btn-mob" onClick={()=>{
                connect();
                changeMob('-2000px')

            }}>
                
                <img src={Wallet} style={{marginRight:"20px", filter:"grayscale(\"100%\")"}}></img>
                <div>{btnName}</div>
            </div>
            <div style={{marginTop:"auto",marginBottom:"100px"}}>
                <span id="heading" style={{ fontSize:"2rem"}} >
                    <span style={{color:"#1969FF"}}>
                        Super
                    </span>
                    <span style={{color:"#060D0D"}}>
                        Pump
                    </span>
                </span>
            </div>
        </div>
    )

}

export default MobMenu