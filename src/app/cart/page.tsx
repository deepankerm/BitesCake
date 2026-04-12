import { submitOrder } from "@/app/actions/order"
import { ShoppingBag } from "lucide-react"

export default function CartPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto w-full flex-1">
      <div className="flex flex-col flex-1 items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-4 flex items-center gap-4">
          <ShoppingBag size={40} /> Order Request
        </h1>
        <p className="text-stone-600 dark:text-stone-400">Fill out your details and we will contact you to confirm the order.</p>
        <div className="w-24 h-1 bg-primary rounded-full mt-6"></div>
      </div>
      
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 md:p-12 shadow-xl">
        <form action={submitOrder} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-bold text-stone-700 dark:text-stone-300">Full Name</label>
            <input type="text" id="name" name="name" required className="border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground" placeholder="Sarah Jenkins" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold text-stone-700 dark:text-stone-300">Email Address</label>
            <input type="email" id="email" name="email" required className="border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground" placeholder="sarah@example.com" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="font-bold text-stone-700 dark:text-stone-300">Order Notes (Optional)</label>
            <textarea id="notes" name="notes" rows={4} className="border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground" placeholder="Any special requests or allergies?"></textarea>
          </div>

          <button type="submit" className="mt-4 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl text-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
            Submit Order Request
          </button>
        </form>
      </div>
    </div>
  )
}
