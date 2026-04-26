import { prisma } from "@/lib/prisma";
import { isStoreOpen } from "@/lib/storeHours";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Zap, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const open = isStoreOpen();

  let products = await prisma.product.findMany({ take: 6 });
  let categories = await prisma.category.findMany();

  return (
    <main className="flex-1 flex flex-col bg-background text-foreground">
      {/* Promotional Retail Hero Banner */}
      <section className="w-full px-4 lg:px-8 pt-4 pb-8 max-w-[100rem] mx-auto">
        <div className="relative w-full h-[180px] md:h-[400px] rounded-xl md:rounded-3xl overflow-hidden bg-primary/10 flex items-center shadow-sm">
          <div className="pl-8 md:pl-16 z-10 w-2/3 md:w-1/2">
            <div className="text-primary font-bold text-xs md:text-lg mb-2">#TopRatedBakery</div>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
              Delicious Moments <br/> Delivered Fast.
            </h1>
            <Link href="/menu" className="inline-block bg-primary text-white text-xs md:text-base font-bold px-4 py-2 md:px-8 md:py-3 rounded-md shadow-md hover:bg-primary-hover transition-colors">
              {open ? 'Order Online' : 'Browse Menu'}
            </Link>
          </div>
          <Image 
            src="/images/hero.png" 
            alt="Promo Cake" 
            fill 
            className="object-cover md:object-contain object-right" 
            priority
          />
        </div>
      </section>

      {/* Circular Category Bubbles */}
      <section className="max-w-[100rem] mx-auto w-full px-4 lg:px-8 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat, i) => (
            <Link href={`/menu?category=${encodeURIComponent(cat.name)}`} key={cat.id} className="flex flex-col items-center gap-3 shrink-0 group">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden relative shadow-sm border-[3px] border-transparent group-hover:border-primary transition-all">
                <Image src={['/images/chocolate.png', '/images/hero.png', '/images/croissants.png'][i % 3]} alt={cat.name} fill className="object-cover" />
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-[100rem] mx-auto w-full px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Best Sellers in Delhi</h2>
            <Link href="/menu" className="text-primary font-bold hover:underline">View All</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="ecommerce-card flex flex-col p-3 md:p-4 relative">
                <div className="relative h-40 md:h-56 w-full rounded-md md:rounded-xl overflow-hidden bg-gray-100 mb-3 group">
                  <Image src={product.imageUrl || '/images/hero.png'} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2 bg-[#1FAA59] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Zap size={12} fill="currentColor" /> BESTSELLER
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  {/* Reviews Tag */}
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex items-center bg-[#1FAA59] text-white px-1.5 py-0.5 rounded text-[10px] md:text-xs font-bold">
                      4.8 <Star size={10} fill="currentColor" className="ml-0.5" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 font-medium">(1.2k+ Reviews)</span>
                  </div>

                  <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 min-h-[40px] md:min-h-[48px] leading-snug">{product.name}</h3>
                  
                  <div className="flex items-end gap-2 mt-2 md:mt-3">
                    <span className="text-lg md:text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                    <span className="text-xs md:text-sm text-gray-400 line-through relative bottom-[2px]">₹{(product.price + 150).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] md:text-xs text-gray-500 font-medium bg-gray-50 p-1.5 rounded">
                    <Truck size={14} className="text-gray-400 shrink-0" /> Earliest Delivery: <strong className="text-green-600">{open ? 'Today directly' : 'Tomorrow'}</strong>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <Link href={`/menu/${product.id}`} className="flex-1 border-2 border-primary text-primary hover:bg-primary/5 text-center py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm transition-colors uppercase tracking-wide">
                    Details
                  </Link>
                  {open ? (
                    <a href={`https://wa.me/918178518520?text=Hi Bites Cake! I'd like to instantly order: ${product.name}`} target="_blank" rel="noreferrer" className="flex-1 bg-primary hover:bg-primary-hover text-white text-center py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm transition-colors shadow-sm uppercase tracking-wide">
                       BUY NOW
                    </a>
                  ) : (
                    <a href={`https://wa.me/918178518520?text=Hi Bites Cake! I'd like to enquire about: ${product.name}. Please share details for tomorrow's order.`} target="_blank" rel="noreferrer" className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-center py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm transition-colors shadow-sm uppercase tracking-wide flex items-center justify-center gap-1">
                       <Clock size={14} /> ENQUIRE
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="bg-[#f0f4f8] py-8 mt-auto">
        <div className="max-w-[100rem] mx-auto px-4 flex justify-around flex-wrap gap-4 text-center">
           <div className="text-sm text-gray-600 font-bold">✓ 100% Fresh Verified</div>
           <div className="text-sm text-gray-600 font-bold">✓ Rated 4.9 in Delhi</div>
           <div className="text-sm text-gray-600 font-bold">✓ Open 9 AM – 10:30 PM</div>
        </div>
      </section>
    </main>
  );
}
