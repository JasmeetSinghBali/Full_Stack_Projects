const { Router } = require('express');

const FlaggedUser = require('../models/FlaggedUser.js');

const router = Router();

// Get all flaggedUsers
router.get('/flaggedUser', async (req, res, next) => {
  // res.json({message:'✈️'});
  try {
    const data = await FlaggedUser.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    next(err); // directed to our error handler
  }
});

// Add flagged user to the database
router.post('/flaggedUser', async (req, res, next) => {
  try {
    const flaggedUser = { data: req.body };
    console.log(flaggedUser);

    // save flagged user to database
    const flagUser = new FlaggedUser(flaggedUser);
    const newUser = await flagUser.save();
    console.log('✈️ New Flagged User Added!');
    if (!newUser) {
      return res.status(424).send('Failed ! flaggedUser was not added to the database');
    }
    return res.status(200).json({
      message: 'Your IP has now been compromised!',
    });
  } catch (err) {
    // res.json({message:'🤞🏼'});
    // console.log(err.name); // returns ValidationError it gives the name of the error
    console.log(err);
    if (err.name === 'ValidationError') {
      res.status(422).send(`${err.name} ☠️ ${err.message}`);
    }
    return next(err.message); // passed to error handler route in index.js
  }
});

module.exports = router;
