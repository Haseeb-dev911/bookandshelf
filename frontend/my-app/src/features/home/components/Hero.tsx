import React from 'react';
import heroImg from '../../../assets/hero img.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[650px] overflow-hidden bg-surface" id="hero">
      <img alt="Elegant Home Library" className="absolute inset-0 w-full h-full object-cover object-top opacity-90" src={heroImg}/>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
      
      {/* Surface color gradient at the bottom to blend with the next section */}
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white pb-16 pt-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl leading-tight drop-shadow-md">The Tactile Soul of Every Story.</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl font-light opacity-95 drop-shadow-sm">Explore a curated collection of rare pre-loved treasures and modern digital classics.</p>
        <button className="bg-mahogany hover:bg-mahogany-dark text-white px-10 py-3 rounded-custom text-sm font-bold tracking-widest transition-colors uppercase shadow-lg">
          Begin Exploring
        </button>
      </div>
    </section>
  );
};

export default Hero;
