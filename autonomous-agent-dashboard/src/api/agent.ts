import { TaskRequest, TaskResponse, FunctionMeta } from '../types';

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