require('babel-register');
require('babel-polyfill');

// parse .secret.json
const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const secrets = JSON.parse(fs.readFileSync(".secrets.json").toString().trim());

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",// loopback localhost
      port: 7545, // port which ganache generally exposes
      network_id: "*" // Match any network id
    },
    kovan: {
      networkCheckTimeout: 10000,
      provider: function(){
        return new HDWalletProvider(
          secrets.mnemonic,
          `wss://kovan.infura.io/ws/v3/${secrets.projectId}`
        );
      },
      network_id: "42",
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
