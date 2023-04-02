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
            <div style={{color:"white", background:"rgba(105, 80, 29, 1)", padding:"4%", borderRadius:"15px", boxShadow:"0px 0px 90px rgba(105, 80, 29, 1)"}}>
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