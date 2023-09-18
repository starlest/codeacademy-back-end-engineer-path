const express = require("express");
const apiRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  createMeeting
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
  const minions = getAllFromDatabase("minions");
  if (minions) {
    res.send(minions);
  } else {
    res.status(404).send("There was an error retrieving minions.");
  }
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
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else {
    res.status(400).send("Failed to update minion.");
  }
});

apiRouter.delete("/minions/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.minion.id);
  if (deletedMinion) {
    res.status(204).send(deletedMinion);
  } else {
    res.status(400).send("Failed to delete minion.");
  }
});

apiRouter.param("ideaId", (req, res, next, ideaId) => {
  const idea = getFromDatabaseById("ideas", ideaId);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send("Failed to find idea.");
  }
});

apiRouter.get("/ideas", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  if (ideas) {
    res.send(ideas);
  } else {
    res.status(404).send("There was an error retrieving ideas.");
  }
});

apiRouter.post("/ideas", (req, res, next) => {
  const savedIdea = addToDatabase("ideas", req.body);
  if (savedIdea) {
    res.status(201).send(savedIdea);
  } else {
    res.status(400).send();
  }
});

apiRouter.get("/ideas/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

apiRouter.put("/ideas/:ideaId", (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(400).send("Failed to update idea.");
  }
});

apiRouter.delete("/ideas/:ideaId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.idea.id);
  if (deletedIdea) {
    res.status(204).send(deletedIdea);
  } else {
    res.status(400).send("Failed to delete idea.");
  }
});

apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
      } else {
        res.status(404).send("There was an error retrieving meetings.");
      }
});

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    if (newMeeting) {
        res.status(201).send(newMeeting);
      } else {
        res.status(400).send();
      }
});

apiRouter.delete('/meetings', (req, res, next) => {
    const meetings = deleteAllFromDatabase('meetings');
    if (meetings) {
        res.status(204).send(meetings);
      } else {
        res.status(400).send();
      }
});

module.exports = apiRouter;
