import React, { useCallback, useRef, useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import Body from './Body';
import Footer from './Footer';
import { searchBooksByTitle } from '../lib/openLibrary';
import BookModal from './BookModal';

const Layout = () => {
  const [results, setResults] = useState({ docs: [], numFound: 0, loading: false, error: null });
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const resultsRef = useRef(null);

  const onSearch = useCallback(async (term) => {
    const title = String(term || '').trim();
    if (!title) {
      setResults({ docs: [], numFound: 0, loading: false, error: null });
      return;
    }
    try {
      setResults((r) => ({ ...r, loading: true, error: null }));
      const data = await searchBooksByTitle(title, { limit: 24 });
      setResults({ docs: data.docs ?? [], numFound: data.numFound ?? 0, loading: false, error: null });
      // Scroll to results after search from navbar
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (e) {
      setResults({ docs: [], numFound: 0, loading: false, error: e.message || 'Search failed' });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onSearch={onSearch} />
      <Banner />
      <div ref={resultsRef} />
      <Body
        results={results}
        onSearch={onSearch}
        onBookClick={(book) => {
          setSelected(book);
          setOpen(true);
        }}
      />
      <Footer />
      <BookModal open={open} book={selected} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Layout;
