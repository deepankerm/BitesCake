/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Category = { id: string, name: string, _count?: { products: number } };

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/categories');
    setCategories(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Ensure no products are attached to it!')) return;
    await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    setIsAdding(false);
    setName('');
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <button onClick={() => setIsAdding(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90">
          <Plus size={20} /> Add Category
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input required placeholder="e.g. Birthday Cakes" className="border p-2 rounded-lg w-full" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 border rounded-lg">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save</button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">Loading categories...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-medium text-gray-600">Category Name</th>
                <th className="p-4 font-medium text-gray-600 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{c.name}</td>
                  <td className="p-4 flex items-center gap-3">
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                   <td colSpan={2} className="p-8 text-center text-gray-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
