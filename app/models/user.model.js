// User Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({

    username: String,
    email: String,
    password: String,
    salt: String,
});

module.exports = User = mongoose.model('users', UserSchema);