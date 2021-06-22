import React,{Component} from 'react';
import Web3 from 'web3';

// importing React Components
import Nav from './Nav';
import Loader from './Loader';
import Main from './Main';
// import chart component that visualizes exchange rates from nomics api
import Chart from './Chart';


// importing styles
import './App.css';

// importing abis from smart contracts
import bibaToken from '../abis/bibaToken.json'
import ethSwap from '../abis/ethSwap.json'



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
     //console.log(accounts[0]);
     //set the account state to first account of ganache
     this.setState({account:accounts[0]});
     //console.log(this.state.account);

     const ethBalance = await web3.eth.getBalance(this.state.account);
     // if same name and value then only name is enoguh
     this.setState({ethBalance});

     // Load bibaToken SC
     // import the smart contracts and make their function accessible
     //new web3.eth.Contract(jsonInterface,address,options);
     //const abi = bibaToken.abi;
     // get network id via metamask dynamically
     const networkId = await web3.eth.net.getId();// returns 5777 automatically for ganache
     const tokenData=bibaToken.networks[networkId];
     // it would be in networks->ganache network id->address from bibaToken.json
     //const address= bibaToken.networks[networkId].address;
     // token has the javascript version of smart contract
     //const token = new web3.eth.Contract(abi,address);
     //console.log(token);
     if(tokenData){
       const token = new web3.eth.Contract(bibaToken.abi,tokenData.address);
       //console.log(token);
       this.setState({token});
       let tokenBalance = await token.methods.balanceOf(this.state.account).call();
       //console.log("Token Balance:",tokenBalance.toString());
       this.setState({tokenBalance:tokenBalance.toString()});
     }else{
       window.alert('bibaToken contract is not deployed to the detected network.');
     }

     // Load ethSwap SC
     const ethSwapData = ethSwap.networks[networkId];
     if(ethSwapData){
       const EthSwap = new web3.eth.Contract(ethSwap.abi,ethSwapData.address);
       this.setState({EthSwap});
     }else{
       window.alert('ethSwap contract is not deployed to the detected network.');
     }
     //console.log(this.state.EthSwap);
     // once all the smart contract are loaded then setloading state to false to remove the loader.
     this.setState({loading:false});
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
  // react state management
  constructor(props){
    super(props);
    this.state={
      account: '',
      token: {},
      EthSwap:{},
      ethBalance: '0',
      tokenBalance: '0',
      loading:true
    };
  }

  render(){
    return (
      <div>
        <Nav account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center" style={{maxWidth:'600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <br/>
                <br/>
                {this.state.loading?<Loader />:
                  <Main
                   ethBalance={this.state.ethBalance}
                   tokenBalance={this.state.tokenBalance} />
                 }
              </div>
            </main>
             {/*========== Fetch Data From Nomics API and showing the exchange rates ==========
             <chart role="chart" className="col-lg-12 ml-auto" style={{maxWidth:'600px'}}>
              <br/>
              <br/>
              {this.state.loading?<Loader />:<Chart />}
             </chart>
             */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
