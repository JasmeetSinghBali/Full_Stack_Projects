pragma solidity ^0.5.0;

import "./bibaToken.sol";

contract ethSwap {
   string public name= "eth Swap Token Exchange";
   // creates a instance of bibaToken smart contract as token on which we can call methods of bibaToken
   bibaToken public token;
   uint public rate = 100;

   // event tokenPurchased
   event TokensPurchased(
     address account,
     address token,
     uint amount,
     uint rate
     );

    // event tokensSold
    event TokensSold(
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
    emit TokensPurchased(msg.sender, address(token),tokenAmount,rate);
   }

   // when this function executes ether is send to the msg.sender i.e the account which calls this function
   function sellTokens(uint _amount) public{

     // Explicit requirement User cannot sell more token that they have
     // however ERC-20 token automatically does us for that this is optional
     require(token.balanceOf(msg.sender)>=_amount);

     // Calculate the amount of ether to redeem
     uint etherAmount = _amount / rate;

     // make sure EthSwap has enough Ether
     require(address(this).balance>=etherAmount);

     // Perform Sale
     // spend tokens on behalf of a account we use ERC-20 transferFrom function and approve
     token.transferFrom(msg.sender,address(this),_amount);
     // msg.sender is the person or account calling this sellTokens function
     msg.sender.transfer(etherAmount);

     // emit soldtoken event
     emit TokensSold(msg.sender,address(token),_amount,rate);
   }
}
