import path from 'path';
import type { Table } from 'vectordb';
import * as lancedb from 'vectordb';

const DB_DIR = path.join(process.cwd(), 'rag-db');
const TABLE_NAME = 'documents';

export type StoredDocument = {
  id: string;
  vector: number[];
  text: string;
  source: string;
};

async function getDb() {
  // LanceDB automatically creates the directory if it does not exist
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await (lancedb as any).connect(DB_DIR)) as {
    tableNames: () => Promise<string[]>;
    openTable: (name: string) => Promise<Table>;
    createTable: (name: string, data: StoredDocument[]) => Promise<Table>;
  };
}

export async function addDocuments(documents: StoredDocument[]) {
  if (!documents.length) return;

  const db = await getDb();
  const tables = await db.tableNames();

  if (tables.includes(TABLE_NAME)) {
    const table = await db.openTable(TABLE_NAME);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (table as any).add(documents);
    return;
  }

  // First time: create table with initial documents so schema is inferred
  await db.createTable(TABLE_NAME, documents);
}

export async function searchDocuments(
  vector: number[],
  limit = 4,
): Promise<StoredDocument[]> {
  const db = await getDb();
  const tables = await db.tableNames();

  if (!tables.includes(TABLE_NAME)) {
    // No documents have been added yet
    return [];
  }

  const table = await db.openTable(TABLE_NAME);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = await (table as any)
    .search(vector)
    .limit(limit)
    .execute();

  if (typeof (results as any).toArray === 'function') {
    return (results as any).toArray();
  }

  return results as StoredDocument[];
}

