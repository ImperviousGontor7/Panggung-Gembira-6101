import { firstScrollbar } from "../../news/data/Aurora Vanguard";
import { secondScrollbar } from "../../news/data/Nusantara Legacy";
import { thirdScrollbar } from "../../news/data/Imperial Ascendancy";

export const COLLECTIONS = [
  {
    id: "aurora-vanguard",
    name: "Aurora Vanguard",
    order: 1,
    description: "Rangkaian awal penampilan Impervious Generation dalam Panggung Gembira 6101.",
  },
  {
    id: "nusantara-legacy",
    name: "Nusantara Legacy",
    order: 2,
    description: "Rangkaian penampilan yang mengangkat ragam ekspresi, budaya, dan identitas Nusantara.",
  },
  {
    id: "imperial-ascendancy",
    name: "Imperial Ascendancy",
    order: 3,
    description: "Rangkaian penampilan yang membawa energi dan ekspresi menuju bagian akhir Panggung Gembira 6101.",
  },
];

const SLUG_OVERRIDES = {
  "aurora-vanguard:1": "pg-6101-hadroh",
  "aurora-vanguard:2": "master-of-ceremony",
  "aurora-vanguard:3": "qori-101",
  "aurora-vanguard:4": "sambutan-ketua",
  "aurora-vanguard:5": "grand-opening",
  "aurora-vanguard:6": "patende-style",
  "aurora-vanguard:7": "usa",
  "aurora-vanguard:8": "kabaret-1",
  "nusantara-legacy:1": "aceh-101",
  "nusantara-legacy:2": "choir-6101",
  "nusantara-legacy:3": "kecak-modern",
  "nusantara-legacy:4": "campursari-new-style",
  "nusantara-legacy:5": "salehoreg-fair",
  "nusantara-legacy:6": "garuda-tak-bersayap",
  "nusantara-legacy:7": "yoddha-ka-jogran",
  "nusantara-legacy:8": "arabic-side",
  "nusantara-legacy:9": "nusantara-fighter",
  "imperial-ascendancy:1": "trick",
  "imperial-ascendancy:2": "mr-sugoi",
  "imperial-ascendancy:3": "impervibe",
  "imperial-ascendancy:4": "beat-raw",
  "imperial-ascendancy:5": "kabaret-2",
  "imperial-ascendancy:6": "grand-closing-kita-kesana",
};

const collectionSources = [
  { collection: COLLECTIONS[0], items: firstScrollbar },
  { collection: COLLECTIONS[1], items: secondScrollbar },
  { collection: COLLECTIONS[2], items: thirdScrollbar },
];

function createAboutParagraphs(item, collection) {
  const originalDescription = item.description?.trim() ||
    `${item.title} merupakan salah satu penampilan dalam Panggung Gembira 6101.`;

  return [
    originalDescription,
    `Dalam kelompok ${collection.name}, ${item.title} menjadi bagian dari rangkaian Panggung Gembira 6101. Deskripsi dan identitas penampilan ini memberi pengunjung konteks awal untuk mengenali gagasan serta karakter yang dibawanya.`,
    `Halaman ini menyatukan dokumentasi dan informasi ${item.title} dalam satu arsip digital Impervious Generation. Video, foto penanggung jawab, dan foto dokumentasi dapat dilengkapi melalui data penampilan ketika materi resminya tersedia.`,
  ];
}

function makePerformance(item, collection) {
  const id = `${collection.id}-${item.id}`;
  const slug = SLUG_OVERRIDES[`${collection.id}:${item.id}`];
  if (!slug) throw new Error(`Slug belum ditentukan untuk ${id}`);

  // Kategori dan waktu hanya diisi jika tersedia pada sumber.
  // PG 6101 - HADROH mengikuti label yang terlihat pada referensi desain.
  const isHadroh = slug === "pg-6101-hadroh";
  const category = item.category?.trim() || (isHadroh ? "Seni Musik" : "");
  const time = item.time?.trim() || "";

  return {
    id,
    slug,
    title: item.title,
    displayTitle: isHadroh ? "PG 6101 - HADROH" : `PG 6101 - ${item.title.toUpperCase()}`,
    collectionId: collection.id,
    collectionName: collection.name,
    collectionOrder: collection.order,
    category,
    time,
    shortDescription: item.description || "",
    aboutParagraphs: createAboutParagraphs(item, collection),
    image: item.image || null,
    video: {
      src: null,
      poster: item.image || null,
      duration: isHadroh ? "15:19" : null,
    },
    responsiblePeople: [
      { id: `${id}-responsible-1`, name: "", role: "Penanggung Jawab Acara", photo: null },
      { id: `${id}-responsible-2`, name: "", role: "Penanggung Jawab Acara", photo: null },
    ],
    documentationPhotos: [],
    tags: [],
    likes: 0,
    dislikes: 0,
    // Simpan source item agar field asli tetap dapat ditelusuri saat pengembangan.
    source: {
      originalId: item.id,
      originalTime: item.time || "",
      originalCategory: item.category || "",
    },
  };
}

export const PERFORMANCES = collectionSources.flatMap(({ collection, items }) =>
  items.map((item) => makePerformance(item, collection))
);

export const PERFORMANCE_COUNT = PERFORMANCES.length;

export function getPerformanceBySlug(slug) {
  return PERFORMANCES.find((performance) => performance.slug === slug) || null;
}

export function getCollectionById(collectionId) {
  return COLLECTIONS.find((collection) => collection.id === collectionId) || null;
}

export function getPerformancesByCollection(collectionId) {
  return PERFORMANCES.filter((performance) => performance.collectionId === collectionId);
}
