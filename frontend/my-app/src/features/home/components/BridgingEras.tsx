import React from 'react';
import bridgingImg from '../../../assets/tab over book.jpg';

const BridgingEras: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
          <img alt="Bridging Eras" className="w-full h-full object-cover" src={bridgingImg}/>
        </div>
        <div className="max-w-md text-center md:text-left order-1 md:order-2 mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Bridging Eras.</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Trade your physical library for digital credits, or find a new home for your pre-loved favorites. We believe every book deserves to be read, whether illuminated by a bedside lamp or a backlit screen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-mahogany text-white px-8 py-3 rounded-custom text-sm font-bold tracking-widest uppercase hover:bg-mahogany-dark transition-colors">
              Start a Trade
            </button>
            <button className="border border-mahogany text-mahogany px-8 py-3 rounded-custom text-sm font-bold tracking-widest uppercase hover:bg-mahogany-dark hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgingEras;
