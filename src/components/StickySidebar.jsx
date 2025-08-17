

import { motion } from "framer-motion";

export default function StickySidebar({
  steps,
  currentStep,
  onDotClick,
  isDarkMode,
}) {
  if (steps.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit"
    >
      <div
        className={`text-xs font-bold mb-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        PROGRESS
      </div>

      {steps.map((step, i) => (
        <motion.button
          key={step.id}
          title={step.title}
          onClick={() => onDotClick(i)}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: i * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className={`relative w-5 h-5 rounded-full transition-all duration-500 group cursor-pointer ${
            i === currentStep
              ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50"
              : i < currentStep
              ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50"
              : isDarkMode
              ? "bg-gray-700 border-2 border-gray-600 hover:border-gray-500"
              : "bg-gray-200 border-2 border-gray-300 hover:border-gray-400"
          }`}
        >
          {/* glow effect*/}
          {(i === currentStep || i < currentStep) && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  "0 0 0 8px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}

          {/* the check for completed steps */}
          {i < currentStep && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          )}

          {/* step indicator */}
          {i === currentStep && (
            <motion.div
              className="absolute inset-1 rounded-full bg-white/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}

          {/* tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            whileHover={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-8 top-1/2 -translate-y-1/2 z-50 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-900 text-white"
            } px-4 py-2 rounded-xl shadow-xl text-sm whitespace-nowrap border border-white/10`}
          >
            <div className="font-medium">{step.title}</div>
            <div className="text-xs opacity-70">Step {i + 1}</div>
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-3 rotate-45 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-900"
              } border-l border-b border-white/10`}
            />
          </motion.div>

          {/* the progress line */}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.8 }}
              className={`absolute top-full left-1/2 -translate-x-1/2 w-1 h-10 origin-top rounded-full ${
                i < currentStep
                  ? "bg-gradient-to-b from-green-500 to-emerald-600"
                  : isDarkMode
                  ? "bg-gradient-to-b from-gray-700 to-gray-800"
                  : "bg-gradient-to-b from-gray-300 to-gray-400"
              }`}
            />
          )}
        </motion.button>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`text-xs mt-4 font-medium ${
          isDarkMode ? "text-gray-500" : "text-gray-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          {currentStep + 1} of {steps.length}
        </div>
      </motion.div>
    </motion.div>
  );
}
