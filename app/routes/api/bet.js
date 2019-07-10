const express = require("express");
const router = express.Router();

// grab Bet model
const Bet = require("../../models/bet.model");

// @route GET api/bets
// @desc Get all bets
// @access Public
router.route('/').get(function(req, res) {
    Bet.find(function(err, bets) {
        if (err) {
            console.log(err);
        } else {
            console.log("retrieved bets:", bets);
            res.json(bets);
        }
    });
});

// @route GET api/bets/:id
// @desc Get a specific bet by its id
// @access Public
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Bet.findById(id, function(err, bet) {
        if (err) {
            console.log(err);
        } else {
            console.log("retrieved bet:", bet);
            res.json(bet);
        }        
    });
});

// @route POST api/bets/update/:id
// @desc Update a specific bet by its id
// @access Public
router.route('/update/:id').post(function(req, res) {
    Bet.findById(req.params.id, function(err, bet) {
        if (!bet)
            res.status(404).send("data is not found");
        else
            bet.bet_description = req.body.bet_description;
            bet.bet_amount = req.body.bet_amount;
            bet.bet_completed = req.body.bet_completed;

            bet.save().then(bet => {
                res.json('Bet updated!' + bet.bet_description + ',' + bet.bet_amount);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// @route POST api/bets/add
// @desc Create a new bet
// @access Public
router.route('/add').post(function(req, res) {    
    let bet = new Bet();
    bet.bet_description = req.body.bet_description;
    bet.bet_amount = req.body.bet_amount;

    // todo: if req.body.bet_completed is not provided then don't set, should be false by default Bet() constructor etc    
    bet.bet_completed = false; 

    bet.save()
        .then(bet => {
            res.status(200).json({'bet': 'bet added successfully!' + bet.bet_description + ',' + bet.bet_amount});
        })
        .catch(err => {
            res.status(400).send('adding new bet failed');
        });
});

// @route POST api/bets/delete/:id
// @desc Delete a specific bet by its id
// @access Public
router.route('/delete/:id').post(function(req, res) {
    Bet.findByIdAndRemove({_id:req.params.id}, function(err, bet) {
        if (!bet)
            res.status(404).send("bet not found to delete");  
        else
            res.json('Successfully removed');
    })
})

module.exports = router;