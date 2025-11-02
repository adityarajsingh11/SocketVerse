// import React, { useState, useEffect,useContext, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../config/axios";
// import { initializeSocket , receiveMessage, sendMessage } from "../config/socket";
// import { UserContext } from "../context/user.context";
// import Markdown from 'markdown-to-jsx'
// import hljs from 'highlight.js';


// function SyntaxHighlightedCode(props) {
//     const ref = useRef(null)

//     React.useEffect(() => {
//         if (ref.current && props.className?.includes('lang-') && window.hljs) {
//             window.hljs.highlightElement(ref.current)

//             ref.current.removeAttribute('data-highlighted')
//         }
//     }, [ props.className, props.children ])

//     return <code {...props} ref={ref} />
// }

// function Project() {
//   const location = useLocation();

//   const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUserIds, setSelectedUserIds] = useState(new Set());
//   const [ project, setProject ] = useState(location.state.project);
//   const [message , setMessage] = useState('')
//   const [users, setUsers] = useState([]);
//   const {user}  = useContext(UserContext)
//   const messageBox = React.createRef()
//   const [ messages, setMessages ] = useState([])
//   const [ fileTree, setFileTree ] = useState({})

//   const [ currentFile, setCurrentFile ] = useState(null)
//   const [ openFiles, setOpenFiles ] = useState([])

//   // ✅ Toggle user select
//   const handleUserClick = (id) => {
//     setSelectedUserIds((prevSelectedUserIds) => {
//       const newSet = new Set(prevSelectedUserIds);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       console.log("Currently selected users:", Array.from(newSet)); // 🧠 clear log
//       return newSet;
//     });
//   };

// // ✅ Fetch all users
 

//   // ✅ Add collaborators (your backend route)
//   const addCollaborators = () => {
//     axios
//       .put("/projects/add-user", {
//         projectId: location.state.project._id,
//         users: Array.from(selectedUserIds),
//       })
//       .then((res) => {
//         console.log("✅ Collaborators added:", res.data);
//         setIsModalOpen(false);
//         setSelectedUserIds(new Set()); // reset selection
//       })
//       .catch((err) => {
//         console.error("❌ Error adding collaborators:", err);
//       });
//   };

//   const send =() => {

//     //console.log(user)
//     sendMessage('project-message',{
//         message,
//         sender:user
//     })

//     setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state

//     setMessage("")
      
//   }

//    function WriteAiMessage(message) {

//         const messageObject = JSON.parse(message)

//         return (
//             <div
//                 className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
//             >
//                 <Markdown
//                     children={messageObject.text}
//                     options={{
//                         overrides: {
//                             code: SyntaxHighlightedCode,
//                         },
//                     }}
//                 />
//             </div>)
//     }

//    useEffect(() => {

//     initializeSocket(project._id)

//     receiveMessage('project-message',data => {

//       const message = JSON.parse(data.message)

//       console.log(message);

//       if (message.fileTree) {
//         setFileTree(message.fileTree)
//       }
      
//         setMessages(prevMessages => [ ...prevMessages, data ])
//     })




//     axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {

//             console.log(res.data.project)

//             setProject(res.data.project)
//             //setFileTree(res.data.project.fileTree || {})
//     })


//     axios
//       .get("/users/all")
//       .then((res) => setUsers(res.data.users))
//       .catch((err) => console.error(err));
//   }, []);

//    function scrollToBottom() {
//         messageBox.current.scrollTop = messageBox.current.scrollHeight
//     }



//   return (
//     <main className="h-screen w-screen flex bg-white">
//       {/* Left Chat Section */}
//       <section className="left relative flex flex-col h-screen min-w-72 bg-slate-300">
//         {/* Header */}
//         <header className="flex justify-between p-2 px-4 w-full bg-slate-100  absolute top-0 z-10">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex gap-2 items-center"
//           >
//             <i className="ri-add-line"></i>
//             <p>Add Collaborator</p>
//           </button>
//           <button
//             onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
//             className="p-2 rounded-xl bg-slate-300"
//           >
//             <i className="ri-group-fill"></i>
//           </button>
//         </header>

