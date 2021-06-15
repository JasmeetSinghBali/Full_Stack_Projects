//import logo from './logo.svg';
import React,{Component} from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
//import logo from '../eth.jpg';


class App extends Component {

   // note that componentWillMount gets executed before the render inside the App class
   async componentWillMount(){
     await this.loadWeb3();
     //console.log(window.web3);
     await this.loadBlockchainData()
   }

   // function to load required data from blockchain
   async loadBlockchainData(){
     const web3 =window.web3;
     // fetch the account to which metamask is connected to
     const accounts=await web3.eth.getAccounts();
     console.log(accounts[0]);
   }



  async loadWeb3(){
    // for modern web browsers
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    // for legacy web browsers
    else if(window.web3){
      window.web3=new Web3(window.web3.currentProvider);
    }
    // if no metamask then give an alert
    else{
      window.alert('Non-Ethereum browser detected.You Should consider trying MetaMask!');
    }
  }
  render(){
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

}

export default App;
