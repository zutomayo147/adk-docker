import { useState } from "react";

interface AgentReport {
  agent: string;
  report: string;
}

interface PredictionResponse {
  prediction: string;
  agent_reports: AgentReport[];
}

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "明日の日経平均株価の予測をお願いします。",
        }),
      });
      if (!response.ok) throw new Error("APIリクエストに失敗しました");
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-emerald-600">
            NIKKEI 225 PREDICTOR
          </h1>
          <p className="text-gray-400 text-lg">
            Google ADK Multi-Agent Analysis System
          </p>
          <button
            onClick={getPrediction}
            disabled={loading}
            className={`mt-8 px-8 py-4 rounded-full font-bold text-lg transition-all transform active:scale-95 shadow-xl ${
              loading
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-gray-950 hover:shadow-emerald-500/20"
            }`}
          >
            {loading ? "AIエージェントが分析中..." : "最新の予測を実行する"}
          </button>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {/* Main Prediction */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6 text-emerald-400">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">
                    部長（Chief）による最終予測
                  </h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl leading-relaxed whitespace-pre-wrap text-gray-200">
                    {data.prediction}
                  </p>
                </div>
              </section>

              {/* Agent Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.agent_reports.map((report, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/50 transition-colors"
                  >
                    <h3 className="text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider">
                      {report.agent} Report
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-6 hover:line-clamp-none transition-all duration-300">
                      {report.report}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar / Context */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4">エージェント構成</h3>
                <ul className="space-y-4">
                  {[
                    "MarketDataAgent",
                    "NewsAnalysisAgent",
                    "TechnicalAnalysisAgent",
                    "EconomicSentimentAgent",
                  ].map((name) => (
                    <li key={name} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-gray-300 font-medium">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && (
          <div className="text-center py-20 opacity-20">
            <p className="text-2xl font-light italic">
              上のボタンを押して市場分析を開始してください
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
