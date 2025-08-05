import { Link } from "react-router-dom";
import snapMart from "../assets/snapMart.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              src={snapMart}
              alt="SnapMart Logo"
              className="h-10 w-10 object-contain"
            />
            <h4 className="text-2xl font-bold">SnapMart</h4>
          </div>
          <p className="text-sm text-white/90 max-w-sm">
            Fresh deals, fast delivery. <br /> Your trusted grocery partner, every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-1 text-sm text-white/90">
            <li>Email: <a href="mailto:gairerahul334@gmail.com" className="hover:underline">gairerahul334@gmail.com</a></li>
            <li>Support: <a href="mailto:support@snapmart.com" className="hover:underline">support@snapmart.com</a></li>
            <li>Address: 123 Market St, CityVille</li>
            <li>Phone: +91 73473 49556</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} SnapMart. All rights reserved.
      </div>
    </footer>
  );
}
