import React,{Component} from 'react';
import ethLogo from '../eth-logo.png';
import tokenLogo from '../token-logo.png';
import Button from 'react-bootstrap/Button';

//import BuyForm from './BuyForm';
//import SellForm from './SellForm';
//import NomicsData from './Nomics data as chart';




class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      currentForm:'buy'
    }
  }


  render(){
    return (
      <div id="content" className="mt-3">

        <div className="card mb-4" >

          <div className="card-body">

          <form className="mb-3">
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ethLogo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; ETH
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={this.state.output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={tokenLogo} height='32' alt=""/>
                &nbsp; BIBT
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">1 ETH = 100 BIBT</span>
          </div>
          <Button type="submit" variant="outline-dark" block size="lg" >✨Trade✨</Button>
        </form>
        </div>
      </div>
    </div>

    );
  }
}

export default Main;
