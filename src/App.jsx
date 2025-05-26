"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";
import EditorPanel from "./components/EditorPanel";
import Timeline from "./components/TimeLine";
import StickySidebar from "./components/StickySidebar";
import Header from "./components/Header";
import DemoPreview from "./components/DemoPreview";

const initialSteps = [
  {
    id: 1,
    title: "Welcome to Your Product",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=300&fit=crop",
    description:
      "Start your journey with our intuitive dashboard that helps you track everything in one place.",
    highlight: { x: 50, y: 100, width: 200, height: 80 },
  },
  {
    id: 2,
    title: "Explore Key Features",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
    description:
      "Discover powerful analytics and insights that drive your business forward.",
    highlight: { x: 300, y: 150, width: 250, height: 100 },
  },
  {
    id: 3,
    title: "Customize Your Experience",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    description:
      "Personalize your workspace to match your workflow and preferences.",
    highlight: { x: 100, y: 200, width: 300, height: 120 },
  },
];

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

  if (!started) {
    return (
      <LandingPage onStart={() => setStarted(true)} isDarkMode={isDarkMode} />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
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
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DemoPreview
              steps={steps}
              onClose={() => setIsPreviewMode(false)}
              isDarkMode={isDarkMode}
            />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex gap-6 items-start w-full max-w-7xl mx-auto p-6"
          >
            <div className="w-1/3 space-y-6">
              <EditorPanel
                onAddStep={addStep}
                isDarkMode={isDarkMode}
                steps={steps}
                onDeleteStep={deleteStep}
                onUpdateStep={updateStep}
              />
            </div>

            <div className="flex-1 flex gap-6">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
