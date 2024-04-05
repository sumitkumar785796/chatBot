// Import necessary libraries
import React, { useState } from "react";
// Initialize GoogleGenerativeAI and get the generative model
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD3fXHElKz1_q0Ja5lzkPG3TLlmdQIc068");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Define your React component
const ChatBot = () => {
  // State to hold the input prompt, generated content, and flag for showing question
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  // Function to handle input change
  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the API call
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setGeneratedContent(text);
      setShowQuestion(true); // Show the question after submission
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false); // Set loading back to false after API response is received
    }
  };

  return (
    <>
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt" />
            <h1>ChatBot</h1>
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog" />
            </span>
          </div>
        </header>
        
        <main className="msger-chat">
        <h1>Welcome to My ChatBot</h1>
          <div className="msg left-msg">
            <div
              className="msg-img"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dzoebynoh/image/upload/v1712321913/knstqmfd780syjjnxeud.gif)",
                width: "100px",
              }}
            />
            {showQuestion && (
              <div>
                <h1>{prompt}</h1>
              </div>
            )}
            <div className="msg-bubble">
              <div className="msg-info"></div>
              <div className="msg-text"></div>
            </div>
          </div>
          <div className="msg right-msg">
            {loading && (
              <>
                {" "}
                <img
                  src="https://res.cloudinary.com/dzoebynoh/image/upload/v1712324140/pxmy9x2subr6pjk5mvpe.gif"
                  alt="img"
                  style={{ width: "200px" }}
                />
                <h1 style={{ textAlign: "center" }}>Loading...</h1>
              </>
            )}
            {generatedContent && (
              <div>
                <p>{generatedContent}</p>
              </div>
            )}
            <div className="msg-bubble">
              <div className="msg-info"></div>
              <div className="msg-text"></div>
            </div>
          </div>
        </main>
        <form className="msger-inputarea" onSubmit={handleSubmit}>
          <input
            type="text"
            className="msger-input"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter your question"
          />
          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </>
  );
};

export default ChatBot;
