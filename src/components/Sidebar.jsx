import React from "react";
import "../styles/Sidebar.css";
import { FaEdit, FaFilter, FaImage } from "react-icons/fa"; // Import icons

const contacts = [
  { id: 1, name: "Test Business" },
];

export default function Sidebar({ onSelectChat, messages }) {
  // Get the last message for the contact
  const getLastMessage = () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return "No messages yet";
    return lastMessage.type === "image" ? (
      <>
        <FaImage /> Image
      </>
    ) : (
      lastMessage.content
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>Chats</span>
        <div className="sidebar-header-icons">
          <button className="header-icon" title="New chat / New group">
            <FaEdit />
          </button>
          <button className="header-icon" title="Filter chats by">
            <FaFilter />
          </button>
        </div>
      </div>
      <ul className="chat-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="chat-item"
            onClick={() => onSelectChat(contact)}
          >
            <div className="chat-name">{contact.name}</div>
            <div className="chat-last-message">{getLastMessage()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}