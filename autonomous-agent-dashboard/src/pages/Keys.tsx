import React, { useEffect, useState } from 'react';
import { KeyMeta, KeyCreate } from '../types';
import { fetchKeys, createKey, deleteKey } from '../api/agent';
import { encrypt, decrypt } from '../utils/encryption';

function Keys() {
  const [keys, setKeys] = useState<KeyMeta[]>([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [showIds, setShowIds] = useState<Record<number | string, boolean>>({});

  const load = async () => {
    try {
      const data = await fetchKeys();
      setKeys(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!name || !value) return;
    try {
      const encryptedVal = encrypt(value);
      const payload: KeyCreate = { name, value: encryptedVal };
      const newKey = await createKey(payload);
      setKeys((prev) => [...prev, newKey]);
      setName('');
      setValue('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Delete key?')) return;
    try {
      await deleteKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleShow = (id: string | number) => {
    setShowIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Add API Key / Secret</h3>
        <div className="flex gap-2">
          <input
            className="border px-3 py-2 rounded flex-1"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border px-3 py-2 rounded flex-1"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Stored Keys</h3>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Value</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id}>
                <td className="px-3 py-2 border font-medium">{k.name}</td>
                <td className="px-3 py-2 border">
                  {showIds[k.id] ? decrypt(k.value) : '••••••••'}
                </td>
                <td className="px-3 py-2 border space-x-2">
                  <button
                    onClick={() => toggleShow(k.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {showIds[k.id] ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleDelete(k.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Keys;