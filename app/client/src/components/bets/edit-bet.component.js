import React, { Component } from 'react';
import axios from 'axios'

export default class EditBet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bet_description:  '',
            bet_amount:       0.00,
            bet_completed:    false 
        }

        this.onChangeBetDescription = this.onChangeBetDescription.bind(this);
        this.onChangeBetAmount = this.onChangeBetAmount.bind(this);
        this.onChangeBetCompleted = this.onChangeBetCompleted.bind(this);      
        this.onDeleteBet = this.onDeleteBet.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/bets/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    bet_description: response.data.bet_description,
                    bet_amount:      response.data.bet_amount,
                    bet_completed:   response.data.bet_completed,
                    
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeBetDescription(e) {
        this.setState({
            bet_description: e.target.value
        });
    }

    onChangeBetAmount(e) {
        this.setState({
            bet_amount: e.target.value
        });
    }

    onChangeBetCompleted(e) {
        console.log(e.target.value === 'true')

        this.setState({
            bet_completed: e.target.value === 'true'
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            bet_description: this.state.bet_description,
            bet_amount: this.state.bet_amount,
            bet_completed: this.state.bet_completed
        };
        console.log(obj);
        axios.post('api/bets/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    onDeleteBet(e){
        const obj = {
            bet_description: this.state.bet_description,
            bet_amount: this.state.bet_amount,
            bet_completed: this.state.bet_completed
        };

        console.log("Deleting bet: " + obj.bet_description);

        axios.post('api/bets/delete/' + this.props.match.params.id,obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container col s8">
                <h3 align="center">Update Bet</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.bet_description}
                                onChange={this.onChangeBetDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.bet_amount}
                                onChange={this.onChangeBetAmount}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="checkbox" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value={!this.state.bet_completed}
                                    checked={this.state.bet_completed} 
                                    onChange={this.onChangeBetCompleted}
                                    />
                            <label className="form-check-label">Closed</label>
                        </div>                                             
                    </div>                    
                    <br />

                    <button onClick={this.onDeleteBet} className="btn btn-warning">
                    Delete Bet
                    </button>

                    <div className="form-group">                        
                        <input type="submit" value="Update Bet" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}