import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import ResultDisplay from "./components/ResultDisplay";
import { usePredict } from "./hooks/usePredict";

function App() {
  const {
    query,
    setQuery,
    isSearching,
    steps,
    prediction,
    reports,
    handleSearch,
  } = usePredict();

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
          <Header />
          <SearchBox
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        </div>

        <ResultDisplay
          isSearching={isSearching}
          steps={steps}
          prediction={prediction}
          reports={reports}
        />

        {/* Footer */}
        <footer className="fixed bottom-8 left-0 right-0 flex justify-center text-slate-600 text-[11px] font-medium tracking-widest uppercase pointer-events-none">
          Powered by Google ADK & GPT-4o
        </footer>
      </main>
    </div>
  );
}

export default App;
