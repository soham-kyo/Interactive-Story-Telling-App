import React, { useState, useEffect } from "react";

function StoryScreen() {
  const [storyData, setStoryData] = useState(null);
  const [currentNodeKey, setCurrentNodeKey] = useState("start");
  const [showInput, setShowInput] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch story data from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5001/api/stories")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setStoryData(data[0].data); // use first story's data
        }
      })
      .catch((err) => console.error("Error fetching story data:", err));
  }, []);

  const currentNode = storyData ? storyData[currentNodeKey] : null;

  useEffect(() => {
    if (!currentNode) return;
    let cancelled = false;

    async function typeText() {
      setDisplayedText("");
      await new Promise((r) => setTimeout(r, 10));

      for (let i = 0; i < currentNode.text.length; i++) {
        if (cancelled) break;
        setDisplayedText((prev) => prev + currentNode.text.charAt(i));
        await new Promise((r) => setTimeout(r, 25));
      }
    }

    typeText();

    return () => {
      cancelled = true;
    };
  }, [currentNodeKey, currentNode]);

  const handleStart = () => {
    if (playerName.trim() !== "") setShowInput(false);
  };

  const handleChoice = (nextKey) => {
    setHistory((prev) => [...prev, currentNodeKey]);
    setCurrentNodeKey(nextKey);
  };

  const handleRestart = () => {
    setCurrentNodeKey("start");
    setShowInput(true);
    setPlayerName("");
    setHistory([]);
  };

  if (!storyData) {
    return <div className="story-text">Loading story...</div>;
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="story-container">
        {showInput ? (
          <>
            <h1 className="story-title">
              {currentNode.emoji} Adventure Begins {currentNode.emoji}
            </h1>
            <p className="story-text">What is your name, brave traveler?</p>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="input-name"
              placeholder="Enter your name"
            />
            <button className="choice-button" onClick={handleStart}>
              Start Adventure
            </button>
          </>
        ) : (
          <>
            <h1 className="story-title">
              {currentNode.emoji} Adventure {currentNode.emoji}
            </h1>
            <img
              src={currentNode.image}
              alt="scene"
              className="story-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Found";
              }}
            />
            <p className="story-text">
              {displayedText.replace("you", playerName)}
            </p>
            <div className="choices">
              {currentNode.choices.length > 0 ? (
                currentNode.choices.map((choice, index) => (
                  <button
                    key={index}
                    className="choice-button"
                    onClick={() => handleChoice(choice.next)}
                  >
                    {choice.text}
                  </button>
                ))
              ) : (
                <>
                  <p className="story-text">
                    🧭 Your journey: {history.join(" → ")}
                  </p>
                  <button className="choice-button" onClick={handleRestart}>
                    Restart Adventure
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StoryScreen;
