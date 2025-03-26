import React, { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
  try {
    const response = await axios.post("http://localhost:3000/ai/get-review", { code });

    // Ensure review is a string
    const reviewText = typeof response.data === "string" ? response.data : JSON.stringify(response.data, null, 2);
    
    setReview(reviewText);
  } catch (error) {
    console.error("Error fetching review:", error);
    setReview("⚠️ Error fetching review. Please try again.");
  }
}


  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <header className="w-full text-center py-5 text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg rounded-lg">
        AI Code Reviewer 🤖
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mt-8">
        {/* Code Editor Section */}
        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-lg bg-opacity-80">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Code Editor</h2>

          {/* File Upload */}
          <label className="block mb-4">
            <span className="text-gray-400 text-sm">Upload Code File:</span>
            <input
              type="file"
              accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
              onChange={handleFileUpload}
              className="block w-full mt-2 text-sm text-gray-400 bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition"
            />
          </label>

          {/* Code Editor */}
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900 shadow-md">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className="text-gray-100 text-sm font-mono bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Review Code Button */}
          <button
            onClick={reviewCode}
            className="w-full mt-5 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Review Code 🤖
          </button>
        </div>

        {/* Review Section */}
        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-lg bg-opacity-80">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">AI Review</h2>
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900 shadow-md text-gray-300 overflow-auto max-h-[400px]">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
