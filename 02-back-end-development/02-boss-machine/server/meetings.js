const meetingsRouter = require("express").Router();
const { getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase } = require("./db.js");

meetingsRouter.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  if (meetings) {
    res.send(meetings);
  } else {
    res.status(404).send("There was an error retrieving meetings.");
  }
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  if (newMeeting) {
    res.status(201).send(newMeeting);
  } else {
    res.status(400).send();
  }
});

meetingsRouter.delete("/", (req, res, next) => {
  const meetings = deleteAllFromDatabase("meetings");
  if (meetings) {
    res.status(204).send(meetings);
  } else {
    res.status(400).send();
  }
});

module.exports = meetingsRouter;
