import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    setChat([...chat, { sender: "user", text: message }]);

    const res = await axios.post("http://localhost:5000/chat", { message });
    setChat((prev) => [...prev, { sender: "bot", text: res.data.reply }]);

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Rule-Based Chatbot</h1>
      <div>
        {chat.map((c, i) => (
          <p key={i}>
            <strong>{c.sender}:</strong> {c.text}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
