import { Link } from "react-router-dom";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

export function TypewriterEffectSmoothDemo() {
  const words = [
    { text: "Shop" },
    { text: "fresh" },
    { text: "groceries" },
    { text: "with" },
    {
      text: "SnapMart.",
      className: "text-lg md:text-5xl text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="relative w-full min-h-[32rem] md:min-h-[38rem]">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center" }}
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[32rem] md:min-h-[38rem] px-4 bg-black/40 text-center">
        <p className="text-neutral-200 text-md sm:text-base mb-4 max-w-xl mx-auto drop-shadow md:text-xl">
          The road to freedom starts from here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-center">
          <Link to='/products'>
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Join now
          </button>
          </Link>
          <Link to='/register'>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
            Signup
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
