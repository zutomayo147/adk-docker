import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 border-b border-slate-800 bg-[#0B0F17]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Deep Research AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {["Dashboard", "Projects", "Library", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium transition-colors ${item === "Projects" ? "text-white border-b-2 border-blue-500 pb-1 -mb-1" : "text-slate-400 hover:text-slate-200"}`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search research..."
            className="bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors relative">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-[#0B0F17] rounded-full"></span>
        </button>

        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full border border-slate-700 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
          <span className="text-sm font-bold text-white">JD</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
