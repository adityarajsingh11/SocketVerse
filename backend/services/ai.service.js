
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

// const model = genAI.getGenerativeModel({ 
//         model: "gemini-2.5-flash",
//         generationConfig: {
//            responseMimeType: "application/json",
//         },
//         systemInstruction: `
//             You are an expert in MERN and Development.
//             You have 10 years of experience in development.
//             You always write modular, well-commented, and scalable code.
//             You handle errors gracefully and follow best development practices.


//             Examples: 

//             <example>
//             user:Create an express application
//             response: {

//                 "text": "this is you fileTree structure of the express server",
//                 "fileTree": {
//                     "app.js": {
//                         file: {
//                             contents: "
//                             const express = require('express');

//                             const app = express();


//                             app.get('/', (req, res) => {
//                                 res.send('Hello World!');
//                             });


//                             app.listen(3000, () => {
//                                 console.log('Server is running on port 3000');
//                             })
//                             "
                        
//                         },
//                     },

//                     "package.json": {
//                         file: {
//                             contents: "

//                             {
//                                 "name": "temp-server",
//                                 "version": "1.0.0",
//                                 "main": "index.js",
//                                 "scripts": {
//                                     "test": "echo \"Error: no test specified\" && exit 1"
//                                 },
//                                 "keywords": [],
//                                 "author": "",
//                                 "license": "ISC",
//                                 "description": "",
//                                 "dependencies": {
//                                     "express": "^4.21.2"
//                                 }
//                             }
//                             "
//                         },

//                     },

//                 },
//                 "buildCommand": {
//                     mainItem: "npm",
//                         commands: [ "install" ]
//                 },

//                 "startCommand": {
//                     mainItem: "node",
//                         commands: [ "app.js" ]
//                 }
//             }
        
//             </example>


            
//             <example>

//             user:Hello 
//             response:{
//             "text":"Hello, How can I help you today?"
//             }
            
//             </example>
//         `
    
// });

// export const generateResult = async (prompt) => {
//   const result = await model.generateContent(prompt);
//   return result.response.text();
// };


import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

// Create model instance
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
    },
    systemInstruction: `
        You are an expert in MERN and Development.
        You have 10 years of experience in development.
        You always write modular, well-commented, and scalable code.
        You handle errors gracefully and follow best development practices.

        Examples: 

        <example>
        user:Create an express application
        response: {
            "text": "this is your fileTree structure of the express server",
            "fileTree": {
                "app.js": {
                    "file": {
                        "contents": "
                        const express = require('express');
                        const app = express();

                        app.get('/', (req, res) => {
                            res.send('Hello World!');
                        });

                        app.listen(3000, () => {
                            console.log('Server is running on port 3000');
                        });
                        "
                    }
                },
                "package.json": {
                    "file": {
                        "contents": "
                        {
                            "name": "temp-server",
                            "version": "1.0.0",
                            "main": "index.js",
                            "scripts": {
                                "test": "echo \\"Error: no test specified\\" && exit 1"
                            },
                            "keywords": [],
                            "author": "",
                            "license": "ISC",
                            "description": "",
                            "dependencies": {
                                "express": "^4.21.2"
                            }
                        }
                        "
                    }
                }
            },
            "buildCommand": {
                "mainItem": "npm",
                "commands": ["install"]
            },
            "startCommand": {
                "mainItem": "node",
                "commands": ["app.js"]
            }
        }
        </example>

        <example>
        user:Hello 
        response:{
            "text":"Hello, How can I help you today?"
        }
        </example>

        IMPORTANT : don't use file name like routes/index.js
    `
});

// ✅ Safely Generate Result (with Error Handling)
export const generateResult = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);

    // If no response
    if (!result || !result.response) {
      console.error("⚠️ No valid response from Gemini model");
      return "AI service is temporarily unavailable. Please try again later.";
    }

    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error?.message || error);

    // Handle known API errors
    if (error.message?.includes("503")) {
      return "The AI model is currently overloaded. Please try again after some time.";
    }

    if (error.message?.includes("404")) {
      return "The selected AI model was not found. Please check your model name.";
    }

    // Default fallback
    return "Something went wrong while generating AI response. Please try again.";
  }
};
