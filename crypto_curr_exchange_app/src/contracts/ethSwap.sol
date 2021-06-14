pragma solidity ^0.5.0;

import "./bibaToken.sol";

contract ethSwap {
   string public name= "eth Swap Token Exchange";
   // creates a instance of bibaToken smart contract as token on which we can call methods of bibaToken
   bibaToken public token;
   uint public rate = 100;

   // event tokenPurchased
   event TokenPurchased(
     address account,
     address token,
     uint amount,
     uint rate
     );

   constructor(bibaToken _token) public{
     token = _token;
   }

   function buyTokens() public payable{
    // Calculate the number of tokens to buy
    // Redemption Rate= No. of GAWT tokens recieved for 1 ether.
    // Amount of ethereum * Redemption Rate
    uint tokenAmount = msg.value * rate;

    // to make sure the ethSwap Smart contract has Enough tokens
    // here this refers to the smart contract ethSwap itself
    require(token.balanceOf(address(this)) >= tokenAmount);

    // transfer token to the designated user
    token.transfer(msg.sender,tokenAmount);

    // Emit an event that token was purchase
    emit TokenPurchased(msg.sender, address(token),tokenAmount,rate);
   }
}
