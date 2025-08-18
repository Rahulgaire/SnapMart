import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Product", link: "/products" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
    { name: "Admin", link: "/admin" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 👇 Scroll state for shadow effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 w-full z-[100]">
      <Navbar
        className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-none"
        }`}
      >
        {/* Desktop Navigation */}
        <NavBody>
          <div className="hidden md:flex">
            <Link to="/">
              <NavbarLogo text="SnapMart" />
            </Link>
          </div>
          <NavItems items={navItems} />
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" title="Cart">
              <FaShoppingCart className="w-5 h-5 text-white hover:text-gray-200" />
            </Link>
            <Link to="/profile" title="Profile">
              <FaUser className="w-5 h-5 text-white hover:text-gray-200" />
            </Link>
            <Link to="/login">
              <NavbarButton variant="secondary">Login</NavbarButton>
            </Link>
            <Link to="/contact">
              <NavbarButton variant="primary">Book a Call</NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link to="/">
              <NavbarLogo text="SnapMart" />
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-base font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex gap-6 mt-4 px-1">
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <FaShoppingCart className="w-5 h-5 text-white" />
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <FaUser className="w-5 h-5 text-white" />
              </Link>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <Link to="/login">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              </Link>
              <Link to="/contact">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="secondary"
                  className="w-full"
                >
                  Book a Call
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
