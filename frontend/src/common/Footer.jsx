// src/components/Footer.jsx
import snapMart from "../assets/snapMart.png" // adjust path if needed

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo + Description */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <img
              src={snapMart}
              alt="SnapMart Logo"
              className="h-10 w-10 object-contain"
            />
            <h4 className="text-xl font-bold">SnapMart</h4>
          </div>
          <p className="text-sm">Fresh deals, fast delivery.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/features" className="hover:underline">Features</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm">Email: support@snapmart.com</p>
          <p className="text-sm">123 Market St, CityVille</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()} SnapMart. All rights reserved.
      </div>
    </footer>
  );
}
