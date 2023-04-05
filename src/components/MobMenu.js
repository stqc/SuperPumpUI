import React from "react";
import "./css/mob.css";
import Wallet from "./images/wallet2.png";
import { connect, showRef } from "./connection.js";

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
            <p style={{color: "#DD8500", cursor:"pointer"}} onClick={()=>{
                changeMob('-2000px');
            }}>X</p>
            <div style={{margin:"5%", fontWeight:900,cursor:"pointer", color:"white", fontSize:"1.8rem"}} onClick={()=>{
                s();
                changeMob('-2000px')
            }}>
                Create Token
            </div>
            <div style={{margin:"5%", fontWeight:900, color:"white", fontSize:"1.8rem", cursor:"pointer"}} onClick={()=>{
                s1();
                changeMob('-2000px')
                
            }}>
                Manage Token
            </div>
            <div style={{margin:"5%", fontWeight:900, color:"white", fontSize:"1.8rem", cursor:"pointer"}} onClick={()=>{
                showRef();
                changeMob('-2000px')
                
            }}>
                Fresh Referrals
            </div>
            <div className="connect-btn-mob" onClick={()=>{
                connect();
            }}>
                <img src={Wallet} style={{marginRight:"20px"}}></img>
                <div>{btnName}</div>
            </div>
            <div style={{marginTop:"auto",marginBottom:"100px"}}>
                <span id="heading" style={{ fontSize:"3rem"}} >
                    <span style={{color:"#91E564"}}>
                        Fresh
                    </span>
                    <span style={{color:"#F9C04C"}}>
                        Swap
                    </span>
                </span>
            </div>
        </div>
    )

}

export default MobMenu