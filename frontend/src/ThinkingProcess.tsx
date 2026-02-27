import React from "react";

export interface Step {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  message?: string;
  tags?: string[];
}

interface ThinkingProcessProps {
  steps: Step[];
  isThinking: boolean;
}

const ThinkingProcess: React.FC<ThinkingProcessProps> = ({
  steps,
  isThinking,
}) => {
  if (steps.length === 0 && !isThinking) return null;

  return (
    <div className="bg-[#0B1120] border border-slate-700/50 rounded-xl overflow-hidden shadow-lg w-full max-w-2xl bg-gradient-to-br from-[#0B1120] to-[#0F172A]/80">
      {/* Header */}
      <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-[#151D2C]/80 backdrop-blur">
        <div className="flex items-center gap-2">
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
      </div>

      <div className="p-6 relative text-sm pb-8">
        {/* Vertical tracking dashed line */}
        <div className="absolute left-[31px] top-8 bottom-12 w-[1px] bg-slate-800 border-l-[1.5px] border-dashed border-slate-700 z-0"></div>

        <div className="space-y-6 relative z-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex gap-4 ${step.status === "pending" ? "opacity-50" : ""}`}
            >
              <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center relative">
                {step.status === "completed" ? (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.6)]">
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
                ) : step.status === "running" ? (
                  <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-[#0B1120] flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-600 bg-transparent"></div>
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`text-[13px] font-bold mb-1 tracking-tight ${step.status === "running" ? "text-blue-500" : "text-white"}`}
                >
                  {step.name}
                </h4>
                {step.tags && step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#1E293B] border border-slate-700/50 rounded-md text-[10px] text-slate-400 font-mono tracking-tight shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {step.message && (
                  <p
                    className={`text-[12px] leading-relaxed font-medium ${step.status === "running" ? "text-slate-400 italic" : "text-slate-500"}`}
                  >
                    {step.message}
                  </p>
                )}
                {step.status === "running" && (
                  <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-3 max-w-[360px] shadow-sm mt-3">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        Working
                      </span>
                      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">
                        In Progress
                      </span>
                    </div>
                    <div className="flex gap-1 h-[3px]">
                      <div className="flex-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                      <div className="flex-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)] animate-pulse"></div>
                      <div className="flex-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)] animate-pulse [animation-delay:200ms]"></div>
                      <div className="flex-1 bg-[#1E293B] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500/50 rounded-full animate-pulse [animation-delay:400ms]"></div>
                      </div>
                      <div className="flex-1 bg-[#1E293B] rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isThinking && (
        <div className="relative h-8 bg-gradient-to-t from-[#0B1120] to-transparent border-t border-slate-800/50 flex items-center justify-center pb-2 pt-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1E293B] rounded-full text-[9px] font-bold text-slate-400 border border-slate-700 shadow-md">
              <svg
                className="w-2.5 h-2.5 text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"></path>
              </svg>
              エージェントが思考中です
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThinkingProcess;
