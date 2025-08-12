const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userMessage: String,
  botReply: String,
});

module.exports = mongoose.model("Chat", chatSchema);
