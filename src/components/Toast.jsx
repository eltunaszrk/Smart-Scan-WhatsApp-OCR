import React, { useEffect } from "react";
import "../styles/Toast.css";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-dismiss after 2.5 seconds
    }, 2500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onClose]);

  return (
    <div className="toast">
      {message}
    </div>
  );
}