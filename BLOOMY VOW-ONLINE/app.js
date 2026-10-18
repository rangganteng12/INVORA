/* =====================================================
   BLOOMY VOW — THEME COLLECTION
===================================================== */

(() => {
  'use strict';

  const themes = window.BLOOMY_VOW_THEMES || [];

  const grid = document.getElementById('grid');
  const filters = document.getElementById('filters');
  const search = document.getElementById('search');
  const navSearch = document.getElementById('navSearch');
  const themeCount = document.getElementById('themeCount');

  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const siteHeader = document.getElementById('siteHeader');

  let activeCategory = 'Semua';

  const categories = [
    'Semua',
    ...new Set(themes.map(theme => theme.category))
  ];

  /* =====================================================
     THEME CARD
  ===================================================== */

  function card(theme, index) {
    const slug = encodeURIComponent(theme.slug);
    const detailUrl = `theme.html?theme=${slug}`;

    const demoLink = theme.demoUrl
      ? `<a class="theme-action secondary"
            href="${theme.demoUrl}"
            target="_blank"
            rel="noopener">
            Live Demo <span>↗</span>
         </a>`
      : `<a class="theme-action secondary"
            href="${detailUrl}">
            Lihat Preview <span>↗</span>
         </a>`;

    const features = Array.isArray(theme.features)
      ? theme.features.slice(0, 3)
      : [];

    return `
      <article class="theme-card ${index === 0 ? 'theme-card-featured' : ''}">

        <a class="theme-cover" href="${detailUrl}">
          <img
            src="${theme.image}"
            alt="${theme.name} — Bloomy Vow"
            loading="lazy"
          >

          <div class="theme-cover-shade"></div>

          <div class="theme-cover-top">
            <span>${theme.category || 'Wedding'}</span>
            <span>${theme.demoUrl ? 'LIVE DEMO' : 'PREVIEW'}</span>
          </div>

          <div class="theme-cover-bottom">
            <span>BLOOMY VOW COLLECTION</span>
            <b>${theme.price || ''}</b>
          </div>
        </a>

        <div class="theme-body">

          <div class="theme-heading-row">
            <div>
              <span class="theme-collection">
                ${theme.collection || ''}
              </span>

              <h3>${theme.name || 'Wedding Theme'}</h3>
            </div>

            <a
              class="theme-arrow"
              href="${detailUrl}"
              aria-label="Lihat ${theme.name}"
            >↗</a>
          </div>

          <p>${theme.tagline || ''}</p>

          <div class="theme-feature-line">
            ${features.map(feature => `<span>${feature}</span>`).join('<i></i>')}
          </div>

          <div class="theme-footer">
            <a class="theme-action primary" href="${detailUrl}">
              Lihat Detail <span>→</span>
            </a>

            ${demoLink}
          </div>

        </div>
      </article>
    `;
  }

  /* =====================================================
     RENDER THEMES
  ===================================================== */

  function render() {
    if (!grid) {
      console.error(
        'Bloomy Vow: elemen #grid tidak ditemukan di index.html.'
      );
      return;
    }

    const query = (
      search?.value ||
      navSearch?.value ||
      ''
    ).trim().toLowerCase();

    const data = themes.filter(theme => {
      const matchesCategory =
        activeCategory === 'Semua' ||
        theme.category === activeCategory;

      const searchableText = [
        theme.name,
        theme.category,
        theme.collection,
        theme.tagline,
        theme.story
      ].filter(Boolean).join(' ').toLowerCase();

      return (
        matchesCategory &&
        (!query || searchableText.includes(query))
      );
    });

    grid.innerHTML = data.length
      ? data.map((theme, index) => card(theme, index)).join('')
      : '<div class="empty">Tema yang kamu cari belum ditemukan.</div>';

    if (themeCount) {
      themeCount.textContent = `${data.length} THEMES`;
    }

    console.info(
      `Bloomy Vow: ${data.length} tema ditampilkan.`
    );
  }

  /* =====================================================
     FILTER BUTTONS
  ===================================================== */

  if (filters) {
    filters.innerHTML = categories.map(category => `
      <button
        type="button"
        class="filter ${category === 'Semua' ? 'active' : ''}"
        data-category="${category}"
      >${category}</button>
    `).join('');

    filters.addEventListener('click', event => {
      const button = event.target.closest('.filter');

      if (!button) return;

      activeCategory = button.dataset.category;

      filters.querySelectorAll('.filter').forEach(item => {
        item.classList.toggle('active', item === button);
      });

      render();
    });
  }

  /* =====================================================
     SEARCH — COLLECTION + HEADER
  ===================================================== */

  search?.addEventListener('input', () => {
    if (navSearch) {
      navSearch.value = search.value;
    }

    render();
  });

  navSearch?.addEventListener('input', () => {
    if (search) {
      search.value = navSearch.value;
    }

    render();
  });

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');

      menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });

    mobileMenu.addEventListener('click', event => {
      if (event.target.closest('a')) {
        mobileMenu.classList.remove('open');

        menuButton.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    });
  }

  /* =====================================================
     HEADER SCROLL
  ===================================================== */

  window.addEventListener('scroll', () => {
    siteHeader?.classList.toggle(
      'scrolled',
      window.scrollY > 25
    );
  }, { passive: true });

  /* =====================================================
     INITIAL RENDER
  ===================================================== */

  if (!themes.length) {
    console.error(
      'Bloomy Vow: data tema kosong. Periksa themes.js dan pastikan variabelnya bernama window.BLOOMY_VOW_THEMES.'
    );
  }

  render();

})();

