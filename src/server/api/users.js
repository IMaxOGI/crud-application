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

    const prevData = data["users"] || [];
    const body = { id: newUserId, ...req.body };
    const isUserExists = prevData.find((user) => user.email === body.email);
    if (isUserExists) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists!" });
    }
    data["users"] = [...prevData, body];

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send("new user added");
    });
  }, true);
});

userRouter.delete("/:id", (req, res) => {
  readFile((data) => {
    const userId = req.params["id"];
    const newArr = data["users"].filter((obj) => {
      return obj.id !== userId;
    });
    const newData = { ...data, data: newArr };

    writeFile(JSON.stringify(newData, null, 2), () => {
      res.status(200).send(`users id:${userId} removed`);
    });
  }, true);
});

userRouter.put("/:id", (req, res) => {
  readFile((data) => {
    const userId = req.params["id"];
    const users = data["users"];
    const body = req.body;

    const updatedArray = users.map((u) => {
      if (u.id === userId) {
        return { ...u, ...body };
      }
      return u;
    });

    const newData = {
      ...data,
      users: updatedArray,
    };

    writeFile(JSON.stringify(newData, null, 2), () => {
      res.status(200).send(`users id:${userId} update`);
    });
  }, true);
});

module.exports = userRouter;
