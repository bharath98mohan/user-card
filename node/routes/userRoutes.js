const express = require("express");
const router = express.Router();
let data = require("../data/userData.json");
const authMiddleware = require("../middleware/auth");

router.get("/users", authMiddleware, (req, res, next) => {
  try {
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/users/:id", authMiddleware, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userData = data.find((user) => user.id === id);

    if (userData) {
      data = data.filter((user) => user.id !== id);
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/users/:id", authMiddleware, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const newName = req.body.name;
    const userData = data.find((user) => user.id === id);

    if (userData) {
      data.map((user) => {
        if (user.id === id) {
          user.name = newName;
        }
      });
      res.json({ message: "User data changed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
