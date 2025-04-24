import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes, FaPlus, FaRegPaperPlane, FaRegTrashAlt, FaSearch, FaCopy } from "react-icons/fa";
import { useToast } from "./ToastProvider";
import jsQR from "jsqr";
import UPIPaymentModal from "./UPIPaymentModal"; // Import the UPI modal
import "../styles/ImagePreviewModal.css";

export default function ImagePreviewModal({ images, onClose, onAnalyze, onSend, onUpdateImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState({}); // Store analysis data for each image
  const [upiLink, setUpiLink] = useState(null); // State for UPI link
  const { showToast } = useToast(); // Get showToast function

  const currentImage = images[currentIndex];

  const handleOverlayClick = (e) => {
    // Check if the click is outside the modal
    if (
      e.target.classList.contains("image-preview-modal-overlay") || // Click on overlay
      e.target.closest(".sidebar") // Click inside the sidebar
    ) {
      onClose(); // Close the modal
    }
  };

  const handleAnalyze = async () => {
    const extractedText = await onAnalyze(currentImage);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = URL.createObjectURL(currentImage);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const qrCode = jsQR(imageData.data, img.width, img.height);

      const qrCodes = qrCode ? [qrCode.data] : [];

      // Update analysis data for the current image
      setAnalysisData((prev) => ({
        ...prev,
        [currentIndex]: {
          ocrText: extractedText.split("\n"),
          qrCodes,
        },
      }));
    };
  };

  useEffect(() => {
    // Check for UPI link in the QR codes of the current image
    const currentData = analysisData[currentIndex];
    if (currentData && currentData.qrCodes) {
      const upiMatch = currentData.qrCodes.find((url) => url.match(/upi:\/\/[^\s]+/));
      if (upiMatch) {
        setUpiLink(upiMatch); // Set the UPI link
      } else {
        setUpiLink(null); // Clear UPI link if not found
      }
    } else {
      setUpiLink(null); // Clear UPI link if no data exists
    }
  }, [currentIndex, analysisData]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Text copied!"); // Show toast
  };

  const handleDeleteImage = () => {
    if (images.length === 1) {
      onClose();
    } else {
      const updatedImages = images.filter((_, index) => index !== currentIndex);
      const newIndex = currentIndex === updatedImages.length ? currentIndex - 1 : currentIndex;
      setCurrentIndex(newIndex);
      onUpdateImages(updatedImages);

      // Remove analysis data for the deleted image
      setAnalysisData((prev) => {
        const updatedData = { ...prev };
        delete updatedData[currentIndex];
        return updatedData;
      });
    }
  };

  const handleAddMoreImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...images, ...files];
      onUpdateImages(newImages);
    }
    e.target.value = "";
  };

  const currentData = analysisData[currentIndex] || { ocrText: [], qrCodes: [] };

  return (
    <>
      <div className="image-preview-modal-overlay" onClick={handleOverlayClick}>
        <div className="image-preview-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="icon-button edit-button" title="Edit">
              <FaEdit />
            </button>
            <button className="icon-button lens-button" onClick={handleAnalyze} title="Analyze">
              <FaSearch />
            </button>
            <button className="icon-button delete-button" onClick={handleDeleteImage} title="Delete">
              <FaRegTrashAlt />
            </button>
            <button className="icon-button close-button" onClick={onClose} title="Close">
              <FaTimes />
            </button>
          </div>

          <div className="modal-content">
            <img src={URL.createObjectURL(currentImage)} alt="Preview" className="preview-image" />
            <div className="image-navigation">
              {images.length > 1 && (
                <>
                  <button
                    className="nav-button"
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                  >
                    ◀
                  </button>
                  <span>{`${currentIndex + 1} / ${images.length}`}</span>
                  <button
                    className="nav-button"
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))}
                    disabled={currentIndex === images.length - 1}
                  >
                    ▶
                  </button>
                </>
              )}
            </div>
            {currentData.qrCodes.length > 0 && (
              <div className="qr-code-section">
                <h4>QR Codes Detected:</h4>
                {currentData.qrCodes.map((url, index) => (
                  <div key={index} className="text-part">
                    <span>{url}</span>
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(url)}
                      title="Copy QR code URL"
                    >
                      <FaCopy />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {currentData.ocrText.length > 0 && (
              <div className="ocr-text-section">
                <h4>Extracted Text:</h4>
                {currentData.ocrText.map((part, index) => (
                  part && <div key={index} className="text-part">
                    <span>{part}</span>
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(part)}
                      title="Copy text"
                    >
                      <FaCopy />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <label htmlFor="add-more-images" className="icon-button add-more-button">
              <FaPlus />
            </label>
            <input
              type="file"
              id="add-more-images"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleAddMoreImages}
            />
            <button className="send-button" onClick={() => onSend(images)}>
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
      {upiLink && (
        <UPIPaymentModal upiLink={upiLink} onClose={() => setUpiLink(null)} />
      )}
    </>
  );
}