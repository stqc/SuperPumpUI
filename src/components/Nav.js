import React from "react";
import "./css/nav.css";
import Logo from "./images/logo.png";
import Search from "./images/search.png"
import Wallet from "./images/wallet.png";
import Menu from "./images/menu.png";
import { CreateVisibility } from "./Create";
import { changeMobMen } from "./MobMenu";
import { ManageVisibility } from "./Manage";
const Nav=()=>{

    return(
       <nav>
        <img src={Logo} alt="logo"/>
        
        <div className="option" style={{marginLeft:"2%"}} onClick={()=>{
            CreateVisibility('grid');
        }}>
            Create Token
        </div>
        <div className="option" style={{marginLeft:"2%"}} onClick={()=>{
            ManageVisibility("grid")
        }}>
            Manage Token
        </div>
        <div className="search-bar">
            <div style={{padding:"5%", background:"#DD8500",cursor:"pointer", borderRadius:"15px 0px 0px 15px"}}>
                <img src={Search}/>
            </div>
            <input style={{height:"48px" , width:"300px"}} placeholder="Enter Token Address"></input>
        </div>
        <div className="connect-btn">
            <img src={Wallet}></img>
            <div>Connect Wallet</div>
        </div>
        <div className="menu-btn" onClick={()=>{
            changeMobMen("flex");
        }}>
            <img src={Menu} alt="menu"/>
        </div>
       </nav>
    )


} ;

export default Nav;