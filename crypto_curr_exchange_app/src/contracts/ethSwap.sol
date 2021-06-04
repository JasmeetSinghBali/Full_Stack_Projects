pragma solidity ^0.5.0;

import "./bibaToken.sol";

contract ethSwap {
   string public name= "eth Swap Token Exchange";
   // creates a instance of bibaToken smart contract as token on which we can call methods of bibaToken
   bibaToken public token;
   uint public rate = 100;

   constructor(bibaToken _token) public{
     token = _token;
   }

   function buytokens() public payable{
    // Calculate the number of tokens to buy
    // Redemption Rate= No. of GAWT tokens recieved for 1 ether.
    // Amount of ethereum * Redemption Rate
    uint tokenAmount = msg.value * rate;
    token.transfer(msg.sender,tokenAmount);
   }
}
