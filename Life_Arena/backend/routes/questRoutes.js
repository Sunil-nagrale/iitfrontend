const express = require("express");

const Quest = require("../models/Quest");
const Profile = require("../models/Profile");
const History = require("../models/History");
const authMW = require("../MW/authMW");

const router = express.Router();

router.post("/", authMW, async (req, res) => {
  try {
    const quest = await Quest.create({
      ...req.body,
      user: req.user
    });

    res.status(201).json(quest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create quest",
      error: error.message
    });
  }
});

router.get("/", authMW, async (req, res) => {
  try {
    const quests = await Quest.find({ user: req.user }).sort({
      createdAt: -1
    });

    res.json(quests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get quests",
      error: error.message
    });
  }
});

router.put("/:id", authMW, async (req, res) => {
  try {
    const quest = await Quest.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
        status: "active"
      },
      req.body,
      {
        new: true
      }
    );

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found"
      });
    }

    res.json(quest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update quest",
      error: error.message
    });
  }
});

router.delete("/:id", authMW, async (req, res) => {
  try {
    const quest = await Quest.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found"
      });
    }

    res.json({
      message: "Quest deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete quest",
      error: error.message
    });
  }
});

router.put("/:id/complete", authMW, async (req, res) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user,
      status: "active"
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found or already completed"
      });
    }

    quest.status = "completed";
    quest.completedAt = new Date();

    await quest.save();

    const profile = await Profile.findOne({ user: req.user });

    profile.xp += quest.xpReward;
    profile.coins += quest.coinReward;

    if (quest.attributeReward?.type) {
      const attribute = quest.attributeReward.type.toLowerCase();
      profile.attributes[attribute] += quest.attributeReward.amount;
    }

    await profile.save();

    await History.create({
      user: req.user,
      type: "quest_completed",
      title: quest.title,
      description: quest.description,
      xpEarned: quest.xpReward,
      coinsEarned: quest.coinReward,
      attributeType: quest.attributeReward?.type || null,
      attributeAmount: quest.attributeReward?.amount || 0
    });

    res.json({
      message: "Quest completed successfully",
      quest,
      profile
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to complete quest",
      error: error.message
    });
  }
});

module.exports = router;