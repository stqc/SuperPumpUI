import './App.css';
import Nav from './components/Nav';
import Trade from './components/Trade';
import Create from './components/Create';
import MobMenu from './components/MobMenu';
import Manage from './components/Manage';
import Notifcation from './components/notification';

function App() {
  return (
    <div className="App">
      
      
      <Manage/>
      <Create/>
      <MobMenu/>
      <Notifcation/>
      <Nav/>
      <Trade/>
    </div>
  );
}

export default App;
