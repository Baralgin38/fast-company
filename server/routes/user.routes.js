const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

router.patch("/:userID", (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.status(200).send(updatedUser)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await User.find({});
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже.",
    });
  }
});

module.exports = router;
