import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";
import EditorPanel from "./components/EditorPanel";
import Timeline from "./components/Timeline";
import StickySidebar from "./components/StickySidebar";
import Header from "./components/Header";
import DemoPreview from "./components/DemoPreview";

import { initialSteps } from "./data/demoSteps";

function App() {
  const [started, setStarted] = useState(false);
  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const addStep = (newStep) => {
    const stepWithId = {
      ...newStep,
      id: Date.now(),
      highlight: { x: 50, y: 50, width: 200, height: 100 },
    };
    setSteps((prev) => [...prev, stepWithId]);
  };

  const deleteStep = (stepId) => {
    setSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  const updateStep = (stepId, updatedStep) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, ...updatedStep } : step
      )
    );
  };

  const reorderSteps = (newSteps) => {
    setSteps(newSteps);
  };

  if (!started) {
    return (
      <LandingPage onStart={() => setStarted(true)} isDarkMode={isDarkMode} />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        stepsCount={steps.length}
      />

      <AnimatePresence mode="wait">
        {isPreviewMode ? (
          <DemoPreview
            key="preview"
            steps={steps}
            onClose={() => setIsPreviewMode(false)}
            isDarkMode={isDarkMode}
          />
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-7xl mx-auto p-4 md:p-6"
          >
            {/* mobile and tablet screen */}
            <div className="lg:hidden space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <EditorPanel
                  onAddStep={addStep}
                  isDarkMode={isDarkMode}
                  steps={steps}
                  onDeleteStep={deleteStep}
                  onUpdateStep={updateStep}
                  onReorderSteps={reorderSteps}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Timeline
                  steps={steps}
                  setCurrentStep={setCurrentStep}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="w-1/3 space-y-6"
              >
                <EditorPanel
                  onAddStep={addStep}
                  isDarkMode={isDarkMode}
                  steps={steps}
                  onDeleteStep={deleteStep}
                  onUpdateStep={updateStep}
                  onReorderSteps={reorderSteps}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex-1 flex gap-6"
              >
                <StickySidebar
                  steps={steps}
                  currentStep={currentStep}
                  onDotClick={(index) => {
                    const target =
                      document.querySelectorAll("[data-step]")[index];
                    if (target) {
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                  isDarkMode={isDarkMode}
                />
                <Timeline
                  steps={steps}
                  setCurrentStep={setCurrentStep}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

