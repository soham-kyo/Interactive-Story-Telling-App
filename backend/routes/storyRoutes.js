const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// GET all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new story
router.post("/", async (req, res) => {
  const { title, data } = req.body;
  const newStory = new Story({ title, data });
  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
