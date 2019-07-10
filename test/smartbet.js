const SmartBet = artifacts.require("./SmartBet.sol");

contract("SmartBet", accounts => {
  it("...should store the value 89.", async () => {
    const smartBetInstance = await SmartBet.deployed();

    await smartBetInstance.requestEthereumPrice("0xc99B3D447826532722E41bc36e644ba3479E4365", "493610cff14346f786f88ed791ab7704");

    // Testing
    const returnAddress = await smartBetInstance.requestAnAddress("0xc99B3D447826532722E41bc36e644ba3479E4365");
    assert.equal(returnAddress, "0xc99B3D447826532722E41bc36e644ba3479E4365", "Address wasn't 0xc99B3D447826532722E41bc36e644ba3479E4365");    

    const storedTestString = await smartBetInstance.testString.call();
    
    // should be request ether price
    // const storedTestString = await smartBetInstance.testString.call();
    
    // // Set value of 89
    // await simpleStorageInstance.set(89, { from: accounts[6] });

    // // Get stored value
    // const storedData = await simpleStorageInstance.get.call();

  });
});