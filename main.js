// Interactive behaviors:
// - Carousel with autoplay & manual prev/next
// - Modal detail for each room
// - Newsletter faux-submit (no server) with simple success UX
// - Allows overriding BOOKING_LINKS global object to set per-room booking URLs

(function(){
  const DEFAULT_BOOKING = 'https://www.booking.com/Share-JnSLK2d';

  const ROOMS = {
    sunset: {
      id: 'sunset',
      title: 'Sunset',
      desc: 'Private balcony facing west, perfect for enjoying the sunset.',
      img: 'assets/images/sunset.jpg',
      features: ['Private balcony','King bed','Free Wi‑Fi']
    },
    sunrise: {
      id: 'sunrise',
      title: 'Sunrise',
      desc: 'Calming morning views, fresh air and optional breakfast.',
      img: 'assets/images/sunrise.jpg',
      features: ['Morning view','Optional breakfast','Quick beach access']
    },
    moon: {
      id: 'moon',
      title: 'Moon',
      desc: 'Romantic night atmosphere with soft lighting and high privacy.',
      img: 'assets/images/moon.jpg',
      features: ['Soft lighting','Private seating','Honeymoon special']
    }
  };

  // Allow overriding booking links from outside:
  const userLinks = (window.BOOKING_LINKS && typeof window.BOOKING_LINKS === 'object') ? window.BOOKING_LINKS : {};
  Object.keys(ROOMS).forEach(r => {
    ROOMS[r].booking = userLinks[r] || DEFAULT_BOOKING;
  });

  // --- Carousel ---
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let current = 0;
  const autoplayDelay = 4500;
  let autoplayTimer = null;

  function showSlide(idx){
    slides.forEach((s,i)=> s.classList.toggle('active', i===idx));
    current = idx;
  }
  function nextSlide(){ showSlide((current+1) % slides.length); }
  function prevSlide(){ showSlide((current-1+slides.length) % slides.length); }

  if(nextBtn) nextBtn.addEventListener('click', ()=>{ nextSlide(); resetAutoplay(); });
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ prevSlide(); resetAutoplay(); });

  function startAutoplay(){
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }
  function resetAutoplay(){
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if(slides.length) {
    showSlide(0);
    startAutoplay();
  }

  // --- Modal ---
  const modal = document.getElementById('room-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalBook = document.getElementById('modal-book');

  function openModal(roomId){
    const room = ROOMS[roomId];
    if(!room) return;
    modalImg.src = room.img;
    modalImg.alt = room.title;
    modalTitle.textContent = room.title;
    modalDesc.textContent = room.desc;
    modalFeatures.innerHTML = '';
    room.features.forEach(f=>{
      const li = document.createElement('li');
      li.textContent = '• ' + f;
      modalFeatures.appendChild(li);
    });
    modalBook.href = room.booking || DEFAULT_BOOKING;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-room]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const roomId = el.getAttribute('data-room');
      if(roomId) openModal(roomId);
    });
  });

  modal.querySelectorAll('.modal-close').forEach(btn=> btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

  // --- Hero quick buttons navigate carousel & open modal ---
  document.querySelectorAll('.hero-actions [data-room]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const r = btn.getAttribute('data-room');
      const idx = slides.findIndex(s => s.getAttribute('data-room') === r);
      if(idx !== -1) {
        showSlide(idx);
        resetAutoplay();
        openModal(r);
      } else {
        openModal(r);
      }
    });
  });

  // --- Newsletter faux-submit ---
  const form = document.getElementById('newsletter-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const email = form.email.value.trim();
      if(!email) return;
      form.email.value = '';
      form.innerHTML = '<div style="padding:12px;border-radius:10px;background:rgba(255,255,255,0.03);">Thank you! We will send offers to your email.</div>';
    });
  }

  // --- Image fallback if missing ---
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', ()=>{
      img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23101823"/><text x="50%" y="50%" fill="%23b6c1d6" font-size="20" text-anchor="middle" dominant-baseline="middle">Image not available</text></svg>';
    });
  });

  window.__TYB = {
    openModal,
    nextSlide,
    prevSlide,
    ROOMS
  };
})();