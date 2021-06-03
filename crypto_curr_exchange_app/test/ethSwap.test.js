const bibaToken=artifacts.require('bibaToken');
const ethSwap = artifacts.require("ethSwap");

// configuring assertions
require('chai')
.use(require('chai-as-promised'))
.should()

// convert long string of initial token to a better format
function tokens(n){
  // web3 used to talk to blockchain
  // wei is 18 decimal places standard like ether in ERC-20 token standards
  return web3.utils.toWei(n,'ether');
  // gives 1000000000000000000000000
}

contract('ethSwap',(accounts)=>{
  let token,EthSwap;
  // before hook to have ease of access
  before(async()=>{
    token = await bibaToken.new();
    EthSwap=await ethSwap.new(token.address);
    // transfer all tokens to eth swap contract from default account[0] on blockchain via transfer function in our bibaToken
    await token.transfer(EthSwap.address,tokens('1000000'));
  })

  describe('bibaToken deployment',async()=>{
    it('Check wheather contract has a name',async()=>{
      // let token=await bibaToken.new();
      const name=await token.name();
      console.log(`Name of the bibaToken Contract: ${name}`);
      assert.equal(name,'biba Token');
    })
  })

  describe('ethSwap deployment',async()=>{
    it('Check wheather contract has a name',async()=>{
      // let EthSwap=await ethSwap.new();
      const name=await EthSwap.name();
      console.log(`Name of the ethSwap Contract: ${name}`);
      assert.equal(name,'eth Swap Token Exchange');
    })

    it('eth Swap Contract has tokens',async()=>{
      // let token=await bibaToken.new();
      // let EthSwap=await ethSwap.new();
      // await token.transfer(EthSwap.address,'1000000000000000000000000');
      let balance=await token.balanceOf(EthSwap.address);
      console.log(`ethSwap Contract has: ${balance.toString()}`);
      assert.equal(balance.toString(),tokens('1000000'));
    })
  })
})
