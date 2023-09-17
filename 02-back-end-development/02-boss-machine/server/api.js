const express = require('express');
const apiRouter = express.Router();
const {getAllFromDatabase} = require('./db.js');

apiRouter.get('/minions', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

module.exports = apiRouter;
