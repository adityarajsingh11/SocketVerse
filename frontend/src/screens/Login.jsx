import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../context/user.context'
import { motion } from 'framer-motion'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/users/login', { email, password })
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      navigate('/')
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/70 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <i className="ri-login-circle-line text-4xl text-blue-500"></i>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Login to continue building</p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-300">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg"></i> Logging in...
              </>
            ) : (
              <>
                <i className="ri-login-box-line text-lg"></i> Login
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 font-medium transition"
          >
            Create one
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
