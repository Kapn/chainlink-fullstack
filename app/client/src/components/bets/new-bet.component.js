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
    }

    betList() {
        return this.state.bets.map(function(currentBet, i){
            return <Bet bet={currentBet} key={i} />;
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Bets List</h3>

                <div className="row">
                <Link to="/bets" className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"                                                        
                        }}>Create new</Link>
                </div>
                <table className="table table-striped col s6" style={{ marginTop: 20 }} >
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
        )
    }
}