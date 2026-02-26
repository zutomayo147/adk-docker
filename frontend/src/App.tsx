import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) =>
        setMessage("Error fetching from backend: " + err.message),
      );
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          ADK Docker Starter
        </h1>
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">
            Backend Response
          </p>
          <p className="text-xl font-mono text-green-400">{message}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Frontend</p>
            <p className="font-semibold">Vite + React</p>
          </div>
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Backend</p>
            <p className="font-semibold">FastAPI</p>
          </div>
        </div>
      </div>
      <p className="mt-8 text-gray-500 text-sm">
        Running on <span className="text-blue-400">localhost:3000</span> (UI)
        and <span className="text-purple-400">localhost:8000</span> (API)
      </p>
    </div>
  );
}

export default App;
