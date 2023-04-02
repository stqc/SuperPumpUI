import './App.css';
import Nav from './components/Nav';
import Trade from './components/Trade';
import Create from './components/Create';
import MobMenu from './components/MobMenu';
import Manage from './components/Manage';
import Notifcation from './components/notification';
import DataNotifcation from './components/dataNotif';

function App() {
  return (
    <div className="App">
      
      
      <Manage/>
      <Create/>
      <MobMenu/>
      <Notifcation/>
      <DataNotifcation/>
      <Nav/>
      <Trade/>
    </div>
  );
}

export default App;
