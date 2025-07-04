import React from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  language?: string;
  code: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  height?: string;
}

function CodeEditor({ language = 'python', code, onChange, readOnly = false, height = '400px' }: Props) {
  return (
    <Editor
      height={height}
      defaultLanguage={language}
      defaultValue={code}
      onChange={onChange}
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
}

export default CodeEditor;