'use client';

import { useState } from 'react';

export default function UploadPanel() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('manual');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpload() {
    if (!text.trim()) {
      setStatus('Please enter some text to upload.');
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Upload failed');
      }

      setStatus(`Added ${data.added} chunks from "${data.source}".`);
      setText('');
    } catch (error) {
      console.error(error);
      setStatus(
        'Failed to upload text. Make sure Ollama is running and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 text-sm">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-300">
          Source label (optional)
        </span>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          placeholder="e.g. docs, notes, pdf-summary"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-300">
          Text to add to knowledge base
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="resize-none rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          placeholder="Paste any text here. It will be split into paragraphs and stored in the local vector database."
        />
      </label>

      <button
        type="button"
        onClick={handleUpload}
        disabled={isLoading}
        className="mt-1 inline-flex items-center justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Uploading…' : 'Add to knowledge base'}
      </button>

      {status && (
        <p className="mt-1 text-xs text-slate-300" aria-live="polite">
          {status}
        </p>
      )}
    </div>
  );
}

