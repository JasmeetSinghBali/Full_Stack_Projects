import React,{Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Identicon from 'identicon.js';


class Nav extends Component {

  render(){
    return (
      <div className="App">
      <Navbar fixed="top" bg="light" variant="light">
        <Navbar.Brand href="#homelandingpage">💰 Crypto ₿ay</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <small>
            {this.props.account}: <a href="#userpage">{this.props.account? <img className="ml-2" width='30' height='30' src={`data:image/png;base64,${new Identicon(this.props.account,30).toString()}`} alt="" />: <span></span>}</a>
          </small>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }

}

export default Nav;
