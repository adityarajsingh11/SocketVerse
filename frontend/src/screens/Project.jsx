import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js'
import { getWebContainer } from '../config/webcontainer'

function SyntaxHighlightedCode(props) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && props.className?.includes('lang-') && window.hljs) {
      window.hljs.highlightElement(ref.current)
      ref.current.removeAttribute('data-highlighted')
    }
  }, [props.className, props.children])

  return <code {...props} ref={ref} />
}

const Project = () => {
  const location = useLocation()
  const [isDark, setIsDark] = useState(true)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(new Set())
  const [project, setProject] = useState(location.state.project)
  const [message, setMessage] = useState('')
  const { user } = useContext(UserContext)
  const messageBox = useRef(null)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [fileTree, setFileTree] = useState({})
  const [currentFile, setCurrentFile] = useState(null)
  const [openFiles, setOpenFiles] = useState([])
  const [webContainer, setWebContainer] = useState(null)
  const [iframeUrl, setIframeUrl] = useState(null)
  const [runProcess, setRunProcess] = useState(null)

  const handleUserClick = (id) => {
    setSelectedUserId(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }

  const addCollaborators = () => {
    axios
      .put('/projects/add-user', {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId)
      })
      .then(() => setIsModalOpen(false))
      .catch(console.log)
  }

  const send = () => {
    if (!message.trim()) return
    sendMessage('project-message', { message, sender: user })
    setMessages(prev => [...prev, { sender: user, message }])
    setMessage('')
  }

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message)
    return (
      <div className='overflow-auto bg-slate-900 text-white rounded-md p-3'>
        <Markdown
          children={messageObject.text}
          options={{
            overrides: { code: SyntaxHighlightedCode }
          }}
        />
      </div>
    )
  }

  // Setup WebContainer, Socket, and Load project data
  useEffect(() => {
    initializeSocket(project._id)
    if (!webContainer) {
      getWebContainer().then(container => setWebContainer(container))
    }

    receiveMessage('project-message', data => {
      if (data.sender._id === 'ai') {
        const message = JSON.parse(data.message)
        webContainer?.mount(message.fileTree)
        if (message.fileTree) setFileTree(message.fileTree || {})
      }
      setMessages(prev => [...prev, data])
    })

    axios.get(`/projects/get-project/${project._id}`).then(res => {
      setProject(res.data.project)
      setFileTree(res.data.project.fileTree || {})
    })

    axios.get('/users/all').then(res => setUsers(res.data.users)).catch(console.log)
  }, [])

  // Save file tree
  function saveFileTree(ft) {
    axios
      .put('/projects/update-file-tree', { projectId: project._id, fileTree: ft })
      .catch(console.log)
  }

  // Auto scroll to bottom when new messages come
  useEffect(() => {
    if (messageBox.current)
      messageBox.current.scrollTop = messageBox.current.scrollHeight
  }, [messages])

  // Sync dark mode with <html> element for Tailwind dark: styles
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const themeClass = isDark ? 'dark' : ''

  return (
    <main className={`${themeClass} h-screen w-screen flex bg-gray-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      {/* LEFT PANEL - Chat */}
      <section className='relative flex flex-col h-screen min-w-96 border-r border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'>
        <header className='flex justify-between items-center p-3 px-5 bg-slate-200 dark:bg-slate-800 shadow-md'>
          <button onClick={() => setIsModalOpen(true)} className='flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition'>
            <i className='ri-add-fill'></i> Add Collaborator
          </button>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setIsDark(!isDark)}
              className='p-2 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition'
              title='Toggle theme'
            >
              {isDark ? <i className='ri-sun-fill text-yellow-400'></i> : <i className='ri-moon-fill text-slate-900'></i>}
            </button>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full transition'>
              <i className='ri-group-fill'></i>
            </button>
          </div>
        </header>

        <div className='flex flex-col flex-grow overflow-hidden'>
          <div
            ref={messageBox}
            className='flex-grow p-3 space-y-3 overflow-y-auto scrollbar-hide bg-slate-50 dark:bg-slate-950'
          >
            {messages.map((msg, i) => {
              const isSelf = msg.sender._id === user._id.toString()
              const isAI = msg.sender._id === 'ai'

              // Choose alignment and styles
              const alignment = isAI ? 'items-center' : isSelf ? 'items-end' : 'items-start'
              const bubbleClass = isAI
                ? 'bg-slate-900 text-white max-w-[80%]'
                : isSelf
                ? 'bg-blue-600 text-white rounded-tr-none ml-auto'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'

              return (
                <div key={i} className={`flex flex-col ${alignment}`}>
                  {/* Sender (email small label) */}
                  <small
                    className={`text-xs mb-1 ${
                      isAI
                        ? 'text-center text-green-400'
                        : isSelf
                        ? 'text-right text-blue-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {isAI ? '🤖 AI Assistant' : msg.sender.email}
                  </small>

                  {/* Message bubble */}
                  <div
                    className={`relative px-4 py-2 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap max-w-[75%] transition-all ${bubbleClass}`}
                  >
                    {isAI ? (
                      WriteAiMessage(msg.message)
                    ) : (
                      <p className='break-words'>{msg.message}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className='flex items-center border-t border-slate-300 dark:border-slate-700 p-2'>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='flex-grow bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400'
              placeholder='Type a message...'
            />
            <button onClick={send} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition'>
              <i className='ri-send-plane-fill'></i>
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-full bg-slate-100 dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700 transform transition-transform duration-300 ${
            isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <header className='flex justify-between items-center px-5 py-3 border-b border-slate-300 dark:border-slate-700'>
            <h1 className='font-semibold text-lg'>Collaborators</h1>
            <button onClick={() => setIsSidePanelOpen(false)} className='hover:text-red-500 transition'>
              <i className='ri-close-fill'></i>
            </button>
          </header>
          <div className='p-3 space-y-2 overflow-y-auto scrollbar-hide'>
            {project.users &&
              project.users.map(user => (
                <div
                  key={user._id}
                  className='flex items-center gap-3 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer'
                >
                  <div className='w-8 h-8 flex items-center justify-center rounded-full bg-slate-600 text-white'>
                    <i className='ri-user-fill text-lg'></i>
                  </div>
                  <span className='text-sm font-medium'>{user.email}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL - Editor + Preview */}
      <section className='flex flex-grow h-full'>
        {/* FILE EXPLORER */}
        <div className='hidden md:block h-full max-w-64 min-w-52 bg-slate-100 dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700'>
          <div className='p-3 space-y-1'>
            {Object.keys(fileTree).map((file, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentFile(file)
                  setOpenFiles([...new Set([...openFiles, file])])
                }}
                className={`w-full text-left p-2 rounded-md transition ${
                  currentFile === file
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {file}
              </button>
            ))}
          </div>
        </div>

        {/* CODE EDITOR */}
        <div className='flex flex-col flex-grow h-full'>
          <div className='flex justify-between items-center px-3 py-2 border-b border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'>
            <div className='flex gap-2 flex-wrap'>
              {openFiles.map((file, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentFile(file)}
                  className={`px-3 py-1 rounded-md transition ${
                    currentFile === file
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {file}
                </button>
              ))}
            </div>
            <button
              onClick={async () => {
                await webContainer.mount(fileTree)
                const installProcess = await webContainer.spawn('npm', ['install'])
                installProcess.output.pipeTo(new WritableStream({ write(chunk) { console.log(chunk) } }))
                if (runProcess) runProcess.kill()
                const tempRun = await webContainer.spawn('npm', ['start'])
                tempRun.output.pipeTo(new WritableStream({ write(chunk) { console.log(chunk) } }))
                setRunProcess(tempRun)
                webContainer.on('server-ready', (port, url) => setIframeUrl(url))
              }}
              className='px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition'
            >
              Run
            </button>
          </div>

          <div className='flex flex-grow overflow-auto'>
            {fileTree[currentFile] && (
              <div className='flex-grow bg-slate-50 dark:bg-slate-950 overflow-auto'>
                <pre className='p-4'>
                  <code
                    className='outline-none'
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                      const updated = e.target.innerText
                      const ft = {
                        ...fileTree,
                        [currentFile]: { file: { contents: updated } }
                      }
                      setFileTree(ft)
                      saveFileTree(ft)
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight('javascript', fileTree[currentFile].file.contents).value
                    }}
                    style={{ whiteSpace: 'pre-wrap' }}
                  />
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* LIVE PREVIEW */}
        {iframeUrl && (
          <div className='hidden lg:flex flex-col min-w-96 border-l border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-inner'>
            <div className='p-2 flex items-center justify-between bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700'>
              <input
                type='text'
                value={iframeUrl}
                readOnly
                className='w-full bg-transparent outline-none text-sm px-2 py-1 rounded-md'
              />
              <button
                onClick={() => window.open(iframeUrl, '_blank')}
                className='ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs'
              >
                Open
              </button>
            </div>
            <iframe
              src={iframeUrl}
              className='flex-grow w-full rounded-b-lg bg-white dark:bg-slate-950 border-0 shadow-inner'
            ></iframe>
          </div>
        )}
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white dark:bg-slate-900 rounded-xl shadow-lg w-96 p-4 relative transition-all'>
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>Select Users</h2>
              <button onClick={() => setIsModalOpen(false)} className='hover:text-red-500 transition'>
                <i className='ri-close-fill'></i>
              </button>
            </header>

            <div className='space-y-2 overflow-y-auto max-h-80 scrollbar-hide'>
              {users.map(u => (
                <div
                  key={u._id}
                  onClick={() => handleUserClick(u._id)}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition ${
                    Array.from(selectedUserId).includes(u._id)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className='w-8 h-8 flex items-center justify-center rounded-full bg-slate-600 text-white'>
                    <i className='ri-user-fill text-lg'></i>
                  </div>
                  <span className='text-sm font-medium'>{u.email}</span>
                </div>
              ))}
            </div>

            <button
              onClick={addCollaborators}
              className='w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition'
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Project
