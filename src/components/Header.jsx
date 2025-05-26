

import { motion } from "framer-motion";
import { Sun, Moon, Play, Edit3, Eye } from "lucide-react";

export default function Header({
  isDarkMode,
  setIsDarkMode,
  isPreviewMode,
  setIsPreviewMode,
  stepsCount,
}) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 border-b backdrop-blur-lg ${
        isDarkMode
          ? "bg-gray-900/80 border-gray-700"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <h1
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Tour Builder
            </h1>
          </motion.div>

          <div
            className={`text-sm px-3 py-1 rounded-full ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {stepsCount} steps
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isPreviewMode
                ? "bg-blue-600 text-white"
                : isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isPreviewMode ? (
              <Edit3 className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {isPreviewMode ? "Edit" : "Preview"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
