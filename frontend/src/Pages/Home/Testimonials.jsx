import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
  {
    quote:
      "SnapMart made online shopping so simple and fun. The quick delivery and quality products keep me coming back every week!",
    name: "Priya Sharma",
    designation: "Loyal Customer",
    src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    quote:
      "As a seller, SnapMart gave me the perfect platform to grow my small business. The setup was easy and support is fantastic!",
    name: "Aman Verma",
    designation: "Owner at CraftCorner",
    src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    quote:
      "I use SnapMart for all my monthly groceries. The prices are competitive, and I love the cashback deals!",
    name: "Ritika Joshi",
    designation: "SnapMart Prime Member",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    quote:
      "Managing logistics with SnapMart has been a breeze. Their real-time tracking system and route optimization save us hours.",
    name: "Deepak Nair",
    designation: "Fleet Manager at FastMove",
    src: "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote:
      "SnapMart is the future of e-commerce. Their mobile experience is clean, intuitive, and super responsive!",
    name: "Nisha Agarwal",
    designation: "App Reviewer & Tech Blogger",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
]

  return <AnimatedTestimonials testimonials={testimonials} />;
}
