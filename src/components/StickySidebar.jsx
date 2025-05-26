"use client";

import { motion } from "framer-motion";

export default function StickySidebar({
  steps,
  currentStep,
  onDotClick,
  isDarkMode,
}) {
  if (steps.length === 0) return null;

  return (
    <div className="hidden lg:flex flex-col gap-3 sticky top-32 h-fit">
      <div
        className={`text-xs font-medium mb-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Progress
      </div>

      {steps.map((step, i) => (
        <motion.button
          key={step.id}
          title={step.title}
          onClick={() => onDotClick(i)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 group ${
            i === currentStep
              ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/30"
              : i < currentStep
              ? "bg-green-500 border-green-500"
              : isDarkMode
              ? "border-gray-600 hover:border-gray-500"
              : "border-gray-400 hover:border-gray-600"
          }`}
        >
          {/* Tooltip */}
          <div
            className={`absolute left-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 z-50 ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
            } px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap`}
          >
            {step.title}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-900"
              }`}
            />
          </div>

          {/* Progress line */}
          {i < steps.length - 1 && (
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 ${
                i < currentStep
                  ? "bg-green-500"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
            />
          )}
        </motion.button>
      ))}

      <div
        className={`text-xs mt-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
}
