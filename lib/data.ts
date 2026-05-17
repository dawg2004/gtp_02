import type { ArticleItem, EventCategory, EventItem, VideoItem } from "./types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const events: EventItem[] = [
  {
    id: "evt-001",
    slug: "fermentation-workshop",
    title: "Fermentation Workshop",
    subtitle: "Exploring traditional flavors & modern techniques with Chef Miri.",
    category: "Workshop",
    date: "2025-05-18",
    time: "11:00 AM - 2:00 PM",
    location: "Good Time Studio",
    image: img("photo-1556911220-bff31c812dba"),
    description: "A hands-on studio workshop covering koji, seasonal vegetables, and simple fermentation rituals for home kitchens.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    reportBody:
      "Chef Miri guided guests through the rhythm of slow food: preparing brines, tasting aged condiments, and learning how patience changes texture and aroma. The afternoon ended around the studio table with small plates, notes, and a shared tasting flight.",
    host: {
      name: "Miri Tanaka",
      title: "Fermentation Chef & Food Educator",
      bio: "Miri teaches seasonal preservation, Japanese pantry fundamentals, and practical fermentation for creative studios and home cooks.",
      image: img("photo-1494790108377-be9c29b29330"),
    },
    status: "published",
  },
  {
    id: "evt-002",
    slug: "pasta-making-class-with-chef-leo",
    title: "Pasta Making Class with Chef Leo",
    category: "Cooking",
    date: "2025-06-02",
    time: "6:30 PM - 9:00 PM",
    location: "Kitchen Studio",
    image: img("photo-1551183053-bf91a1d81141"),
    description: "Fresh dough, filled pasta, and an intimate dinner format led by Chef Leo.",
    status: "published",
  },
  {
    id: "evt-003",
    slug: "jazz-in-the-studio",
    title: "Jazz in the Studio",
    category: "Music",
    date: "2025-06-12",
    time: "8:00 PM - 10:00 PM",
    location: "Main Studio",
    image: img("photo-1511192336575-5a79af67a629"),
    description: "A warm live session with a compact quartet, natural wine, and late-night conversation.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    status: "scheduled",
  },
  {
    id: "evt-004",
    slug: "creator-talk-vol-2",
    title: "Creator Talk: Vol. 2",
    category: "Talk",
    date: "2025-04-26",
    time: "7:00 PM - 8:30 PM",
    location: "Gallery Room",
    image: img("photo-1517245386807-bb43f82c33c4"),
    description: "A focused conversation on sustainable creative practice and community building.",
    status: "published",
  },
  {
    id: "evt-005",
    slug: "film-photography-walk",
    title: "Film Photography Walk",
    category: "Photo Walk",
    date: "2025-03-22",
    time: "9:30 AM - 12:00 PM",
    location: "Studio Courtyard",
    image: img("photo-1500530855697-b586d89ba3ee"),
    description: "A neighborhood route designed for analog cameras, observation, and quiet composition.",
    status: "draft",
  },
  {
    id: "evt-006",
    slug: "analog-nights-live-session",
    title: "Analog Nights Live Session",
    category: "Music",
    date: "2025-02-14",
    time: "8:30 PM - 11:00 PM",
    location: "Listening Room",
    image: img("photo-1493225457124-a3eb161ffa5f"),
    description: "Live ambient sets recorded to tape in the studio listening room.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    status: "published",
  },
  {
    id: "evt-007",
    slug: "bread-baking-workshop",
    title: "Bread Baking Workshop",
    category: "Workshop",
    date: "2025-01-19",
    time: "10:00 AM - 1:00 PM",
    location: "Kitchen Studio",
    image: img("photo-1509440159596-0249088772ff"),
    description: "A tactile introduction to dough, heat, scoring, and shared table service.",
    status: "published",
  },
  {
    id: "evt-008",
    slug: "photography-exhibition",
    title: "Photography Exhibition",
    category: "Exhibition",
    date: "2024-12-07",
    time: "12:00 PM - 7:00 PM",
    location: "Gallery Room",
    image: img("photo-1492724441997-5dc865305da7"),
    description: "A weekend exhibition of still-life and studio documentary photography.",
    status: "published",
  },
  {
    id: "evt-009",
    slug: "sourdough-basics",
    title: "Sourdough Basics",
    category: "Cooking",
    date: "2024-11-16",
    time: "10:30 AM - 1:30 PM",
    location: "Kitchen Studio",
    image: img("photo-1586444248902-2f64eddc13df"),
    description: "Starter care, shaping, timing, and a realistic home baking schedule.",
    status: "published",
  },
  {
    id: "evt-010",
    slug: "vinyl-listening-session",
    title: "Vinyl Listening Session",
    category: "Music",
    date: "2024-10-04",
    time: "7:30 PM - 10:00 PM",
    location: "Listening Room",
    image: img("photo-1461360370896-922624d12aa1"),
    description: "A slow listening night curated from jazz, soul, and contemporary ambient records.",
    status: "published",
  },
  {
    id: "evt-011",
    slug: "the-business-of-creativity",
    title: "The Business of Creativity",
    category: "Talk",
    date: "2024-09-12",
    time: "6:30 PM - 8:00 PM",
    location: "Main Studio",
    image: img("photo-1556761175-b413da4baf72"),
    description: "Pricing, positioning, and collaboration models for independent creative teams.",
    status: "published",
  },
];

export const articles: ArticleItem[] = events.slice(0, 5).map((event, index) => ({
  id: `art-00${index + 1}`,
  title: `${event.title}: Studio Report`,
  slug: `${event.slug}-report`,
  date: event.date,
  image: event.image,
  category: event.category,
  excerpt: event.description,
}));

export const videos: VideoItem[] = events
  .filter((event) => event.youtubeUrl)
  .map((event, index) => ({
    id: `vid-00${index + 1}`,
    title: event.title,
    duration: index === 0 ? "12:48" : "08:24",
    thumbnail: event.image,
    youtubeUrl: event.youtubeUrl ?? "",
  }));

export const categories: EventCategory[] = ["Workshop", "Music", "Talk", "Photo Walk", "Cooking", "Exhibition"];

export const partners = ["LA MARZOCCO", "Aesop.", "creative allies", "OLYMPUS", "NOTION PRESS", "GOOD HOOD", "P&Co"];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}
