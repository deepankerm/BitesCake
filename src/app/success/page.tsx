import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="py-32 px-6 max-w-2xl mx-auto w-full flex-1 flex flex-col items-center text-center">
      <CheckCircle size={80} className="text-primary mb-8" />
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Order Received!</h1>
      <p className="text-xl text-stone-600 dark:text-stone-400 mb-12 leading-relaxed">
        Thank you for choosing Bites Cake. Our bakers have received your request and we will be in touch shortly via email to confirm the details and pickup time.
      </p>
      <Link href="/" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105">
        Back to Home
      </Link>
    </div>
  )
}
