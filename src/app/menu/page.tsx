import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Zap } from "lucide-react";

export default async function Menu(props: { searchParams: Promise<{ category?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  let products: any[] = [];
  try { products = await prisma.product.findMany({ include: { category: true } }); } catch (e) {}
  
  if (products.length === 0) {
    products = [
      { id: "1", name: 'Signature Bento Cake', description: 'Small but mighty! Perfect personalized bento cake for an intimate celebration.', price: 400.00, imageUrl: '/images/chocolate.png', category: { name: 'Bento Cake' } },
      { id: "2", name: 'Custom Tiered Cake', description: 'A masterfully decorated tiered cake. Let us know your dream flavour and colors!', price: 1500.00, imageUrl: '/images/hero.png', category: { name: 'Cakes' } },
      { id: "3", name: 'Assorted Cupcakes', description: 'A box of 6 beautifully crafted cupcakes in your preferred customized flavours.', price: 600.00, imageUrl: '/images/croissants.png', category: { name: 'CupCakes' } },
      { id: "4", name: 'Blueberry Muffins', description: 'Freshly baked, soft and fluffy classic blueberry muffins.', price: 150.00, imageUrl: '/images/croissants.png', category: { name: 'Muffins' } },
      { id: "5", name: 'Butterscotch Pastry', description: 'Rich and creamy butterscotch pastry slice, perfect for a quick bite.', price: 120.00, imageUrl: '/images/chocolate.png', category: { name: 'Pastry' } },
      { id: "6", name: 'Almond Dry Cake', description: 'Classic tea-time dry cake topped with freshly roasted almonds.', price: 350.00, imageUrl: '/images/hero.png', category: { name: 'Dry Cake' } },
    ];
  }

  const categories = ["All", "Cakes", "Bento Cake", "CupCakes", "Muffins", "Pastry", "Dry Cake"];
  
  const activeCategory = searchParams.category && searchParams.category !== "All" 
    ? searchParams.category 
    : "All";

  const searchQuery = searchParams.search?.trim().toLowerCase() || "";

  let displayedProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category.name.toLowerCase() === activeCategory.toLowerCase());

  if (searchQuery) {
    displayedProducts = displayedProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.name.toLowerCase().includes(searchQuery)
    );
  }

  return (
    <div className="bg-white px-4 lg:px-8 py-8 w-full">
      <div className="max-w-[100rem] mx-auto">
        
        {/* Breadcrumb / Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {searchQuery ? `Search results for "${searchParams.search}"` : 'Order Cakes & Pastries Online in Delhi'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Found {displayedProducts.length} items</p>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8 border-b border-gray-100">
          {categories.map(cat => (
            <Link 
              key={cat} 
              href={cat === "All" ? "/menu" : `/menu?category=${encodeURIComponent(cat)}`}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === cat 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* E-Commerce Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayedProducts.map((product) => (
              <div key={product.id} className="ecommerce-card flex flex-col p-3 md:p-4 relative group">
                <div className="relative h-40 md:h-56 w-full rounded-md md:rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-0 bg-primary/90 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-r shadow-sm">
                    {product.category.name}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  {/* Reviews Tag */}
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex items-center bg-[#1FAA59] text-white px-1.5 py-0.5 rounded text-[10px] md:text-xs font-bold">
                      4.9 <Star size={10} fill="currentColor" className="ml-0.5" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 font-medium">(200+ Reviews)</span>
                  </div>

                  <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 min-h-[40px] md:min-h-[48px] leading-snug">{product.name}</h3>
                  
                  <div className="flex items-end gap-2 mt-2 md:mt-3">
                    <span className="text-lg md:text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                    <span className="text-xs md:text-sm text-gray-400 line-through relative bottom-[2px]">₹{(product.price + 200).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] md:text-xs text-gray-500 font-medium bg-gray-50 p-1.5 rounded">
                    <Truck size={14} className="text-gray-400 shrink-0" /> Earliest Delivery: <strong className="text-green-600">Today directly</strong>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <Link href={`/menu/${product.id}`} className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm transition-colors uppercase tracking-wide">
                    Details
                  </Link>
                  <a href={`https://wa.me/918178518520?text=Hi Bites Cake! I'd like to instantly order: ${product.name}`} target="_blank" rel="noreferrer" className="flex-1 bg-primary hover:bg-primary-hover text-white text-center py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm transition-colors shadow-sm uppercase tracking-wide">
                     BUY NOW
                  </a>
                </div>
              </div>
            ))}
            {displayedProducts.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center">
                <p className="text-xl text-gray-500">No items available for this category right now.</p>
              </div>
            )}
        </div>

      </div>
    </div>
  )
}
