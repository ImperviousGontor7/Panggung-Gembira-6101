import Hero from "../../../assets/images/Jami Emas.webp";

// The six primary folders shown on the Gallery landing page.
export const memoryCollections = [
  {
    value: "2025",
    label: "2025",
    type: "year",
    eyebrow: "YEAR ARCHIVE",
    description: "Moments collected throughout 2025.",
  },
  {
    value: "2024",
    label: "2024",
    type: "year",
    eyebrow: "YEAR ARCHIVE",
    description: "A look back at 2024.",
  },
  {
    value: "friends",
    label: "Friends",
    type: "category",
    eyebrow: "COLLECTION",
    description: "The people who made the moments memorable.",
  },
  {
    value: "school-life",
    label: "School Life",
    type: "category",
    eyebrow: "COLLECTION",
    description: "Everyday moments from school life.",
  },
  {
    value: "events",
    label: "Events",
    type: "category",
    eyebrow: "COLLECTION",
    description: "Gatherings, celebrations, and shared occasions.",
  },
  {
    value: "trips",
    label: "Trips",
    type: "category",
    eyebrow: "COLLECTION",
    description: "Places visited and journeys remembered.",
  },
];

// Filters displayed inside the collection view.
export const memoryFilters = [
  { label: "All Memories", value: "all" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
  { label: "Friends", value: "friends" },
  { label: "School Life", value: "school-life" },
  { label: "Events", value: "events" },
  { label: "Trips", value: "trips" },
];

export const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

// Existing archive records are retained. Replace the image references with
// the corresponding archive photographs when the final photo mapping exists.
export const memoriesData = [
  {
    id: 1,
    title: "First Day Together",
    date: "2025-01-12",
    categoryKey: "school-life",
    categoryLabel: "School Life",
    likes: "",
    image: Hero,
  },
  {
    id: 2,
    title: "Class Photo Day",
    date: "2025-01-28",
    categoryKey: "school-life",
    categoryLabel: "School Life",
    likes: "",
    image: Hero,
  },
  {
    id: 3,
    title: "Sunset Hangout",
    date: "2025-02-14",
    categoryKey: "friends",
    categoryLabel: "Friends",
    likes: "",
    image: Hero,
  },
  {
    id: 4,
    title: "Dita’s Birthday",
    date: "2025-03-03",
    categoryKey: "events",
    categoryLabel: "Events",
    likes: "",
    image: Hero,
  },
  {
    id: 5,
    title: "Beach Trip",
    date: "2025-03-21",
    categoryKey: "trips",
    categoryLabel: "Trips",
    likes: "",
    image: Hero,
  },
  {
    id: 6,
    title: "Spring Walk",
    date: "2025-04-05",
    categoryKey: "trips",
    categoryLabel: "Trips",
    likes: "",
    image: Hero,
  },
  {
    id: 7,
    title: "School Event",
    date: "2025-04-17",
    categoryKey: "events",
    categoryLabel: "Events",
    likes: "",
    image: Hero,
  },
  {
    id: 8,
    title: "Picnic Day",
    date: "2025-05-01",
    categoryKey: "friends",
    categoryLabel: "Friends",
    likes: "",
    image: Hero,
  },
  {
    id: 9,
    title: "Freedom Moments",
    date: "2025-05-20",
    categoryKey: "friends",
    categoryLabel: "Friends",
    likes: "",
    image: Hero,
  },
  {
    id: 10,
    title: "Study Session",
    date: "2025-05-31",
    categoryKey: "school-life",
    categoryLabel: "School Life",
    likes: "",
    image: Hero,
  },
  {
    id: 11,
    title: "Workshop Memory",
    date: "2024-07-18",
    categoryKey: "events",
    categoryLabel: "Events",
    likes: "",
    image: Hero,
  },
  {
    id: 12,
    title: "Old Class Trip",
    date: "2024-09-02",
    categoryKey: "trips",
    categoryLabel: "Trips",
    likes: "",
    image: Hero,
  },
];
