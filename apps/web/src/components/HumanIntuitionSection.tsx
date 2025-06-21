import React, { useRef } from "react";

const HumanIntuitionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 bg-gray-50" id="human-intuition" ref={sectionRef}>
      {" "}
      {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="pulse-chip mb-4">
              <span>AI-Powered Analysis</span>
            </div>
            <h2 className="section-title mb-6">
              Beyond Numbers to True Understanding
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Lominic doesn't just show you graphs and numbers. Our AI analyzes
              your training patterns, understands your goals, and provides
              insights that feel like having a personal coach who knows your
              data inside and out.
            </p>
            <ul className="space-y-4">
              {[
                "Learns from your training history and adapts recommendations over time",
                "Identifies patterns in your performance and recovery that you might miss",
                "Provides context-aware advice based on your current fitness level",
                "Explains complex training concepts in simple, actionable language",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 text-pulse-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Image container div has been removed */}
        </div>
      </div>
    </section>
  );
};

export default HumanIntuitionSection;
