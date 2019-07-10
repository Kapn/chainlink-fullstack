require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_CONNECTION_STRING,    
    secretOrKey: "secret"
  };