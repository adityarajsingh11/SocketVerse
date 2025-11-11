# ⚡ SocketVerse — Real-Time Developer Collaboration Platform

![SocketVerse Banner](https://your-banner-image-url-here) <!-- Optional banner -->

> 🚀 **SocketVerse** is a full-stack real-time collaboration platform that empowers developers to **chat, build, and deploy projects live** — powered by **Socket.IO**, **WebContainers**, and **AI Assistance**.

---

## 🌟 Key Features

✅ **Real-Time Communication** — Instant developer-to-developer chat using Socket.IO  
✅ **Live Code Collaboration** — Share, edit, and preview code in real-time  
✅ **AI-Powered Assistant** — Integrated AI suggestions via Google Generative AI  
✅ **Secure Authentication** — JWT-based login and registration system  
✅ **Team Management** — Collaborate seamlessly on shared projects  
✅ **WebContainer Integration** — Build and deploy projects instantly in-browser  
✅ **Modern UI/UX** — Built with React 19, TailwindCSS 4, and Framer Motion for smooth animations  

---

## 🏗️ Project Overview

**SocketVerse** is divided into two main folders:


Each part runs independently but communicates in real-time through the WebSocket connection.

---

## 🧠 Tech Stack

### 🖥️ Frontend
- ⚛️ **React 19**
- 🎨 **TailwindCSS 4**
- 🎬 **Framer Motion** (animations)
- 🧭 **React Router v7**
- 💬 **Socket.IO Client**
- 💡 **Lucide React Icons**
- 🧠 **Markdown-to-JSX** for rendering messages/code
- 🔥 **Vite** for ultra-fast development

### 🧩 Backend
- ⚙️ **Node.js + Express**
- 🧵 **Socket.IO**
- 🧱 **MongoDB + Mongoose**
- 🔒 **JWT + Bcrypt** for authentication & password hashing
- 📡 **CORS + Morgan** for API handling and logging
- 🤖 **@google/generative-ai** for smart AI code responses
- 🚦 **Express-Validator** for input validation

---

## 🗂️ Folder Structure

### 🖥️ Frontend

```

frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/     # Static assets (images, icons, etc.)
│ ├── components/ # Reusable UI components
│ ├── context/    # UserContext for authentication state
│ ├── auth/       # Protected route handler (UserAuth)
│ ├── screens/    # Pages like Login, Register, Home, Project, Overview, Profile
│ ├── routes/     # AppRoutes.jsx
│ ├── config/     # Axios, socket config files
│ ├── App.jsx
│ └── main.jsx
└── package.json

```


### ⚙️ Backend

```
backend/
├── models/       # Mongoose Schemas (User, Project, etc.)
├── routes/       # Express routes (auth, user, chat, etc.)
├── controllers/  # API logic
├── middleware/   # Auth validation, error handling
├── utils/        # Helper functions, JWT handling
├── .env          # Environment variables
├── server.js     # Entry point
└── package.json
```


---

## 🧰 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/)
- (Optional) Redis for caching (if you enable it)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/adityarajsingh11/SocketVerse.git
cd SocketVerse

