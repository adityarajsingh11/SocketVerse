import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { UserContext } from '../context/user.context'
import {
  Twitter, Code2, Rocket, Sparkles, TerminalSquare,
  Users2, MessageSquare, Shield, Cpu, Bot, Code
} from 'lucide-react'

const Overview = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [wordIndex, setWordIndex] = useState(0)
  const rotatingWords = ['Collaborate 💬', 'Code 💻', 'Deploy ⚙️', 'Innovate 🚀']

  // Word change animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % rotatingWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Redirect logged-in users
  useEffect(() => {
    if (user) navigate('/home')
    document.title = '⚡ SocketVerse | Talk. Build. Sync.'
  }, [user, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 overflow-x-hidden relative">

      {/* 🌌 Background Effects */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
      />

      {/* 🌐 NAVBAR */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800 shadow-xl"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-10 py-3">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30"
            >
              <Code2 className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-2xl font-extrabold tracking-tight">
                <span className="text-blue-400">⚡ Socket</span>
                <span className="text-cyan-400">Verse</span>
              </h1>
              <span className="text-xs text-slate-400">Real-Time Dev Hub 🚀</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition-all font-semibold"
            >
              Login
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold shadow-lg flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Get Started
            </motion.button>

            <a
              href="https://x.com/_op_aditya_11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition"
              title="Follow on X"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </motion.header>

      {/* 🚀 HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-32 relative"
      >
        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 leading-tight"
        >
          Collaborate. Code. Create.
        </motion.h1>

        {/* Rotating tagline */}
        <div className="h-8 mb-8 text-lg font-semibold text-cyan-400">
          <AnimatePresence mode="wait">
            <motion.span
              key={rotatingWords[wordIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {rotatingWords[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 max-w-2xl mb-10 text-lg"
        >
          <Sparkles className="inline w-5 h-5 text-blue-400 mb-1" />  
          &nbsp; Empowering developers to chat, build, and deploy 
          <span className="text-blue-400 font-semibold"> in real-time </span> — 
          powered by <span className="text-cyan-400 font-semibold">Socket.IO</span> and AI.
        </motion.p>

        {/* ✨ Interactive Laptop Preview Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 w-full max-w-xl text-left shadow-xl backdrop-blur-md mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-xs text-slate-500">socketverse/chatroom.js</span>
          </div>
          <pre className="text-sm text-slate-300 font-mono">
            <Code className="inline w-4 h-4 text-blue-400" /> <span className="text-cyan-400">User1:</span> Hey, let's push code to GitHub.<br />
            <Code className="inline w-4 h-4 text-blue-400" /> <span className="text-pink-400">User2:</span> Done ✅ — deploying on WebContainer now.<br />
            <Code className="inline w-4 h-4 text-blue-400" /> <span className="text-green-400">AI:</span> Build successful ⚡ Server live!
          </pre>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/register')}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-lg font-semibold shadow-md flex items-center gap-3"
        >
          <Rocket className="w-5 h-5" /> Join Now
        </motion.button>
      </motion.section>

      {/* 💡 HOW TO USE */}
      <section className="bg-slate-950 py-20 px-8">
        <h2 className="text-center text-4xl font-bold mb-12">
          How to Use <span className="text-blue-500">SocketVerse</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[ 
            { icon: <Users2 />, title: 'Register or Login', desc: 'Start by creating your account or logging in securely.' },
            { icon: <TerminalSquare />, title: 'Create a Project', desc: 'Add a new project and invite collaborators easily.' },
            { icon: <MessageSquare />, title: 'Start Chatting', desc: 'Discuss ideas, share code snippets, and brainstorm live.' },
            { icon: <Rocket />, title: 'Deploy Instantly', desc: 'Run your container instantly with one click.' },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-900/50 border border-slate-800 hover:border-blue-600 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600/20 text-blue-400 rounded-full mb-4">
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💻 FEATURES SECTION */}
            <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
              <h2 className="text-3xl font-bold text-center mb-10">
                Why Developers ❤ <span className="text-blue-400">SocketVerse</span>
              </h2>
      
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  { icon: <MessageSquare />, title: 'Real-time Chat', desc: 'Instant messaging and discussion rooms for your team.' },
                  { icon: <TerminalSquare />, title: 'Code Collaboration', desc: 'Share, edit, and preview code together seamlessly.' },
                  { icon: <Cpu />, title: 'Web Container', desc: 'Run and deploy instantly using WebContainers.' },
                  { icon: <Users2 />, title: 'Team Management', desc: 'Add, remove, and assign roles effortlessly.' },
                  { icon: <Bot />, title: 'AI Assistance', desc: 'Smart suggestions, debugging, and code help.' },
                  { icon: <Shield />, title: 'Secure Environment', desc: 'Your data and code are encrypted and protected.' },
                ].map(({ icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-800/50 border border-slate-700 hover:border-blue-500 rounded-xl p-6 text-center transition-all shadow-lg"
                  >
                    <div className="flex justify-center mb-4 text-blue-400">{icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

      {/* 🧾 FOOTER */}
      <footer className="text-center py-6 border-t border-slate-800 bg-slate-950 text-slate-500 text-sm">
        <p>
          © {new Date().getFullYear()} Built by{' '}
          <a
            href="mailto:9555adityarajsingh@gmail.com"
            className="text-blue-400 font-semibold hover:underline hover:text-blue-300 transition"
          >
            Aditya Raj Singh
          </a>{' '}
          — Powered by{' '}
          <span className="text-blue-400 font-semibold">SocketVerse ⚡</span>.
        </p>

        <div className="flex justify-center gap-6 mt-3">
          <a href="https://github.com/adityarajsingh11/" className="text-slate-400 hover:text-blue-400 transition"><i className="ri-github-fill text-xl"></i></a>
          <a href="https://www.linkedin.com/in/adityarajsingh117/" className="text-slate-400 hover:text-blue-400 transition"><i className="ri-linkedin-box-fill text-xl"></i></a>
          <a href="https://x.com/_op_aditya_11" className="text-slate-400 hover:text-blue-400 transition"><Twitter className="w-5 h-5 inline-block" /></a>
        </div>
      </footer>
    </div>
  )
}

export default Overview
