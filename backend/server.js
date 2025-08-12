const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const chat = require("./models/chat");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// POST /chat - Receive message, reply, and save to DB
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Simple rule-based bot reply
  let botReply = "I didn't understand that.";
  if (userMessage.toLowerCase().includes("hello")) botReply = "Hi there!";
  if (userMessage.toLowerCase().includes("how are you"))
    botReply = "I'm doing great, thanks!";

  // Save to DB
  const chat = new Chat({ userMessage, botReply });
  await chat.save();

  res.json({ reply: botReply });
});

// GET /history - Fetch all stored chats
app.get("/history", async (req, res) => {
  const chats = await Chat.find().sort({ timestamp: -1 });
  res.json(chats);
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
