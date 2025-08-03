import React from "react";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div
      className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "SnapMart always delivers fresh groceries on time. It’s my weekly shopping solution without leaving the house!",
    name: "Ritika Sharma",
    title: "Home Chef & Mom",
  },
  {
    quote:
      "From exotic fruits to daily essentials, SnapMart’s selection is unbeatable. I always find what I need.",
    name: "Kunal Mehta",
    title: "Nutrition Coach",
  },
  {
    quote:
      "The prices at SnapMart are way better than my local store, and the delivery is lightning fast.",
    name: "Aarav Joshi",
    title: "College Student",
  },
  {
    quote:
      "Love the SnapMart app! It’s super easy to navigate and the cart checkout is seamless.",
    name: "Nisha Kapoor",
    title: "Working Professional",
  },
  {
    quote:
      "SnapMart helped me save time and money. Their offers and bulk discounts are perfect for big families.",
    name: "Rajeev Nair",
    title: "Father of 3",
  },
];