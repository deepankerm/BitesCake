"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, Navigation, Search } from 'lucide-react'

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/menu?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1A1A1A] shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-1 text-gray-600 hover:text-primary transition-colors">
            <Menu size={24} />
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-serif font-bold text-primary tracking-tight">Bites Cake</span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for cakes, pastries..." 
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-none rounded-md py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 outline-none placeholder-gray-500"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right: City & Links */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Navigation size={16} className="text-primary" /> Delivery in Delhi
          </div>
          <nav className="hidden md:flex items-center font-bold text-sm text-gray-700 dark:text-gray-200 tracking-wide gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/menu" className="hover:text-primary transition-colors">Menu</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
