import React from "react";

interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  query,
  setQuery,
  onSearch,
  isSearching,
}) => {
  return (
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
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="何をリサーチしますか？"
          className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-lg py-3"
          disabled={isSearching}
        />
        <button
          onClick={onSearch}
          className={`bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-600/20 ${isSearching ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSearching}
        >
          {isSearching ? "検索中..." : "開始"}
        </button>
      </div>

      {!isSearching && (
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
  );
};

export default SearchBox;
