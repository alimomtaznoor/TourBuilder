

import { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  ImageIcon,
  Type,
  FileText,
  GripVertical,
} from "lucide-react";

export default function EditorPanel({
  onAddStep,
  isDarkMode,
  steps,
  onDeleteStep,
  onUpdateStep,
  onReorderSteps,
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) return;

    const stepData = { title, description };
    if (image) stepData.image = image;

    if (editingStep) {
      onUpdateStep(editingStep.id, stepData);
      setEditingStep(null);
    } else {
      onAddStep(stepData);
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 1500);
    }

    setTitle("");
    setImage("");
    setDescription("");
  };

  const startEditing = (step) => {
    setEditingStep(step);
    setTitle(step.title);
    setImage(step.image || "");
    setDescription(step.description);

    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingStep(null);
    setTitle("");
    setImage("");
    setDescription("");
  };

  const handleReorder = (newSteps) => {
    onReorderSteps(newSteps);
  };

  return (
    <div className="space-y-6">
      {/* the form*/}
      <motion.form
        ref={formRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        onSubmit={handleSubmit}
        className={`p-6 rounded-2xl shadow-xl border backdrop-blur-sm ${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/90 border-gray-200/50"
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
          >
            <Plus className="w-5 h-5 text-white" />
          </motion.div>
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {editingStep ? "Edit Step" : "Add New Step"}
          </h2>
        </div>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <label
              className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <Type className="w-4 h-4" />
              Step Title
            </label>
            <input
              type="text"
              placeholder="Enter step title..."
              className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700"
                  : "bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label
              className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Image URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700"
                  : "bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label
              className={`flex items-center gap-2 text-sm font-medium mb-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              placeholder="Describe what happens in this step..."
              rows={4}
              className={`w-full p-4 rounded-xl border transition-all duration-300 resize-none ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700"
                  : "bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!title || !description || !image}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed cursor-pointer shadow-lg"
          >
            {editingStep ? "Update Step" : "Add Step"}
          </motion.button>

          {editingStep && (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={cancelEditing}
              className={`px-6 py-4 rounded-xl border font-medium transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50/50"
              }`}
            >
              Cancel
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-center font-medium shadow-lg"
            >
              ✨ Step added successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* the drag list */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`p-6 rounded-2xl shadow-xl border backdrop-blur-sm ${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/90 border-gray-200/50"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Your Steps ({steps.length})
          </h3>
          {steps.length > 1 && (
            <div
              className={`text-sm flex items-center gap-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <GripVertical className="w-4 h-4" />
              Drag to reorder
            </div>
          )}
        </div>

        {steps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No steps yet</p>
            <p className="text-sm">Add your first step above to get started!</p>
          </motion.div>
        ) : (
          <Reorder.Group
            axis="y"
            values={steps}
            onReorder={handleReorder}
            className="space-y-3"
            layoutScroll
            style={{ pointerEvents: draggedItem ? "none" : "auto" }}
          >
            {steps.map((step, index) => (
              <Reorder.Item
                key={step.id}
                value={step}
                dragListener={false}
                className="relative"
                onDragStart={() => setDraggedItem(step.id)}
                onDragEnd={() => setDraggedItem(null)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                whileDrag={{
                  scale: 1.05,
                  rotate: 1,
                  zIndex: 50,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.2 },
                }}
                style={{
                  pointerEvents:
                    draggedItem && draggedItem !== step.id ? "none" : "auto",
                }}
              >
                <motion.div
                  className={`p-5 rounded-xl border transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700/70"
                      : "bg-gray-50/50 border-gray-200/50 hover:bg-white/70"
                  } shadow-lg hover:shadow-xl ${
                    draggedItem === step.id ? "shadow-2xl" : ""
                  }`}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* the handle drag */}
                    <Reorder.Item
                      value={step}
                      dragListener={true}
                      className={`mt-1 p-1 rounded cursor-grab active:cursor-grabbing transition-colors ${
                        isDarkMode
                          ? "text-gray-500 hover:text-gray-400 hover:bg-gray-600/50"
                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-200/50"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GripVertical className="w-5 h-5" />
                    </Reorder.Item>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <motion.span
                          className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          key={`step-${index}`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          Step {index + 1}
                        </motion.span>
                      </div>
                      <h4
                        className={`font-semibold mb-2 truncate ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-sm line-clamp-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(step);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteStep(step.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </motion.div>
    </div>
  );
}
