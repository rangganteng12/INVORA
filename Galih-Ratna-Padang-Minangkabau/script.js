const cover = document.getElementById('cover');
const openBtn = document.getElementById('openBtn');
const guestName = document.getElementById('guestName');
const fallingDecor = document.getElementById('fallingDecor');
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');


/* =========================================================
   GUEST
========================================================= */

const params = new URLSearchParams(location.search);
const guest = params.get('to') || params.get('guest');

if (guest && guestName) {
  guestName.textContent = guest.replace(/\+/g, ' ');
}


/* =========================================================
   MUSIC
========================================================= */

let musicAvailable = true;

music?.addEventListener('error', () => {
  musicAvailable = false;

  musicBtn?.classList.add('unavailable');

  musicBtn?.setAttribute(
    'title',
    'Tambahkan assets/music.mp3'
  );
});


async function playMusic() {

  if (!music || !musicAvailable) {
    return;
  }

  try {

    await music.play();

    musicBtn?.classList.add('playing');

  } catch (e) {

    console.warn(
      'Musik belum dapat dimainkan. Pastikan assets/music.mp3 ada.'
    );

  }

}


function toggleMusic() {

  if (!music || !musicAvailable) {
    return;
  }

  if (music.paused) {

    playMusic();

  } else {

    music.pause();

    musicBtn?.classList.remove('playing');

  }

}


musicBtn?.addEventListener(
  'click',
  toggleMusic
);


/* =========================================================
   OPEN INVITATION — HARD RESET
========================================================= */

openBtn?.addEventListener('click', async () => {

  /* mulai musik */
  await playMusic();

  /* tutup cover */
  if (cover) {
    cover.classList.add('is-hidden');

    /* benar-benar keluarkan cover dari layout */
    setTimeout(() => {
      cover.style.display = 'none';
    }, 850);
  }

  document.body.classList.add('invitation-open');

  const invitation =
    document.getElementById('invitation');

  if (!invitation) {
    return;
  }

  /*
    Reset posisi halaman.
    Tidak menggunakan scrollIntoView karena browser
    bisa mempertahankan offset sebelumnya.
  */

  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';

  window.scrollTo(0, 0);

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  /* tunggu satu frame sampai cover mulai hilang */
  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

    });

  });

});


/* =========================================================
   COUNTDOWN
========================================================= */

const target =
  new Date(
    '2026-09-24T09:00:00+07:00'
  ).getTime();


