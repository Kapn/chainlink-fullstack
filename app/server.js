const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const mongoose = require('mongoose');
const PORT = 5000;

const userRoutes = require("./routes/api/user");
const betRoutes = require("./routes/api/bet");

// Initializations
app.use(cors());

// Bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Passport init and config
app.use(passport.initialize());
require("./config/passport")(passport);

// DB Configuration and connection
const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true } ).catch(err => console.log("error:",err));
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Register Routes / Endpoints
app.use("/api/users", userRoutes);
app.use('/api/bets', betRoutes);

// Begin listening
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});