//         {/* Conversation Area */}
//         <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
//           <div
//            ref={messageBox}
//            className="message-box grow flex flex-col gap-1 p-1 overflow-auto max-h-full scrollbar-hide">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-54'} ${msg.sender._id == user._id.toString() && 'ml-auto'} message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
//                         <small className='opacity-65 text-xs'>{msg.sender.email}</small>
//                         <div className='text-sm'>
//                             {msg.sender._id === 'ai' ?

//                                 WriteAiMessage(msg.message)
//                                 : <p>{msg.message}</p>}
//                         </div>
//                     </div>
//                 ))}
//           </div>

//           {/* Input Field */}
//           <div className="inputField w-full flex absolute bottom-0">
//             <input
//                value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="p-2 px-4 border-none outline-none bg-white flex-grow"
//               type="text"
//               placeholder="Enter Message"
//             />
//             <button 
//                 onClick={send}
//                 className="px-5 bg-slate-900 text-white">
//               <i className="ri-send-plane-fill"></i>
//             </button>
//           </div>
//         </div>

//         {/* Side Panel */}
//         <div
//           className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-400 absolute top-0 left-0 z-20 transition-all duration-300 
//           ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"}`}
//         >
//           <header className="flex justify-between items-center p-2 px-3 bg-slate-300 ">

//             <h1
//             className="font-bold" 
//             >Collaborators</h1>


//             <button
//               onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
//               className="p-2"
//             >
//               <i className="ri-close-line text-xl"></i>
//             </button>
//           </header>

//           <div className="users flex flex-col gap-2 p-2">

//             {project.users && project.users.map(user => {


//                 return (
//                     <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
//                         <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
//                             <i className="ri-user-fill absolute"></i>
//                         </div>
//                         <h1  className='font-semibold text-lg'>{user.email}</h1>
//                     </div>
//                 )

//            })}

//           </div>
//         </div>
//       </section>

//        <section className="right bg-red-50 flex-grow h-full flex">

//                 <div className="explorer h-full max-w-64 min-w-52 bg-slate-200">
//                     <div className="file-tree w-full">
//                         {
//                             Object.keys(fileTree).map((file, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => {
//                                         setCurrentFile(file)
//                                         setOpenFiles([ ...new Set([ ...openFiles, file ]) ])
//                                     }}
//                                     className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full">
//                                     <p
//                                         className='font-semibold text-lg'
//                                     >{file}</p>
//                                 </button>))

//                         }
//                     </div>

//                 </div>

//                 {currentFile && (
//                     <div className="code-editor flex flex-col flex-grow h-full shrink">

//                         <div className="top flex">
//                             {
//                                 openFiles.map((file, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setCurrentFile(file)}
//                                         className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${currentFile === file ? 'bg-slate-400' : ''}`}>
//                                         <p
//                                             className='font-semibold text-lg'
//                                         >{file}</p>
//                                     </button>
//                                 ))
//                             }
//                         </div>
//                         <div className="bottom flex flex-grow  max-w-full shrink overflow-auto">
//                             {
//                                 fileTree[ currentFile ] && (

//                                     // <textarea
//                                     //   value={fileTree[currentFile]?.file?.contents || ""}  
//                                     //   onChange={(e) => {
//                                     //     setFileTree({
//                                     //       ...fileTree,
//                                     //       [currentFile]: {
//                                     //         file: { contents: e.target.value }
//                                     //       }
//                                     //     });
//                                     //   }}
//                                     //   className="w-full h-full p-4 bg-slate-50 outline-none border-none"
//                                     // />

