const express = require("express");

const Profile = require("../models/Profile");
const Quest = require("../models/Quest");
const History = require("../models/History");
const authMW = require("../MW/authMW");

const router = express.Router();

router.get("/", authMW, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    const activeQuests = await Quest.countDocuments({
      user: req.user,
      status: "active"
    });

    const completedQuests = await Quest.countDocuments({
      user: req.user,
      status: "completed"
    });

    const recentHistory = await History.find({
      user: req.user
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      level: profile.level,
      xp: profile.xp,
      coins: profile.coins,
      attributes: profile.attributes,
      activeQuests,
      completedQuests,
      recentHistory
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get dashboard",
      error: error.message
    });
  }
});

module.exports = router;