import React from "react";
export var notifDisplay;
export var notifContent;
const Notifcation = ()=>{
    const [display, updateDisplay] = React.useState('none');
    const [content, updateContent] = React.useState('Notification Content');
    notifDisplay=updateDisplay;
    notifContent=updateContent;
    return(
        <div className="notif" style={{display:display}}>
            <div id="main-notif"style={{color:"white", padding:"4%", borderRadius:"15px", boxShadow:"0px 0px 100px 10px #1969FF"}}>
                <div className="title">
                    Notification
                </div>
                <div style={{marginTop:"9%"}}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Notifcation;