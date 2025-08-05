import React from "react";
import { useNavigate } from "react-router-dom";
import { LoaderOne } from "@/components/ui/Loader";
import { motion } from "framer-motion";

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] md:h-[88vh] bg-black text-white font-mono px-4">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-6xl md:text-8xl font-extrabold text-pink-600 drop-shadow-lg glitch"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-xl md:text-2xl text-gray-300"
      >
        Oops! Page Not Found.
      </motion.p>

      <LoaderOne />

      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg transition-all duration-300"
      >
        Go Back Home 
      </motion.button>

      <style>
        {`
          .glitch {
            position: relative;
            color: white;
          }
          .glitch::before,
          .glitch::after {
            content: '404';
            position: absolute;
            left: 0;
            width: 100%;
            overflow: hidden;
            color: #ff00c8;
            animation: glitch 2s infinite;
          }
          .glitch::before {
            top: -2px;
          }
          .glitch::after {
            top: 2px;
            color: #00fff9;
          }

          @keyframes glitch {
            0% {
              clip: rect(42px, 9999px, 44px, 0);
              transform: skew(0.5deg);
            }
            10% {
              clip: rect(12px, 9999px, 22px, 0);
              transform: skew(1deg);
            }
            20% {
              clip: rect(52px, 9999px, 64px, 0);
              transform: skew(-0.5deg);
            }
            30% {
              clip: rect(32px, 9999px, 34px, 0);
              transform: skew(0.5deg);
            }
            40% {
              clip: rect(72px, 9999px, 84px, 0);
              transform: skew(0deg);
            }
            100% {
              clip: rect(92px, 9999px, 94px, 0);
              transform: skew(1deg);
            }
          }
        `}
      </style>
    </div>
  );
}
