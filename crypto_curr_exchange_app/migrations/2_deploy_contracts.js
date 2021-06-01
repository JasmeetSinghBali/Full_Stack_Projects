const bibaToken=artifacts.require('bibaToken');
const ethSwap = artifacts.require("ethSwap");

module.exports = function(deployer) {
  // Deploy biba Token
  deployer.deploy(bibaToken);

  // Deploy ethswap
  deployer.deploy(ethSwap);
};
