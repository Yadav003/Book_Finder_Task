
# Book Finder

A fast, accessible book search app built with React and Vite. It queries Open Library and shows searchable, paged results with covers, authors, years, and a quick details modal.

- Frontend framework: React 19 + Vite 7
- Styling: Tailwind CSS v4 (via @tailwindcss/vite)
- Linting: ESLint (React Hooks + Fast Refresh rules)
- Data: Open Library Search API

## Demo (local)

- Dev server with HMR: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Getting started

Prerequisites:
- Node.js ≥ 18
- npm ≥ 9 (or use pnpm/yarn accordingly)

Install and run:
```bash
npm install
npm run dev
```

Build and preview:
```bash
npm run build
npm run preview
```

Lint:
```bash
npm run lint
```

Scripts are defined in [package.json](package.json).

## How it works

Data flow:
- Users search via the header or body search boxes.
- The handler in [`Layout`](src/components/Layout.jsx) calls [`searchBooksByTitle`](src/lib/openLibrary.js) and stores results.
- [`Body`](src/components/Body.jsx) renders the grid and opens [`BookModal`](src/components/BookModal.jsx) on item click.
- Cover images use [`coverUrl`](src/lib/openLibrary.js).

Key modules:
- UI shell: [`App`](src/App.jsx) → [`Layout`](src/components/Layout.jsx)
- Search inputs: [`Header`](src/components/Header.jsx), [`Body`](src/components/Body.jsx)
- Banner carousel: [`Banner`](src/components/Banner.jsx)
- Result modal: [`BookModal`](src/components/BookModal.jsx)
- Footer: [`Footer`](src/components/Footer.jsx)
- Styles: [src/index.css](src/index.css), [src/App.css](src/App.css)
- API helpers: [`searchBooksByTitle`](src/lib/openLibrary.js), [`coverUrl`](src/lib/openLibrary.js)
- Entrypoint: [src/main.jsx](src/main.jsx)
- Tooling config: [vite.config.js](vite.config.js), [eslint.config.js](eslint.config.js), [index.html](index.html)

Open Library:
- Search endpoint used: https://openlibrary.org/search.json
- Covers: https://covers.openlibrary.org

Example (API helper usage):
```js
import { searchBooksByTitle, coverUrl } from './src/lib/openLibrary.js';

const data = await searchBooksByTitle('harry potter', { page: 1, limit: 24 });
const first = data.docs[0];
const img = coverUrl(first?.cover_i, 'M');
```

## Features

- Instant search by title (Open Library)
- Responsive grid with cover, title, authors, year
- Image lazy-loading via browser defaults
- Accessible keyboard interactions (Enter/Space to open, Esc to close modal)
- Scroll-lock while modal is open
- Sticky header + HMR-friendly dev setup
- Lightweight banner carousel with quotes

## Project structure

```
book-finder/
  src/
    components/
      Banner.jsx
      Body.jsx
      BookModal.jsx
      Footer.jsx
      Header.jsx
      Layout.jsx
    lib/
      openLibrary.js
    assets/ (banner images, icons)
    App.jsx
    App.css
    index.css
    main.jsx
  index.html
  vite.config.js
  eslint.config.js
  package.json
```

Open the files:
- Components: [src/components](src/components)
- API: [src/lib/openLibrary.js](src/lib/openLibrary.js)
- Entry: [src/main.jsx](src/main.jsx)

## Configuration

Tailwind v4 is enabled via the official Vite plugin in [vite.config.js](vite.config.js). Global base styles are in [src/index.css](src/index.css).

No environment variables are required; all requests go directly to Open Library.

## Accessibility

- Semantic roles on interactive elements
- Keyboard support (Enter/Space to open cards, Esc to close modal)
- Focus styles via Tailwind and native focus handling
- Alt text for images and labelled buttons/controls

## Deployment

This is a static site after build:
1. `npm run build`
2. Deploy the `dist/` folder to any static host (e.g., GitHub Pages, Netlify, Vercel).

## Troubleshooting

- Empty results: ensure a non-empty search term.
- Network errors: Open Library might throttle or be temporarily unavailable; check the console/network tab.

## Acknowledgements

- Open Library (data and covers): https://openlibrary.org

## License

No license file provided. Add one if you plan to distribute
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

