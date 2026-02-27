import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="h-[60px] flex-shrink-0 border-b border-[#1E293B] bg-[#0F172A] flex items-center justify-between px-4 z-20">
      {/* Left side: Logo and Links */}
      <div className="flex items-center gap-8 h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 pl-2">
          <div className="w-6 h-6 bg-[#2563EB] rounded pt-[2px] flex items-center justify-center">
            {/* simple document/terminal icon */}
            <div className="w-3 h-3 border border-white rounded-[2px] border-b-2"></div>
          </div>
          <span className="font-bold text-white tracking-tight text-lg">
            Deep Research AI
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center h-full gap-8">
          {["Dashboard", "Projects", "Library", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className={`h-full flex items-center text-sm font-medium transition-colors relative ${
                item === "Projects"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item}
              {item === "Projects" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t"></div>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Right side: Search, Notify, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
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
          <input
            type="text"
            placeholder="Search research..."
            className="bg-[#1E293B] border border-slate-700/50 rounded-lg px-4 py-1.5 pl-9 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[240px]"
          />
        </div>

        {/* Notification Bell */}
        <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors bg-[#1E293B] rounded shrink-0 relative">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
        </button>

        {/* User Profile */}
        <div className="w-8 h-8 rounded-full bg-[#FDBA74] flex items-center justify-center cursor-pointer shrink-0 border border-transparent">
          {/* Peach/Orange circle, no initials, perhaps an image placeholder */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
