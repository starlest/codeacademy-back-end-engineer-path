const checkMillionDollarIdea = (req, res, next) => {
  const yield = req.body.weeklyRevenue * req.body.numWeeks;
  if (yield && yield >= 1000000) {
    next();
  } else {
    res.status(400).send("This idea is not worth a million dollar.");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
