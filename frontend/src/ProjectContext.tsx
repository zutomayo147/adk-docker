import React from "react";

const ProjectContext: React.FC = () => {
  return (
    <div className="w-72 border-l border-slate-800 flex flex-col h-screen sticky top-0 bg-[#0B0F17]">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Project Context
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="bg-[#1E293B]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
            <h4 className="text-xs font-bold text-white uppercase tracking-tight">
              Saved Snippets (4)
            </h4>
          </div>
          <div className="space-y-3">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-lg p-3 text-[11px] text-slate-400 italic leading-relaxed">
              "...L5 autonomy in Class 8 trucks requires a minimum sensor
              redundanc..."
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-lg p-3 text-[11px] text-slate-400 italic leading-relaxed">
              "SEC Form 10-K for Aurora Innovation highlights cash runway until
              Q4 2025."
            </div>
          </div>
          <button className="w-full mt-4 text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest text-center">
            View All Research Clips
          </button>
        </div>

        <div className="bg-[#1E293B]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
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
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              ></path>
            </svg>
            <h4 className="text-xs font-bold text-white uppercase tracking-tight">
              Market Sentiment
            </h4>
          </div>
          <div className="space-y-4">
            <div className="flex gap-1 h-2">
              <div className="flex-[4] bg-green-500 rounded-full shadow-lg shadow-green-500/20"></div>
              <div className="flex-[3] bg-orange-400 rounded-full shadow-lg shadow-orange-500/10"></div>
              <div className="flex-[1] bg-red-500 rounded-full shadow-lg shadow-red-500/10"></div>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Bullish</span>
              <span>Neutral</span>
              <span>Bearish</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B]/40 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
            <h4 className="text-xs font-bold text-white uppercase tracking-tight">
              Live Citations
            </h4>
          </div>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "UNECE Regulation No. 157",
                desc: "Updated: Dec 2023",
              },
              {
                id: 2,
                title: "Tesla Autopilot Safety Report",
                desc: "Q3 2024",
              },
            ].map((cite) => (
              <div key={cite.id} className="flex gap-3">
                <span className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-700">
                  {cite.id}
                </span>
                <div>
                  <h5 className="text-[11px] font-bold text-blue-400 hover:underline cursor-pointer">
                    {cite.title}
                  </h5>
                  <p className="text-[9px] text-slate-500 font-medium">
                    {cite.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContext;
