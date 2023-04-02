import React from "react";
export var notifDisplayAd;
export var notifContentAd;
const DataNotifcation = ()=>{
    const [display, updateDisplay] = React.useState('none');
    const [content, updateContent] = React.useState('Notification Content');
    notifDisplayAd=updateDisplay;
    notifContentAd=updateContent;
    return(
        <div className="notif" style={{display:display}}>
            <div id="main-notif-cls" style={{color:"white", padding:"4%", borderRadius:"15px", boxShadow:"0px 0px 90px rgba(59, 170, 0, 0.3)"}}>
                <div className="title">
                    Notification
                </div>
                <div style={{marginTop:"9%"}}>
                    {content}
                </div>
                <div className="selector-btn-sell" style={{fontSize:"1.2rem", marginTop:"5%", padding:"0"}}onClick={()=>{
                    updateDisplay('none');
                }}>
                    Close
                </div>
            </div>
        </div>
    )
}

export default DataNotifcation;