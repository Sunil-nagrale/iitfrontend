const express = require("express");

const Profile = require("../models/Profile");
const UserInventory = require("../models/UserInventory");
const History = require("../models/History");
const authMW = require("../MW/authMW");

const router = express.Router();

const shopItems = [
  {
    itemId: "streak_boost",
    name: "Streak Boost",
    price: 50
  },
  {
    itemId: "xp_boost",
    name: "XP Boost",
    price: 100
  },
  {
    itemId: "focus_mode",
    name: "Focus Mode",
    price: 150
  }
];

router.get("/shop", authMW, (req, res) => {
  res.json(shopItems);
});

router.get("/", authMW, async (req, res) => {
  try {
    const inventory = await UserInventory.findOne({
      user: req.user
    });

    res.json(inventory || { purchasedItems: [] });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get inventory",
      error: error.message
    });
  }
});

router.post("/buy/:itemId", authMW, async (req, res) => {
  try {
    const item = shopItems.find(
      item => item.itemId === req.params.itemId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    const profile = await Profile.findOne({
      user: req.user
    });

    if (profile.coins < item.price) {
      return res.status(400).json({
        message: "Not enough coins"
      });
    }

    profile.coins -= item.price;
    await profile.save();

    let inventory = await UserInventory.findOne({
      user: req.user
    });

    if (!inventory) {
      inventory = await UserInventory.create({
        user: req.user,
        purchasedItems: []
      });
    }

    inventory.purchasedItems.push({
      itemId: item.itemId,
      name: item.name
    });

    await inventory.save();

    await History.create({
      user: req.user,
      type: "item_purchased",
      title: item.name,
      description: `Purchased for ${item.price} coins`
    });

    res.json({
      message: "Item purchased successfully",
      coins: profile.coins,
      inventory
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to purchase item",
      error: error.message
    });
  }
});

module.exports = router;