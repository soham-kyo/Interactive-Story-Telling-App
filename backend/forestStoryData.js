const forestStory = {
  start: {
    text: "You wake up in a forest and see four friends ahead.",
    emoji: "🌳",
    image: "/Forest.jpg",
    choices: [
      { text: "Talk to Aniket", next: "aniket" },
      { text: "Talk to Soham", next: "soham" },
      { text: "Talk to Yashraj", next: "yashraj" },
      { text: "Talk to Krishna", next: "krishna" },
    ],
  },
  aniket: {
    text: "Aniket tells you about a hidden river nearby.",
    emoji: "🧙‍♂️",
    image: "/Hidden River.jpg",
    choices: [{ text: "Go to the river", next: "river" }],
  },
  soham: {
    text: "Soham suggests exploring a mysterious cave.",
    emoji: "🧝‍♂️",
    image: "/Mysterious Cave.jpg",
    choices: [{ text: "Enter the cave", next: "cave" }],
  },
  yashraj: {
    text: "Yashraj points towards an ancient temple.",
    emoji: "🏯",
    image: "/Ancient Temple.jpg",
    choices: [{ text: "Go to the temple", next: "temple" }],
  },
  krishna: {
    text: "Krishna shows you a hidden path into the mountains.",
    emoji: "🏞️",
    image: "/Hidden_Path.jpg",
    choices: [{ text: "Climb the mountain", next: "mountain" }],
  },
  river: {
    text: "At the river, magical fish glow under water! ✨",
    emoji: "🐟",
    image: "/Magical Fish.jpg",
    choices: [],
  },
  cave: {
    text: "Inside the cave, you find glowing crystals.",
    emoji: "🪨",
    image: "/Glowing Crystal.jpg",
    choices: [],
  },
  temple: {
    text: "The ancient temple whispers secrets of old.",
    emoji: "⛩️",
    image: "/Secrets.jpg",
    choices: [],
  },
  mountain: {
    text: "From the mountain, you see the whole kingdom.",
    emoji: "🏔️",
    image: "/Kingdom.jpg",
    choices: [],
  },
};

module.exports = { forestStory };
