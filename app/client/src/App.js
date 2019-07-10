import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import BetsList from "./components/bets/bets-list.component";
import EditBet from "./components/bets/edit-bet.component";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import JoinBet from "./components/bets/join-bet.component";


// Check for token to keep user logged in
if (localStorage.jwtToken) {

  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  console.log("Decoded.exp: ", decoded.exp);
  console.log("currentTime:", currentTime);

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route path="/bets" exact component={BetsList} />
            <Route path="bets/join/:id" component={JoinBet} />


            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />                    
            
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;