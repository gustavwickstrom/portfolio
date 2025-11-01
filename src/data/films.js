// Minimal data – lägg till fler projekt här
export const films = [
  {
    slug: "everyday-getaway",
    title: "Everyday Getaway",
    videoID: "1131833421",
    credits: `Shot on SONY A7IV
Film by GUSTAV WICKSTRÖM
Featuring DAVID LJUNG, MARKUS SJÖHAGE, DANIEL WENGEL`,
  },
  {
    slug: "z33-blue",
    title: "Z33 Blue",
    videoID: "1132641136",
    credits: `Shot on SONY A7IV
Film by GUSTAV WICKSTRÖM
Featuring OLIVER B`,
  },
];

export function getFilm(slug) {
  return films.find((f) => f.slug === slug);
}

export function getAllFilmSlugs() {
  return films.map((f) => f.slug);
}
