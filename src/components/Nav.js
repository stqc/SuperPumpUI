import React from "react";
import "./css/nav.css";
import Logo from "./images/logo.jpg";
import Search from "./images/search.png"
import Wallet from "./images/wallet1.png";
import Menu from "./images/menu.png";
import { changeMobMen } from "./MobMenu";
import { connect, showRef } from "./connection.js";
import { searchToken, f } from "./connection.js";
export var buttonName;

const Nav=(props)=>{
    var searchBarRef = React.createRef();

    const [conBTNtext,updateConBtnText] = React.useState('Connect Wallet');
    buttonName = updateConBtnText;

    function s(){
        document.getElementById("crt").style.width="100vw";
    }
    function s1(){
        document.getElementById("mng").style.width="100vw";
    }

    return(
       <nav>
        <div style={{height:"100px", width:"100px"}} onClick={()=>{
            props.updateShowHome(true)
        }}>
            <img src={Logo} alt="logo" height={"100%"} width={"100%"}/>
        </div>

        <div className="option" style={{marginLeft:"2%"}} onClick={()=>{
            props.updateShowHome(false)
        }}>
            Trade
        </div>

        <div className="option" style={{marginLeft:"2%"}} onClick={()=>{
            s();
        }}>
            Create Token
        </div>
        {/* <div className="option" style={{marginLeft:"2%"}} onClick={()=>{
            s1();
        }}>
            Manage Token
        </div> */}
        <div className="option" style={{marginLeft:"2%"}} onClick={()=>{
            // showRef();
        }}>
            SuperPump Referrals 
        </div>
       { !props.showHome && <div className="search-bar">
            <div style={{padding:"5%", background:"#1969FF",cursor:"pointer", borderRadius:"15px 0px 0px 15px"}} onClick={async ()=>{
                await searchToken(searchBarRef.current.value);
            }}>
                <img src={Search}/>
            </div>
            <input style={{height:"48px" , width:"300px"}} ref={searchBarRef} placeholder="Enter Token Address"></input>
        </div>}
        <div className="connect-btn" onClick={()=>{
            connect();
        }
        }>
            <img src={Wallet}></img>
            <div>{conBTNtext}</div>
        </div>
        <div className="menu-btn" onClick={()=>{
            changeMobMen("0");
        }}>
            <img src={Menu} alt="menu"/>
        </div>
       </nav>
    )


} ;

export default Nav;