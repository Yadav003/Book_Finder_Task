import React, { useMemo, useState } from 'react';
import { coverUrl } from '../lib/openLibrary';

const Body = ({ results, onSearch, onBookClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchTerm);
  };

  const loading = results?.loading;
  const error = results?.error;

  const items = useMemo(() => (results?.docs ?? []).slice(0, 24), [results?.docs]);

  return (
    <main className="w-full px-0 py-8 sm:py-10 lg:py-12 flex-grow bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books..."
              className="flex-grow h-12 px-4 border-2 border-sky-200 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base"
            />
            <button
              type="submit"
              className="h-12 bg-sky-500 text-white px-6 rounded-lg sm:rounded-l-none hover:bg-sky-600 transition duration-300 font-semibold text-base shadow-md"
            >
              Search
            </button>
          </div>
        </form>

        {/* Status states */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <span className="sr-only">Loading books…</span>
            <div className="flex gap-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.2s]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && items.length === 0 && (
          <div className="bg-sky-50 p-6 sm:p-8 lg:p-10 rounded-xl text-center shadow-sm border border-sky-100">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-sky-800">
              Book Results
            </h3>
            <p className="text-sky-700 text-base sm:text-lg">
              Search results will appear here
            </p>
          </div>
        )}

        {/* Grid results */}
        {!loading && !error && items.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((b, idx) => {
              const img = coverUrl(b.cover_i, 'M');
              const title = b.title ?? 'Untitled';
              const authors = (b.author_name ?? []).slice(0, 2).join(', ');
              const year = b.first_publish_year ?? '';
              return (
                <li
                  key={`${b.key || idx}`}
                  className="group bg-white rounded-lg border border-sky-100 shadow-sm overflow-hidden hover:shadow transition cursor-pointer"
                  onClick={() => onBookClick && onBookClick(b)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onBookClick && onBookClick(b);
                    }
                  }}
                >
                  <div className="aspect-[3/4] bg-sky-50 overflow-hidden">
                    {img ? (
                      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sky-400">No cover</div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-slate-900 line-clamp-2">{title}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">{authors}</p>
                    {year && <p className="text-xs text-slate-500 mt-1">{year}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Body;
