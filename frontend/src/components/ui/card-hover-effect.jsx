import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Using Link instead of anchor for SPA navigation

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-6", className)}>
      {items.map((item, idx) => (
        <Link
          to={item.link}
          key={item._id || idx}
          className="relative group block p-2 h-full w-full rounded-lg border bg-white shadow hover:shadow-lg transition-transform transform hover:scale-[1.02]"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          {/* Product Image */}
          <img
            src={item.img || "https://via.placeholder.com/300x160?text=No+Image"}
            alt={item.title}
            className="w-full h-40 object-cover rounded bg-gray-100"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300x160?text=No+Image"; }}
          />

          {/* Content */}
          <div className="p-4 relative z-10">
            <h4 className={cn("text-gray-900 font-semibold text-lg truncate")}>{item.title}</h4>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>
            <p className="mt-2 font-bold text-blue-600 text-lg">₹{item.price}</p>

            {/* Add To Cart button */}
            <button
              onClick={(e) => {
                e.preventDefault(); // prevent Link navigation on button click
                if (item.onAddToCart) item.onAddToCart(item);
              }}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
              aria-label={`Add ${item.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};
