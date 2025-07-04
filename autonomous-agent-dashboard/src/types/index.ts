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
  dependencies: string[];
}