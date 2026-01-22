/**
 * ============================================
 * ARTWORKS CONFIGURATION FILE
 * ============================================
 * 
 * HOW TO ADD YOUR ARTWORK:
 * 1. Add your image/video files to the 'public/' folder
 * 2. Add an entry to the 'artworks' array below
 * 3. Save and your artwork will appear on the site!
 * 
 * Supported formats: JPG, JPEG, PNG, GIF, WebP, MP4
 * 
 * Each artwork needs:
 * - id: A unique number
 * - title: Name of your artwork
 * - description: Short description
 * - category: 'sketch', 'pixel', 'doodle', 'digital', 'animation', or '3d'
 * - image: Path to the image/video (in public/)
 * - type: 'image' or 'video'
 * - featured: true/false (featured items appear larger)
 */

export const artworks = [
  // ============================================
  // DIGITAL ART
  // ============================================
  {
    id: 1,
    title: "Girl",
    description: "Character illustration",
    category: "digital",
    image: "/girl.jpeg",
    type: "image",
    featured: true
  },
  {
    id: 2,
    title: "Guy In Black",
    description: "Digital portrait artwork",
    category: "digital",
    image: "/guy_in_black.jpeg",
    type: "image",
    featured: false
  },
  {
    id: 3,
    title: "Ghost",
    description: "Spooky character art",
    category: "digital",
    image: "/ghost.jpeg",
    type: "image",
    featured: false
  },
  {
    id: 4,
    title: "Person Under Light",
    description: "Lighting and atmosphere exploration",
    category: "digital",
    image: "/person_under_light.jpeg",
    type: "image",
    featured: false
  },
  {
    id: 5,
    title: "Mute Person",
    description: "Character concept",
    category: "digital",
    image: "/mute_person.jpeg",
    type: "image",
    featured: false
  },
  {
    id: 6,
    title: "Person",
    description: "Figure study",
    category: "digital",
    image: "/person.jpeg",
    type: "image",
    featured: false
  },

  // ============================================
  // PIXEL ART
  // ============================================
  {
    id: 7,
    title: "Fox",
    description: "Cute pixel fox",
    category: "pixel",
    image: "/fox.jpeg",
    type: "image",
    featured: true
  },
  {
    id: 8,
    title: "Rabbit",
    description: "Pixel bunny character",
    category: "pixel",
    image: "/rabbit.jpeg",
    type: "image",
    featured: false
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  {
    id: 9,
    title: "Coffee Animation",
    description: "Animated coffee cup",
    category: "animation",
    image: "/coffee.mp4",
    type: "video",
    featured: true
  },
  {
    id: 10,
    title: "Coffee Animation 2",
    description: "Another coffee animation",
    category: "animation",
    image: "/coffee2.mp4",
    type: "video",
    featured: false
  },
  {
    id: 11,
    title: "Shirt Design",
    description: "Animated shirt concept",
    category: "animation",
    image: "/shirt.mp4",
    type: "video",
    featured: false
  },
  {
    id: 12,
    title: "Vibing",
    description: "Fun vibing animation",
    category: "animation",
    image: "/vibing.mp4",
    type: "video",
    featured: true
  },
];

// Helper function to get artworks by category
export function getArtworksByCategory(category) {
  if (category === 'all') return artworks.filter(art => art.category !== '3d');
  return artworks.filter(art => art.category === category);
}

// Get 2D artworks only (images + animations)
export function get2DArtworks() {
  return artworks.filter(art => art.category !== '3d');
}

// Get 3D artworks only
export function get3DArtworks() {
  return artworks.filter(art => art.category === '3d');
}

// Get featured artworks
export function getFeaturedArtworks() {
  return artworks.filter(art => art.featured);
}
