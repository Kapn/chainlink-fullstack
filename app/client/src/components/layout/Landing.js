import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">            
            <p className="flow-text grey-text text-darken-1">
              hop in
            </p>
            <br />
            <Link to="/register" className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    stylestyle={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                      }}>Register</Link>
            
            <Link to="/login" className="btn btn-large waves-effect white hoverable black-text"
                style={{
                    marginLeft: "2rem",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}>Login</Link>           
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;