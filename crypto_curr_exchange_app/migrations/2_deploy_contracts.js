const ethSwap = artifacts.require("ethSwap");

module.exports = function(deployer) {
  deployer.deploy(ethSwap);
};
