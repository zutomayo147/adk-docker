import React from "react";

const Header: React.FC = () => {
  return (
    <div className="space-y-4 text-center">
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
  );
};

export default Header;
