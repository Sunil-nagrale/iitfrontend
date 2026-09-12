const express = require("express");

const Profile = require("../models/Profile");
const authMW = require("../MW/authMW");

const router = express.Router();

router.get("/", authMW, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get profile",
      error: error.message
    });
  }
});

router.put("/", authMW, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      {
        ...req.body,
        user: req.user
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      message: "Profile updated successfully",
      profile
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
});

module.exports = router;