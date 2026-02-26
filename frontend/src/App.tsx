import { useState, useEffect, useRef } from "react";

interface AgentReport {
  agent: string;
  report: string;
}

interface PredictionResponse {
  prediction: string;
  agent_reports: AgentReport[];
}

interface WSStatus {
  type: "status";
  agent: string;
  status: "starting" | "running" | "completed" | "error";
  message: string;
}

interface WSResult extends PredictionResponse {
  type: "result";
}

type WSMessage = WSStatus | WSResult | { type: "error"; message: string };

const AGENTS = [
  {
    id: "MarketData",
    name: "Market Data Agent",
    description: "市場データ収集",
  },
  {
    id: "NewsAnalysis",
    name: "News Analysis Agent",
    description: "ニュースセンチメント分析",
  },
  {
    id: "TechnicalAnalysis",
    name: "Technical Analysis Agent",
    description: "チャート・指標分析",
  },
  {
    id: "EconomicSentiment",
    name: "Economic Sentiment Agent",
    description: "マクロ経済分析",
  },
  {
    id: "ChiefPredictor",
    name: "Chief Predictor",
    description: "最終予測の統合",
  },
];

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const wsRef = useRef<WebSocket | null>(null);

  const startPrediction = () => {
    setLoading(true);
    setError(null);
    setData(null);
    setCompletedAgents([]);
    setCurrentAgent(null);
    setStatusMessage("接続中...");

    const socket = new WebSocket("ws://localhost:8000/ws/predict");
    wsRef.current = socket;

    socket.onopen = () => {
      setStatusMessage("分析を開始します...");
      socket.send(
        JSON.stringify({ query: "明日の日経平均株価の予測をお願いします。" }),
      );
    };

    socket.onmessage = (event) => {
      const msg: WSMessage = JSON.parse(event.data);

      if (msg.type === "status") {
        setCurrentAgent(msg.agent);
        setStatusMessage(msg.message);
        if (msg.status === "completed") {
          setCompletedAgents((prev) => [...prev, msg.agent]);
        }
      } else if (msg.type === "result") {
        setData({
          prediction: msg.prediction,
          agent_reports: msg.agent_reports,
        });
        setLoading(false);
        setCurrentAgent(null);
        setStatusMessage("分析が完了しました。");
        socket.close();
      } else if (msg.type === "error") {
        setError(msg.message);
        setLoading(false);
        socket.close();
      }
    };

    socket.onerror = () => {
      setError("WebSocket接続エラーが発生しました。");
      setLoading(false);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8 font-sans transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-emerald-600 drop-shadow-sm">
            NIKKEI 225 PREDICTOR
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Google ADK Multi-Agent Analysis System{" "}
            <span className="text-emerald-500/50 ml-2 font-mono text-sm tracking-widest uppercase">
              v2.0 Streaming
            </span>
          </p>

          <div className="flex flex-col items-center mt-10">
            <button
              onClick={startPrediction}
              disabled={loading}
              className={`group relative px-10 py-5 rounded-2xl font-bold text-xl transition-all transform active:scale-95 overflow-hidden ${
                loading
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-gray-950 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/40"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    エージェントが思考中...
                  </>
                ) : (
                  "市場予測を実行"
                )}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </button>

            {loading && (
              <p className="mt-4 text-emerald-400 font-mono animate-pulse text-sm">
                {statusMessage}
              </p>
            )}
          </div>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl mb-8 text-center animate-in slide-in-from-top duration-500">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {/* Live Status Stepper */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {AGENTS.map((agent) => {
              const isActive = currentAgent === agent.id;
              const isCompleted = completedAgents.includes(agent.id);
              return (
                <div
                  key={agent.id}
                  className={`relative p-4 rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)] scale-105"
                      : isCompleted
                        ? "bg-emerald-500/5 border-emerald-500/20 opacity-60"
                        : "bg-gray-900/50 border-gray-800 opacity-30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {isCompleted ? (
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-gray-950 font-bold">
                        ✓
                      </div>
                    ) : isActive ? (
                      <div className="w-5 h-5 bg-emerald-500 rounded-full animate-ping" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-700 rounded-full" />
                    )}
                    <span
                      className={`text-xs font-bold uppercase tracking-tighter ${isActive ? "text-emerald-400" : "text-gray-500"}`}
                    >
                      {agent.id}
                    </span>
                  </div>
                  <p
                    className={`text-sm font-medium ${isActive ? "text-gray-200" : "text-gray-500"}`}
                  >
                    {agent.description}
                  </p>
                  {isActive && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-emerald-500/50 overflow-hidden rounded-full">
                      <div className="h-full bg-emerald-500 animate-[loading_1.5s_infinite]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Main Prediction */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <svg
                    className="w-32 h-32"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-50" />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-emerald-400">
                    Chief Predictor Result
                  </h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl md:text-2xl leading-[1.6] whitespace-pre-wrap text-gray-100 font-light">
                    {data.prediction}
                  </p>
                </div>
              </section>

              {/* Agent Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.agent_reports.map((report, idx) => (
                  <div
                    key={idx}
                    className="group bg-gray-900/20 border border-gray-800/50 rounded-3xl p-8 hover:bg-gray-900/40 hover:border-gray-700 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xs font-bold text-blue-400/80 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                        {report.agent}
                      </h3>
                      <span className="text-[10px] text-gray-600 font-mono">
                        REPORT SECURED
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                      {report.report}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar / Stats */}
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-[2rem] p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  AIエージェント
                </h3>
                <ul className="space-y-6">
                  {AGENTS.map((agent) => (
                    <li key={agent.id} className="group flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        </div>
                        <span className="text-gray-200 font-bold tracking-tight">
                          {agent.name}
                        </span>
                      </div>
                      <p className="ml-11 text-xs text-gray-500 uppercase tracking-widest">
                        {agent.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] p-8">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">
                  SYSTEM STATUS
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-gray-300">
                    All Nodes Operational
                  </span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-500/40" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
                  <span>LATENCY: 42ms</span>
                  <span>LOAD: 12%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && (
          <div className="text-center py-32 animate-pulse">
            <div className="inline-block p-10 border-2 border-dashed border-gray-800 rounded-[3rem]">
              <p className="text-3xl font-light italic text-gray-600 bg-clip-text text-transparent bg-gradient-to-b from-gray-500 to-gray-800">
                Ready for Market Analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
