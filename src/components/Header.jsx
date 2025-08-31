import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchTerm);
  };

  return (
    <header className="bg-sky-500 text-white py-3 shadow-lg sticky top-0 z-50">
      <div className="w-full px-0">
        {/* Mobile: stacked, Desktop: 3 columns */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:items-center md:gap-4">
          {/* Logo - left */}
          <div className="flex items-center order-1 md:order-1 pl-3 sm:pl-4 md:pl-6">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center mr-3 shadow">
              <span className="text-sky-600 font-bold text-lg" aria-hidden>📚</span>
            </div>
          </div>

          {/* Title - center */}
          <div className="order-2 md:order-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Book Finder</h1>
          </div>

          {/* Search - right (full width on mobile) */}
          <div className="order-3 md:order-3 md:justify-self-end md:w-full">
            <form onSubmit={handleSearch} className="w-full md:w-80">
              <label htmlFor="header-search" className="sr-only">Search books</label>
              <div className="relative">
                <input
                  id="header-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search books..."
                  className="w-full h-10 rounded-full bg-white/95 text-slate-800 placeholder-slate-500 pl-4 pr-10 border border-white/60 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/70"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-700 p-0 bg-transparent border-0"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
