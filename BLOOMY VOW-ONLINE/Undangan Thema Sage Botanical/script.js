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
   OPEN INVITATION
========================================================= */

openBtn?.addEventListener(
  'click',
  async () => {

    cover?.classList.add('is-hidden');

    document.body.classList.add(
      'invitation-open'
    );

    await playMusic();

    setTimeout(() => {

      document
        .getElementById('invitation')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    }, 220);

  }
);


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
   FALLING LEAVES + JASMINE
========================================================= */

function createLeaf() {

  const el =
    document.createElement('div');

  el.className =
    'fall';

  el.innerHTML =
    '<div class="leaf"></div>';

  return el;
}


function createJasmine() {

  const el =
    document.createElement('div');

  el.className =
    'fall';

  el.innerHTML =
    `
      <div class="jasmine">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <b></b>
      </div>
    `;

  return el;
}


function spawnDecoration() {

  if (!fallingDecor) {
    return;
  }


  const isFlower =
    Math.random() < 0.20;

  const el =
    isFlower
      ? createJasmine()
      : createLeaf();


  const s =
    isFlower
      ? 0.48 + Math.random() * 0.42
      : 0.48 + Math.random() * 0.44;


  const o =
    isFlower
      ? 0.48 + Math.random() * 0.30
      : 0.36 + Math.random() * 0.34;


  const d =
    isFlower
      ? 18 + Math.random() * 8
      : 18 + Math.random() * 10;


  const drift =
    (Math.random() - 0.5) * 28;


  const wave =
    (Math.random() - 0.5) * 20;


  const blur =
    Math.random() < 0.22
      ? 0.35 + Math.random() * 0.55
      : 0;


  el.style.left =
    `${Math.random() * 104 - 2}vw`;


  el.style.setProperty(
    '--s',
    s.toFixed(2)
  );


  el.style.setProperty(
    '--o',
    o.toFixed(2)
  );


  el.style.setProperty(
    '--duration',
    `${d.toFixed(2)}s`
  );


  el.style.setProperty(
    '--blur',
    `${blur.toFixed(2)}px`
  );


  el.style.setProperty(
    '--x1',
    `${(
      drift * 0.12 +
      wave * 0.10
    ).toFixed(2)}vw`
  );


  el.style.setProperty(
    '--x2',
    `${(
      drift * 0.28 -
      wave * 0.08
    ).toFixed(2)}vw`
  );


  el.style.setProperty(
    '--x3',
    `${(
      drift * 0.42 +
      wave * 0.06
    ).toFixed(2)}vw`
  );


  el.style.setProperty(
    '--x4',
    `${(
      drift * 0.30 -
      wave * 0.10
    ).toFixed(2)}vw`
  );


  el.style.setProperty(
    '--x5',
    `${(
      drift * 0.18 +
      wave * 0.08
    ).toFixed(2)}vw`
  );


  el.style.setProperty(
    '--x6',
    `${(
      drift * 0.08 -
      wave * 0.05
    ).toFixed(2)}vw`
  );


  const r =
    (Math.random() - 0.5) * 26;


  [0, 18, 32, 46, 62, 78, 96]
    .forEach((v, i) => {

      el.style.setProperty(
        `--r${i}`,
        `${(
          r +
          (Math.random() - 0.5) * v
        ).toFixed(1)}deg`
      );

    });


  fallingDecor.appendChild(el);


  setTimeout(() => {

    el.remove();

  }, (d + 1.5) * 1000);

}


if (fallingDecor) {

  let delay = 0;


  for (let i = 0; i < 5; i++) {

    setTimeout(
      spawnDecoration,
      delay
    );

    delay +=
      900 +
      Math.random() * 700;

  }


  setInterval(
    spawnDecoration,
    2200
  );

}


/* =========================================================
   GALLERY
========================================================= */

const track = document.getElementById('galleryTrack');
const slides = track
  ? [...track.querySelectorAll('.gallery-slide')]
  : [];

const dotsWrap = document.getElementById('galleryDots');

let currentSlide = 0;


/* ---------- render dots ---------- */

function renderDots() {

  if (!dotsWrap) return;

  dotsWrap.innerHTML = '';

  slides.forEach((_, i) => {

    const button = document.createElement('button');

    button.type = 'button';

    button.className =
      i === currentSlide ? 'active' : '';

    button.addEventListener('click', () => {
      showSlide(i);
    });

    dotsWrap.appendChild(button);

  });

}


/* ---------- show slide ---------- */

