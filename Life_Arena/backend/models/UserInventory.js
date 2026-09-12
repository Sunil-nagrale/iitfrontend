const mongoose = require("mongoose");

const userInventorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    purchasedItems: [
      {
        itemId: {
          type: String,
          required: true
        },

        name: {
          type: String,
          required: true
        },

        purchasedAt: {
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
  "UserInventory",
  userInventorySchema
);