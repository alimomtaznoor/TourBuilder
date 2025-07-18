

import { motion } from "framer-motion";
import { Sun, Moon, Edit3, Eye } from "lucide-react";

export default function Header({
  isDarkMode,
  setIsDarkMode,
  isPreviewMode,
  setIsPreviewMode,
  stepsCount,
}) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`sticky top-0 z-20 border-b backdrop-blur-2xl ${
        isDarkMode
          ? "bg-gray-900/90 border-gray-700/50"
          : "bg-white/90 border-gray-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <img src="bglogo.png" width={32} height={32} className="w-6 h-6 md:w-14 md:h-14 text-white" />
            </div>
            <h1
              className={`text-lg md:text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Tour Builder
            </h1>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full ${
              isDarkMode
                ? "bg-gray-800/80 text-gray-300"
                : "bg-gray-100/80 text-gray-600"
            }`}
          >
            {stepsCount} steps
          </motion.div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer text-sm md:text-base shadow-lg ${
              isPreviewMode
                ? "bg-blue-600 text-white shadow-blue-500/25"
                : isDarkMode
                ? "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 shadow-gray-900/25"
                : "bg-white/80 text-gray-700 hover:bg-gray-50/80 shadow-gray-900/10"
            }`}
          >
            {isPreviewMode ? (
              <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <Eye className="w-3 h-3 md:w-4 md:h-4" />
            )}
            <span className="hidden sm:inline">
              {isPreviewMode ? "Edit" : "Preview"}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl transition-all duration-300 cursor-pointer shadow-lg ${
              isDarkMode
                ? "bg-gray-800/80 text-yellow-400 hover:bg-gray-700/80 shadow-gray-900/25"
                : "bg-white/80 text-gray-600 hover:bg-gray-50/80 shadow-gray-900/10"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Moon className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
