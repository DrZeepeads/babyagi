import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
}

function ResponsePanel({ content }: Props) {
  return (
    <div className="prose max-w-none border p-4 rounded bg-white overflow-y-auto h-64">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default ResponsePanel;