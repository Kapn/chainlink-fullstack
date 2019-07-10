require('dotenv').config();
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/client/src/contracts"),
  // network: "test",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: { 
      provider: new HDWalletProvider(process.env.INFURA_MNEMONIC, process.env.INFURA_URL), 
      network_id: "3", 
      gas: 4465030 
    }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
  }
};
