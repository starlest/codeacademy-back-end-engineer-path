const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

app.get("/api/quotes", (req, res) => {
  const person = req.query.person;
  if (person) {
    res.send({
      quotes: quotes.filter((q) => q.person == person),
    });
  } else {
    res.send({
      quotes: quotes,
    });
  }
});

app.get("/api/quotes/random", (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.send({
    quote: randomQuote,
  });
});

app.post("/api/quotes", (req, res) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (quote && person) {
    const newQuote = {
      quote: quote,
      person: person,
    };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT);