//                                     <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
//   <pre className="hljs h-full m-0">
//     <code
//       className="hljs h-full outline-none text-sm font-mono"
//       contentEditable
//       suppressContentEditableWarning
//       onBlur={(e) => {
//         const updatedContent = e.target.innerText;
//         setFileTree((prevFileTree) => ({
//           ...prevFileTree,
//           [currentFile]: {
//             file: { contents: updatedContent },
//           },
//         }));
//       }}
//       dangerouslySetInnerHTML={{
//         __html: hljs.highlight(
//           "javascript",
//           fileTree[currentFile]?.file?.contents || ""
//         ).value,
//       }}
//       style={{
//         whiteSpace: "pre-wrap",
//         padding: "1rem",
//         minHeight: "100%",
//         outline: "none",
//       }}
//     />
//   </pre>
// </div>


//                                 )
//                             }
//                         </div>

//                     </div>
//                 )}

//             </section>

//       {/* ✅ Collaborator Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
//             <header className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Select User</h2>
//               <button onClick={() => setIsModalOpen(false)} className="p-2">
//                 <i className="ri-close-fill"></i>
//               </button>
//             </header>

//             <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
//               {users.map((user) => (
//                 <div
//                   key={user._id}
//                   onClick={() => handleUserClick(user._id)}
//                   className={`user cursor-pointer p-3 flex gap-2 items-center border rounded-md transition-all duration-200 
//                     ${
//                       selectedUserIds.has(user._id)
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100 hover:bg-blue-100"
//                     }`}
//                 >
//                   <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
//                     <i className="ri-user-fill absolute"></i>
//                   </div>
//                   <h1 className="font-medium text-lg">{user.email}</h1>
//                 </div>
//               ))}
//             </div>

//             {/* Fixed Bottom Button */}
//             <button
//               onClick={addCollaborators}
//               className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
//             >
//               Add Collaborators
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// export default Project;



import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import { initializeSocket, receiveMessage, sendMessage } from "../config/socket";
import { UserContext } from "../context/user.context";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import { getWebContainer } from "../config/webContainer";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}



