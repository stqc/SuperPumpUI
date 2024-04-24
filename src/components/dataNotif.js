import React from "react";
export var notifDisplayAd;
export var notifContentAd;
export var updateHeading;
const DataNotifcation = ()=>{
    const [display, updateDisplay] = React.useState('none');
    const [content, updateContent] = React.useState('Notification Content');
    const [heading,setHeading] =React.useState('Notification');
    const [animation,setAnimation]=React.useState("fadeIn-halt 1s")
    notifDisplayAd=updateDisplay;
    notifContentAd=updateContent;
    updateHeading=setHeading;
    return(
        <div className="notif" style={{display:display,zIndex:"105"}}>
            <div id="main-notif-cls" style={{color:"white", padding:"4%", borderRadius:"15px", boxShadow:"0px 0px 100px 10px #1969FF",zIndex:"105"}}>
                <div className="title">
                    {heading}
                </div>
                <div style={{marginTop:"4%",fontFamily:"punk2"}}>
                    {content}
                </div>
                <div className="selector-btn-sell" style={{fontSize:"1.2rem", marginTop:"5%", padding:"0", background:"#1969FF"}}onClick={()=>{
                    updateDisplay('none');
                    setHeading('Notification')
                    
                }}>
                    Close
                </div>
            </div>
        </div>
    )
}

export default DataNotifcation;