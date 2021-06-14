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

// deployer(refers to the first account in ganache) and investor(the second account in ganache)
contract('ethSwap',([deployer,investor])=>{
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

  describe('buytokens',async()=>{
    let result;

    before(async()=>{
      // Purchase tokens before each example
      result=await EthSwap.buyTokens({ from: investor, value: web3.utils.toWei('1','ether') });
    })
    it('allows user to purchase tokens from ethswap for a fixed price',async()=>{
      // check investor reveives token after purchase
      let investorBalance=await token.balanceOf(investor);
      console.log(`Investor Account i.e account[1] 2nd account in Ganache has:${investorBalance.toString()}`);
      assert.equal(investorBalance.toString(), tokens('100'));

      // check ethswapbalance after purchase for the account[0] admin account
      let ethSwapBalance;
      ethSwapBalance=await token.balanceOf(EthSwap.address);
      console.log(`Now Deployer account[0] admin first account of ganache has ${ethSwapBalance.toString()}`)
      assert.equal(ethSwapBalance.toString(),tokens('999900'));
      ethSwapBalance=await web3.eth.getBalance(EthSwap.address);
      console.log(`Eth Swap Exchange made was of:${ethSwapBalance} Ether`);
      assert.equal(ethSwapBalance.toString(),web3.utils.toWei('1','Ether'));

      // history of the buytoken() function execution
      console.log(result.logs[0].args);

      const event=result.logs[0].args;
      assert.equal(event.account,investor);
      assert.equal(event.token,token.address);
      assert.equal(event.amount.toString(),tokens('100').toString());
      assert.equal(event.rate.toString(),'100');

    })
  })

})
