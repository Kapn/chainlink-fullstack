var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var SmartBet = artifacts.require("./SmartBet.sol");
var ChainlinkTest = artifacts.require("./ChainlinkTest.sol");

module.exports = function(deployer) {  
  deployer.deploy(SmartBet);
  deployer.deploy(ChainlinkTest);
};
