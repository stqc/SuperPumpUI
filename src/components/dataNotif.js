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
        <div className="notif" style={{display:display}}>
            <div id="main-notif-cls" style={{color:"white", padding:"4%", borderRadius:"15px", boxShadow:"0px 0px 90px rgba(59, 170, 0, 0.3)"}}>
                <div className="title">
                    {heading}
                </div>
                <div style={{marginTop:"4%"}}>
                    {content}
                </div>
                <div className="selector-btn-sell" style={{fontSize:"1.2rem", marginTop:"5%", padding:"0"}}onClick={()=>{
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