import React, { useState } from "react";
import axios from "axios";
import styles from "../../modules/chatbot/Chatbot.module.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the message to Gemini API
      const response = await axios.post(
        "https://api.gemini.com/teammates",
        { query: input },
        {
          headers: {
            Authorization: `Bearer AIzaSyCE8fD2yGVoN3Ucd4WfC5jv0ogR4eqM3r8`,
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.message || "I couldn't find any matches. Try refining your filters!",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, chatbot not available. Please try again later." },
      ]);
    }

    setInput("");
  };

  return (
    <div className={styles.chatbot}>
      <button className={styles.toggleButton} onClick={handleToggle}>
        {isOpen ? "Close Chat" : "Find Teammates"}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>HackMate Bot</div>
          <div className={styles.chatBody}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.textInput}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;