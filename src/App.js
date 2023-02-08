import './App.css';
import Nav from './components/Nav';
import Trade from './components/Trade';
import Create from './components/Create';
import MobMenu from './components/MobMenu';
import Manage from './components/Manage';
function App() {
  return (
    <div className="App">
      
      <Manage/>
      <Create/>
      <MobMenu/>
      <Nav/>
      <Trade/>
    </div>
  );
}

export default App;
