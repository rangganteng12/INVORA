const cover = document.getElementById('cover');
const openBtn = document.getElementById('openBtn');
const guestName = document.getElementById('guestName');
const fallingDecor = document.getElementById('fallingDecor');
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');

/* ---------------- guest ---------------- */
const params = new URLSearchParams(location.search);
const guest = params.get('to') || params.get('guest');
if (guest && guestName) guestName.textContent = guest.replace(/\+/g, ' ');

/* ---------------- music ---------------- */
let musicAvailable = true;
music?.addEventListener('error', () => {
  musicAvailable = false;
  musicBtn?.classList.add('unavailable');
  musicBtn?.setAttribute('title', 'Tambahkan assets/music.mp3');
});

async function playMusic(){
  if (!music || !musicAvailable) return;
  try {
    await music.play();
    musicBtn?.classList.add('playing');
  } catch (error) {
    console.warn('Musik belum dapat dimainkan.', error);
  }
}

function toggleMusic(){
  if (!music || !musicAvailable) return;
  if (music.paused) playMusic();
  else {
    music.pause();
    musicBtn?.classList.remove('playing');
  }
}

musicBtn?.addEventListener('click', toggleMusic);

/* ---------------- open invitation ---------------- */
openBtn?.addEventListener('click', async () => {
  await playMusic();
  document.body.classList.add('invitation-open');
  if (cover) {
    cover.classList.add('is-hidden');
    window.setTimeout(() => { cover.style.display = 'none'; }, 720);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
});

/* ---------------- countdown ---------------- */
const target = new Date('2026-09-24T09:00:00+07:00').getTime();
function tick(){
  const diff = Math.max(0, target - Date.now());
  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const set = (id, value, width) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(width, '0');
  };
  set('days', days, 3);
  set('hours', hours, 2);
  set('minutes', minutes, 2);
  set('seconds', seconds, 2);
}
tick();
setInterval(tick, 1000);

/* ---------------- falling Minang ornaments ---------------- */
function createDew(){
  const el = document.createElement('div');
  el.className = 'fall';
  const roll = Math.random();
  const variant = roll < 0.22 ? 'tiny' : (roll > 0.84 ? 'large' : '');
  el.innerHTML = `<div class="dew ${variant}"></div>`;
  return el;
}

function spawnDecoration(){
  if (!fallingDecor) return;
  const el = createDew();
  const s = 0.55 + Math.random() * 0.45;
  const o = 0.36 + Math.random() * 0.28;
  const d = 15 + Math.random() * 6;
  const drift = (Math.random() - 0.5) * 30;
  const wave = (Math.random() - 0.5) * 24;
  const blur = Math.random() < 0.14 ? 0.35 + Math.random() * 0.4 : 0;
  el.style.left = `${Math.random() * 104 - 2}vw`;
  el.style.setProperty('--s', s.toFixed(2));
  el.style.setProperty('--o', o.toFixed(2));
  el.style.setProperty('--duration', `${d.toFixed(2)}s`);
  el.style.setProperty('--blur', `${blur.toFixed(2)}px`);
  el.style.setProperty('--x1', `${(drift * .16 + wave * .22).toFixed(2)}vw`);
  el.style.setProperty('--x2', `${(drift * .36 - wave * .18).toFixed(2)}vw`);
  el.style.setProperty('--x3', `${(drift * -.18 + wave * .34).toFixed(2)}vw`);
  el.style.setProperty('--x4', `${(drift * .28 - wave * .24).toFixed(2)}vw`);
  el.style.setProperty('--x5', `${(drift * .12 + wave * .12).toFixed(2)}vw`);
  const base = (Math.random() - 0.5) * 18;
  [0, 10, 18, 30, 42, 56].forEach((amount, i) => {
    el.style.setProperty(`--r${i}`, `${(base + (Math.random() - 0.5) * amount).toFixed(1)}deg`);
  });
  fallingDecor.appendChild(el);
  window.setTimeout(() => el.remove(), (d + 1.5) * 1000);
}

if (fallingDecor) {
  let delay = 0;
  for (let i = 0; i < 7; i++) {
    window.setTimeout(spawnDecoration, delay);
    delay += 650 + Math.random() * 500;
  }
  window.setInterval(spawnDecoration, 1600);
}

/* ---------------- gallery ---------------- */
const track = document.getElementById('galleryTrack');
const slides = track ? Array.from(track.querySelectorAll('.gallery-slide')) : [];
const dotsWrap = document.getElementById('galleryDots');
let currentSlide = 0;

slides.forEach(slide => {
  const image = slide.querySelector('img');
  if (!image || !image.dataset.image) return;
  const test = new Image();
  test.src = image.dataset.image;
});

function renderDots(){
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Foto ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsWrap.appendChild(dot);
  });
}

