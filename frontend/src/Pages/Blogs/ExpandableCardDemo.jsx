import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../../components/ui/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200">
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top" />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0">
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Fresh and Organic",
    title: "Red Apples",
    src: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    ctaText: "Buy Now",
    ctaLink: "/products/689393a377061388f81f2423",
    content: () => (
      <p>
        These juicy, organic red apples are hand-picked and packed with nutrients.
        Perfect for a healthy snack, baking pies, or juicing.
      </p>
    ),
  },
  {
    description: "Protein Rich",
    title: "Brown Eggs (12 Pack)",
    src: "https://plus.unsplash.com/premium_photo-1676409608997-ad489b8f91d8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvd24lMjBlZ2dzfGVufDB8fDB8fHww",
    ctaText: "Add to Cart",
    ctaLink: "/products/689393a377061388f81f2428",
    content: () => (
      <p>
        Cage-free brown eggs packed with protein and essential vitamins.
        Ideal for breakfast, baking, or fitness meals.
      </p>
    ),
  },
  {
    description: "Daily Essentials",
    title: "Whole Milk (1L)",
    src: "https://plus.unsplash.com/premium_photo-1694481100261-ab16523c4093?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Order Now",
    ctaLink: "/products/689393a377061388f81f2429",
    content: () => (
      <p>
        Fresh and creamy whole milk sourced from local farms.
        Rich in calcium and vitamin D for strong bones.
      </p>
    ),
  },
  {
    description: "Crispy Snack",
    title: "Salted Potato Chips",
    src: "https://plus.unsplash.com/premium_photo-1725878603486-ae76d0b68abe?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Shop Now",
    ctaLink: "/products/68939aec919b2d5e4ab71236",
    content: () => (
      <p>
        Crunchy salted chips made with real potatoes.
        Great for parties, picnics, or your daily snack cravings.
      </p>
    ),
  },
  {
    description: "Premium Grain",
    title: "Basmati Rice (5kg)",
    src: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Buy Now",
    ctaLink: "/products/689393a377061388f81f242b",
    content: () => (
      <p>
        Aromatic long-grain basmati rice. Ideal for biryani, pulao, and special meals.
        Naturally gluten-free and easy to digest.
      </p>
    ),
  },
  {
    description: "Morning Fuel",
    title: "Fresh Bananas (1 Dozen)",
    src: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Grab Now",
    ctaLink: "/products/689393a377061388f81f2422",
    content: () => (
      <p>
        Naturally ripened bananas packed with potassium and fiber.
        Perfect for breakfast or smoothies.
      </p>
    ),
  },
  {
    description: "Hydration Boost",
    title: "Mineral Water (6 Bottles)",
    src: "https://images.unsplash.com/photo-1637905351378-67232a5f0c9b?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Shop Now",
    ctaLink: "/products/68939aec919b2d5e4ab71237",
    content: () => (
      <p>
        Clean and safe mineral water bottles for home or travel.
        Stay hydrated throughout the day.
      </p>
    ),
  },
  {
    description: "Healthy Veggie",
    title: "Fresh Spinach (1 Bunch)",
    src: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Buy Now",
    ctaLink: "/products/689393a377061388f81f2436",
    content: () => (
      <p>
        Fresh green spinach leaves full of iron and antioxidants.
        Great for salads, smoothies, or saag.
      </p>
    ),
  },
  {
    description: "Sweet Delight",
    title: "Alphonso Mangoes (1kg)",
    src: "https://plus.unsplash.com/premium_photo-1674382738984-c010d9649904?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Order Now",
    ctaLink: "/products/68939aec919b2d5e4ab71238",
    content: () => (
      <p>
        Juicy and sweet Alphonso mangoes sourced from Ratnagiri.
        Seasonal fruit, limited stock — get it while it lasts!
      </p>
    ),
  },
];