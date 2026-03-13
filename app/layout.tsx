import type { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Local AI Assistant with RAG',
  description: 'Chat with TinyLlama over your own documents using Ollama + RAG.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-4 md:px-8 md:py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

