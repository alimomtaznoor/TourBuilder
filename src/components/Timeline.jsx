import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ steps }) {
  const timelineRef = useRef([]);

  useEffect(() => {
    timelineRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [steps]);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 space-y-10">
      {steps.map((step, index) => (
        <div
          key={index}
          ref={(el) => (timelineRef.current[index] = el)}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full md:w-1/3 rounded-md object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
