import './style.css';
import { artworks, get2DArtworks, get3DArtworks, getArtworksByCategory } from './artworks.js';

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const cursorGlow = document.getElementById('cursorGlow');
const galleryGrid = document.getElementById('galleryGrid');
const galleryEmpty = document.getElementById('galleryEmpty');
const showcaseGrid = document.getElementById('showcaseGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentArtworkIndex = 0;
let currentFilteredArtworks = [];

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCursorGlow();
  initGallery();
  initShowcase();
  initFilters();
  initLightbox();
  initScrollAnimations();
  initSkillBars();
  initSmoothScroll();
});

// ============================================
// NAVIGATION
// ============================================
function initNavbar() {
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================
function initCursorGlow() {
  // Only on desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }
}

// ============================================
// GALLERY
// ============================================
function initGallery() {
  const artworks2D = get2DArtworks();

  if (artworks2D.length === 0) {
    galleryEmpty.style.display = 'block';
    return;
  }

  galleryEmpty.style.display = 'none';
  renderGallery(artworks2D);
}

function renderGallery(artworksToRender) {
  // Clear existing items except empty state
  const existingItems = galleryGrid.querySelectorAll('.gallery-item');
  existingItems.forEach(item => item.remove());

  if (artworksToRender.length === 0) {
    galleryEmpty.style.display = 'block';
    return;
  }

  galleryEmpty.style.display = 'none';
  currentFilteredArtworks = artworksToRender;

  artworksToRender.forEach((artwork, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.index = index;
    item.innerHTML = `
      <img src="${artwork.image}" alt="${artwork.title}" loading="lazy" />
      <div class="gallery-item-overlay">
        <div class="gallery-item-info">
          <h4>${artwork.title}</h4>
          <p>${artwork.description}</p>
        </div>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(item);
  });
}

// ============================================
// FILTERS
// ============================================
function initFilters() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter artworks
      const category = btn.dataset.filter;
      const filtered = category === 'all'
        ? get2DArtworks()
        : getArtworksByCategory(category);

      renderGallery(filtered);
    });
  });
}

// ============================================
// 3D SHOWCASE
// ============================================
function initShowcase() {
  const artworks3D = get3DArtworks();

  if (artworks3D.length === 0) {
    // Keep the placeholder visible
    return;
  }

  artworks3D.forEach(artwork => {
    const card = document.createElement('div');
    card.className = 'showcase-card';
    card.innerHTML = `
      <div class="showcase-visual">
        <img src="${artwork.image}" alt="${artwork.title}" />
      </div>
      <div class="showcase-info">
        <h3>${artwork.title}</h3>
        <p>${artwork.description}</p>
      </div>
    `;
    showcaseGrid.appendChild(card);
  });
}

// ============================================
// LIGHTBOX
// ============================================
function initLightbox() {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrevArtwork);
  lightboxNext.addEventListener('click', showNextArtwork);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevArtwork();
    if (e.key === 'ArrowRight') showNextArtwork();
  });
}

function openLightbox(index) {
  currentArtworkIndex = index;
  const artwork = currentFilteredArtworks[index];

  if (!artwork) return;

  lightboxImage.src = artwork.image;
  lightboxImage.alt = artwork.title;
  lightboxTitle.textContent = artwork.title;
  lightboxDescription.textContent = artwork.description;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrevArtwork() {
  currentArtworkIndex = currentArtworkIndex > 0
    ? currentArtworkIndex - 1
    : currentFilteredArtworks.length - 1;
  updateLightboxContent();
}

function showNextArtwork() {
  currentArtworkIndex = currentArtworkIndex < currentFilteredArtworks.length - 1
    ? currentArtworkIndex + 1
    : 0;
  updateLightboxContent();
}

function updateLightboxContent() {
  const artwork = currentFilteredArtworks[currentArtworkIndex];
  if (!artwork) return;

  lightboxImage.src = artwork.image;
  lightboxImage.alt = artwork.title;
  lightboxTitle.textContent = artwork.title;
  lightboxDescription.textContent = artwork.description;
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to sections
  const sections = document.querySelectorAll('.about, .gallery, .showcase, .skills, .contact');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
