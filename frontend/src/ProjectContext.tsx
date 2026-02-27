import React from "react";

const ProjectContext: React.FC = () => {
  return (
    <div className="w-[300px] flex-shrink-0 border-l border-[#1E293B] flex flex-col h-full overflow-hidden bg-[#0F172A]/50 backdrop-blur-sm z-10">
      <div className="p-5 border-b border-[#1E293B] bg-[#0F172A]">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Project Context
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Saved Snippets */}
        <div className="bg-[#151D2C] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-[#151D2C] border-b border-slate-800/50 flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
            </svg>
            <h4 className="text-[11px] font-bold text-slate-200">
              Saved Snippets (4)
            </h4>
          </div>
          <div className="p-2.5 space-y-2">
            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-3 text-[11.5px] text-slate-400 italic font-serif leading-relaxed shadow-inner">
              "...L5 autonomy in Class 8 trucks requires a minimum sensor
              redundanc..."
            </div>
            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-3 text-[11.5px] text-slate-400 italic font-serif leading-relaxed shadow-inner">
              "SEC Form 10-K for Aurora Innovation highlights cash runway until
              Q4 2025."
            </div>
          </div>
          <div className="px-4 py-3 text-center border-t border-slate-800/30">
            <button className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest leading-none">
              View All Research Clips
            </button>
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="bg-[#151D2C] border border-[#1E293B] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-3.5 h-3.5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <h4 className="text-[11px] font-bold text-slate-200">
              Market Sentiment
            </h4>
          </div>

          <div className="space-y-2">
            <div className="flex gap-1.5 h-2">
              <div className="flex-[4] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
              <div className="flex-[3] bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.2)]"></div>
              <div className="flex-[1] bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.2)]"></div>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Bullish</span>
              <span>Neutral</span>
              <span>Bearish</span>
            </div>
          </div>
        </div>

        {/* Live Citations */}
        <div className="bg-[#151D2C] border border-[#1E293B] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-3.5 h-3.5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
            <h4 className="text-[11px] font-bold text-slate-200">
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
                <span className="shrink-0 w-5 h-5 bg-[#0B1120] rounded-[4px] flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-700/50 shadow-inner">
                  {cite.id}
                </span>
                <div className="pt-0.5">
                  <h5 className="text-[11.5px] font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer leading-tight mb-0.5 tracking-tight">
                    {cite.title}
                  </h5>
                  <p className="text-[9.5px] text-slate-500 font-medium">
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
