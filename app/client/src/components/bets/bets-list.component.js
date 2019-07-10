import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bet = props => (
    <tr>
        <td>{props.bet.bet_description}</td>
        <td>{props.bet.bet_amount}</td>
        <td>{props.bet.bet_completed.toString()}</td>
        <td>
            <Link to={"bets/edit/"+props.bet._id}>Edit</Link>
            <Link to={"bets/join/"+props.bet._id}
                className="btn btn-small waves-effect waves-light hoverable orange accent-3"
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem"                                
                }}>Join</Link>                
        </td>        
    </tr>
)

export default class BetsList extends Component {

    constructor(props) {
        super(props);
        this.state = {bets: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/bets')
            .then(response => {
                this.setState({ bets: response.data });
            })
            .catch(function (error){
                console.log(error);
            })

        axios.get('/api/bets')
            .then(response => {
                this.setState({ bets: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    betList() {
        return this.state.bets.map(function(currentBet, i){
            return <Bet bet={currentBet} key={i} />;
        })
    }

    render() {
        return (
            <div className="container">                
                
                <div className="row">
                    
                <h3>Open Bets</h3>

                <Link to="/bets" className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"                                                        
                        }}>Create new</Link>
                </div>
                <div className="row">
                
                
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Completed</th>   
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.betList() }
                    </tbody>
                </table>
                </div>

                <div className="row">
                    
                <h3>Active Bets</h3>
                                
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Completed</th>   
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}