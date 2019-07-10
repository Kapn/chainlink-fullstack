import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class JoinBet extends Component {

    constructor(props) {
        super(props);
        this.state = { };
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

    render() {
        return (
            <div className="container">
                <h3>test</h3>
            </div>                
        )
    }
}