const express = require('express');
const apiRouter = express.Router();
const {getAllFromDatabase} = require('./db.js');

apiRouter.get('/minions', (req, res, next) => {
    console.log('hi minions');
    res.send(getAllFromDatabase('minions'));
});

module.exports = apiRouter;
