import React, { useState } from "react";
import { ToastProvider } from "./components/ToastProvider";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import TestImage from "./assets/TestImage.png"; // Import the test image
import "./App.css";

export default function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", content: "Hey there! Upload an image to scan text.", type: "text" },
    { id: 2, sender: "bot", content: "Please pay via the UPI ID shared below.", type: "text" },
    { id: 3, sender: "bot", content: TestImage, type: "image" }, // Add the image message
  ]);

  return (
    <ToastProvider>
      <div className="app-container">
        <Sidebar onSelectChat={setSelectedChat} messages={messages} />
        <ChatWindow
          selectedChat={selectedChat}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </ToastProvider>
  );
}