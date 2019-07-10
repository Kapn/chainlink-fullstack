pragma solidity ^0.4.24;

import "chainlink/contracts/Chainlinked.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SmartBet is Chainlinked, Ownable {

    struct Bet {
        // address[] participants;
        address maker;
        address taker;
        uint amount;
    }

    Bet[] public bets;

    mapping(uint => address) public betToOwner;
    mapping(address => uint) ownerBetCount;

    // new Bet created Event
    event NewBetCreated(uint id, address createdByAddress, uint amount);

    // internal create bet function. Handles very basic creation
    function _createBet(uint _amount, address _maker, address _taker) internal {
        uint id = bets.push(Bet(_maker, _taker, _amount)) - 1;
        betToOwner[id] = msg.sender;
        ownerBetCount[msg.sender]++;

        emit NewBetCreated(id, msg.sender, _amount);
    }

    // Public create method that does any validation checks before calling the internal create
    function createBet(uint _amount, address _maker, address _taker) public payable {
        _createBet(_amount, _maker, _taker);
    }

    function getBetAmount(uint betId) public view returns (uint) {
        return bets[betId].amount;
    }

    uint public storedAmount = 0;

    function increaseStoredAmount(uint _increaseBy)
      public
      returns (uint sum)
    {
      sum = storedAmount + _increaseBy;
    }

    // since variable is public, solidity should create a getter
    string public testString = "Testing";

    uint256 constant private ORACLE_PAYMENT = 1 * LINK; // solium-disable-line zeppelin/no-arithmetic-operations

    function getOraclePayment() public view returns (uint256){
        return ORACLE_PAYMENT;
    }

  // two spaced code is taken from Consumer Example
  uint256 public currentPrice;
  int256 public changeDay;
  bytes32 public lastMarket;

  event RequestEthereumPriceFulfilled(
    bytes32 indexed requestId,
    uint256 indexed price
  );

  event RequestEthereumChangeFulfilled(
    bytes32 indexed requestId,
    int256 indexed change
  );

  event RequestEthereumLastMarket(
    bytes32 indexed requestId,
    bytes32 indexed market
  );

  event RequestEthereumPrice(
    address oracleAddress,
    string jobId
  );

    // @info gotten from here: https://docs.chain.link/docs/create-a-chainlinked-project
  constructor() Ownable() public {
    // setPublicChainlinkToken();
    //   ROPSTEN
    // Set the address for the LINK token for the network.
    setChainlinkToken(0x20fE562d797A42Dcb3399062AE9546cd06f63280);
    // Set the address of the oracle to create requests to.
    setChainlinkOracle(0xc99B3D447826532722E41bc36e644ba3479E4365);
  }

  function requestEthereumPrice(address _oracle, string _jobId)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillEthereumPrice.selector);
    req.add("url", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    req.add("path", "USD");
    req.addInt("times", 100);
    sendChainlinkRequestTo(chainlinkOracleAddress(), req, ORACLE_PAYMENT);
    emit RequestEthereumPrice(chainlinkOracleAddress(), _jobId);
  }

  function requestEthereumChange(address _oracle, string _jobId)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillEthereumChange.selector);
    req.add("url", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
    req.add("path", "RAW.ETH.USD.CHANGEPCTDAY");
    req.addInt("times", 1000000000);
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
  }

  function requestEthereumLastMarket(address _oracle, string _jobId)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillEthereumLastMarket.selector);
    req.add("url", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
    string[] memory path = new string[](4);
    path[0] = "RAW";
    path[1] = "ETH";
    path[2] = "USD";
    path[3] = "LASTMARKET";
    req.addStringArray("path", path);
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
  }

  function fulfillEthereumPrice(bytes32 _requestId, uint256 _price)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit RequestEthereumPriceFulfilled(_requestId, _price);
    currentPrice = _price;
  }

  function fulfillEthereumChange(bytes32 _requestId, int256 _change)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit RequestEthereumChangeFulfilled(_requestId, _change);
    changeDay = _change;
  }

  function fulfillEthereumLastMarket(bytes32 _requestId, bytes32 _market)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit RequestEthereumLastMarket(_requestId, _market);
    lastMarket = _market;
  }

  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly {
      result := mload(add(source, 32))
    }
  }

}


// contract SmartBet {
//    struct Bet {
//        address[] participants;
//        uint amount;
//    }

//    Bet[] public bets;
//    mapping (uint => address) public betToOwner;

//    function createBet() public payable {
//        address[] memory adr = new address[](1);
//        adr[0] = msg.sender;
//        Bet memory newBet = Bet(adr, msg.value);
//        uint id = bets.push(newBet);
//        betToOwner[id] = msg.sender;
//    }

//    function enterBet(uint _betId) public payable {
//        uint msgValue = msg.value;
//        uint amountRequired = bets[_betId].amount;
//        require(msgValue == amountRequired);

//        bets[_betId].participants.push(msg.sender);
//    }

//    function payoutBet(uint _betId) public payable {
//        uint participantCount = bets[_betId].participants.length;
//        require(participantCount > 1);

//        address winningAddress = bets[_betId].participants[0];
//        winningAddress.transfer(address(this).balance);
//    }

// }