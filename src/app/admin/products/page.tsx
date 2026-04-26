/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";

type Category = { id: string, name: string };
type Product = { id: string, name: string, price: number, description: string, category: Category, imageUrl: string };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', categoryId: '', imageUrl: '/images/hero.png' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories')
      ]);
      setProducts(await pRes.json());
      setCategories(await cRes.json());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    setIsAdding(false);
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Menu Items</h1>
        <button onClick={() => setIsAdding(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90">
          <Plus size={20} /> Add New Cake
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border mb-8 space-y-4">
          <h3 className="font-bold text-lg mb-4">Add New Item</h3>
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Product Name" className="border p-2 rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="number" placeholder="Price (₹)" className="border p-2 rounded-lg" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            <select required className="border p-2 rounded-lg" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})}>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input placeholder="Image URL (optional)" className="border p-2 rounded-lg" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            <textarea required placeholder="Description" className="border p-2 rounded-lg col-span-2" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Save Product</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">Loading inventory...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-medium text-gray-600">Product</th>
                <th className="p-4 font-medium text-gray-600">Category</th>
                <th className="p-4 font-medium text-gray-600">Price</th>
                <th className="p-4 font-medium text-gray-600 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{p.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{p.description}</div>
                  </td>
                  <td className="p-4"><span className="bg-pink-50 text-primary px-2 py-1 rounded text-sm">{p.category?.name || 'Uncategorized'}</span></td>
                  <td className="p-4 font-medium">₹{p.price}</td>
                  <td className="p-4 flex items-center gap-3">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                   <td colSpan={4} className="p-8 text-center text-gray-500">No products found. Start adding some! (Make sure you create a Category first).</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
