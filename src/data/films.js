// Minimal data – lägg till fler projekt här
export const films = [
  {
    slug: "lf-onskechecken",
    title: "Önskechecken – Länsförsäkringar Jönköping",
    videoID: "1151307374",
    credits: `Client LÄNSFÖRSÄKRINGAR JÖNKÖPING
              Agency NY STUDIO
              Production company SAGA PRODUCTION
              Role in project DOP & POST-PRODUCTION`,
  },

  {
    slug: "everyday-getaway",
    title: "Everyday Getaway",
    videoID: "1131833421",
    credits: `Shot on SONY A7IV
Film by GUSTAV WICKSTRÖM
Featuring DAVID LJUNG, MARKUS SJÖHAGE & DANIEL WENGEL`,
  },

  {
    slug: "nassjo-chark-hv-korven",
    title: "HV-korven, en smak av matchen – Nässjö Chark",
    videoID: "1151307501",
    credits: `Client NÄSSJÖ CHARK
              Agency NY STUDIO
              Production company SAGA PRODUCTION
              Role in project DOP & POST-PRODUCTION`,
  },

  {
    slug: "lf-foretagskampanj",
    title: "Företagskampanj – Länsförsäkringar Jönköping",
    videoID: "1151307146",
    credits: `Client LÄNSFÖRSÄKRINGAR JÖNKÖPING
              Agency NY STUDIO
              Production company SAGA PRODUCTION
              Role in project POST-PRODUCTION`,
  },

  {
    slug: "conform-afterwork",
    title: "Afterwork – Conform",
    videoID: "1151306580",
    credits: `Client CONFORM
              Agency NY STUDIO
              Production company SAGA PRODUCTION
              Role in project POST-PRODUCTION`,
  },

  {
    slug: "skate-comeback",
    title: "Skate Comeback",
    videoID: "1132795172",
    credits: `Shot on SONY A7IV
Film by GUSTAV WICKSTRÖM
Music PUNKROCKER – TEDDYBEARS, IGGY POP`,
  },

  {
    slug: "jonkopings-lanstrafik-alternativtrafik",
    title: "Alternativtrafik – Jönköpings Länstrafik",
    videoID: "1151306827",
    credits: `Client LÄNSFÖRSÄKRINGAR JÖNKÖPING
              Agency NY STUDIO
              Production company SAGA PRODUCTION
              Role in project DOP & POST-PRODUCTION`,
  },

  {
    slug: "wernerssons-vinterkampanj",
    title: "Vinterkampanj – Wernerssons",
    videoID: "1151307714",
    credits: `Client WERNERSSONS
              Agency NY STUDIO
              Production company SAGA PRODUCTION
              Role in project DOP & POST-PRODUCTION`,
  },

  {
    slug: "gravity-reversed",
    title: "Gravity Reversed",
    videoID: "1132866158",
    credits: `Shot on SONY A7IV
Film by GUSTAV WICKSTRÖM
Featuring ANDREAS WAHLBERG
Music ELEGIA – NEW ORDER`,
  },

  {
    slug: "z33-blue",
    title: "Z33 Blue",
    videoID: "1132641136",
    credits: `Shot on SONY A7IV
Film by GUSTAV WICKSTRÖM
Featuring OLIVER BLAŽEVIĆ`,
  },
];

export function getFilm(slug) {
  const s = decodeURIComponent(String(slug)).trim().toLowerCase();
  return films.find((f) => String(f.slug).trim().toLowerCase() === s);
}

export function getAllFilmSlugs() {
  return films.map((f) => f.slug);
}
