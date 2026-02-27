import { useState, useEffect, useRef } from "react";
import ThinkingProcess, { type Step } from "./ThinkingProcess";

function App() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [reports, setReports] = useState<{ agent: string; report: string }[]>(
    [],
  );
  const ws = useRef<WebSocket | null>(null);

  const handleSearch = () => {
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    setPrediction(null);
    setReports([]);
    setSteps([
      { id: "MarketData", name: "Market Data Analysis", status: "pending" },
      {
        id: "NewsAnalysis",
        name: "News Sentiment Analysis",
        status: "pending",
      },
      {
        id: "TechnicalAnalysis",
        name: "Technical Indicators",
        status: "pending",
      },
      {
        id: "EconomicSentiment",
        name: "Global Economic Sentiment",
        status: "pending",
      },
      {
        id: "ChiefPredictor",
        name: "Final Prediction Synthesis",
        status: "pending",
      },
    ]);

    ws.current = new WebSocket("ws://localhost:8000/ws/predict");

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ query }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "status") {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === data.agent
              ? { ...step, status: data.status, message: data.message }
              : step,
          ),
        );
      } else if (data.type === "result") {
        setPrediction(data.prediction);
        setReports(data.agent_reports);
        setSteps((prev) =>
          prev.map((step) => ({ ...step, status: "completed" })),
        );
        setIsSearching(false);
      } else if (data.type === "error") {
        console.error("Agent error:", data.message);
        setIsSearching(false);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsSearching(false);
    };

    ws.current.onclose = () => {
      setIsSearching(false);
    };
  };

  useEffect(() => {
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background visual element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-3xl space-y-12 text-center mb-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Next-Gen Research
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Deep Research AI
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              複雑なトピックを数秒で深掘りし、構造化されたインサイトを提供します。
              あなたの次のブレイクスルーをここから。
            </p>
          </div>

          {/* Search Box */}
          <div className="relative group max-w-2xl mx-auto w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#0F172A]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl flex items-center gap-3">
              <div className="pl-3 text-slate-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="何をリサーチしますか？"
                className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-lg py-3"
                disabled={isSearching}
              />
              <button
                onClick={handleSearch}
                className={`bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-600/20 ${isSearching ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSearching}
              >
                {isSearching ? "検索中..." : "開始"}
              </button>
            </div>
          </div>

          {!isSearching && !prediction && (
            /* Quick Suggestions */
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {[
                "明日の日経平均の動向を、特に半導体株に注目して分析してください。",
                "自動運転の未来",
                "2025年のSaaSトレンド",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 text-sm hover:bg-slate-700/50 hover:text-slate-200 transition-all"
                >
                  {tag.length > 20 ? tag.slice(0, 20) + "..." : tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Area */}
        {(isSearching || prediction) && (
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
                  <h2 className="text-xl font-bold text-white">
                    最終分析レポート
                  </h2>
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
        )}

        {/* Footer */}
        <footer className="fixed bottom-8 left-0 right-0 flex justify-center text-slate-600 text-[11px] font-medium tracking-widest uppercase pointer-events-none">
          Powered by Google ADK & GPT-4o
        </footer>
      </main>
    </div>
  );
}

export default App;
