/**
 * ============================================
 * ARTWORKS CONFIGURATION FILE
 * ============================================
 * 
 * HOW TO ADD YOUR ARTWORK:
 * 1. Add your image files to the 'public/artworks/' folder
 * 2. Add an entry to the 'artworks' array below
 * 3. Save and your artwork will appear on the site!
 * 
 * Each artwork needs:
 * - id: A unique number
 * - title: Name of your artwork
 * - description: Short description
 * - category: 'sketch', 'pixel', 'doodle', 'digital', or '3d'
 * - image: Path to the image (in public/artworks/)
 * - featured: true/false (featured items appear larger)
 */

export const artworks = [
  // ============================================
  // 2D ART - SKETCHES
  // ============================================
  // Example entry (uncomment and modify):
  // {
  //   id: 1,
  //   title: "Character Study",
  //   description: "Pencil sketch exploration of game character",
  //   category: "sketch",
  //   image: "/artworks/sketch-1.jpg",
  //   featured: false
  // },

  // ============================================
  // 2D ART - PIXEL ART
  // ============================================
  // {
  //   id: 2,
  //   title: "Pixel Warrior",
  //   description: "16-bit style game sprite",
  //   category: "pixel",
  //   image: "/artworks/pixel-1.png",
  //   featured: true
  // },

  // ============================================
  // 2D ART - DOODLES
  // ============================================
  // {
  //   id: 3,
  //   title: "Quick Monster",
  //   description: "Fun doodle during brainstorming",
  //   category: "doodle",
  //   image: "/artworks/doodle-1.jpg",
  //   featured: false
  // },

  // ============================================
  // 2D ART - DIGITAL ART
  // ============================================
  // {
  //   id: 4,
  //   title: "Environment Concept",
  //   description: "Digital painting of game environment",
  //   category: "digital",
  //   image: "/artworks/digital-1.png",
  //   featured: true
  // },

  // ============================================
  // 3D WORK
  // ============================================
  // {
  //   id: 5,
  //   title: "Low Poly Character",
  //   description: "3D character model for mobile game",
  //   category: "3d",
  //   image: "/artworks/3d-1.png",
  //   featured: true
  // },
];

// Helper function to get artworks by category
export function getArtworksByCategory(category) {
  if (category === 'all') return artworks;
  return artworks.filter(art => art.category === category);
}

// Get 2D artworks only
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
