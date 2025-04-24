import React, { useState } from "react";
import { FaLock, FaVideo, FaPhone, FaSearch } from "react-icons/fa"; // Import icons
import { runOCR } from "../utils/ocr";
import MessageInput from "./MessageInput";
import ImagePreviewModal from "./ImagePreviewModal";
import FullScreenImageModal from "./FullScreenImageModal"; // Import the new modal
import WhatsAppLogo from "../assets/WhatsApp.png"; // Import WhatsApp logo
import ProfileIcon from "../assets/ProfileIcon.png"; // Import a placeholder profile icon
import "../styles/ChatWindow.css";

export default function ChatWindow({ selectedChat, messages, setMessages  }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null); // State for full-screen image

  const addMessage = (sender, content, type = "text") => {
    setMessages((prev) => [...prev, { id: Date.now(), sender, content, type }]);
  };

  const handleSendText = (text) => {
    addMessage("user", text, "text");
  };

  const handleSendImage = (file) => {
    setPreviewImages((prev) => [...prev, file]);
  };

  const handleAnalyzeImage = async (image) => {
    setIsProcessing(true);
    try {
      const extractedText = await runOCR(image);
      return extractedText || "(No text detected)";
    } catch (err) {
      return err.message;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendImages = (images) => {
    images.forEach((image) => {
      setMessages((prev) => [...prev, { id: Date.now(), sender: "user", content: URL.createObjectURL(image), type: "image" }]);
    });
    setPreviewImages([]);
  };

  if (!selectedChat) {
    return (
      <div className="chat-window">
        <div className="chat-placeholder">
          <div className="placeholder-content">
            <img src={WhatsAppLogo} alt="WhatsApp Logo" className="whatsapp-logo" />
            <h1>WhatsApp Web</h1>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
          </div>
          <div className="placeholder-footer">
            <FaLock className="lock-icon" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-left">
          <img src={ProfileIcon} alt="Profile" className="profile-icon" />
          <span><strong>{selectedChat.name}</strong></span>
        </div>
        <div className="chat-header-right">
          <button className="header-icon" title="Video call">
            <FaVideo />
          </button>
          <button className="header-icon" title="Voice call">
            <FaPhone />
          </button>
          <button className="header-icon" title="Search within chat">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.type === "image" ? (
              <img
                src={msg.content}
                alt="Sent"
                className="sent-image"
                onClick={() => setFullscreenImage(msg.content)} // Open full-screen modal
              />
            ) : (
              msg.content
            )}
          </div>
        ))}
      </div>
      <MessageInput
        onSendText={handleSendText}
        onSendImage={handleSendImage}
        isProcessing={isProcessing}
      />
      {previewImages.length > 0 && (
        <ImagePreviewModal
          images={previewImages}
          onClose={() => setPreviewImages([])}
          onAnalyze={handleAnalyzeImage}
          onSend={handleSendImages}
          onUpdateImages={(updatedImages) => setPreviewImages(updatedImages)}
        />
      )}
      {fullscreenImage && (
        <FullScreenImageModal
          image={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
          onAnalyze={handleAnalyzeImage}
        />
      )}
    </div>
  );
}