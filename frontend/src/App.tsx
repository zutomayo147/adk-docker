import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Researching:", query);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background visual element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-3xl space-y-12 text-center">
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
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-600/20"
              >
                開始
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {[
              "自動運転の未来",
              "量子コンピューティング",
              "2025年のSaaSトレンド",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 text-sm hover:bg-slate-700/50 hover:text-slate-200 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-8 left-0 right-0 flex justify-center text-slate-600 text-[11px] font-medium tracking-widest uppercase">
          Powered by Google ADK & GPT-4o
        </footer>
      </main>
    </div>
  );
}

export default App;
