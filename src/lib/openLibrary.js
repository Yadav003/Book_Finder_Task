export async function searchBooksByTitle(title, { page = 1, limit = 20 } = {}) {
  const q = encodeURIComponent(title?.trim() || '');
  if (!q) return { docs: [], numFound: 0 };
  const url = `https://openlibrary.org/search.json?title=${q}&page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = await res.json();
  return data;
}

export function coverUrl(coverId, size = 'M') {
  if (!coverId) return null;
  // Sizes: S, M, L
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
