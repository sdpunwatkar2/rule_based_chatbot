import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:5000/chat", { message });
    setChat([
      ...chat,
      { sender: "user", text: message },
      { sender: "bot", text: res.data.reply },
    ]);
    setMessage("");
  };

  const loadHistory = async () => {
    const res = await axios.get("http://localhost:5000/history");
    setHistory(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>💬 Rule-Based Chatbot</h1>
      {chat.map((msg, i) => (
        <p key={i}>
          <b>{msg.sender}:</b> {msg.text}
        </p>
      ))}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <hr />
      <button onClick={loadHistory}>📜 Load Chat History</button>
      {history.map((h, i) => (
        <p key={i}>
          <b>User:</b> {h.userMessage} <br />
          <b>Bot:</b> {h.botReply}
        </p>
      ))}
    </div>
  );
}

export default App;
