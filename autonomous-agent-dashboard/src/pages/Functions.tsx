import React, { useEffect, useState } from 'react';
import { FunctionMeta, FunctionCreate } from '../types';
import {
  fetchFunctions,
  createFunction,
  updateFunction,
  deleteFunction,
} from '../api/agent';
import FunctionList from '../components/FunctionList';
import CodeEditor from '../components/CodeEditor';

function Functions() {
  const [functions, setFunctions] = useState<FunctionMeta[]>([]);
  const [selected, setSelected] = useState<FunctionMeta | null>(null);
  const [code, setCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const load = async () => {
    try {
      const data = await fetchFunctions();
      setFunctions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSelect = (fn: FunctionMeta) => {
    setSelected(fn);
    setCode(fn.code ?? '');
  };

  const handleSave = async () => {
    if (!selected) return;
    setIsSaving(true);
    try {
      const payload: FunctionCreate = {
        ...selected,
        code,
      };
      const updated = await updateFunction(selected.id, payload);
      setFunctions((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
      setSelected(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!confirm(`Delete function ${selected.name}?`)) return;
    try {
      await deleteFunction(selected.id);
      setFunctions((prev) => prev.filter((f) => f.id !== selected.id));
      setSelected(null);
      setCode('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Functions</h3>
        <FunctionList functions={functions} onSelect={handleSelect} />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold mb-2">{selected ? selected.name : 'Select a function'}</h3>
        {selected && (
          <>
            <CodeEditor code={code} onChange={(val) => setCode(val || '')} language="python" />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Functions;