function showSlide(index){
  if (!track || !slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
  if (dotsWrap) {
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }
}

renderDots();
showSlide(0);

document.getElementById('galleryPrev')?.addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('galleryNext')?.addEventListener('click', () => showSlide(currentSlide + 1));

window.setInterval(() => {
  if (!document.hidden && !document.querySelector('.gallery-lightbox.is-open')) showSlide(currentSlide + 1);
}, 6000);

/* ---------------- gallery swipe ---------------- */
const galleryWindow = document.querySelector('.gallery-window');
let galleryStartX = 0;
galleryWindow?.addEventListener('touchstart', e => { galleryStartX = e.touches[0]?.clientX || 0; }, {passive:true});
galleryWindow?.addEventListener('touchend', e => {
  const dx = (e.changedTouches[0]?.clientX || 0) - galleryStartX;
  if (Math.abs(dx) > 45) showSlide(currentSlide + (dx < 0 ? 1 : -1));
}, {passive:true});

/* ---------------- gallery lightbox ---------------- */
let lightbox = null;
let lightboxImage = null;
let lightboxIndex = 0;
let lightboxStartX = 0;

function createLightbox(){
  if (lightbox) return;
  lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <button type="button" class="gallery-lightbox-close" aria-label="Tutup foto">×</button>
    <button type="button" class="gallery-lightbox-nav prev" aria-label="Foto sebelumnya">‹</button>
    <img src="" alt="Wedding Gallery">
    <button type="button" class="gallery-lightbox-nav next" aria-label="Foto berikutnya">›</button>
  `;
  document.body.appendChild(lightbox);
  lightboxImage = lightbox.querySelector('img');
  lightbox.querySelector('.gallery-lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox.querySelector('.gallery-lightbox-nav.prev')?.addEventListener('click', e => { e.stopPropagation(); showLightbox(lightboxIndex - 1); });
  lightbox.querySelector('.gallery-lightbox-nav.next')?.addEventListener('click', e => { e.stopPropagation(); showLightbox(lightboxIndex + 1); });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lightbox.addEventListener('touchstart', e => { lightboxStartX = e.touches[0]?.clientX || 0; }, {passive:true});
  lightbox.addEventListener('touchend', e => {
    const dx = (e.changedTouches[0]?.clientX || 0) - lightboxStartX;
    if (Math.abs(dx) > 45) showLightbox(lightboxIndex + (dx < 0 ? 1 : -1));
  }, {passive:true});
}

function showLightbox(index){
  if (!slides.length) return;
  createLightbox();
  lightboxIndex = (index + slides.length) % slides.length;
  const img = slides[lightboxIndex]?.querySelector('img');
  if (!img) return;
  lightboxImage.src = img.dataset.image || img.currentSrc || img.src;
  lightboxImage.alt = img.alt || 'Wedding Gallery';
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

slides.forEach((slide, index) => {
  slide.addEventListener('click', e => {
    if (e.target.closest('button')) return;
    showLightbox(index);
  });
});

document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
  if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
});

/* ---------------- bank copy ---------------- */
document.getElementById('copyBank')?.addEventListener('click', async () => {
  const number = document.getElementById('bankNumber')?.textContent.trim() || '';
  const button = document.getElementById('copyBank');
  try {
    await navigator.clipboard.writeText(number);
    if (!button) return;
    const old = button.textContent;
    button.textContent = 'TERSALIN';
    setTimeout(() => { button.textContent = old; }, 1500);
  } catch {
    alert(`Nomor rekening: ${number}`);
  }
});

/* ---------------- RSVP ---------------- */
const RSVP_WHATSAPP = '';
document.getElementById('rsvpButton')?.addEventListener('click', () => {
  const name = document.getElementById('rsvpName')?.value.trim() || '';
  const attendance = document.getElementById('rsvpAttendance')?.value || '';
  const guests = document.getElementById('rsvpGuests')?.value || '1';
  const message = document.getElementById('rsvpMessage')?.value.trim() || '';
  if (!name || !attendance) {
    alert('Mohon isi nama dan kehadiran.');
    return;
  }
  const text = `Halo, saya ${name}. ${attendance}. Jumlah tamu: ${guests}. ${message}`;
  if (!RSVP_WHATSAPP) {
    alert(`RSVP siap dikirim:\n\n${text}\n\nIsi nomor WhatsApp pemilik undangan di script.js pada RSVP_WHATSAPP.`);
    return;
  }
  window.open(`https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

/* ---------------- wishes ---------------- */
const WISH_KEY = 'Galih-Ratna-Padang-wishes';
const wishList = document.getElementById('messageList');
function esc(value){
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}
function loadWishes(){
  if (!wishList) return;
  let items = [];
  try { items = JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch { items = []; }
  wishList.innerHTML = items.map(item => `
    <article class="wish">
      <strong>${esc(item.name)}</strong>
      <p>${esc(item.text)}</p>
    </article>
  `).join('');
}
loadWishes();

document.getElementById('messageButton')?.addEventListener('click', () => {
  const name = document.getElementById('messageName')?.value.trim() || '';
  const text = document.getElementById('messageText')?.value.trim() || '';
  if (!name || !text) {
    alert('Mohon isi nama dan ucapan.');
    return;
  }
  let items = [];
  try { items = JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch { items = []; }
  items.unshift({name, text});
  localStorage.setItem(WISH_KEY, JSON.stringify(items.slice(0, 50)));
  const nameInput = document.getElementById('messageName');
  const textInput = document.getElementById('messageText');
  if (nameInput) nameInput.value = '';
  if (textInput) textInput.value = '';
  loadWishes();
});
