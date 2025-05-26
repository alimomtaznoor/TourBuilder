import { useEffect } from "react";

export default function StickySidebar({ steps, currentStep, onDotClick }) {
  return (
    <div className="hidden md:flex flex-col gap-4 sticky top-24 h-fit px-4">
      {steps.map((step, i) => (
        <button
          key={i}
          title={step.title}
          onClick={() => onDotClick(i)}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 relative group
            ${
              i === currentStep
                ? "bg-blue-600 border-blue-600 scale-125"
                : "border-gray-400"
            }
          `}
        >
          <span className="absolute left-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all text-sm bg-gray-800 text-white px-2 py-1 rounded shadow">
            {step.title}
          </span>
        </button>
      ))}
    </div>
  );
}
