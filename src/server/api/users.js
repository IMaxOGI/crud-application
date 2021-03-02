const Router = require("express").Router;
const fs = require("fs");
const userRouter = Router();

let users = [];

userRouter.get("/", (req, res) => {
  res.send(users);
});

userRouter.post("/signup", (req, res) => {
  const newUser = req.body;
  newUser.email = newUser.email.toLowerCase();
  newUser.id = Date.now();
  const isUserExists = users.some((user) => user.email === newUser.email);
  if (isUserExists) {
    return res
      .status(400)
      .send({ success: false, message: "User already exists!" });
  }
  users.push(newUser);

  res.send({ success: true });
});

userRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const updatedArray = users.filter((u) => u.id !== +userId);
  const deletedCount = users.length - updatedArray.length;
  users = updatedArray.slice();
  res.send({ deletedCount });
});

userRouter.put("/:id", (req, res) => {
  const userId = +req.params.id;
  let count = 0;
  const updatedArray = users.map((u) => {
    if (u.id === userId) {
      count++;
      return Object.assign({}, u, req.body);
    }
    return u;
  });
  users = updatedArray.slice();
  res.send({ updatedCount: count });
});

module.exports = userRouter;
