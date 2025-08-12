// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Sample API route
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let botReply = "I didn't understand that.";

  // Simple rule-based responses
  if (userMessage.includes("hello")) {
    botReply = "Hi there! How can I help you today?";
  } else if (userMessage.includes("bye")) {
    botReply = "Goodbye! Have a great day!";
  }

  res.json({ reply: botReply });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
