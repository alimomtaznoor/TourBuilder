"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Clock, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ steps, setCurrentStep, isDarkMode }) {
  const timelineRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current.length === 0) return;

    // Clear previous ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    timelineRef.current.forEach((el, index) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentStep(index),
        onEnterBack: () => setCurrentStep(index),
      });

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [steps, setCurrentStep]);

  if (steps.length === 0) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto py-20 text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">
          No steps in your timeline
        </h3>
        <p>Add some steps to see your interactive story come to life!</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Your Product Story
        </h2>
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Scroll through your interactive timeline
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className={`absolute left-8 top-0 bottom-0 w-0.5 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              data-step
              ref={(el) => (timelineRef.current[index] = el)}
              initial={{ opacity: 0, y: 50 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                  isDarkMode
                    ? "bg-gray-900 border-blue-500"
                    : "bg-white border-blue-500"
                } shadow-lg z-10`}
              />

              {/* Step number */}
              <div className="absolute left-20 -top-1">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    isDarkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  Step {index + 1}
                </span>
              </div>

              {/* Content card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`ml-20 mt-6 rounded-xl shadow-lg border overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <div className="relative overflow-hidden">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-48 md:h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>

                  <div className="md:w-3/5 p-6">
                    <h3
                      className={`text-xl font-bold mb-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-base leading-relaxed mb-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {step.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Duration: ~30 seconds
                      </div>

                      {index < steps.length - 1 && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <span className="text-sm font-medium">Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connector line to next step */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className={`absolute left-7 top-full w-0.5 h-12 ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-400"
                  } origin-top`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
