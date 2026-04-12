import { MapPin, Phone, MessageCircle, Camera, PlaySquare, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 px-6 mt-auto border-t-4 border-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-3xl font-serif text-primary font-bold mb-4">Bites Cake</h3>
          <p className="mb-6 leading-relaxed max-w-sm">Premium artisanal cakes, bento cakes, and pastries crafted fresh daily in New Delhi. Making every celebration unforgettable.</p>
          <div className="flex items-center gap-4 mt-8">
            <a href="https://instagram.com/bitescake_india" target="_blank" rel="noreferrer" className="p-2.5 bg-stone-800 rounded-full text-stone-300 hover:bg-[#E1306C] hover:text-white transition-all transform hover:-translate-y-1 shadow-sm" title="Follow us on Instagram">
              <Camera size={22} />
            </a>
            <a href="https://youtube.com/@bitescake_india" target="_blank" rel="noreferrer" className="p-2.5 bg-stone-800 rounded-full text-stone-300 hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1 shadow-sm" title="Subscribe on YouTube">
              <PlaySquare size={22} />
            </a>
            <a href="https://g.page/bitescake_india" target="_blank" rel="noreferrer" className="p-2.5 bg-stone-800 rounded-full text-stone-300 hover:bg-[#4285F4] hover:text-white transition-all transform hover:-translate-y-1 shadow-sm" title="Find us on Google">
              <Globe size={22} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact & Orders</h4>
          <ul className="space-y-5">
            <li className="flex items-center gap-3 group">
              <div className="bg-stone-800 p-2 rounded-full group-hover:bg-primary transition-colors">
                <Phone className="text-primary group-hover:text-white transition-colors" size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Call Us Directly</p>
                <a href="tel:+918178518520" className="hover:text-primary transition-colors text-lg tracking-wide">+91 81785 18520</a>
              </div>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="bg-stone-800 p-2 rounded-full group-hover:bg-[#25D366] transition-colors">
                <MessageCircle className="text-[#25D366] group-hover:text-white transition-colors" size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">WhatsApp Fast Order</p>
                <a href="https://wa.me/918178518520" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors text-lg tracking-wide">+91 81785 18520</a>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Visit The Bakery</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="bg-stone-800 p-2 rounded-full shrink-0">
                <MapPin className="text-primary" size={20} />
              </div>
              <p className="leading-relaxed text-lg">
                82 D, 3rd Floor RED MIG Flats<br/>
                Rajouri Garden<br/>
                New Delhi
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-sm text-center font-medium">
        <p>&copy; {new Date().getFullYear()} Bites Cake. All rights reserved.</p>
      </div>
    </footer>
  );
}
