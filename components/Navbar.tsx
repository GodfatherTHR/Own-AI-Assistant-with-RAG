export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            AI
          </span>
          <div>
            <h1 className="text-sm font-semibold text-slate-50 md:text-base">
              Local AI Assistant
            </h1>
            <p className="text-[11px] text-slate-400 md:text-xs">
            Deepseek-r1:1.5b · Ollama · RAG
            </p>
          </div>
        </div>
        <div className="hidden text-xs text-slate-400 md:block">
          100% local · no API keys
        </div>
      </div>
    </header>
  );
}

