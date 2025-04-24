# 🧠 Smart Scan - OCR for WhatsApp Web

![Smart Scan Logo](https://via.placeholder.com/150x150.png?text=Smart+Scan)  
**Empowering WhatsApp users with in-chat OCR capabilities.**

---

## 📖 Overview

**Smart Scan** enables WhatsApp Web users to instantly extract text and QR data from images — with privacy-first, on-device OCR.

- 🧾 Extract text from invoices, notes, Wi-Fi passwords
- 💸 Detect QR codes and initiate UPI payments instantly
- 🔒 Fully on-device — no cloud, no leaks

---

## 🚀 Try the Live Demo

👉 **Check out the working prototype here:** [Smart Scan Demo](https://smart-scan-whatsapp.onrender.com)  
> _Test it with images of invoices, QR codes, or handwritten notes!_

---

## 🚨 Problem Statement

### **User Pain Point**
WhatsApp users often receive important information as images, such as:
- QR codes for payments
- Contact information
- Addresses or handwritten notes

Currently, WhatsApp lacks native OCR functionality, forcing users to:
1. Save or screenshot the image.
2. Open a third-party app (e.g., Google Lens).
3. Extract the information manually.

This process introduces **latency**, **workflow friction**, and **user experience breakdown**, especially in fast-paced scenarios.

### **Impact**
- Delayed QR-based payments.
- Inefficient access to text-based data (e.g., invoice numbers, OTPs).
- Reduced productivity and reliance on third-party apps, risking data privacy.

---

## 💡 Solution: Smart Scan

Smart Scan integrates OCR capabilities directly into WhatsApp Web, enabling users to extract actionable content from images without leaving the app.

### **Key Features**
- **Extraction**: Extracts clean, copyable text from any image.
- **UPI QR Code Detection**: Detect UPI IDs and QR codes for payments.
- **Contextual Actions**:
  - Copy text or UPI links.
  - Initiate payments via UPI apps (e.g., GPay, PhonePe, Paytm).
  - Translate text (future enhancement).
- **Responsive UI**:
  - Close modals by clicking outside the modal or on the sidebar.

---

## 🖼️ Screenshots

### **1. Image Preview Modal**
The `ImagePreviewModal` allows users to view and analyze images. Extracted text and QR codes are displayed with actionable buttons.

![Image Preview Modal](https://via.placeholder.com/800x400.png?text=Image+Preview+Modal)

---

### **2. UPI Payment Modal**
The `UPIPaymentModal` detects UPI QR codes and provides options to copy the UPI link or initiate payments.

![UPI Payment Modal](https://via.placeholder.com/800x400.png?text=UPI+Payment+Modal)

---

## 🛠️ Technical Details

### **Architecture**
- **OCR Engine**: Uses lightweight libraries like `Tesseract` and `jsQR` for text and QR code detection.
- **On-Device Processing**: Ensures user privacy and low latency.

### **Key Components**
1. **ImagePreviewModal**:
   - Displays images with extracted text and QR codes.
   - Allows users to copy text or analyze images.
2. **UPIPaymentModal**:
   - Detects UPI QR codes and provides actionable options.
3. **Toast Notifications**:
   - Provides feedback (e.g., "Text copied!") using a light-themed WhatsApp-style UI.

---

## 🚀 How It Works

1. **Upload an Image**:
   - Drag and drop or attach an image in the chat.
2. **Analyze the Image**:
   - Tap ‘Analyze’ to extract content
3. **Take Action**:
   - Copy extracted text or UPI links.
   - Initiate payments via UPI apps.

---

## 📊 Benefits

### **For Users**
- **Time Efficiency**: Reduces OCR processing time from ~30 seconds (third-party apps) to ~3 seconds.
- **Privacy**: On-device processing ensures secure data handling.
- **Convenience**: No switching apps. No copy-pasting. Just scan and act.

### **For Businesses**
- **Faster Payments**: Accelerates QR-based checkouts and payments.
- **Improved Productivity**: Streamlines workflows for SMBs and micro-entrepreneurs.
- **Enhanced Engagement**: Increases time spent within WhatsApp.

---

## 🏆 Competitive Advantage

| Platform               | Built-in OCR   | Contextual Actions             | Needs External App |
|------------------------|----------------|--------------------------------|---------------------|
| **Google Lens**        | ✅ Yes          | ✅ Rich                         | ❌ No               |
| **iMessage (iOS)**     | ✅ Live Text    | ✅ Copy, Translate, Call        | ❌ No               |
| **Telegram**           | ❌ No           | ❌ Limited                      | ✅ Yes              |
| **WhatsApp (Now)**     | ❌ Partial      | ❌ Very Limited                 | ✅ Yes              |
| **WhatsApp (Smart Scan)** | ✅ Yes       | ✅ Copy, Pay, Translate         | ❌ No               |

---

## 📈 Future Enhancements

- **Multilingual OCR**: Auto-detect languages and provide translation suggestions.
- **Barcode Scanning**: Extend support to barcodes and event tickets.
- **Advanced Contextual Actions**: Add options like "Add to Contacts" or "Open URLs."

---

## 🧑‍💻 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rishn/Smart-Scan-Whatsapp-OCR.git
   cd smart-scan
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
4. Open the app in your browser:
    ```bash
    http://localhost:3000
    ```
---

## 🙌 Acknowledgments
- **Libraries Used**:
  - [Tesseract.js](https://github.com/naptha/tesseract.js) - For text recognition.
  - [jsQR](https://github.com/cozmo/jsQR) - For QR code detection.

- **Inspiration**:
  - WhatsApp's existing UPI QR detection.
  - Google Lens for its seamless OCR capabilities.