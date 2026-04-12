"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Truck, Zap } from "lucide-react";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const mockProducts = [
      { id: "1", name: 'Signature Bento Cake', description: 'Small but mighty! Perfect personalized bento cake for an intimate celebration.', price: 400.00, imageUrl: '/images/chocolate.png', category: { name: 'Bento Cake' } },
      { id: "2", name: 'Custom Tiered Cake', description: 'A masterfully decorated tiered cake. Let us know your dream flavour and colors!', price: 1500.00, imageUrl: '/images/hero.png', category: { name: 'Cakes' } },
      { id: "3", name: 'Assorted Cupcakes', description: 'A box of 6 beautifully crafted cupcakes in your preferred customized flavours.', price: 600.00, imageUrl: '/images/croissants.png', category: { name: 'CupCakes' } },
      { id: "4", name: 'Blueberry Muffins', description: 'Freshly baked, soft and fluffy classic blueberry muffins.', price: 150.00, imageUrl: '/images/croissants.png', category: { name: 'Muffins' } },
      { id: "5", name: 'Butterscotch Pastry', description: 'Rich and creamy butterscotch pastry slice, perfect for a quick bite.', price: 120.00, imageUrl: '/images/chocolate.png', category: { name: 'Pastry' } },
      { id: "6", name: 'Almond Dry Cake', description: 'Classic tea-time dry cake topped with freshly roasted almonds.', price: 350.00, imageUrl: '/images/hero.png', category: { name: 'Dry Cake' } },
  ];
  
  const product = mockProducts.find(p => p.id === params.id) || mockProducts[0];

  const [weight, setWeight] = useState("0.5 kg");
  const [flavor, setFlavor] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const handleWhatsAppOrder = () => {
    const text = `Hello Bites Cake! I would like to place an order:
*Item*: ${product.name}
*Category*: ${product.category.name}
*Weight*: ${weight}
*Flavour*: ${flavor || 'Not specified'}
*Colour Preference*: ${color || 'Not specified'}
*Message on Cake*: ${message || 'None'}

How do we proceed with the payment?`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918178518520?text=${encodedText}`, "_blank");
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 bg-white md:rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Product Media */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
             <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
             <div className="absolute top-4 left-4 bg-[#1FAA59] text-white text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1">
                <Zap size={14} fill="currentColor" /> BESTSELLER
             </div>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
            <Truck size={20} className="shrink-0 text-blue-600" />
            <p><strong>Order now</strong>, and we will deliver it safely straight to your doorstep in Delhi. Perfect condition guaranteed.</p>
          </div>
        </div>

        {/* Right: Order Details */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col">
          <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">{product.category.name}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 leading-snug">{product.name}</h1>
          <p className="text-gray-500 text-sm md:text-base mb-4 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center bg-[#1FAA59] text-white px-2 py-1 rounded text-sm font-bold shadow-sm">
              4.9 <Star size={14} fill="currentColor" className="ml-1" />
            </div>
            <span className="text-sm text-gray-500 font-medium underline underline-offset-4 decoration-gray-300">Read 120 Reviews</span>
          </div>

          <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
            <span className="text-3xl font-extrabold text-gray-900">₹{product.price.toFixed(2)}</span>
            <span className="text-lg text-gray-400 line-through mb-1">₹{(product.price + 200).toFixed(2)}</span>
            <span className="text-sm font-bold text-[#1FAA59] mb-1.5 ml-2">(Save ₹200)</span>
          </div>

          {/* Form Options */}
          <div className="space-y-5 mb-8">
            <h3 className="text-lg font-bold text-gray-800">Customize Your Cake</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Weight / Size</label>
              <select value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800">
                <option>0.5 kg (Ideal for 4-5 people)</option>
                <option>1 kg (Ideal for 10-12 people)</option>
                <option>1.5 kg (Ideal for 15-20 people)</option>
                <option>2 kg (Ideal for 20-25 people)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Flavour Preferences</label>
              <input type="text" value={flavor} onChange={(e) => setFlavor(e.target.value)} placeholder="e.g. Extra Chocolate, Less Sugar..." className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Colour Scheme Requirements</label>
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. Pastel Pink Theme..." className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message on Cake</label>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Happy Anniversary" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800" />
            </div>
          </div>

          <button onClick={handleWhatsAppOrder} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-lg text-lg font-extrabold shadow-[0_8px_20px_rgba(216,26,96,0.25)] transition-all uppercase tracking-wide">
            BUY NOW VIA WHATSAPP
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">You can easily attach a reference photo in chat.</p>
        </div>
      </div>
    </div>
  );
}
