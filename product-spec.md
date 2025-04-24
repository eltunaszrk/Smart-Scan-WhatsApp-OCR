# 📄 Product Specification: Smart Scan – OCR for WhatsApp Web

## 🧠 Overview

**Smart Scan** is a privacy-focused, on-device OCR feature built for WhatsApp Web. It empowers users to extract actionable content from shared images — such as UPI QR codes, invoice numbers, or handwritten notes — without leaving the chat interface or compromising data privacy.

---

## 📹 Demo

Watch Smart Scan in action: 
<p align="center">
  <a href="https://drive.google.com/file/d/1w3yzi3O1wO7HWPpdN8QJA0Xh7XT0H9DL/view">
    <img src="https://github.com/user-attachments/assets/0bbc3f9b-7999-48b4-a290-f9cf7c930dc2" alt="Watch Windows Opera Demo" width="600">
  </a>
</p>

---

## 🎯 Problem Statement

Users often receive key information as images:
- QR codes for payments
- Screenshots of Wi-Fi credentials or OTPs
- Scanned notes or handwritten contact details

Currently, WhatsApp lacks built-in OCR support, forcing users to rely on external apps like Google Lens, which:
- Introduce workflow friction
- Pose privacy concerns
- Interrupt conversational flow

---

## ✅ Solution

Smart Scan adds native OCR capabilities to WhatsApp Web, enabling:
- In-chat image analysis
- Contextual action buttons (copy, translate, pay)
- Instant UPI QR code detection

All processing happens **on-device**, ensuring:
- Minimal latency
- Maximum privacy
- Smooth UX

---

## 🧪 Core Features

| Feature               | Description |
|----------------------|-------------|
| Text Extraction       | Extracts and highlights plain text from images |
| UPI QR Code Detection | Detects UPI QR codes and generates actionable buttons |
| Contextual Actions    | "Copy", "Pay via UPI", "Translate" |
| Responsive Modals     | Click outside or sidebar to close |
| Toast Notifications   | Feedback for actions (e.g., “Text copied!”) |

---

## 👤 Target Users

- General WhatsApp users
- Business owners managing invoices
- Students and professionals sharing notes
- Anyone exchanging information via image

---

## 🖼️ Screenshots

### **1. Image Preview Modal**
The `ImagePreviewModal` allows users to view and analyze images. Extracted text and QR codes are displayed with actionable buttons.

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/ImagePreviewModal.png?raw=true" alt="Image Preview Modal" />
</p>

---

### **2. UPI Payment Modal**
The `UPIPaymentModal` detects UPI QR codes and provides options to copy the UPI link or initiate payments.

<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/UPIPaymentModal.png?raw=true" alt="UPI Payment Modal" />
</p>

---

## 🔧 Technical Architecture

### Stack:
- **Frontend**: React (Create React App), CSS Modules
- **OCR Engine**: `Tesseract.js` (text), `jsQR` (QR codes)
- **Data Handling**: All OCR is run client-side — no data leaves the browser

### Feature Architecture Flow
<p align="center">
  <img src="https://github.com/rishn/Smart-Scan-WhatsApp-OCR/blob/main/assets/FeatureArchitectureFlow.png?raw=true" alt="Feature Architecture Flow" />
</p>

### Component Breakdown:
1. `ImagePreviewModal` – displays uploaded image + OCR results
2. `UPIPaymentModal` – detects QR and enables UPI actions
3. `useOcr()` hook – abstracts Tesseract/QR logic
4. `toast.ts` – minimal WhatsApp-styled feedback system

---

## 📱 User Flow

1. **User uploads or clicks on an image**
2. Modal opens with “Analyze” button
3. OCR runs on-device:
   - Text is displayed for copy/translation
   - QR codes are parsed for UPI info
4. User takes contextual action:
   - Copy / Pay / Translate

---

## 📈 Rollout Strategy

| Phase        | Description |
|--------------|-------------|
| **Internal Demo**  | Deploy on Render, validate with known users |
| **Beta Users**     | Enable via feature flag for early feedback |
| **Gradual Rollout**| 5% → 25% → 100% adoption on WhatsApp Web clones |
| **Official Release** | Optimize, polish UX, and publish write-ups |

---

## 🧪 Edge Cases & Considerations

- ❓ **Multiple QR codes in image?** → Show options for user to choose
- 💬 **Non-UPI QR codes?** → Graceful fallback with “Copy raw QR content”
- 📷 **Blurred or dark images?** → Add toast prompt to try clearer photo
- 🌐 **Low-end devices?** → Run lightweight OCR model fallback

---

## 🛠 Future Enhancements

- 🔠 Multilingual OCR support
- 🔄 Barcode & event ticket scanning
- 📇 Add to Contacts, Open URLs
- 📦 Browser Extension version

---

## 📌 Status

**🟢 Prototype complete and live.**  
Smart Scan is ready for demo, feedback, and iterations.
👉 [Demo Link](https://smart-scan-whatsapp.onrender.com)  
---

## 🤝 Call for Feedback

If you're a PM, engineer, or UX researcher passionate about productivity tools, messaging apps, or computer vision —  
👉 [Let’s connect on LinkedIn!](https://linkedin.com/in/rishaanjacob)  
I’d love to hear your thoughts on Smart Scan.

