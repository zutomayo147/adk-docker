import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ThinkingProcess from "./ThinkingProcess";
import ProjectContext from "./ProjectContext";

function App() {
  return (
    <div className="flex h-screen bg-[#0B0F17] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto w-full px-8 py-8 space-y-8">
              {/* Breadcrumb & Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Projects</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="text-blue-500">
                    Autonomous Vehicle Trends
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                      Market Analysis: L5 Autonomy 2025
                    </h1>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#121A28] border border-green-500/30 rounded-lg px-4 py-2 flex items-center gap-3">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-green-500 uppercase tracking-tight">
                          Agent
                        </div>
                        <div className="text-[10px] font-bold text-white uppercase tracking-tight">
                          Active
                        </div>
                      </div>
                    </div>

                    <button className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-all">
                      <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-sm"></div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-center">
                        Stop
                        <br />
                        Research
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">
                      Synthesizing 124 cross-referenced sources
                    </span>
                    <span className="font-bold text-blue-500 tracking-tight">
                      74% Complete
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      style={{ width: "74%" }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <svg
                      className="w-3.5 h-3.5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="text-[11px] text-slate-400">
                      Currently deep-diving into:{" "}
                      <span className="text-slate-200">
                        Regulatory hurdles for NVIDIA DRIVE Thor in EU markets
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-1 bg-transparent py-2">
                    <p className="text-lg font-medium leading-relaxed text-slate-200">
                      Analyze the current competitive landscape for Level 5
                      autonomous trucking companies. Focus on sensor fusion
                      technologies and recent regulatory shifts in North America
                      and the EU.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600/20 rounded-lg border border-blue-500/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <ThinkingProcess />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="mt-auto px-8 pb-8 pt-4">
              <div className="max-w-5xl mx-auto w-full relative">
                <div className="bg-[#121A28] border border-slate-800 rounded-2xl shadow-2xl focus-within:border-blue-500/50 transition-all p-1">
                  <div className="flex items-center px-4 py-3 gap-3">
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        ></path>
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Ask a follow-up or guide the research..."
                      className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none text-sm"
                    />
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 px-2">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-all">
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Save to Library
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-all text-blue-500">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Expert Review
                      </span>
                    </label>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    Agent: GPT-4o-Research-V2 • Context: 128k tokens
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProjectContext />
        </main>
      </div>
    </div>
  );
}

export default App;
