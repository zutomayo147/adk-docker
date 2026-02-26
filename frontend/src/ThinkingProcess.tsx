import React from "react";

const ThinkingProcess: React.FC = () => {
  return (
    <div className="bg-[#0E131C] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-blue-400"
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
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
            Thinking Process
          </span>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors">
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
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-8 relative">
        <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-slate-800 border-dashed border-l-2"></div>

        <div className="flex gap-4 relative">
          <div className="z-10 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
            <svg
              className="w-3.5 h-3.5 text-white"
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
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Deconstructing Query
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Identified 4 core research vectors: Competitor mapping, Sensor
              Fusion architectures, North American DoT regulations, and EU
              Safety framework v2.1.
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative">
          <div className="z-10 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 text-xs font-bold text-white">
            <svg
              className="w-3.5 h-3.5 text-white"
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
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Source Retrieval
            </h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Arxiv:2401.092", "NHTSA Report 2023", "Waymo Tech Blog"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400 font-mono"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Crawled technical whitepapers from Aurora, Kodiak, and Einride.
              Cross-referenced with SEC filings for funding stability.
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative">
          <div className="z-10 bg-[#0B0F17] border-2 border-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-full">
            <h4 className="text-sm font-bold text-blue-400 mb-1">
              Synthesizing Regulatory Comparative Analysis
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Comparing California's AV policy against German Federal Motor
              Transport Authority (KBA) standards...
            </p>

            <div className="bg-[#0B0F17] border border-slate-800 rounded-lg p-4 max-w-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Knowledge Graph Expansion
                </span>
                <span className="text-[10px] font-bold text-blue-400 animate-pulse uppercase tracking-widest">
                  Working
                </span>
              </div>
              <div className="flex gap-1.5 h-1.5">
                {[45, 60, 30, 15, 5].map((w, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-slate-800 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full bg-blue-500 rounded-full ${i === 4 ? "animate-loading" : ""}`}
                      style={{ width: i < 4 ? "100%" : "30%" }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 relative opacity-40">
          <div className="z-10 bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center"></div>
          <div>
            <h4 className="text-sm font-bold text-slate-500">
              Generating Final SWOT Analysis
            </h4>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-900/30 border-t border-slate-800/50 flex items-center justify-center">
        <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-[10px] font-bold text-slate-400 transition-all border border-slate-700">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1014 0c0-1.187-.296-2.304-.816-3.282a1 1 0 00-1.738 1.05c.348.574.554 1.246.554 1.962a3 3 0 11-4-2.843V5.5c0-1.105-.243-2.122-.605-2.947z"
              clipRule="evenodd"
            ></path>
          </svg>
          DEEP THINKING MODE ACTIVE
        </button>
      </div>
    </div>
  );
};

export default ThinkingProcess;
