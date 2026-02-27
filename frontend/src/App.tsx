import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ThinkingProcess from "./ThinkingProcess";
import ProjectContext from "./ProjectContext";

function App() {
  return (
    <div className="flex flex-col h-screen bg-[#0B1120] text-slate-200 overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area (Below Navbar) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Main Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0B1120]">
          <div className="flex-1 overflow-y-auto px-8 pt-8 pb-4">
            <div className="max-w-4xl mx-auto w-full space-y-8">
              {/* Breadcrumb & Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="hover:text-slate-300 cursor-pointer transition-colors">
                    Projects
                  </span>
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
                  <span className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">
                    Autonomous Vehicle Trends
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                      Market Analysis: L5 Autonomy 2025
                    </h1>

                    {/* Agent Active Badge */}
                    <div className="bg-[#112F2A] border border-[#23584A] rounded-full pl-2 pr-3 py-1 flex items-center gap-2">
                      <div className="relative flex items-center justify-center w-3 h-3">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#10B981] rounded-full animate-ping opacity-40"></div>
                      </div>
                      <div className="flex flex-col -gap-1">
                        <span className="text-[9px] leading-tight font-bold text-[#10B981] uppercase tracking-wider">
                          Agent
                        </span>
                        <span className="text-[10px] leading-tight font-bold text-[#10B981] uppercase tracking-wider">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stop Research Button */}
                  <button className="bg-[#1E293B] border border-slate-700 hover:bg-slate-700 text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-colors shadow-sm">
                    <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#0B1120] rounded-sm"></div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest leading-tight text-left">
                      Stop
                      <br />
                      Research
                    </span>
                  </button>
                </div>

                {/* Progress Bar Area */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-300">
                      Synthesizing 124 cross-referenced sources
                    </span>
                    <span className="font-bold text-[#3B82F6]">
                      74% Complete
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B82F6] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                      style={{ width: "74%" }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-4 h-4 rounded-full bg-[#1E3A8A] flex items-center justify-center font-serif italic text-blue-400 text-[10px] border border-blue-500/30">
                      i
                    </div>
                    <p className="text-xs text-slate-400">
                      Currently deep-diving into:{" "}
                      <span className="text-slate-200">
                        Regulatory hurdles for NVIDIA DRIVE Thor in EU markets
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="space-y-8 pt-4">
                {/* User Message */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#1E293B] rounded flex items-center justify-center mt-1">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium leading-relaxed text-slate-200">
                      Analyze the current competitive landscape for Level 5
                      autonomous trucking companies. Focus on sensor fusion
                      technologies and recent regulatory shifts in North America
                      and the EU.
                    </p>
                  </div>
                </div>

                {/* AI Agent Thinking */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#1E3A8A]/40 border border-blue-500/30 rounded flex items-center justify-center mt-1">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm rounded-bl-xl"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm rounded-br-xl"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <ThinkingProcess />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Chat Input */}
          <div className="px-8 pb-6 pt-2 bg-gradient-to-t from-[#0B1120] via-[#0B1120] to-transparent">
            <div className="max-w-4xl mx-auto w-full">
              <div className="bg-[#151D2C] border border-slate-700/50 rounded-xl flex items-center gap-3 px-3 py-2 shadow-lg focus-within:border-slate-600 transition-colors">
                <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded hover:bg-slate-800">
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
                <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded hover:bg-slate-800">
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
                  className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none text-base py-2"
                />

                <button className="bg-[#2563EB] hover:bg-blue-500 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-3 px-1">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-4 h-4 rounded bg-[#2563EB] border-transparent flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
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
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-300">
                      Save to Library
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-4 h-4 rounded bg-[#2563EB] border-transparent flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
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
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-300">
                      Expert Review
                    </span>
                  </label>
                </div>

                <div className="text-[10px] text-slate-500 font-mono tracking-tight">
                  Agent: GPT-4o-Research-V2 • Context: 128k tokens
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <ProjectContext />
      </div>
    </div>
  );
}

export default App;
