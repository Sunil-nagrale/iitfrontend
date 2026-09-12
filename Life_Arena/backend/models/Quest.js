const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      enum: [
        "Coding",
        "Fitness",
        "Reading",
        "Learning",
        "Health",
        "Mind",
        "Personal",
        "Other"
      ],
      required: true
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium"
    },

    estimatedTime: {
      type: String,
      default: ""
    },

    xpReward: {
      type: Number,
      default: 0
    },

    coinReward: {
      type: Number,
      default: 0
    },

    attributeReward: {
      type: {
        type: String,
        enum: [
          "Intelligence",
          "Strength",
          "Vitality",
          "Focus"
        ]
      },

      amount: {
        type: Number,
        default: 0
      }
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active"
    },

    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Quest", questSchema);