import { TaskRequest, FunctionMeta, FunctionCreate } from '../types';
import type { KeyMeta, KeyCreate } from '../types';

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }
  return headers;
}

export async function submitTask(prompt: string): Promise<{ task_id: string }> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ prompt } satisfies TaskRequest),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit task: ${res.statusText}`);
  }
  return res.json();
}

export function streamTask(taskId: string): EventSource {
  const url = `${API_URL}/tasks/stream/${taskId}`;
  const es = new EventSource(url);
  return es;
}

export async function fetchFunctions(): Promise<FunctionMeta[]> {
  const res = await fetch(`${API_URL}/functions`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch functions');
  }
  return res.json();
}

export async function createFunction(fn: FunctionCreate): Promise<FunctionMeta> {
  const res = await fetch(`${API_URL}/functions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(fn),
  });
  if (!res.ok) {
    throw new Error('Failed to create function');
  }
  return res.json();
}

export async function updateFunction(id: string | number, fn: FunctionCreate): Promise<FunctionMeta> {
  const res = await fetch(`${API_URL}/functions/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(fn),
  });
  if (!res.ok) {
    throw new Error('Failed to update function');
  }
  return res.json();
}

export async function deleteFunction(id: string | number): Promise<void> {
  const res = await fetch(`${API_URL}/functions/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to delete function');
  }
}

// Keys API

export async function fetchKeys(): Promise<KeyMeta[]> {
  const res = await fetch(`${API_URL}/keys`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch keys');
  }
  return res.json();
}

export async function createKey(key: KeyCreate): Promise<KeyMeta> {
  const res = await fetch(`${API_URL}/keys`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(key),
  });
  if (!res.ok) {
    throw new Error('Failed to create key');
  }
  return res.json();
}

export async function deleteKey(id: string | number): Promise<void> {
  const res = await fetch(`${API_URL}/keys/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to delete key');
  }
}