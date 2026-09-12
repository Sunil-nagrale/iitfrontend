const express = require("express");

const History = require("../models/History");
const authMW = require("../MW/authMW");

const router = express.Router();

router.get("/", authMW, async (req, res) => {
  try {
    const history = await History.find({
      user: req.user
    }).sort({
      createdAt: -1
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get history",
      error: error.message
    });
  }
});

module.exports = router;