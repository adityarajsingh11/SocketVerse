import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Home() {
  const { user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projects, setProjects] = useState([])

  const navigate = useNavigate()

  // 🧠 Fetch all projects
  useEffect(() => {
    axios
      .get('/projects/all')
      .then(res => {
        setProjects(res.data.projects || [])
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  // ✨ Create project
  const createProject = e => {
    e.preventDefault()
    axios
      .post('/projects/create', { name: projectName })
      .then(res => {
        setIsModalOpen(false)
        setProjectName("")
        // refresh project list
        axios.get('/projects/all').then(res => setProjects(res.data.projects))
      })
      .catch(err => console.error(err))
  }

  return (
    <main className="min-h-screen w-full bg-gray-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm flex items-center gap-2"
        >
          <i className="ri-add-line text-lg"></i>
          New Project
        </button>
      </header>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {projects.map(project => (
            <motion.div
              key={project._id}
              onClick={() =>
                navigate(`/project`, { state: { project } })
              }
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="p-5 cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-semibold truncate">{project.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                <i className="ri-user-line"></i> {project.users.length} Collaborators
              </p>
            </motion.div>
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <img
            src="https://illustrations.popsy.co/violet/project-completed.svg"
            alt="No projects"
            className="w-48 opacity-80"
          />
          <p className="text-slate-600 dark:text-slate-400 mt-4">
            No projects yet. Start by creating one!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
          >
            Create New Project
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-4"
            >
              <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold">Create Project</h2>
              </header>

              <form onSubmit={createProject} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project name
                  </label>
                  <input
                    onChange={e => setProjectName(e.target.value)}
                    value={projectName}
                    name="projectName"
                    type="text"
                    required
                    placeholder="Enter project name"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Home
