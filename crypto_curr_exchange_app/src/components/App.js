//import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
//import logo from '../eth.jpg';

function App() {
  return (
    <div className="App">
    <Navbar>
      <Navbar.Brand href="#homelandingpage">💰 Crypto ₿ay</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        Signed in as: <a href="#userpage">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
      <h1>Welcome to Crypto ₿ay 🏦 </h1>
      <br />


    </div>
  );
}

export default App;
