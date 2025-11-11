import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../config/axios";
import { UserContext } from "../context/user.context";
import { LogIn, Mail, Lock, Code2, Rocket, MessageSquare, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ❗ added state for error message
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setError(""); // clear previous errors
    try {
      const res = await axios.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 overflow-hidden relative px-4">
      
      {/* 🌌 Floating Background Icons */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-24 left-20 text-blue-500/30"
      >
        <Code2 size={60} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-28 right-20 text-cyan-500/30"
      >
        <Rocket size={70} />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-400/10 blur-3xl"
      ></motion.div>

      {/* 🧊 Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* LEFT SIDE — Visual */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-cyan-600 flex flex-col items-center justify-center p-10 text-center text-white relative overflow-hidden">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-extrabold mb-3"
          >
            Welcome to <span className="text-cyan-300">SocketVerse</span>
          </motion.h2>
          <p className="text-blue-100 mb-10 text-sm max-w-sm">
            Reconnect. Rebuild. Collaborate in real-time with your team — the
            future of dev communication starts here ⚡
          </p>

          {/* Floating Lucide icons */}
          <div className="flex gap-8 mt-4">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="bg-white/20 p-4 rounded-full backdrop-blur-lg"
            >
              <LogIn size={32} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.4 }}
              className="bg-white/20 p-4 rounded-full backdrop-blur-lg"
            >
              <MessageSquare size={32} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.8 }}
              className="bg-white/20 p-4 rounded-full backdrop-blur-lg"
            >
              <Rocket size={32} />
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE — Form */}
        <div className="md:w-1/2 p-10 bg-slate-950 flex flex-col justify-center text-slate-200 relative">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
            Login to Your Account
          </h2>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Error Message Section */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm shadow-sm"
                >
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300 flex items-center gap-2">
                <Mail size={16} /> Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300 flex items-center gap-2">
                <Lock size={16} /> Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  required
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-blue-400 text-lg"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 transition"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg"></i> Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Login
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 font-medium hover:underline hover:text-cyan-300"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
