const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: Object, required: true },
});

module.exports = mongoose.model("Story", StorySchema);
