const express = require("express");
const bodyParser = require("body-parser");

// API routers
const userRouter = require("../server/api/users");

const API_PORT = 3001;

const jsonParser = bodyParser.json();
const app = express();
app.use(jsonParser);

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello User!");
});

app.get("/echo", (req, res) => {
  const text = req.query.q;
  res.send(text);
});

let count = 0;

app.get("/count", (req, res) => {
  res.send(`Page views: ${++count}`);
});

app.listen(API_PORT, () => {
  console.log(`Server is running on ${API_PORT} port`);
});
