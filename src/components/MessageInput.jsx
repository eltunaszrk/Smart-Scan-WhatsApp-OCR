import React, { useState } from "react";
import { FaPaperclip, FaRegPaperPlane, FaRegSmile, FaMicrophone } from "react-icons/fa";
import "../styles/MessageInput.css";

export default function MessageInput({ onSendText, onSendImage, isProcessing }) {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendText(inputText);
    setInputText("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    if (files.length > 0) {
      files.forEach((file) => onSendImage(file)); // Send each file
    }
  };

  return (
    <div className="message-input">
      <button className="icon-button emoji-button" title="Emojis, GIFs, Stickers">
        <FaRegSmile />
      </button>
      <label htmlFor="image-upload" className="icon-button attach-button" title="Attach">
        <FaPaperclip />
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        multiple // Allow multiple uploads
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <input
        type="text"
        placeholder="Type a message"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={isProcessing}
        aria-label="Type your message"
      />
      <button
        onClick={inputText.trim() ? handleSend : null}
        disabled={isProcessing}
        title={inputText.trim() ? "Send message" : "Record a voice message"}
      >
        {inputText.trim() ? <FaRegPaperPlane /> : <FaMicrophone />}
      </button>
    </div>
  );
}