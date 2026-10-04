const galleryTrack = document.querySelector('.gallery-track');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryDots = document.querySelectorAll('.gallery-dots span');
 
if (galleryTrack && galleryItems.length) {
  galleryTrack.addEventListener('scroll', () => {
    const scrollPosition = galleryTrack.scrollLeft;
    const itemWidth = galleryItems[0].offsetWidth + 20;
 
    const currentIndex = Math.round(scrollPosition / itemWidth);
 
    galleryDots.forEach((dot, index) => {
      dot.style.opacity = index === currentIndex ? '1' : '0.35';
    });
  });
}
 
const nav = document.querySelector('.nav');
 
if (nav) {
  let lastScrollY = window.scrollY;
  let navOffset = 0;
 
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;
 
    // Scrolling down
    if (scrollDifference > 0) {
      navOffset += scrollDifference;
    }
 
    // Scrolling up
    if (scrollDifference < 0) {
      navOffset += scrollDifference;
    }
 
    // Keep the navbar between 0 and its full height
    navOffset = Math.max(0, Math.min(navOffset, nav.offsetHeight));
 
    nav.style.transform = `translateY(-${navOffset}px)`;
 
    lastScrollY = currentScrollY;
  });
}
 
const filterTabs = document.querySelectorAll('.filter-tab');
const photoItems = document.querySelectorAll('.photo-item');
const loadMoreButton = document.querySelector('.load-more-button');
 
if (filterTabs.length && photoItems.length) {
  const PAGE_SIZE = 12;
  let currentFilter = 'all';
  let visibleCount = PAGE_SIZE;
 
  function getFiltered() {
    return Array.from(photoItems).filter(item =>
      currentFilter === 'all' || item.dataset.category === currentFilter
    );
  }
 
  function renderGrid() {
    const filtered = getFiltered();
 
    photoItems.forEach(item => item.classList.add('hidden'));
    filtered.slice(0, visibleCount).forEach(item => item.classList.remove('hidden'));
 
    if (loadMoreButton) {
      loadMoreButton.classList.toggle('is-hidden', visibleCount >= filtered.length);
    }
  }
 
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      visibleCount = PAGE_SIZE;
      renderGrid();
    });
  });
 
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      renderGrid();
    });
  }
 
  renderGrid();
}
 
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxClose = document.getElementById('lightbox-close');
 
function closeLightbox() {
  lightbox.classList.remove('is-open');
  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
  }
}
 
if (lightbox && lightboxImg && lightboxClose && photoItems.length) {
  photoItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const video = item.querySelector('video');
 
      if (video && lightboxVideo) {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = video.currentSrc || video.querySelector('source')?.src || video.src;
        lightboxVideo.play();
      } else if (img) {
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.style.display = 'none';
        }
        lightboxImg.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      } else {
        return;
      }
 
      lightbox.classList.add('is-open');
    });
  });
 
  lightboxClose.addEventListener('click', closeLightbox);
 
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

const mapContainer = document.getElementById('map-container');
const mapLoadButton = document.getElementById('map-load-button');

if (mapContainer && mapLoadButton) {
  mapLoadButton.addEventListener('click', () => {
    const src = mapContainer.dataset.mapSrc;

    if (!src) return;

    const iframe = document.createElement('iframe');

    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;

    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
  });
}