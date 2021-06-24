import React,{Component} from 'react';
import ethLogo from '../eth-logo.png';
import tokenLogo from '../token-logo.png';
import Button from 'react-bootstrap/Button';


import {toast} from 'react-toastify';

class BuyToken extends Component {
  constructor(props){
    super(props);
    this.state={
      output:'0',
      currentForm:'buy'
    }
  }


  render(){
    return (
      <form className="mb-3" onSubmit={(event)=>{
        let etherAmount;
        etherAmount=this.input.value.toString();
        etherAmount=window.web3.utils.toWei(etherAmount,'Ether');
        this.props.buyTokens(etherAmount);
        toast.success('🐱‍🚀Please approve your transaction from metamask...\n 👀Make sure to reload the page if the BIBT do not updates!!');
      }}>
      <div>
        <label className="float-left"><b>Input</b></label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
        </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          onChange={(e)=>{

            const etherAmount = this.input.value.toString();
            this.setState({output:etherAmount*100});

          }}
          ref={(input)=>{this.input=input}}
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

    );
  }
}

export default BuyToken;
