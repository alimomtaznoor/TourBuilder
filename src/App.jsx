import { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

import StepPreviewPanel from "./components/StepPreviewPanel";
import EditorPanel from "./components/EditorPanel";
import LandingPage from "./components/LandingPage";

const initialSteps = [
  {
    title: "Welcome to the Tour",
    image: "https://via.placeholder.com/600x300?text=Step+1",
    description: "Discover how to get started with our product.",
  },
];

function App() {
  const [started, setStarted] = useState(false);
  const [steps, setSteps] = useState(initialSteps);
  const [current, setCurrent] = useState(0);

  const nextStep = () => setCurrent((prev) => (prev + 1) % steps.length);
  const addStep = (newStep) => setSteps((prev) => [...prev, newStep]);

  if (!started) return <LandingPage onStart={() => setStarted(true)} />;

  return (
    <>
      <StepPreviewPanel steps={steps} current={current} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-8 p-6">
        <h1 className="text-3xl font-bold">Interactive Product Tour</h1>

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow p-6 w-full max-w-xl text-center"
        >
          <img
            src={steps[current].image}
            alt={steps[current].title}
            className="w-full mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold">{steps[current].title}</h2>
          <p className="text-gray-600">{steps[current].description}</p>
          <button
            onClick={nextStep}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next Step
          </button>
        </motion.div>

        <EditorPanel onAddStep={addStep} />
      </div>
    </>
  );
}

export default App;
