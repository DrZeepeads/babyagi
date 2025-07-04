import React from 'react';
import { FunctionMeta } from '../types';

interface Props {
  functions: FunctionMeta[];
  onSelect: (fn: FunctionMeta) => void;
}

function FunctionList({ functions, onSelect }: Props) {
  return (
    <table className="min-w-full text-sm border">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Description</th>
          <th className="px-3 py-2 border">Dependencies</th>
        </tr>
      </thead>
      <tbody>
        {functions.map((fn) => (
          <tr
            key={fn.id}
            className="hover:bg-blue-50 cursor-pointer"
            onClick={() => onSelect(fn)}
          >
            <td className="px-3 py-2 border font-medium">{fn.name}</td>
            <td className="px-3 py-2 border truncate max-w-xs">{fn.description}</td>
            <td className="px-3 py-2 border">{fn.dependencies.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FunctionList;