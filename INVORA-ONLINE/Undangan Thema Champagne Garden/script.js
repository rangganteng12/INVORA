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
    Math.random() < 0.32;

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

const track =
  document.getElementById('galleryTrack');

const slides =
  track
    ? [...track.children]
    : [];

const dotsWrap =
  document.getElementById('galleryDots');

let currentSlide = 0;


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
   GALLERY LIGHTBOX — CLICK / FULLSCREEN / LEFT-RIGHT
========================================================= */

let lightbox = null;
let lightboxImage = null;
let lightboxClose = null;
let lightboxPrev = null;
let lightboxNext = null;
let lightboxIndex = 0;
let lightboxTouchStartX = 0;

const galleryImages = slides.map((slide) => {
  const img = slide.querySelector('img');
  return img?.currentSrc || img?.src || '';
});

function createGalleryLightbox(){
  if(lightbox) return;

  lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-hidden','true');
  lightbox.style.cssText = `
    position:fixed;inset:0;z-index:99999;display:flex;
    align-items:center;justify-content:center;padding:20px;
    background:rgba(28,23,18,.94);opacity:0;visibility:hidden;
    pointer-events:none;transition:opacity .25s ease;
    backdrop-filter:blur(10px);
  `;

  lightbox.innerHTML = `
    <button type="button" class="gallery-lightbox-close" aria-label="Tutup foto">×</button>
    <button type="button" class="gallery-lightbox-nav prev" aria-label="Foto sebelumnya">‹</button>
    <img src="" alt="Wedding Gallery">
    <button type="button" class="gallery-lightbox-nav next" aria-label="Foto berikutnya">›</button>
  `;

  document.body.appendChild(lightbox);

  lightboxImage = lightbox.querySelector('img');
  lightboxClose = lightbox.querySelector('.gallery-lightbox-close');
  lightboxPrev = lightbox.querySelector('.gallery-lightbox-nav.prev');
  lightboxNext = lightbox.querySelector('.gallery-lightbox-nav.next');

  [lightboxClose, lightboxPrev, lightboxNext].forEach((button) => {
    button?.addEventListener('click', (event) => event.stopPropagation());
  });

  lightboxClose?.addEventListener('click', closeGalleryLightbox);
  lightboxPrev?.addEventListener('click', () => showLightboxSlide(lightboxIndex - 1));
  lightboxNext?.addEventListener('click', () => showLightboxSlide(lightboxIndex + 1));

  lightbox.addEventListener('click', (event) => {
    if(event.target === lightbox) closeGalleryLightbox();
  });

  lightbox.addEventListener('touchstart', (event) => {
    lightboxTouchStartX = event.touches[0]?.clientX || 0;
  }, {passive:true});

  lightbox.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0]?.clientX || 0;
    const dx = endX - lightboxTouchStartX;
    if(Math.abs(dx) > 45){
      showLightboxSlide(lightboxIndex + (dx < 0 ? 1 : -1));
    }
  }, {passive:true});
}

function showLightboxSlide(index){
  if(!galleryImages.length) return;
  createGalleryLightbox();
  lightboxIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[lightboxIndex];
  lightboxImage.alt = slides[lightboxIndex]?.querySelector('img')?.alt || 'Wedding Gallery';
  lightboxImage.style.transform = 'scale(.96)';
  requestAnimationFrame(() => {
    lightboxImage.style.transform = 'scale(1)';
  });
}

function openGalleryLightbox(index){
  createGalleryLightbox();
  showLightboxSlide(index);
  lightbox.style.opacity='1';
  lightbox.style.visibility='visible';
  lightbox.style.pointerEvents='auto';
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeGalleryLightbox(){
  if(!lightbox) return;
  lightbox.style.opacity='0';
  lightbox.style.visibility='hidden';
  lightbox.style.pointerEvents='none';
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

/* ---------- CLICK FOTO ---------- */
track?.addEventListener('click', (event) => {
  const slide = event.target.closest('.gallery-slide');
  if(!slide || event.target.closest('button')) return;
  const index = slides.indexOf(slide);
  if(index >= 0) openGalleryLightbox(index);
});

/* ---------- keyboard lightbox ---------- */
document.addEventListener('keydown', (event) => {
  if(!lightbox || lightbox.getAttribute('aria-hidden') === 'true') return;
  if(event.key === 'Escape') closeGalleryLightbox();
  if(event.key === 'ArrowLeft') showLightboxSlide(lightboxIndex - 1);
  if(event.key === 'ArrowRight') showLightboxSlide(lightboxIndex + 1);
});


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

