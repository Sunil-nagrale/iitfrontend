const express = require("express");

const UserAchievement = require("../models/UserAchievement");
const History = require("../models/History");
const authMW = require("../MW/authMW");

const router = express.Router();

const achievements = [
  {
    achievementId: "first_quest",
    name: "First Quest",
    description: "Complete your first quest"
  },
  {
    achievementId: "quest_master",
    name: "Quest Master",
    description: "Complete 10 quests"
  },
  {
    achievementId: "level_up",
    name: "Level Up",
    description: "Reach Level 5"
  },
  {
    achievementId: "rich_arena",
    name: "Rich Arena",
    description: "Earn 500 coins"
  }
];

router.get("/", authMW, async (req, res) => {
  try {
    const userAchievements = await UserAchievement.findOne({
      user: req.user
    });

    res.json({
      available: achievements,
      unlocked: userAchievements
        ? userAchievements.achievements
        : []
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get achievements",
      error: error.message
    });
  }
});

router.post("/unlock", authMW, async (req, res) => {
  try {
    const { achievementId } = req.body;

    const achievement = achievements.find(
      item => item.achievementId === achievementId
    );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found"
      });
    }

    let userAchievements = await UserAchievement.findOne({
      user: req.user
    });

    if (!userAchievements) {
      userAchievements = await UserAchievement.create({
        user: req.user,
        achievements: []
      });
    }

    const alreadyUnlocked = userAchievements.achievements.some(
      item => item.achievementId === achievementId
    );

    if (alreadyUnlocked) {
      return res.status(400).json({
        message: "Achievement already unlocked"
      });
    }

    userAchievements.achievements.push({
      achievementId: achievement.achievementId,
      name: achievement.name
    });

    await userAchievements.save();

    await History.create({
      user: req.user,
      type: "achievement_unlocked",
      title: achievement.name,
      description: achievement.description
    });

    res.json({
      message: "Achievement unlocked",
      achievement
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unlock achievement",
      error: error.message
    });
  }
});

module.exports = router;