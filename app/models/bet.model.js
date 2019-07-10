// Bet Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Bet = new Schema({
    bet_description: {
        type: String
    },
    bet_amount: {
        // type: mongoose.Schema.Types.Decimal128
        type: Number
    },    
    bet_completed: {
        type: Boolean
    },
    bet_created_date: {
        type: Date,
        Default: Date.now
    },
    bet_closed_date: {
        type: Date
    }
});
module.exports = mongoose.model('Bet', Bet);