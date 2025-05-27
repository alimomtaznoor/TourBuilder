

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Clock, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ steps, setCurrentStep, isDarkMode }) {
  const timelineRef = useRef([]);
  const containerRef = useRef(null);
  const progressDotsRef = useRef([]);
  const isInitialized = useRef(false);

  const initializeScrollTriggers = useCallback(() => {
    if (timelineRef.current.length === 0 || !steps.length) return;

    // clear all existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // waiting for next frame to be ready
    requestAnimationFrame(() => {
      timelineRef.current.forEach((el, index) => {
        if (!el) return;

        // scrooll trigger for step track
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            setCurrentStep(index);
            // progress dot animation
            gsap.to(progressDotsRef.current[index], {
              scale: 1.3,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          },
          onEnterBack: () => {
            setCurrentStep(index);
            gsap.to(progressDotsRef.current[index], {
              scale: 1.3,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          },
          onLeave: () => {
            if (index === steps.length - 1) {
              setCurrentStep(index);
            }
            gsap.to(progressDotsRef.current[index], {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            if (index === 0) {
              setCurrentStep(0);
            }
            gsap.to(progressDotsRef.current[index], {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });

        // animation trigger ease
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // stagger animmation for text
        const textElements = el.querySelectorAll(".text-animate");
        gsap.fromTo(
          textElements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // refresh to recalculate positions
      ScrollTrigger.refresh();
      isInitialized.current = true;
    });
  }, [steps, setCurrentStep]);

  useEffect(() => {
    if (steps.length > 0) {
      const timer = setTimeout(() => {
        initializeScrollTriggers();
      }, 100);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [steps, initializeScrollTriggers]);

  useEffect(() => {
    const handleResize = () => {
      if (isInitialized.current) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (steps.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full max-w-4xl mx-auto py-12 md:py-20 text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <Clock className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg md:text-xl font-semibold mb-2">
          No steps in your timeline
        </h3>
        <p className="text-sm md:text-base">
          Add some steps to see your interactive story come to life!
        </p>
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto py-6 md:py-10">
      <div className="mb-8 md:mb-12 text-center px-4">
        <h2
          className={`text-2xl md:text-4xl font-bold mb-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Your Product Story
        </h2>
        <p
          className={`text-base md:text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Scroll through your interactive timeline
        </p>
      </div>

      <div className="relative px-4">
        {/* the progress line */}
        <div
          className={`absolute left-8 md:left-10 top-0 bottom-0 w-1 rounded-full ${
            isDarkMode
              ? "bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700"
              : "bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300"
          }`}
        />

        <div className="space-y-16 md:space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.id}
              data-step
              ref={(el) => (timelineRef.current[index] = el)}
              className="relative"
            >
              {/*progress dots */}
              <div
                ref={(el) => (progressDotsRef.current[index] = el)}
                className={`absolute left-6 md:left-8 w-6 h-6 rounded-full border-4 z-20 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-900 border-blue-500 shadow-lg shadow-blue-500/30"
                    : "bg-white border-blue-500 shadow-lg shadow-blue-500/20"
                }`}
              >
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>

              
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
              </div>

              {/* step no. badge */}
              <div className="absolute left-16 md:left-20 -top-2 z-10">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                >
                  Step {index + 1}
                </motion.span>
              </div>

              {/* card style */}
              <div
                className={`ml-16 md:ml-20 mt-8 rounded-3xl overflow-hidden h-[600px] md:h-[700px] shadow-2xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group relative ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700/50"
                    : "bg-white border-gray-200/50"
                }`}
              >
                {/* bg image with overlay */}
                <div className="absolute inset-0">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

                  {/* pattern overley */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
                </div>

                {/* container */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                  {/* main content */}
                  <div className="space-y-6">
                    <motion.h3
                      className="text-animate text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      className="text-animate text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {step.description}
                    </motion.p>

                    {/* info bar */}
                    <motion.div
                      className="text-animate flex items-center justify-between pt-6 border-t border-white/20"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-300 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                          Duration: ~30 seconds
                        </span>
                        
                      </div>

                      {index < steps.length - 1 && (
                        <motion.div
                          className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm font-medium">Next Step</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* elements */}
                  <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                </div>

                {/* hover effect overley */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-purple-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>

              {/* next step line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  className={`absolute left-7 md:left-9 top-full w-1 h-16 md:h-20 origin-top rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-b from-blue-500 to-purple-600"
                      : "bg-gradient-to-b from-blue-400 to-purple-500"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
