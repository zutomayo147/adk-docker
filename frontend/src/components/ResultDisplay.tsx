import React from "react";
import ThinkingProcess, { type Step } from "../ThinkingProcess";
import { Report } from "../hooks/usePredict";

interface ResultDisplayProps {
  isSearching: boolean;
  steps: Step[];
  prediction: string | null;
  reports: Report[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  isSearching,
  steps,
  prediction,
  reports,
}) => {
  if (!isSearching && !prediction) return null;

  return (
    <div className="w-full max-w-4xl space-y-8 pb-20">
      <div className="flex justify-center">
        <ThinkingProcess steps={steps} isThinking={isSearching} />
      </div>

      {prediction && (
        <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <svg
                className="w-5 h-5 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">最終分析レポート</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {prediction}
            </div>
          </div>

          {reports.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
              {reports.map((report, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-colors"
                >
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                    {report.agent} Report
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-3">
                    {report.report}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
