import React from 'react';

const SearchSection: React.FC = () => {
  return (
    <section className="py-24" style={{ backgroundColor: '#b27a5d' }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Find Your Next Chapter</h2>
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <input className="w-full bg-white border-none rounded-lg py-4 pl-12 pr-6 text-mahogany placeholder-gray-400 shadow-lg focus:ring-2 focus:ring-mahogany" placeholder="Search by title, author, or ISBN..." type="text"/>
        </div>
        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {['Fiction', 'History', 'Philosophy', 'Science', 'Poetry'].map((category) => (
            <button key={category} className="bg-white/90 hover:bg-white text-mahogany px-5 py-2 rounded-full text-sm font-bold transition-colors">
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
