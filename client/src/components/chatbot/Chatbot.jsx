import React, { useState } from "react";
import axios from "axios";
import styles from "../../modules/chatbot/Chatbot.module.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to generate text using Gemini API
  async function generateText(prompt) {
    const apiKey = "AIzaSyBkLdy9CiqAVTD_xaQNyf9r3vhLHLdJ_qs"; // Replace with your Gemini API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`; // Replace with the actual API endpoint

    try {
      const response = await axios.post(
        apiUrl,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        /*{
prompt: prompt,
max_tokens: 200, // Adjust as needed
temperature: 0.7, // Adjust creativity level (0 to 1)
},*/
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Output the generated text
      console.log("Generated Text:", response.data);
      return response.data.candidates[0].content.parts[0].text; // response.data.text;
    } catch (error) {
      console.error(
        "Error generating text:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsPending(true);

    try {
      const reply = await generateText(input);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: reply },
      ]);

      /*const response = await axios.post(
"http://localhost:5000/api/chat", // <-- CORRECT BACK-END URL HERE
{ message: input },
{
headers: {
"Content-Type": "application/json",
},
}
);
*/

      /*
if (response?.data?.response) {
const botMessage = { sender: "bot", text: response.data.response };
setMessages((prevMessages) => [...prevMessages, botMessage]);
} else {
setMessages((prevMessages) => [
...prevMessages,
{ sender: "bot", text: "Sorry, I did not get a response. Please try again later." },
]);
}
*/
    } catch (error) {
      console.error("Error response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, chatbot not available. Please try again later.",
        },
      ]);
    } finally {
      setIsPending(false);
    }
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
                className={
                  msg.sender === "user" ? styles.userMessage : styles.botMessage
                }
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
              disabled={isPending}
            />
            <button
              onClick={sendMessage}
              className={styles.sendButton}
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
