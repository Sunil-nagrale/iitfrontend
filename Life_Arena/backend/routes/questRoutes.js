// const express = require("express");

// const Quest = require("../models/Quest");
// const Profile = require("../models/Profile");
// const History = require("../models/History");
// const authMW = require("../MW/authMW");

// const router = express.Router();

// router.post("/", authMW, async (req, res) => {
//   try {
//     const quest = await Quest.create({
//       ...req.body,
//       user: req.user
//     });

//     res.status(201).json(quest);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create quest",
//       error: error.message
//     });
//   }
// });

// router.get("/", authMW, async (req, res) => {
//   try {
//     const quests = await Quest.find({ user: req.user }).sort({
//       createdAt: -1
//     });

//     res.json(quests);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to get quests",
//       error: error.message
//     });
//   }
// });

// router.put("/:id", authMW, async (req, res) => {
//   try {
//     const quest = await Quest.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         user: req.user,
//         status: "active"
//       },
//       req.body,
//       {
//         new: true
//       }
//     );

//     if (!quest) {
//       return res.status(404).json({
//         message: "Quest not found"
//       });
//     }

//     res.json(quest);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update quest",
//       error: error.message
//     });
//   }
// });

// router.delete("/:id", authMW, async (req, res) => {
//   try {
//     const quest = await Quest.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user
//     });

//     if (!quest) {
//       return res.status(404).json({
//         message: "Quest not found"
//       });
//     }

//     res.json({
//       message: "Quest deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete quest",
//       error: error.message
//     });
//   }
// });

// router.put("/:id/complete", authMW, async (req, res) => {
//   try {
//     const quest = await Quest.findOne({
//       _id: req.params.id,
//       user: req.user,
//       status: "active"
//     });

//     if (!quest) {
//       return res.status(404).json({
//         message: "Quest not found or already completed"
//       });
//     }

//     quest.status = "completed";
//     quest.completedAt = new Date();

//     await quest.save();

//     const profile = await Profile.findOne({ user: req.user });

//     profile.xp += quest.xpReward;
//     profile.coins += quest.coinReward;

//     if (quest.attributeReward?.type) {
//       const attribute = quest.attributeReward.type.toLowerCase();
//       profile.attributes[attribute] += quest.attributeReward.amount;
//     }

//     await profile.save();

//     await History.create({
//       user: req.user,
//       type: "quest_completed",
//       title: quest.title,
//       description: quest.description,
//       xpEarned: quest.xpReward,
//       coinsEarned: quest.coinReward,
//       attributeType: quest.attributeReward?.type || null,
//       attributeAmount: quest.attributeReward?.amount || 0
//     });

//     res.json({
//       message: "Quest completed successfully",
//       quest,
//       profile
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to complete quest",
//       error: error.message
//     });
//   }
// });

// module.exports = router;

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

// router.put("/:id", authMW, async (req, res) => {
//   try {
//     const quest = await Quest.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         user: req.user
//       },
//       req.body,
//       {
//         new: true
//       }
//     );

//     if (!quest) {
//       return res.status(404).json({
//         message: "Quest not found"
//       });
//     }

//     res.json(quest);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update quest",
//       error: error.message
//     });
//   }
// });
router.put("/:id/complete", authMW, async (req, res) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found"
      });
    }

    if (quest.status === "completed") {
      return res.status(400).json({
        message: "Quest already completed"
      });
    }

    quest.status = "completed";
    quest.completedAt = new Date();
    await quest.save();

    const profile = await Profile.findOne({
      user: req.user
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    const earnedXp = quest.xpReward || 0;
    const earnedCoins = quest.coinReward || 0;

    profile.xp += earnedXp;
    profile.totalXp += earnedXp;
    profile.coins += earnedCoins;

    while (profile.xp >= profile.xpToNextLevel) {
      profile.xp -= profile.xpToNextLevel;
      profile.level += 1;
      profile.xpToNextLevel = Math.round(
        profile.xpToNextLevel * 1.35
      );
    }

    if (quest.attributeReward?.type) {
      const attribute = quest.attributeReward.type.toLowerCase();

      if (profile.attributes[attribute] !== undefined) {
        profile.attributes[attribute] +=
          quest.attributeReward.amount || 0;
      }
    }

    const now = new Date();

    if (!profile.lastCompletedAt) {
      profile.streak = 1;
    } else {
      const lastDate = new Date(profile.lastCompletedAt);

      const lastDay = new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        lastDate.getDate()
      );

      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const difference =
        (today - lastDay) / (1000 * 60 * 60 * 24);

      if (difference === 1) {
        profile.streak += 1;
      } else if (difference > 1) {
        profile.streak = 1;
      }
    }

    profile.lastCompletedAt = now;

    await profile.save();

    await History.create({
      user: req.user,
      type: "quest_completed",
      title: quest.title,
      description: quest.description,
      xpEarned: earnedXp,
      coinsEarned: earnedCoins,
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
      user: req.user
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found"
      });
    }

    if (quest.status === "completed") {
      return res.status(400).json({
        message: "Quest already completed"
      });
    }

    quest.status = "completed";
    quest.completedAt = new Date();
    await quest.save();

    const profile = await Profile.findOne({ user: req.user });

    if (profile) {
      profile.xp += quest.xpReward;
      profile.coins += quest.coinReward;

      if (quest.attributeReward?.type) {
        const attribute = quest.attributeReward.type.toLowerCase();
        profile.attributes[attribute] += quest.attributeReward.amount;
      }

      await profile.save();
    }

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