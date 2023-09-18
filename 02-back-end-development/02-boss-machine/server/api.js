const express = require("express");
const apiRouter = express.Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  createMeeting,
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

apiRouter.post("/ideas", checkMillionDollarIdea, (req, res, next) => {
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

apiRouter.get("/meetings", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  if (meetings) {
    res.send(meetings);
  } else {
    res.status(404).send("There was an error retrieving meetings.");
  }
});

apiRouter.post("/meetings", (req, res, next) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  if (newMeeting) {
    res.status(201).send(newMeeting);
  } else {
    res.status(400).send();
  }
});

apiRouter.delete("/meetings", (req, res, next) => {
  const meetings = deleteAllFromDatabase("meetings");
  if (meetings) {
    res.status(204).send(meetings);
  } else {
    res.status(400).send();
  }
});

apiRouter.get("/minions/:minionId/work", (req, res, next) => {
  const minionWork = getAllFromDatabase("work").filter(
    (work) => work.minionId == req.minion.id
  );
  if (minionWork) {
    res.send(minionWork);
  } else {
    res.status(404).send("There was an error retrieving work.");
  }
});

apiRouter.post("/minions/:minionId/work", (req, res, next) => {
  const newWork = addToDatabase("work", { ...req.body, id: req.minion.id });
  if (newWork) {
    res.status(201).send(newWork);
  } else {
    res.status(400).send();
  }
});

apiRouter.param("workId", (req, res, next, workId) => {
  const work = getFromDatabaseById("work", workId);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send("Failed to find work.");
  }
});

const checkWorkMinion = (req, res, next) => {
  if (req.work.minionId !== req.minion.id) {
    return res
      .status(400)
      .send("This work is unrelated to the minion requested.");
  }
  next();
};

apiRouter.put(
  "/minions/:minionId/work/:workId",
  checkWorkMinion,
  (req, res, next) => {
    const updatedWork = updateInstanceInDatabase("work", req.body);
    if (updatedWork) {
      res.send(updatedWork);
    } else {
      res.status(400).send("Failed to update work.");
    }
  }
);

apiRouter.delete(
  "/minions/:minionId/work/:workId",
  checkWorkMinion,
  (req, res, next) => {
    const deletedWork = deleteFromDatabasebyId("work", req.work.id);
    if (deletedWork) {
      res.status(204).send(deletedWork);
    } else {
      res.status(400).send();
    }
  }
);

module.exports = apiRouter;
