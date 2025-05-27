

import { motion } from "framer-motion";
import { Play, Sparkles, Zap, Target } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage({ onStart, isDarkMode }) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const texts = [
    "Is Easy to use",
    "Is Interactive ",
    "Is Engaging",
    "Isn't Boring",
  ];

  useEffect(() => {
    const currentPhrase = texts[loopIndex % texts.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          setCurrentText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex === 0) {
            setIsDeleting(false);
            setLoopIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, loopIndex]);


  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Create demos in minutes, not hours",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Pixel Perfect",
      description: "Beautiful, interactive experiences",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Engaging",
      description: "Captivate your audience with smooth animations",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              y: [null, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-5xl mx-auto"
        >
          {/* the announcement badge with light crossing effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 text-sm shadow-xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "linear",
              }}
            />

            <Sparkles className="w-4 h-4 text-yellow-400 relative z-10" />
            <span className="font-medium relative z-10">
              Announcing Marvedge Tour Builder
            </span>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full font-bold relative z-10">
              New
            </span>
          </motion.div>

          {/* the headline with typewriter effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-4xl md:text-5xl lg:text-8xl font-bold mb-6 leading-tight text-center"
          >
            <span className="block"> Tour Builder That</span>

            <span className="block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {currentText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1 h-[0.8em] bg-blue-400 ml-1 align-baseline"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Create interactive demos that convert — in minutes, not hours. Build
            engaging product tours with smooth animations and visual
            storytelling.
          </motion.p>

          {/* call to actioon buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transition-all duration-500 flex items-center gap-3 justify-center cursor-pointer"
            >
              <Play className="w-5 h-5" />
              Get started for free
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-500 cursor-pointer shadow-xl"
            >
              Watch demo
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.1,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2 + index * 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* demo preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.5,
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mt-20 max-w-6xl mx-auto px-4"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 shadow-2xl">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <img
                    src="/bglogo.png"
                    className="w-20 h-20 text-blue-400 mx-auto mb-4"
                  />
                </motion.div>
                <p className="text-gray-400 text-lg font-medium">
                  Marvedge Demo Preview
                </p>
              </div>

              {/* background grid */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    initial={{
                      x: Math.random() * 800,
                      y: Math.random() * 400,
                    }}
                    animate={{
                      x: Math.random() * 800,
                      y: Math.random() * 400,
                    }}
                    transition={{
                      duration: Math.random() * 10 + 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
