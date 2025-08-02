"use client";
import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import snapMart from "../assets/snapMart.png"
// Tailwind Variants button
const button = tv({
  base: "relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-4 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  variants: {
    variant: {
      primary: "bg-white text-blue-700 hover:bg-blue-100",
      secondary: "bg-blue-600 text-white hover:bg-blue-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

// Navbar container
export const Navbar = ({ children, className }) => (
  <div
    className={cn(
      "sticky top-0 z-50 w-full border-b p-4 backdrop-blur-lg shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

// Body inside navbar
export const NavBody = ({ children }) => (
  <div className="container mx-auto flex items-center justify-between">{children}</div>
);

// Nav links (Desktop)
export const NavItems = ({ items, className }) => (
  <ul className={cn("hidden md:flex items-center gap-6", className)}>
    {items.map((item, idx) => (
      <li key={idx}>
        <a
          href={item.link}
          className="text-sm font-medium text-white hover:text-gray-100 transition"
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

// Logo
export const NavbarLogo = ({ text = "YourBrand" }) => (
  <div className="flex items-center gap-2">
    <img
      src={snapMart}
      alt="Logo"
      className="h-10 w-10 object-contain"
    />
    <span className="text-lg font-bold text-white">{text}</span>
  </div>
);


// Button
export const NavbarButton = ({ variant, children, className, ...props }) => (
  <button className={cn(button({ variant }), className)} {...props}>
    {children}
  </button>
);

// Mobile Navbar Wrapper
export const MobileNav = ({ children }) => (
  <div className="block md:hidden">{children}</div>
);

// Header (Logo + Toggle)
export const MobileNavHeader = ({ children }) => (
  <div className="flex items-center justify-between">{children}</div>
);

// Hamburger button
export const MobileNavToggle = ({ isOpen, onClick }) => (
  <button onClick={onClick} className="focus:outline-none">
    <span className="sr-only">Toggle Menu</span>
    <div className="space-y-1">
      <span
        className={`block h-0.5 w-6 bg-white transform transition duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-white transition duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-white transform transition duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      />
    </div>
  </button>
);

// Slide-down mobile menu
export const MobileNavMenu = ({ isOpen, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 right-0 top-full z-40 w-full bg-blue-600 text-white border-t shadow-md"
      >
        <div className="flex flex-col gap-4 p-4">{children}</div>
      </motion.div>
    )}
  </AnimatePresence>
);
