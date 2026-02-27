import React from "react";

const ThinkingProcess: React.FC = () => {
  return (
    <div className="bg-[#0B1120] border border-slate-700/50 rounded-xl overflow-hidden shadow-lg w-full max-w-2xl bg-gradient-to-br from-[#0B1120] to-[#0F172A]/80">
      {/* Header */}
      <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-[#151D2C]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          {/* Blue icon with circle and line/dot */}
          <svg
            className="w-3.5 h-3.5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Thinking Process
          </span>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors p-1">
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
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="p-6 relative text-sm pb-8">
        {/* Vertical tracking dashed line */}
        <div className="absolute left-[31px] top-8 bottom-12 w-[1px] bg-slate-800 border-l-[1.5px] border-dashed border-slate-700 z-0"></div>

        <div className="space-y-6 relative z-10">
          {/* Step 1: Deconstructing Query */}
          <div className="flex gap-4">
            <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.6)]">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-white mb-1 tracking-tight">
                Deconstructing Query
              </h4>
              <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                Identified 4 core research vectors: Competitor mapping, Sensor
                Fusion architectures, North American DoT regulations, and EU
                Safety framework v2.1.
              </p>
            </div>
          </div>

          {/* Step 2: Source Retrieval */}
          <div className="flex gap-4">
            <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.6)]">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-white mb-1.5 tracking-tight">
                Source Retrieval
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {["Arxiv:2401.092", "NHTSA Report 2023", "Waymo Tech Blog"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#1E293B] border border-slate-700/50 rounded-md text-[10px] text-slate-400 font-mono tracking-tight shadow-sm"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
              <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                Crawled technical whitepapers from Aurora, Kodiak, and Einride.
                Cross-referenced with SEC filings for funding stability.
              </p>
            </div>
          </div>

          {/* Step 3: Synthesizing (Active) */}
          <div className="flex gap-4">
            <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 border-blue-500 bg-[#0B1120] flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.3)]">
              {/* empty inner circle */}
            </div>
            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-blue-500 mb-1 tracking-tight">
                Synthesizing Regulatory Comparative Analysis
              </h4>
              <p className="text-[12px] text-slate-400 leading-relaxed italic mb-4 font-medium">
                Comparing California's AV policy against German Federal Motor
                Transport Authority (KBA) standards...
              </p>

              {/* Working Progress indicator */}
              <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-3 max-w-[360px] shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Knowledge Graph Expansion
                  </span>
                  <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">
                    Working
                  </span>
                </div>
                <div className="flex gap-1 h-[3px]">
                  <div className="flex-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                  <div className="flex-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                  <div className="flex-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                  <div className="flex-1 bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500/50 rounded-full animate-loading"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-[#1E293B] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Generating (Pending) */}
          <div className="flex gap-4 opacity-50">
            <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 border-slate-600 bg-transparent flex items-center justify-center"></div>
            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-slate-400 tracking-tight pt-[1px]">
                Generating Final SWOT Analysis
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="relative h-8 bg-gradient-to-t from-[#0B1120] to-transparent border-t border-slate-800/50 flex items-center justify-center pb-2 pt-2">
        {/* Overlap button over bottom edge slightly */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1E293B] rounded-full text-[9px] font-bold text-slate-400 border border-slate-700 shadow-md">
            <svg
              className="w-2.5 h-2.5 text-slate-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"></path>
            </svg>
            DEEP THINKING MODE ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingProcess;
