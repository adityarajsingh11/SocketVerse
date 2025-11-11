# ⚡ SocketVerse — Talk. Build. Sync.

![React](https://img.shields.io/badge/Frontend-React_19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black?logo=socket.io)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative)

**SocketVerse** is a full-stack developer collaboration app where you can  
💬 Chat in real-time, 🧑‍💻 share and edit code instantly, and 🤖 get AI-powered suggestions —  
all built on top of **React**, **Node.js**, and **Socket.IO**.

---

## 🌟 Key Features

✨ **Real-Time Communication**  
💬 Instant developer-to-developer chat powered by **Socket.IO**

🧑‍💻 **Live Code Collaboration**  
🪄 Share, edit, and preview code with teammates in real time

🤖 **AI-Powered Assistant**  
🧠 Integrated **Google Generative AI** for smart suggestions & debugging help

🔐 **Secure Authentication**  
🔑 JWT-based login, registration, and token protection system

👥 **Team Management**  
🤝 Invite, collaborate, and manage team members effortlessly

⚡ **WebContainer Integration**  
🌐 Build & deploy your projects instantly — right in the browser

🎨 **Modern UI/UX**  
💫 Built with **React 19**, **TailwindCSS 4**, and **Framer Motion** for beautiful animations

🚀 **Fast & Scalable Architecture**  
⚙️ Optimized full-stack structure using **Node.js**, **Express**, and **MongoDB**



 💡 *SocketVerse isn’t just a chat app — it’s a real-time developer workspace that connects ideas, code, and people.* ⚡

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

Before you begin, ensure your development environment meets the following requirements:

| Requirement | Version | Description |
|--------------|----------|--------------|
| 🟢 **Node.js** | v18 or later | Required for both frontend & backend |
| 📦 **npm** or **pnpm** | Latest | Package manager (comes with Node.js) |
| 🍃 **MongoDB** | v6 or later | Used for storing users, chats, and project data |
| 🔐 **.env file** | — | Required for API keys, DB connection & secrets |
| ⚙️ **Git** | Latest | For cloning and version control |
| 🔄 *(Optional)* **Redis** | — | For caching and socket optimization |

💡 **Tip:** You can verify installations by running:  
 ```bash
 node -v
 npm -v
 git --version
 mongod --version
 ```



---
## 🚀 Usage Guide

1. Register or Login with your credentials  
2. Create or join a project  
3. Start chatting and sharing code in real time  
4. Use the AI assistant for help and suggestions  
5. Deploy your project directly from the browser

---

## ⚙️ Installation & Setup

Follow these steps carefully to set up and run **SocketVerse** locally 👇  

### 🪄 Step 1: Clone the Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/SocketVerse.git

# Navigate into the project
cd SocketVerse
```

### ⚙️ Step 2: Backend Setup
```bash
cd backend
npm install
```

### 📄 Step 3: Configure Environment Variables
```bash

Create a .env file inside backend and add:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_api_key

```

### ▶️ Step 4: Start Backend Server
```
node server.js
```

### 💻 Step 5: Frontend Setup
```
cd frontend
npm install
```

### 🚀 Step 6: Run Frontend
```
npm run dev
```
### 🌐 Step 7: Access the App
```

Frontend → http://localhost:5173

Backend → http://localhost:5000
```
---
## 🪪 License
This project is licensed under the **MIT License** — feel free to use and modify.

---

## 💬 Contact

👨‍💻 **Aditya Raj Singh**  
📧 Email: [9555adityarajsingh@gmail.com](mailto:9555adityarajsingh@gmail.com)  
🐙 GitHub: [@adityarajsingh11](https://github.com/adityarajsingh11)  
💼 LinkedIn: [@adityarajsingh117](https://linkedin.com/in/adityarajsingh117)  
🐦 X (Twitter): [@_op_aditya_11](https://x.com/_op_aditya_11)
