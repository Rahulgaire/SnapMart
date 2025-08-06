import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate("span", {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      }, {
        duration: 0.3,
        delay: stagger(0.1),
        ease: "easeInOut",
      });
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black opacity-0 hidden`, word.className)}>
                  {char}
                </motion.span>
              ))}
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
 const renderWords = () => (
  <span className="flex flex-nowrap justify-center text-lg md:text-5xl">
    {wordsArray.map((word, idx) => (
      <span
        key={`word-${idx}`}
        className={cn(
          "inline-block align-middle",
          idx < wordsArray.length - 1 ? "mr-1 sm:mr-2 md:mr-3" : ""
        )}
      >
        {word.text.map((char, index) => (
          <span
            key={`char-${index}`}
            className={cn("dark:text-white text-white", word.className)}
          >
            {char}
          </span>
        ))}
      </span>
    ))}
  </span>
);


return (
  <div className={cn("flex space-x-1 my-6 justify-center px-2 overflow-x-auto", className)}>
    <motion.div
      className="overflow-hidden pb-2"
      initial={{ width: "0%" }}
      whileInView={{ width: "fit-content" }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "linear", delay: 1 }}
    >
      <div className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold whitespace-nowrap max-w-full">
        {renderWords()}
      </div>
    </motion.div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className={cn(
        "block rounded-sm w-1.5 h-4 sm:h-6 xl:h-12 bg-blue-500 align-middle",
        cursorClassName
      )}
    />
  </div>
);

};
