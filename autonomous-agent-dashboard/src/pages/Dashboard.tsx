import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import ResponsePanel from '../components/ResponsePanel';
import FunctionList from '../components/FunctionList';
import CodeEditor from '../components/CodeEditor';
import { FunctionMeta } from '../types';

// Placeholder data – to be fetched via API later
const dummyFunctions: FunctionMeta[] = [
  { id: '1', name: 'hello_world', description: 'Returns greeting', dependencies: [] },
  { id: '2', name: 'sum', description: 'Adds two numbers', dependencies: [] },
];

function Dashboard() {
  const [response, setResponse] = useState('');
  const [selectedFunction, setSelectedFunction] = useState<FunctionMeta | null>(null);

  const handleTaskSubmit = async (prompt: string) => {
    // TODO: call backend POST /tasks and SSE
    setResponse(`You submitted: ${prompt}\n\n_AI response will appear here once integrated._`);
  };

  return (
    <div className="space-y-6">
      <TaskForm onSubmit={handleTaskSubmit} />

      <div>
        <h3 className="font-semibold mb-2">AI Response</h3>
        <ResponsePanel content={response} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Function List</h3>
          <FunctionList functions={dummyFunctions} onSelect={setSelectedFunction} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Code Editor</h3>
          <CodeEditor code={selectedFunction?.description || '# Select a function'} readOnly />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;