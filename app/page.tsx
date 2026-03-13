import ChatInterface from '@/components/ChatInterface';
import UploadPanel from '@/components/UploadPanel';

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:gap-6">
      <section className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40 backdrop-blur">
        <h2 className="mb-3 text-lg font-semibold text-slate-50">
          Chat with your AI
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Ask questions and get answers grounded in the documents you upload.
        </p>
        <ChatInterface />
      </section>

      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40 backdrop-blur">
        <h2 className="mb-3 text-lg font-semibold text-slate-50">
          Knowledge base
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Paste or type text to add it to the local vector database used for
          retrieval.
        </p>
        <UploadPanel />
      </section>
    </div>
  );
}

