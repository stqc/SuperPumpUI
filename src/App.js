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
export let updateHomePage ;

function App() {

  const [showHome,updateShowHome] = React.useState(true);


  updateHomePage=updateShowHome;

  


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
