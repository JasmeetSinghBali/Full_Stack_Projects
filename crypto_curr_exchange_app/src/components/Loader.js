import React,{Component} from 'react';
import spinner from './spinner.gif';

class Loader extends Component {


  render(){
    return (
      <div className="loader">
        <img src={spinner} alt="Loading" />
      </div>
    );
  }

}

export default Loader;
