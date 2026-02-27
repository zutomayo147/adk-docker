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
              className={`flex gap-4 transition-all duration-500 ${step.status === "pending" ? "opacity-30 grayscale" : "opacity-100"}`}
            >
              <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center relative">
                {step.status === "completed" ? (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-in zoom-in duration-300">
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
                  <div className="w-4 h-4 rounded-full border-2 border-blue-400 bg-[#0B1120] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-700 bg-transparent"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className={`text-[13px] font-bold tracking-tight transition-colors duration-300 ${step.status === "running" ? "text-blue-400" : step.status === "completed" ? "text-slate-200" : "text-slate-500"}`}
                  >
                    {step.name}
                  </h4>
                  {step.status === "running" && (
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">
                      Active
                    </span>
                  )}
                </div>

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
                  <div
                    className={`text-[12px] leading-relaxed transition-all duration-300 ${step.status === "running" ? "text-blue-300/80 italic bg-blue-500/5 p-2 rounded-lg border border-blue-500/10" : "text-slate-500"}`}
                  >
                    {step.message}
                  </div>
                )}

                {step.status === "running" && (
                  <div className="mt-3 overflow-hidden">
                    <div className="flex gap-1 h-[2px] w-full">
                      <div className="h-full bg-blue-500 rounded-full animate-[loading_1.5s_infinite] w-1/3 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `,
        }}
      />

      {isThinking && (
        <div className="relative h-10 bg-gradient-to-t from-[#0B1120] to-transparent border-t border-slate-800/50 flex items-center justify-center pb-2 pt-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1E293B] rounded-full text-[10px] font-bold text-slate-300 border border-slate-700 shadow-xl backdrop-blur-xl">
              <svg
                className="w-3 h-3 text-blue-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              エージェントが集約・思考中
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThinkingProcess;
