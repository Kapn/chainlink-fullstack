var ChainlinkTest = artifacts.require("./ChainlinkTest.sol");

module.exports = function(deployer) {    
  deployer.deploy(ChainlinkTest);
};
