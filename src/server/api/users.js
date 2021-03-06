const Router = require("express").Router;
const fs = require("fs");
const userRouter = Router();
const dataPath = __dirname + "/db/users.json";

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      throw err;
    }

    callback();
  });
};

userRouter.get("/", (req, res) => {
  readFile((data) => {
    res.send(data);
  }, true);
});
userRouter.post("/signup", (req, res) => {
  readFile((data) => {
    const newUserId = Date.now().toString();

    data[newUserId] = req.body;

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send("new user added");
    });
  }, true);
});

// const newUser = req.body;
// newUser.email = newUser.email.toLowerCase();
// newUser.id = Date.now();
// const isUserExists = users.some((user) => user.email === newUser.email);
// if (isUserExists) {
//   return res
//     .status(400)
//     .send({ success: false, message: "User already exists!" });
// }
// users.push(newUser);
// res.send({ success: true });

userRouter.delete("/:id", (req, res) => {
  readFile((data) => {
    const userId = req.params["id"];
    data[userId] = req.body;

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send(`users id:${userId} update`);
    });
  }, true);
});

userRouter.put("/:id", (req, res) => {
  readFile((data) => {
    const userId = req.params["id"];
    delete data[userId];

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send(`users id:${userId} removed`);
    });
  }, true);
});

// const userId = +req.params.id;
// let count = 0;
// const updatedArray = users.map((u) => {
//   if (u.id === userId) {
//     count++;
//     return Object.assign({}, u, req.body);
//   }
//   return u;
// });
// users = updatedArray.slice();
// res.send({ updatedCount: count });

module.exports = userRouter;
