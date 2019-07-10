require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONOGO_CONNECTION_STRING,    
    secretOrKey: "secret"
  };