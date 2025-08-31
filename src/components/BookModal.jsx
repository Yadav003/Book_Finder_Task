import React, { useEffect } from 'react';
import { coverUrl } from '../lib/openLibrary';

const BookModal = ({ open, book, onClose }) => {
  // Setup and side effects must run consistently; toggle scroll lock when `open`
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || !book) return null;
  const img = coverUrl(book.cover_i, 'L');
  const title = book.title ?? 'Untitled';
  const authors = (book.author_name ?? []).join(', ');
  const year = book.first_publish_year ?? '';
  const workKey = book.key; // e.g., '/works/OL...'
  const openLibUrl = workKey ? `https://openlibrary.org${workKey}` : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close" />
      <div className="relative bg-white w-[92%] max-w-3xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-200">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
        >
          ✕
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 overflow-y-auto">
          <div className="sm:col-span-1 rounded-lg overflow-hidden bg-sky-50 aspect-[3/4] flex items-center justify-center">
            {img ? (
              <img src={img} alt={title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sky-400">No cover</span>
            )}
          </div>
          <div className="sm:col-span-2 flex flex-col items-center justify-center text-center p-2">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
            {authors && <p className="text-slate-600">{authors}</p>}
            {year && <p className="text-slate-500 mt-1">First published: {year}</p>}
            {openLibUrl && (
              <a
                href={openLibUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                View on Open Library
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
