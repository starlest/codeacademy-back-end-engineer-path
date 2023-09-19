const minionsRouter = require("express").Router();

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, minionId) => {
  const minion = getFromDatabaseById("minions", minionId);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  if (minions) {
    res.send(minions);
  } else {
    res.status(404).send("There was an error retrieving minions.");
  }
});

minionsRouter.post("/", (req, res, next) => {
  const savedMinion = addToDatabase("minions", req.body);
  if (savedMinion) {
    res.status(201).send(savedMinion);
  } else {
    res.status(400).send();
  }
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else {
    res.status(400).send("Failed to update minion.");
  }
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.minion.id);
  if (deletedMinion) {
    res.status(204).send(deletedMinion);
  } else {
    res.status(400).send("Failed to delete minion.");
  }
});

minionsRouter.get("/:minionId/work", (req, res, next) => {
  const minionWork = getAllFromDatabase("work").filter(
    (work) => work.minionId == req.minion.id
  );
  if (minionWork) {
    res.send(minionWork);
  } else {
    res.status(404).send("There was an error retrieving work.");
  }
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const newWork = addToDatabase("work", { ...req.body, id: req.minion.id });
  if (newWork) {
    res.status(201).send(newWork);
  } else {
    res.status(400).send();
  }
});

minionsRouter.param("workId", (req, res, next, workId) => {
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

minionsRouter.put("/:minionId/work/:workId", checkWorkMinion, (req, res, next) => {
  const updatedWork = updateInstanceInDatabase("work", req.body);
  if (updatedWork) {
    res.send(updatedWork);
  } else {
    res.status(400).send("Failed to update work.");
  }
});

minionsRouter.delete(
  "/:minionId/work/:workId",
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

module.exports = minionsRouter;
