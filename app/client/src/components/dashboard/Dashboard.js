import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// WEB3 and Contracts
import getWeb3 from "../../utils/getWeb3"
import TestContract from "../../contracts/ChainlinkTest.json"

class Dashboard extends Component {    

    constructor(props) {
        super(props);
        this.state = { currentEthPrice: "0.00"}
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
              
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = TestContract.networks[networkId];
          const contractInstance = new web3.eth.Contract(
            TestContract.abi,
            deployedNetwork && deployedNetwork.address,
          );

          var currentEthPrice = "0.00";

          console.log("networkId", networkId);
          console.log("deployedNetwork", deployedNetwork);
          console.log("contractInstance", contractInstance);    
          console.log("accounts[0]:", accounts[0]);                         

        contractInstance.events.RequestEthereumPriceFulfilled({
            filter: 'latest'            
        }, (error, event) => {
            console.log("event in optional callback:", event);
            currentEthPrice = event.returnValues[1].toString();
            console.log(currentEthPrice);
            this.setState({ currentEthPrice })
        }).on('data', (event) => {
            console.log("on data:", event); // same as optional callback above
        }).on('changed', (event) => {
            // remove event from local db ??
            console.log("event changed", event);
        }).on('error', console.error);
    
          // Set web3, accounts, and contract to the state          
          this.setState({ web3, accounts, contract: contractInstance, currentEthPrice });

        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };
    
    onRequestEthereumPrice = async () => {

        // set price to tbd while requesting
        this.setState({currentEthPrice: "TBD"});

        // Request Ethereum Price, passing Oracle Address and Job ID parameters
        const ethPriceResult = await this.state.contract.methods.requestEthereumPrice("0xc99B3D447826532722E41bc36e644ba3479E4365", "9f0406209cf64acda32636018b33de11").send({from: this.state.accounts[0]},
            function(err,result){
                if(err)
                    console.log(err);
                else
                    console.log("requestEthereumPrice:", result, result.toString());
        });                
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        
        return (
            // <Router>
            <div style={{ height: "75vh" }} className="container valign-wrapper">            
                <div className="row">
                    <div className="col s12 center-align">                        
                        <h4>
                            <b>Hey there,</b> { user.username }  <br></br>                            
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into {" "}
                                <span style={{ fontFamily: "monospace" }}>chainlink-fullstack</span> 👏
                            </p>
                        </h4>
                        
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "1rem"                                
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                        </button>

                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                margin: "1rem"                                
                            }}
                            onClick={this.onRequestEthereumPrice}
                            className="btn btn-large waves-effect waves-light hoverable gray accent-3"
                        >
                            Request Ethereum Price
                        </button>                        
                    </div>

                    <div className="col s12 center-align">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Current ETH Price</span>                                
                            </div>
                            <div className="card-action">
                                <a href="#">{this.state.currentEthPrice}</a>                                
                            </div>
                        </div>
                    </div>

                </div>
            
                {/* <Route path="/bets" exact component={BetsList} /> */}

            </div>
            // </Router>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);