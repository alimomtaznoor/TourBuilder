

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DemoPreview({ steps, onClose, isDarkMode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  const imageRef = useRef(null);
  const currentStepRef = useRef(0);

  // updating the refs when currentStep changes
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // zoom animations for the image in DemoPreview when animation is playing
  useEffect(() => {
    if (imageRef.current && steps[currentStep]) {
      const animations = [
        // Center zoom
        { scale: 1.2, x: 0, y: 0 },
        // Left focus
        { scale: 1.3, x: 50, y: -20 },
        // Right focus
        { scale: 1.25, x: -40, y: 30 },
        // Top focus
        { scale: 1.15, x: 20, y: 40 },
        // Bottom focus
        { scale: 1.35, x: -30, y: -50 },
      ];

      const animation = animations[currentStep % animations.length];

      gsap.to(imageRef.current, {
        scale: animation.scale,
        x: animation.x,
        y: animation.y,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [currentStep, steps]);

  // fixed timing auto play logic
  useEffect(() => {
    if (isPlaying && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 0.5; // 0.5% every 50ms = 10 seconds per step

          if (newProgress >= 100) {
            // Move to next only if not the last step
            if (currentStepRef.current < steps.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1);
              return 0; // reseting progress for the next
            } else {
              // completee
              setIsPlaying(false);
              setIsCompleted(true);
              return 100;
            }
          }

          return newProgress;
        });
      }, 50); // smooth prgress update every 50 ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isCompleted, steps.length]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setProgress(0);
      setIsCompleted(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setProgress(0);
      setIsCompleted(false);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const togglePlay = () => {
    if (isCompleted) {
      // when completes, it should restart and play again if you click on play
      restart();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  if (steps.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`max-w-md mx-4 p-6 md:p-8 rounded-2xl text-center shadow-2xl ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h3 className="text-lg md:text-xl font-bold mb-4">
            No Steps to Preview
          </h3>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Add some steps first to see your demo in action.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-blue-400 text-white px-4 md:px-6 py-2 rounded-xl hover:bg-blue-700 cursor-pointer transition-colors shadow-lg"
          >
            Back to Editor
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 md:p-6 border-b ${
            isDarkMode
              ? "border-gray-700 bg-gray-800/50"
              : "border-gray-200 bg-gray-50/50"
          }`}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <h2
              className={`text-lg md:text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Demo Preview
            </h2>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Step {currentStep + 1} of {steps.length}
            </div>
            {isCompleted && (
              <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Completed
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* progress bar */}
        <div className={`h-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((currentStep + progress / 100) / steps.length) * 100
              }%`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-6 md:p-8"
            >
              <div className="aspect-video mb-6 rounded-xl overflow-hidden relative shadow-2xl">
                <img
                  ref={imageRef}
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  className="w-full h-full object-cover"
                  style={{ transformOrigin: "center center" }}
                />

                {/* highlight overlay with animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <motion.div
                    className="absolute border-3 border-blue-400 bg-blue-400/10 rounded-lg shadow-lg backdrop-blur-sm"
                    style={{
                      left: `${currentStepData.highlight?.x || 50}px`,
                      top: `${currentStepData.highlight?.y || 50}px`,
                      width: `${currentStepData.highlight?.width || 200}px`,
                      height: `${currentStepData.highlight?.height || 100}px`,
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <h3
                  className={`text-xl md:text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currentStepData.title}
                </h3>
                <p
                  className={`text-base md:text-lg leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {currentStepData.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div
          className={`flex items-center justify-between p-4 md:p-6 border-t ${
            isDarkMode
              ? "border-gray-700 bg-gray-800/50"
              : "border-gray-200 bg-gray-50/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={restart}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="font-medium">
              {isCompleted ? "Replay" : isPlaying ? "Pause" : "Play"}
            </span>
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className={`p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
