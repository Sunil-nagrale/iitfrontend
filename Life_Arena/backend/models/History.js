const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: [
        "quest_completed",
        "item_purchased",
        "achievement_unlocked"
      ],
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    xpEarned: {
      type: Number,
      default: 0
    },

    coinsEarned: {
      type: Number,
      default: 0
    },

    attributeType: {
      type: String,
      enum: [
        "Intelligence",
        "Strength",
        "Vitality",
        "Focus",
        null
      ],
      default: null
    },

    attributeAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("History", historySchema);