const bibaToken=artifacts.require('bibaToken');
const ethSwap = artifacts.require("ethSwap");

module.exports = async function(deployer) {
  // Deploy biba Token
  await deployer.deploy(bibaToken);
  const token=await bibaToken.deployed();

  // Deploy ethswap
  await deployer.deploy(ethSwap);
  const EthSwap=await ethSwap.deployed();

  // transfer all tokens to eth swap contract from default account[0] on blockchain via transfer function in our bibaToken
  await token.transfer(ethSwap.address,'1000000000000000000000000');
};