function Project() {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const messageBox = useRef();
  const [messages, setMessages] = useState([]);
  const [fileTree, setFileTree] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);

  const [webContainer , setWebContainer] = useState(null);

  // ✅ Select collaborator toggle
  const handleUserClick = (id) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      const newSet = new Set(prevSelectedUserIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // ✅ Add collaborators API call
  const addCollaborators = () => {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserIds),
      })
      .then((res) => {
        console.log("✅ Collaborators added:", res.data);
        setIsModalOpen(false);
        setSelectedUserIds(new Set());
      })
      .catch((err) => console.error("❌ Error adding collaborators:", err));
  };

  // ✅ Send chat message
  const send = () => {
    sendMessage("project-message", {
      message,
      sender: user,
    });
    setMessages((prev) => [...prev, { sender: user, message }]);
    setMessage("");
  };

  // ✅ Render AI message with markdown and code highlight
  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message);
    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          children={messageObject.text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }

  // ✅ useEffect: Socket + Data fetching
  useEffect(() => {
    initializeSocket(project._id);

    if(!webContainer){
        getWebContainer().then(container => {
            setWebContainer(container)
            console.log("container started")
        })
    }

    receiveMessage("project-message", (data) => {
      console.log("📩 Received:", data);

      try {
        const message = JSON.parse(data.message);
        console.log(message);

        webContainer?.mount(message.fileTree)

        if (message.fileTree) {
          setFileTree(message.fileTree);
        }
      } catch {
        // plain text
      }

      setMessages((prev) => [...prev, data]);
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        setProject(res.data.project);
        setFileTree(res.data.project.fileTree || {});
      })
      .catch(console.error);

    axios
      .get("/users/all")
      .then((res) => setUsers(res.data.users))
      .catch(console.error);
  }, []);

  // ✅ Auto-scroll (optional)
  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="h-screen w-screen flex bg-white">
      {/* Left Chat Section */}
      <section className="left relative flex flex-col h-screen min-w-72 bg-slate-300">
        {/* Header */}
        <header className="flex justify-between p-2 px-4 w-full bg-slate-100 absolute top-0 z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 items-center"
          >
            <i className="ri-add-line"></i>
            <p>Add Collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 rounded-xl bg-slate-300"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        {/* Conversation Area */}
        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box grow flex flex-col gap-1 p-1 overflow-auto max-h-full scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender._id === "ai" ? "max-w-80" : "max-w-52"
                } ${
                  msg.sender._id == user._id.toString() && "ml-auto"
                } message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">{msg.sender.email}</small>
                <div className="text-sm">
                  {msg.sender._id === "ai" ? (
                    WriteAiMessage(msg.message)
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="inputField w-full flex absolute bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none bg-white flex-grow"
              type="text"
              placeholder="Enter Message"
            />
            <button onClick={send} className="px-5 bg-slate-900 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-400 absolute top-0 left-0 z-20 transition-all duration-300 
          ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <header className="flex justify-between items-center p-2 px-3 bg-slate-300 ">
            <h1 className="font-bold">Collaborators</h1>
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2 p-2">
            {project.users &&
              project.users.map((u) => (
                <div
                  key={u._id}
                  className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center"
                >
                  <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{u.email}</h1>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Right Section (Code Editor) */}
      <section className="right bg-red-50 flex-grow h-full flex">
        <div className="explorer h-full max-w-64 min-w-52 bg-slate-200">
          <div className="file-tree w-full">
            {Object.keys(fileTree).map((file, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles([...new Set([...openFiles, file])]);
                }}
                className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full"
              >
                <p className="font-semibold text-lg">{file}</p>
              </button>
            ))}
          </div>
        </div>

        
          <div className="code-editor flex flex-col flex-grow h-full shrink">
            {/* Open Files Tabs */}
            <div className="top flex justify-between w-full">
              <div>
                {openFiles.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFile(file)}
                    className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${
                      currentFile === file ? "bg-slate-400" : ""
                    }`}
                  >
                    <p className="font-semibold text-lg">{file}</p>
                  </button>
                ))}
              </div>
              <div className="actions flex gap-2">
                  <button
                      onClick={async () => {
                          await webContainer.mount(fileTree)
                          
                          
                          const installProcess = await webContainer.spawn("npm", [ "install" ])

                          
                          
                          installProcess.output.pipeTo(new WritableStream({
                              write(chunk) {
                                  console.log(chunk)
                              }
                          }))

                          const runProcess = await webContainer.spawn("npm", [ "start" ])

                          runProcess.output.pipeTo(new WritableStream({
                              write(chunk) {
                                  console.log(chunk)
                              }
                          }))

                      }}
                      className='p-2 px-4 bg-slate-300 text-white'
                  >
                      run
                  </button>
              </div>
            </div>

            {/* Editable Area */}
            <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
              {fileTree[currentFile] && (
                <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                  <pre className="hljs h-full m-0">
                    <code
                      className="hljs h-full outline-none text-sm font-mono"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const updatedContent = e.target.innerText;
                        setFileTree((prev) => ({
                          ...prev,
                          [currentFile]: {
                            file: { contents: updatedContent },
                          },
                        }));
                      }}
                      dangerouslySetInnerHTML={{
                        __html: hljs.highlight(
                          "javascript",
                          fileTree[currentFile]?.file?.contents || ""
                        ).value,
                      }}
                      style={{
                        whiteSpace: "pre-wrap",
                        padding: "1rem",
                        minHeight: "100%",
                        outline: "none",
                      }}
                    />
                  </pre>
                </div>
              )}
            </div>
          </div>
      
      </section>

      {/* Collaborator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>

            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleUserClick(u._id)}
                  className={`user cursor-pointer p-3 flex gap-2 items-center border rounded-md transition-all duration-200 
                    ${
                      selectedUserIds.has(u._id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-blue-100"
                    }`}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-medium text-lg">{u.email}</h1>
                </div>
              ))}
            </div>

            <button
              onClick={addCollaborators}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Project;
