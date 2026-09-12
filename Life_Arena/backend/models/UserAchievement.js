const mongoose = require("mongoose");

const userAchievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    achievements: [
      {
        achievementId: {
          type: String,
          required: true
        },

        name: {
          type: String,
          required: true
        },

        unlockedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "UserAchievement",
  userAchievementSchema
);