function tick() {

  const diff =
    Math.max(
      0,
      target - Date.now()
    );

  const total =
    Math.floor(diff / 1000);

  const days =
    Math.floor(total / 86400);

  const hours =
    Math.floor(
      (total % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (total % 3600) / 60
    );

  const seconds =
    total % 60;


  const daysEl =
    document.getElementById('days');

  const hoursEl =
    document.getElementById('hours');

  const minutesEl =
    document.getElementById('minutes');

  const secondsEl =
    document.getElementById('seconds');


  if (daysEl) {
    daysEl.textContent =
      String(days).padStart(3, '0');
  }

  if (hoursEl) {
    hoursEl.textContent =
      String(hours).padStart(2, '0');
  }

  if (minutesEl) {
    minutesEl.textContent =
      String(minutes).padStart(2, '0');
  }

  if (secondsEl) {
    secondsEl.textContent =
      String(seconds).padStart(2, '0');
  }

}


tick();

setInterval(
  tick,
  1000
);


/* =========================================================
   FALLING EMBUN / DEW
========================================================= */

function createDew(){
  const el = document.createElement('div');
  el.className = 'fall';

  const roll = Math.random();
  const variant = roll < 0.22 ? 'tiny' : (roll > 0.84 ? 'large' : '');
  const soft = Math.random() < 0.16 ? ' soft' : '';

  el.innerHTML = `<div class="dew ${variant}${soft}"></div>`;
  return el;
}

function spawnDecoration(){
  if(!fallingDecor) return;

  const el = createDew();

  const s = 0.58 + Math.random() * 0.50;
  const o = 0.34 + Math.random() * 0.34;
  const d = 16 + Math.random() * 7;
  const drift = (Math.random() - .5) * 30;
  const wave = (Math.random() - .5) * 24;
  const blur = Math.random() < .16 ? (0.30 + Math.random() * 0.50) : 0;

  el.style.left = `${Math.random() * 104 - 2}vw`;
  el.style.setProperty('--s', s.toFixed(2));
  el.style.setProperty('--o', o.toFixed(2));
  el.style.setProperty('--duration', `${d.toFixed(2)}s`);
  el.style.setProperty('--blur', `${blur.toFixed(2)}px`);

  el.style.setProperty('--x1', `${(drift*.15 + wave*.20).toFixed(2)}vw`);
  el.style.setProperty('--x2', `${(drift*.34 - wave*.18).toFixed(2)}vw`);
  el.style.setProperty('--x3', `${(drift*-.18 + wave*.34).toFixed(2)}vw`);
  el.style.setProperty('--x4', `${(drift*.30 - wave*.30).toFixed(2)}vw`);
  el.style.setProperty('--x5', `${(drift*-.26 + wave*.22).toFixed(2)}vw`);
  el.style.setProperty('--x6', `${(drift*.16 + wave*.14).toFixed(2)}vw`);
  el.style.setProperty('--x7', `${(drift*.10 + wave*.10).toFixed(2)}vw`);

  const baseRotation = (Math.random() - .5) * 16;
  [0, 10, 18, 28, 36, 46, 58, 70].forEach((amount, i) => {
    el.style.setProperty(
      `--r${i}`,
      `${(baseRotation + (Math.random() - .5) * amount).toFixed(1)}deg`
    );
  });

  fallingDecor.appendChild(el);

  setTimeout(() => el.remove(), (d + 1.5) * 1000);
}

if(fallingDecor){
  let delay = 0;

  for(let i=0; i<5; i++){
    setTimeout(spawnDecoration, delay);
    delay += 760 + Math.random() * 700;
  }

  setInterval(spawnDecoration, 1900);
}


/* ---------- preload gallery images ---------- */

slides.forEach((slide) => {

  const image =
    slide.dataset.image;

  if (!image) {
    return;
  }


  const test =
    new Image();


  test.onload = () => {

    slide.style.backgroundImage =
      `url("${image}")`;

    slide.classList.add(
      'has-photo'
    );

  };


  test.onerror = () => {

    const title =
      slide.querySelector('strong')
        ?.textContent || '';


    slide.innerHTML =
      `
        <div>
          <span>ADD PHOTO</span>
          <strong>${title}</strong>
        </div>
      `;

  };


  test.src = image;

});


/* ---------- dots ---------- */

function renderDots() {

  if (!dotsWrap) {
    return;
  }


  dotsWrap.innerHTML = '';


  slides.forEach((_, i) => {

    const button =
      document.createElement('button');

    button.type =
      'button';

    button.className =
      i === currentSlide
        ? 'active'
        : '';


    button.addEventListener(
      'click',
      () => {
        showSlide(i);
      }
    );


    dotsWrap.appendChild(
      button
    );

  });

}


/* ---------- change slide ---------- */

function showSlide(index) {

  if (!track || !slides.length) {
    return;
  }


  currentSlide =
    (index + slides.length) %
    slides.length;


  track.style.transform =
    `translateX(-${
      currentSlide *
      (100 / slides.length)
    }%)`;


  if (dotsWrap) {

    [
      ...dotsWrap.children
    ].forEach((dot, i) => {

      dot.classList.toggle(
        'active',
        i === currentSlide
      );

    });

  }

}


renderDots();


/* ---------- arrows ---------- */

document
  .getElementById('galleryPrev')
  ?.addEventListener(
    'click',
    () => {
      showSlide(
        currentSlide - 1
      );
    }
  );


document
  .getElementById('galleryNext')
  ?.addEventListener(
    'click',
    () => {
      showSlide(
        currentSlide + 1
      );
    }
  );


/* ---------- auto slide ---------- */

setInterval(() => {

  if (!document.hidden) {

    showSlide(
      currentSlide + 1
    );

  }

}, 6000);


/* =========================================================
   GALLERY — CLEAN VERSION
========================================================= */

const galleryTrack =
  document.getElementById('galleryTrack');

const gallerySlides =
  galleryTrack
    ? Array.from(
        galleryTrack.querySelectorAll('.gallery-slide')
      )
    : [];

const galleryPrev =
  document.getElementById('galleryPrev');

const galleryNext =
  document.getElementById('galleryNext');

const galleryDots =
  document.getElementById('galleryDots');

let galleryIndex = 0;


/* =========================================================
   SLIDE
========================================================= */

function goToGallery(index){

  if(!gallerySlides.length){
    return;
  }

  galleryIndex =
    (index + gallerySlides.length) %
    gallerySlides.length;

  galleryTrack.style.transform =
    `translateX(-${galleryIndex * (100 / gallerySlides.length)}%)`;

  if(galleryDots){

    Array.from(
      galleryDots.children
    ).forEach((dot,i)=>{

      dot.classList.toggle(
        'active',
        i === galleryIndex
      );

    });

  }
}


/* =========================================================
   DOTS
========================================================= */

if(galleryDots){

  gallerySlides.forEach((_,i)=>{

    const dot =
      document.createElement('button');

    dot.type = 'button';

    dot.setAttribute(
      'aria-label',
      `Foto ${i + 1}`
    );

    dot.addEventListener(
      'click',
      (e)=>{

        e.preventDefault();
        e.stopPropagation();

        goToGallery(i);

      }
    );

    galleryDots.appendChild(dot);

  });

}


/* =========================================================
   BUTTON KIRI / KANAN
========================================================= */

galleryPrev?.addEventListener(
  'click',
  (e)=>{

    e.preventDefault();
    e.stopPropagation();

    goToGallery(
      galleryIndex - 1
    );

  }
);


galleryNext?.addEventListener(
  'click',
  (e)=>{

    e.preventDefault();
    e.stopPropagation();

    goToGallery(
      galleryIndex + 1
    );

  }
);


/* =========================================================
   LIGHTBOX
========================================================= */

let galleryLightbox =
  document.getElementById(
    'galleryLightbox'
  );


function ensureGalleryLightbox(){

  if(galleryLightbox){
    return;
  }

  galleryLightbox =
    document.createElement('div');

  galleryLightbox.id =
    'galleryLightbox';

  galleryLightbox.className =
    'gallery-lightbox';

  galleryLightbox.innerHTML = `

    <button
      type="button"
      class="gallery-lightbox-close"
    >×</button>

    <button
      type="button"
      class="gallery-lightbox-prev"
    >‹</button>

    <img
      class="gallery-lightbox-image"
      alt="Wedding Gallery"
    >

    <button
      type="button"
      class="gallery-lightbox-next"
    >›</button>

    <div
      class="gallery-lightbox-count"
    ></div>

  `;

  document.body.appendChild(
    galleryLightbox
  );


  galleryLightbox
    .querySelector(
      '.gallery-lightbox-close'
    )
    .addEventListener(
      'click',
      closeGallery
    );


  galleryLightbox
    .querySelector(
      '.gallery-lightbox-prev'
    )
    .addEventListener(
      'click',
      (e)=>{

        e.stopPropagation();

        openGallery(
          galleryIndex - 1
        );

      }
    );


  galleryLightbox
    .querySelector(
      '.gallery-lightbox-next'
    )
    .addEventListener(
      'click',
      (e)=>{

        e.stopPropagation();

        openGallery(
          galleryIndex + 1
        );

      }
    );


  galleryLightbox.addEventListener(
    'click',
    (e)=>{

      if(
        e.target ===
        galleryLightbox
      ){

        closeGallery();

      }

    }
  );

}


function openGallery(index){

  if(!gallerySlides.length){
    return;
  }

  galleryIndex =
    (index + gallerySlides.length) %
    gallerySlides.length;

  const slide =
    gallerySlides[galleryIndex];

  const image =
    slide.querySelector('img');

  if(!image){
    return;
  }

  ensureGalleryLightbox();

  const lightboxImage =
    galleryLightbox.querySelector(
      '.gallery-lightbox-image'
    );

  lightboxImage.src =
    image.currentSrc ||
    image.src;

  lightboxImage.alt =
    image.alt ||
    'Wedding Gallery';


  const counter =
    galleryLightbox.querySelector(
      '.gallery-lightbox-count'
    );

  if(counter){

    counter.textContent =
      `${galleryIndex + 1} / ${gallerySlides.length}`;

  }


  galleryLightbox.classList.add(
    'is-open'
  );

  document.body.style.overflow =
    'hidden';

}


function closeGallery(){

  if(!galleryLightbox){
    return;
  }

  galleryLightbox.classList.remove(
    'is-open'
  );

  document.body.style.overflow =
    '';

}


/* =========================================================
   KLIK FOTO
========================================================= */

gallerySlides.forEach(
  (slide,index)=>{

    slide.style.cursor =
      'zoom-in';

    slide.addEventListener(
      'click',
      (e)=>{

        if(
          e.target.closest(
            'button'
          )
        ){
          return;
        }

        openGallery(index);

      }
    );

  }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  'keydown',
  (e)=>{

    if(
      !galleryLightbox ||
      !galleryLightbox.classList.contains(
        'is-open'
      )
    ){
      return;
    }

    if(e.key === 'Escape'){
      closeGallery();
    }

    if(e.key === 'ArrowLeft'){
      openGallery(
        galleryIndex - 1
      );
    }

    if(e.key === 'ArrowRight'){
      openGallery(
        galleryIndex + 1
      );
    }

  }
);


/* =========================================================
   SWIPE GALLERY
========================================================= */

let galleryStartX = 0;
let galleryStartY = 0;

const galleryWindow =
  document.querySelector(
    '.gallery-window'
  );


galleryWindow?.addEventListener(
  'touchstart',
  (e)=>{

    galleryStartX =
      e.touches[0].clientX;

    galleryStartY =
      e.touches[0].clientY;

  },
  {passive:true}
);


galleryWindow?.addEventListener(
  'touchend',
  (e)=>{

    const dx =
      e.changedTouches[0].clientX -
      galleryStartX;

    const dy =
      e.changedTouches[0].clientY -
      galleryStartY;

    if(
      Math.abs(dx) > 40 &&
      Math.abs(dx) > Math.abs(dy)
    ){

      goToGallery(
        galleryIndex +
        (dx < 0 ? 1 : -1)
      );

    }

  },
  {passive:true}
);


/* =========================================================
   SWIPE FULLSCREEN
========================================================= */

let lightboxStartX = 0;
let lightboxStartY = 0;


document.addEventListener(
  'touchstart',
  (e)=>{

    if(
      !galleryLightbox ||
      !galleryLightbox.classList.contains(
        'is-open'
      )
    ){
      return;
    }

    lightboxStartX =
      e.touches[0].clientX;

    lightboxStartY =
      e.touches[0].clientY;

  },
  {passive:true}
);


document.addEventListener(
  'touchend',
  (e)=>{

    if(
      !galleryLightbox ||
      !galleryLightbox.classList.contains(
        'is-open'
      )
    ){
      return;
    }

    const dx =
      e.changedTouches[0].clientX -
      lightboxStartX;

    const dy =
      e.changedTouches[0].clientY -
      lightboxStartY;

    if(
      Math.abs(dx) > 40 &&
      Math.abs(dx) > Math.abs(dy)
    ){

      openGallery(
        galleryIndex +
        (dx < 0 ? 1 : -1)
      );

    }

  },
  {passive:true}
);


/* =========================================================
   START
========================================================= */

goToGallery(0);

/* =========================================================
   BANK COPY
========================================================= */

document
  .getElementById('copyBank')
  ?.addEventListener(
    'click',
    async () => {

      const number =
        document
          .getElementById('bankNumber')
          ?.textContent
          .trim() || '';


      try {

        await navigator.clipboard.writeText(
          number
        );


        const button =
          document.getElementById(
            'copyBank'
          );


        if (!button) {
          return;
        }


        const old =
          button.textContent;


        button.textContent =
          'TERSALIN';


        setTimeout(() => {

          button.textContent =
            old;

        }, 1500);


      } catch {

        alert(
          `Nomor rekening: ${number}`
        );

      }

    }
  );


/* =========================================================
   RSVP
========================================================= */

const RSVP_WHATSAPP = '';


document
  .getElementById('rsvpButton')
  ?.addEventListener(
    'click',
    () => {

      const name =
        document
          .getElementById('rsvpName')
          ?.value
          .trim() || '';


      const attendance =
        document
          .getElementById(
            'rsvpAttendance'
          )
          ?.value || '';


      const guests =
        document
          .getElementById(
            'rsvpGuests'
          )
          ?.value || '1';


      const message =
        document
          .getElementById(
            'rsvpMessage'
          )
          ?.value
          .trim() || '';


      if (
        !name ||
        !attendance
      ) {

        alert(
          'Mohon isi nama dan kehadiran.'
        );

        return;

      }


      const text =
        `Halo, saya ${name}. ${attendance}. Jumlah tamu: ${guests}. ${message}`;


      if (!RSVP_WHATSAPP) {

        alert(
          `RSVP siap dikirim:\n\n${text}\n\nIsi nomor WhatsApp pemilik undangan di script.js pada RSVP_WHATSAPP.`
        );

        return;

      }


      window.open(
        `https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener'
      );

    }
  );


/* =========================================================
   WISHES
========================================================= */

const WISH_KEY =
  'Rangga-Dewi-wishes';


const wishList =
  document.getElementById(
    'messageList'
  );


function esc(s) {

  return String(s).replace(
    /[&<>"']/g,
    (m) => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#039;'
    }[m])
  );

}


function loadWishes() {

  if (!wishList) {
    return;
  }


  const items =
    JSON.parse(
      localStorage.getItem(
        WISH_KEY
      ) || '[]'
    );


  wishList.innerHTML =
    items
      .map(
        (x) =>
          `
          <article class="wish">

            <strong>
              ${esc(x.name)}
            </strong>

            <p>
              ${esc(x.text)}
            </p>

          </article>
          `
      )
      .join('');

}


loadWishes();


document
  .getElementById('messageButton')
  ?.addEventListener(
    'click',
    () => {

      const name =
        document
          .getElementById(
            'messageName'
          )
          ?.value
          .trim() || '';


      const text =
        document
          .getElementById(
            'messageText'
          )
          ?.value
          .trim() || '';


      if (
        !name ||
        !text
      ) {

        alert(
          'Mohon isi nama dan ucapan.'
        );

        return;

      }


      const items =
        JSON.parse(
          localStorage.getItem(
            WISH_KEY
          ) || '[]'
        );


      items.unshift({
        name,
        text
      });


      localStorage.setItem(
        WISH_KEY,
        JSON.stringify(
          items.slice(0, 50)
        )
      );


      const nameInput =
        document.getElementById(
          'messageName'
        );

      const textInput =
        document.getElementById(
          'messageText'
        );


      if (nameInput) {
        nameInput.value = '';
      }

      if (textInput) {
        textInput.value = '';
      }


      loadWishes();

    }
  );