function showSlide(index) {

  if (!track || !slides.length) return;

  currentSlide =
    (index + slides.length) % slides.length;

  track.style.transform =
    `translateX(-${
      currentSlide * (100 / slides.length)
    }%)`;

  if (dotsWrap) {

    [...dotsWrap.children].forEach((dot, i) => {

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
  ?.addEventListener('click', () => {

    showSlide(currentSlide - 1);

  });


document
  .getElementById('galleryNext')
  ?.addEventListener('click', () => {

    showSlide(currentSlide + 1);

  });


/* ---------- auto slide ---------- */

setInterval(() => {

  if (!document.hidden) {

    showSlide(currentSlide + 1);

  }

}, 6000);


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

let galleryLightbox = null;
let galleryLightboxImage = null;
let galleryLightboxPrev = null;
let galleryLightboxNext = null;

let lightboxTouchStartX = 0;
let lightboxTouchStartY = 0;


/* ---------- create fullscreen ---------- */

function createGalleryLightbox() {

  if (galleryLightbox) {
    return;
  }


  galleryLightbox =
    document.createElement('div');

  galleryLightbox.className =
    'gallery-lightbox';

  galleryLightbox.style.cssText = `
    position:fixed;
    inset:0;
    z-index:99999;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:20px;

    background:rgba(0,0,0,.92);
    backdrop-filter:blur(8px);

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    transition:opacity .25s ease;
  `;


  galleryLightbox.innerHTML = `

    <!-- TUTUP -->
    <button
      type="button"
      class="gallery-lightbox-close"
      aria-label="Tutup foto"
      style="
        position:absolute;
        top:18px;
        right:18px;

        width:44px;
        height:44px;

        border-radius:50%;
        border:1px solid rgba(220,199,155,.7);

        background:rgba(7,17,12,.82);
        color:#fffdf7;

        font-size:25px;
        line-height:1;

        display:grid;
        place-items:center;

        cursor:pointer;

        z-index:10;
      "
    >×</button>


    <!-- KIRI -->
    <button
      type="button"
      class="gallery-lightbox-prev"
      aria-label="Foto sebelumnya"
      style="
        position:absolute;
        left:22px;
        top:50%;

        transform:translateY(-50%);

        width:48px;
        height:48px;

        border-radius:50%;
        border:1px solid rgba(220,199,155,.65);

        background:rgba(7,17,12,.72);
        color:#fffdf7;

        font-size:30px;
        line-height:1;

        display:grid;
        place-items:center;

        cursor:pointer;

        z-index:10;
      "
    >‹</button>


    <!-- FOTO -->
    <img
      class="gallery-lightbox-image"
      src=""
      alt="Wedding Gallery"
      style="
        display:block;

        width:auto;
        height:auto;

        max-width:90vw;
        max-height:88vh;

        object-fit:contain;

        border:1px solid rgba(220,199,155,.45);

        box-shadow:
          0 25px 80px rgba(0,0,0,.65);
      "
    >


    <!-- KANAN -->
    <button
      type="button"
      class="gallery-lightbox-next"
      aria-label="Foto berikutnya"
      style="
        position:absolute;
        right:22px;
        top:50%;

        transform:translateY(-50%);

        width:48px;
        height:48px;

        border-radius:50%;
        border:1px solid rgba(220,199,155,.65);

        background:rgba(7,17,12,.72);
        color:#fffdf7;

        font-size:30px;
        line-height:1;

        display:grid;
        place-items:center;

        cursor:pointer;

        z-index:10;
      "
    >›</button>

  `;


  document.body.appendChild(
    galleryLightbox
  );


  galleryLightboxImage =
    galleryLightbox.querySelector(
      '.gallery-lightbox-image'
    );


  galleryLightboxPrev =
    galleryLightbox.querySelector(
      '.gallery-lightbox-prev'
    );


  galleryLightboxNext =
    galleryLightbox.querySelector(
      '.gallery-lightbox-next'
    );


  const closeButton =
    galleryLightbox.querySelector(
      '.gallery-lightbox-close'
    );


  /* ---------- tombol close ---------- */

  closeButton?.addEventListener(
    'click',
    closeGalleryLightbox
  );


  /* ---------- tombol kiri ---------- */

  galleryLightboxPrev?.addEventListener(
    'click',
    (event) => {

      event.stopPropagation();

      changeLightboxSlide(
        currentSlide - 1
      );

    }
  );


  /* ---------- tombol kanan ---------- */

  galleryLightboxNext?.addEventListener(
    'click',
    (event) => {

      event.stopPropagation();

      changeLightboxSlide(
        currentSlide + 1
      );

    }
  );


  /* ---------- klik background ---------- */

  galleryLightbox.addEventListener(
    'click',
    (event) => {

      if (
        event.target === galleryLightbox
      ) {

        closeGalleryLightbox();

      }

    }
  );


  /* =======================================================
     SWIPE FULLSCREEN
  ======================================================= */

  galleryLightbox.addEventListener(
    'touchstart',
    (event) => {

      lightboxTouchStartX =
        event.touches[0].clientX;

      lightboxTouchStartY =
        event.touches[0].clientY;

    },
    {
      passive:true
    }
  );


  galleryLightbox.addEventListener(
    'touchend',
    (event) => {

      const dx =
        event.changedTouches[0].clientX -
        lightboxTouchStartX;

      const dy =
        event.changedTouches[0].clientY -
        lightboxTouchStartY;


      if (
        Math.abs(dx) < 50 ||
        Math.abs(dx) < Math.abs(dy)
      ) {

        return;

      }


      if (dx < 0) {

        /* swipe kiri */
        changeLightboxSlide(
          currentSlide + 1
        );

      } else {

        /* swipe kanan */
        changeLightboxSlide(
          currentSlide - 1
        );

      }

    },
    {
      passive:true
    }
  );

}


/* =========================================================
   UPDATE FOTO FULLSCREEN
========================================================= */

function changeLightboxSlide(index) {

  if (!slides.length) {
    return;
  }


  currentSlide =
    (index + slides.length) %
    slides.length;


  const slide =
    slides[currentSlide];


  const image =
    slide?.querySelector('img');


  if (!image) {
    return;
  }


  /* update slider di belakang */
  showSlide(currentSlide);


  /* update foto fullscreen */
  galleryLightboxImage.src =
    image.currentSrc || image.src;


  galleryLightboxImage.alt =
    image.alt || 'Wedding Gallery';

}


/* =========================================================
   OPEN FULLSCREEN
========================================================= */

function openGalleryLightbox(slide) {

  const image =
    slide?.querySelector('img');


  if (!image) {
    return;
  }


  const slideIndex =
    slides.indexOf(slide);


  if (slideIndex >= 0) {

    currentSlide =
      slideIndex;

  }


  createGalleryLightbox();


  galleryLightboxImage.src =
    image.currentSrc || image.src;


  galleryLightboxImage.alt =
    image.alt || 'Wedding Gallery';


  galleryLightbox.style.opacity =
    '1';

  galleryLightbox.style.visibility =
    'visible';

  galleryLightbox.style.pointerEvents =
    'auto';


  document.body.style.overflow =
    'hidden';

}


/* =========================================================
   CLOSE FULLSCREEN
========================================================= */

function closeGalleryLightbox() {

  if (!galleryLightbox) {
    return;
  }


  galleryLightbox.style.opacity =
    '0';

  galleryLightbox.style.visibility =
    'hidden';

  galleryLightbox.style.pointerEvents =
    'none';


  document.body.style.overflow =
    '';


  setTimeout(() => {

    if (galleryLightboxImage) {

      galleryLightboxImage.src = '';

    }

  }, 250);

}


/* =========================================================
   CLICK FOTO
========================================================= */

track?.addEventListener(
  'click',
  (event) => {

    const slide =
      event.target.closest(
        '.gallery-slide'
      );


    if (!slide) {
      return;
    }


    openGalleryLightbox(
      slide
    );

  }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  'keydown',
  (event) => {

    if (event.key === 'Escape') {

      closeGalleryLightbox();

    }

  }
);


/* =========================================================
   SWIPE GALLERY BIASA
========================================================= */

let galleryTouchStartX = 0;
let galleryTouchStartY = 0;


document
  .querySelector('.gallery-window')
  ?.addEventListener(
    'touchstart',
    (event) => {

      galleryTouchStartX =
        event.touches[0].clientX;

      galleryTouchStartY =
        event.touches[0].clientY;

    },
    {
      passive:true
    }
  );


document
  .querySelector('.gallery-window')
  ?.addEventListener(
    'touchend',
    (event) => {

      const dx =
        event.changedTouches[0].clientX -
        galleryTouchStartX;

      const dy =
        event.changedTouches[0].clientY -
        galleryTouchStartY;


      if (
        Math.abs(dx) > 45 &&
        Math.abs(dx) > Math.abs(dy)
      ) {

        showSlide(
          currentSlide +
          (dx < 0 ? 1 : -1)
        );

      }

    },
    {
      passive:true
    }
  );

  
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
  'Galih-Ratna-wishes';


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

