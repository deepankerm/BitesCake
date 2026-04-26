import Link from "next/link";
import { Package, Tags, Store, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Bites Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 font-medium">
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors">
            <Package size={20} /> Manage Menu
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors">
            <Tags size={20} /> Categories
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors">
            <Store size={20} /> Store Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <LogOut size={16}/> Close browser to logout.
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 border-l">
        <div className="max-w-5xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
