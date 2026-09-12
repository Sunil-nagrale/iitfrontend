// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     level: {
//       type: Number,
//       default: 1
//     },

//     xp: {
//       type: Number,
//       default: 0
//     },

//     coins: {
//       type: Number,
//       default: 0
//     },

//     attributes: {
//       intelligence: {
//         type: Number,
//         default: 0
//       },

//       strength: {
//         type: Number,
//         default: 0
//       },

//       vitality: {
//         type: Number,
//         default: 0
//       },

//       focus: {
//         type: Number,
//         default: 0
//       }
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = mongoose.model("Profile", profileSchema);

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    level: {
      type: Number,
      default: 1
    },

    xp: {
      type: Number,
      default: 0
    },

    xpToNextLevel: {
      type: Number,
      default: 100
    },

    totalXp: {
      type: Number,
      default: 0
    },

    coins: {
      type: Number,
      default: 0
    },

    streak: {
      type: Number,
      default: 0
    },

    lastCompletedAt: {
      type: Date,
      default: null
    },

    attributes: {
      intelligence: {
        type: Number,
        default: 0
      },

      strength: {
        type: Number,
        default: 0
      },

      vitality: {
        type: Number,
        default: 0
      },

      focus: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Profile", profileSchema);