import { runRagPipeline, type RagResult } from './rag';

export async function askAi(question: string): Promise<RagResult> {
  if (!question.trim()) {
    throw new Error('Question cannot be empty');
  }

  return runRagPipeline(question);
}
