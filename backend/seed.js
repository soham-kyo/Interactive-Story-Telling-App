const mongoose = require("mongoose");
require("dotenv").config();
const Story = require("./models/Story");
const { forestStory } = require("./forestStoryData"); // we'll create this file below

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB Atlas");
    await Story.deleteMany({});
    const newStory = new Story({
      title: "Forest Adventure",
      data: forestStory,
    });
    await newStory.save();
    console.log("✅ Story inserted!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("Error:", err));
console.log("Seeding complete!");
