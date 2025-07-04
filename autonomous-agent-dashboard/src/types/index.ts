export interface TaskRequest {
  prompt: string;
}

export interface TaskResponse {
  id: string;
  status: string;
  content?: string;
}

export interface FunctionMeta {
  id: string;
  name: string;
  description: string;
  code?: string;
  dependencies: string[];
}

export interface FunctionCreate {
  name: string;
  description?: string;
  code?: string;
  imports?: string[];
  dependencies?: string[];
  secret_keys?: string[];
}

export interface KeyMeta {
  id: string | number;
  name: string;
  value: string; // encrypted (masked on UI)
  created_at?: string;
}

export interface KeyCreate {
  name: string;
  value: string;
}