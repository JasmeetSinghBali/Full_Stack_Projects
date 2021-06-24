import React,{Component} from 'react';
import {ToastContainer} from 'react-toastify';
import {Button} from 'react-bootstrap';

import BuyToken from './BuyToken';
import SellToken from './SellToken';
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
        <ToastContainer />

        <div className="d-flex justify-content-between mb-3">
          <Button variant="outline-info" onClick={(e)=>{this.setState({currentForm:'buy'})}}>
            Buy
          </Button>
          <span className="text-muted">&lt; <a
            href="https://github.com/Jasmeet-1998"
            target="_blank"
            rel="noopener noreferrer"
          >🐱‍🚀JassiBali
          </a>&nbsp; &gt;</span>
          <Button variant="outline-info" onClick={(e)=>{this.setState({currentForm:'sell'})}}>
            Sell
          </Button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {this.state.currentForm==='buy'?<BuyToken
              ethBalance={this.props.ethBalance}
              tokenBalance={this.props.tokenBalance}
              buyTokens={this.props.buyTokens}
              />: <SellToken ethBalance={this.props.ethBalance} tokenBalance={this.props.tokenBalance} sellTokens={this.props.sellTokens} />}


          </div>
      </div>
    </div>

    );
  }
}

export default Main;
