import React from 'react';
import Header from '../components/Headers';
import AddShops from '../components/AddShops';
import ShopList from '../components/ShopList';

const Home = ()=>{
    return(
      <div>
        <Header/>
        <hr/>
        <AddShops/>
        <ShopList/>
      </div>
    )
}

export default Home;
