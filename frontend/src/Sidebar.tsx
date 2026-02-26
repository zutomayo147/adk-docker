import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#0B0F17] border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-4">
        <button className="w-full bg-[#1E6BFA] hover:bg-[#1C5BD1] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
          <span className="text-xl">+</span>
          New Research
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            Recent Projects
          </h3>
          <div className="space-y-1">
            {[
              "Autonomous Vehicles",
              "SaaS Market 2024",
              "Genomic Data Privacy",
            ].map((project, i) => (
              <button
                key={i}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${i === 0 ? "bg-slate-800 text-blue-400 font-medium" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
              >
                <span className="opacity-70">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    ></path>
                  </svg>
                </span>
                {project}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
            Resources
          </h3>
          <div className="space-y-1">
            {[
              {
                label: "Knowledge Base",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              },
              {
                label: "Research History",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((res, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              >
                <svg
                  className="w-4 h-4 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={res.icon}
                  ></path>
                </svg>
                {res.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 bg-[#0E131C]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            API Usage
          </span>
          <span className="text-[10px] font-bold text-blue-400">82%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
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
