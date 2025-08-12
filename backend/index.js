// backend/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/chatbotDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// Define Chat Schema
const chatSchema = new mongoose.Schema({
  userMessage: String,
  botReply: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

// Rule-based responses
function getBotReply(message) {
  message = message.toLowerCase();
  if (message.includes("hello")) return "Hi there! How can I help you?";
  if (message.includes("bye")) return "Goodbye! Have a nice day!";
  return "I'm not sure I understand.";
}

// Chat route (save to DB)
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const botReply = getBotReply(userMessage);

  const newChat = new Chat({ userMessage, botReply });
  await newChat.save();

  res.json({ reply: botReply });
});

// History route
app.get("/history", async (req, res) => {
  const chats = await Chat.find().sort({ timestamp: -1 });
  res.json(chats);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
