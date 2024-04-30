import './App.css';
import Nav from './components/Nav';
import Trade from './components/Trade';
import Create from './components/Create';
import MobMenu from './components/MobMenu';
import Manage from './components/Manage';
import Notifcation from './components/notification';
import DataNotifcation from './components/dataNotif';
import TokenGrid from './components/tokenGrid';
import React from 'react';
import HomePage from './components/home';
import { searchToken } from './components/connection';
export let updateHomePage ;


function App() {

  const [showHome,updateShowHome] = React.useState(true);


  updateHomePage=updateShowHome;

  
  React.useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const param1 = urlParams.get("token")
    console.log(param1);
    if(param1){
      searchToken(param1);
      updateShowHome(false);
    }
  },[])

  return (
    <div className="App">
      
      <Notifcation/>
      <DataNotifcation/>
      {/* <Manage/> */}
      <Create />
      <MobMenu/>
      <Nav updateShowHome={updateShowHome} showHome={showHome}/>
      {!showHome && <Trade/>}
      {showHome &&<HomePage/>}
    </div> 
  );
}

export default App;
