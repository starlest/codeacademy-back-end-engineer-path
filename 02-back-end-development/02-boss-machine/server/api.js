const express = require("express");
const apiRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require("./db.js");

apiRouter.param("minionId", (req, res, next, minionId) => {
  const minion = getFromDatabaseById("minions", minionId);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

apiRouter.get("/minions", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

apiRouter.post("/minions", (req, res, next) => {
  const savedMinion = addToDatabase("minions", req.body);
  if (savedMinion) {
    res.status(201).send(savedMinion);
  } else {
    res.status(400).send();
  }
});

apiRouter.get("/minions/:minionId", (req, res, next) => {
  res.send(req.minion);
});

apiRouter.put("/minions/:minionId", (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(400).send("Failed to update minion.");
    }
});

apiRouter.delete("/minions/:minionId", (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.minion.id);
    if (deletedMinion) {
        res.status(204).send(deletedMinion);
    } else {
        res.status(400).send("Failed to delete minion.");
    }
});

module.exports = apiRouter;
