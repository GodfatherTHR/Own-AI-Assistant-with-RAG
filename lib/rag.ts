import { getEmbedding } from './embeddings';
import { searchDocuments, type StoredDocument } from './vector';

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';

const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'tinyllama:1.1b';

export type RagResult = {
  answer: string;
  sources: StoredDocument[];
};

function buildPrompt(question: string, contextDocs: StoredDocument[]): string {
  const contextText = contextDocs
    .map(
      (doc, idx) =>
        `Source ${idx + 1} (${doc.source || 'unknown'}):\n${doc.text}`,
    )
    .join('\n\n');

  return [
    'You are a helpful AI assistant that answers questions using the provided context.',
    'Only use the information from the context when it is relevant.',
    'If the context does not contain the answer, say that you are not sure instead of hallucinating.',
    '',
    'Context:',
    contextText || '[no relevant context available]',
    '',
    `User question: ${question}`,
  ].join('\n');
}

async function callOllamaChat(prompt: string): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        {
          role: 'system',
          content:
            'You are a local AI assistant running via TinyLlama inside Ollama.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Failed to call Ollama chat: ${response.status} ${response.statusText} ${errorText}`,
    );
  }

  const json = (await response.json()) as {
    message?: { content?: string };
  };

  const content = json.message?.content?.trim();
  if (!content) {
    throw new Error('Ollama chat response missing message content');
  }

  return content;
}

export async function runRagPipeline(question: string): Promise<RagResult> {
  const embedding = await getEmbedding(question);
  const docs = await searchDocuments(embedding, 4);
  const prompt = buildPrompt(question, docs);
  const answer = await callOllamaChat(prompt);

  return { answer, sources: docs };
}
