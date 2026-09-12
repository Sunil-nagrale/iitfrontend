require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");
const questRoutes = require("./routes/questRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/history", historyRoutes);

app.get("/",(req , res) =>{
    console.log("hi server");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5002, () => {
      console.log("Server running on port 5002");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

app.listen(5002, () => {
  console.log("Server running on port 5000");
});