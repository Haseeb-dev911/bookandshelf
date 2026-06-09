import React from "react";
import type { Feature } from "../types";

const features: Feature[] = [
  {
    id: "1",
    title: "Curated Classics",
    description: "Hand-selected vintage treasures and modern masterpieces.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    ),
  },
  {
    id: "2",
    title: "Sustainable Reading",
    description: "Give every book a second life and reduce waste.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    ),
  },
  {
    id: "3",
    title: "Global Rare Finds",
    description: "Access to a worldwide network of rare and used book seekers.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  },
  {
    id: "4",
    title: "Secure Exchange",
    description:
      "Safe, verified trades for your physical and digital libraries.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    ),
  },
];

const TrustBar: React.FC = () => {
  return (
    <section className=" py-24 border-b border-surface-dim">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4"
          >
            <div className="bg-surface-dim p-2 rounded-lg shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-600 hidden md:block">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
