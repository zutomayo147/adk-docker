import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-[280px] flex-shrink-0 bg-[#0B1120] border-r border-[#1E293B] flex flex-col h-full overflow-hidden text-slate-300">
      {/* New Research Button */}
      <div className="p-4 pt-6">
        <button className="w-full bg-[#2563EB] hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors text-[13px]">
          <span className="text-xl leading-none -mt-0.5">+</span>
          New Research
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {/* RECENT PROJECTS */}
        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-6">
            Recent Projects
          </h3>
          <div className="space-y-0.5 px-3">
            {[
              { name: "Autonomous Vehicles", icon: "folder", active: true },
              { name: "SaaS Market 2024", icon: "chart", active: false },
              { name: "Genomic Data Privacy", icon: "dna", active: false },
            ].map((project, i) => (
              <button
                key={i}
                className={`w-full text-left px-3 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center gap-3 ${
                  project.active
                    ? "bg-[#1E3A8A]/40 text-blue-400"
                    : "text-slate-400 hover:bg-[#1E293B]/50 hover:text-slate-300"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center opacity-80 shrink-0">
                  {project.icon === "folder" && (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                  )}
                  {project.icon === "chart" && (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                    </svg>
                  )}
                  {project.icon === "dna" && (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-.504-.868l-7-4zM7 11V6.26l3-1.714 3 1.714V11H7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-6">
            Resources
          </h3>
          <div className="space-y-0.5 px-3">
            {[
              { label: "Knowledge Base", icon: "db" },
              { label: "Research History", icon: "history" },
            ].map((res, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center gap-3 text-slate-400 hover:bg-[#1E293B]/50 hover:text-slate-300"
              >
                <div className="w-4 h-4 flex items-center justify-center opacity-80 shrink-0">
                  {res.icon === "db" && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4z"
                      ></path>
                    </svg>
                  )}
                  {res.icon === "history" && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                <span className="truncate">{res.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* API Usage Footer */}
      <div className="p-4 border-t border-[#1E293B] bg-[#0B1120] mt-auto shrink-0 mb-4 px-6 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            API Usage
          </span>
          <span className="text-[10px] font-bold text-slate-400">82%</span>
        </div>
        <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: "82%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
