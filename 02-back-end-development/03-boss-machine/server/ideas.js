const ideasRouter = require("express").Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require("./db.js");

ideasRouter.param("ideaId", (req, res, next, ideaId) => {
  const idea = getFromDatabaseById("ideas", ideaId);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send("Failed to find idea.");
  }
});

ideasRouter.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  if (ideas) {
    res.send(ideas);
  } else {
    res.status(404).send("There was an error retrieving ideas.");
  }
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const savedIdea = addToDatabase("ideas", req.body);
  if (savedIdea) {
    res.status(201).send(savedIdea);
  } else {
    res.status(400).send();
  }
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(400).send("Failed to update idea.");
  }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.idea.id);
  if (deletedIdea) {
    res.status(204).send(deletedIdea);
  } else {
    res.status(400).send("Failed to delete idea.");
  }
});

module.exports = ideasRouter;
