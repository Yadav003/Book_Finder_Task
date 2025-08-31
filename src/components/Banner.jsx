import React, { useEffect, useMemo, useState } from 'react';
import banner1 from '../assets/banner.jpeg';
import banner2 from '../assets/banner2.avif';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpeg';

const Banner = () => {
  // Use images from src/assets for the banner carousel
  const images = useMemo(
    () => [
      {
        src: banner1,
        alt: 'Books on a wooden table with warm lighting',
        quote: 'A reader lives a thousand lives before he dies.',
        author: 'George R. R. Martin',
      },
      {
        src: banner2,
        alt: 'Abstract reading scene banner',
        quote: 'Today a reader, tomorrow a leader.',
        author: 'Margaret Fuller',
      },
      {
        src: banner3,
        alt: 'Stack of books and cozy reading vibes',
        quote: 'Books are a uniquely portable magic.',
        author: 'Stephen King',
      },
      {
        src: banner4,
        alt: 'Modern bookshelf with assorted titles',
        quote: 'Reading is to the mind what exercise is to the body.',
        author: 'Joseph Addison',
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
  const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
  }, 6000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section className="w-full mt-4 sm:mt-6">
      <div className="w-full px-0">
        <div className="rounded-none bg-transparent shadow-none ring-0 p-0">
          <div className="relative w-full h-56 sm:h-72 md:h-[420px] lg:h-[520px] overflow-hidden">
            {/* Slides */}
            <div
              className="flex h-full w-full transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((img, i) => (
                <div key={i} className="relative w-full h-full shrink-0">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover brightness-75"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Gradient overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                  {/* Quote overlay */}
                  <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
                    <div className="text-center max-w-3xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                        “{img.quote}”
                      </p>
                      <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90">— {img.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={
                    'h-2.5 w-2.5 rounded-full transition-all ' +
                    (i === index ? 'bg-white shadow ring-2 ring-white/60 w-5' : 'bg-white/60 hover:bg-white')
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
