// const dotenv = require("dotenv");
// dotenv.config();

// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const mongoose = require("mongoose");
// const profileRoutes = require("./routes/profileRoutes");
// const questRoutes = require("./routes/questRoutes");
// const historyRoutes = require("./routes/historyRoutes");
// const inventoryRoutes = require("./routes/inventoryRoutes");
// const achievementRoutes = require("./routes/achievementRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/quests", questRoutes);
// app.use("/api/history", historyRoutes);
// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/achievements", achievementRoutes);
// app.use("/api/dashboard", dashboardRoutes);


// app.get("/",(req , res) =>{
//     console.log("hi server");
// });

// console.log("Mongo URL exists:", !!process.env.MONGO_URL);
// // mongoose.connect(process.env.MONGO_URL)
// //   .then(() => {
// //     console.log("MongoDB connected");
   

// //     app.listen(5173, () => {
// //       console.log("Server running on port 5002");
// //     });
// //   })
// //   .catch((error) => {
// //     console.log("MongoDB connection failed:", error.message);
// //   });
// console.log("Mongo URL exists:", !!process.env.MONGO_URL);

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("MongoDB connected");

//     app.listen(5173, () => {
//       console.log("Server running on port 5173");
//     });
//   })
//   .catch((error) => {
//     console.log("MongoDB connection failed:", error.message);
//   });

// app.listen(5173, () => {
//   console.log("Server running on port 5000");
// });
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const questRoutes = require("./routes/questRoutes");
const historyRoutes = require("./routes/historyRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Life Arena Backend is running!");
});

const PORT = 5002;

console.log("Mongo URL exists:", !!process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log("Message:", error.message);

    if (error.reason?.servers) {
      for (const [address, server] of error.reason.servers) {
        console.log("\nServer:", address);
        console.log("Server error:", server.error?.message);
        console.log("Server error name:", server.error?.name);
      }
    }

    console.log("Full error:", error);
  });