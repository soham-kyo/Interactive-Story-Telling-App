require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const storyRoutes = require("./routes/storyRoutes");
console.log("storyRoutes is:", storyRoutes);

const app = express();
const PORT = process.env.PORT || 5001;
console.log("🔥 Server.js starting...");
console.log("MONGO_URI:", process.env.MONGO_URI);
// Middlewares
app.use(cors());
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Routes
app.use("/api/stories", storyRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
