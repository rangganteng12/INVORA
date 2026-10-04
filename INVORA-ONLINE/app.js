const themes = window.INVORA_THEMES || [];
const grid = document.getElementById('grid');
const filters = document.getElementById('filters');
const search = document.getElementById('search');
const navSearch = document.getElementById('navSearch');
const themeCount = document.getElementById('themeCount');
const categories = ['Semua', ...new Set(themes.map(t => t.category))];
let activeCategory = 'Semua';

function card(t, index){
  const slug = encodeURIComponent(t.slug);
  const detailUrl = `theme.html?theme=${slug}`;
  const demo = t.demoUrl
    ? `<a class="theme-action secondary" href="${t.demoUrl}" target="_blank" rel="noopener">Live Demo <span>↗</span></a>`
    : `<a class="theme-action secondary" href="${detailUrl}">Lihat Preview <span>↗</span></a>`;

  return `<article class="theme-card ${index === 0 ? 'theme-card-featured' : ''}">
    <a class="theme-cover" href="${detailUrl}">
      <img src="${t.image}" alt="${t.name} — INVORA" loading="lazy">
      <div class="theme-cover-shade"></div>
      <div class="theme-cover-top">
        <span>${t.category}</span>
        <span>${t.demoUrl ? 'LIVE DEMO' : 'PREVIEW'}</span>
      </div>
      <div class="theme-cover-bottom">
        <span>INVORA COLLECTION</span>
        <b>${t.price}</b>
      </div>
    </a>
    <div class="theme-body">
      <div class="theme-heading-row">
        <div>
          <span class="theme-collection">${t.collection}</span>
          <h3>${t.name}</h3>
        </div>
        <a class="theme-arrow" href="${detailUrl}" aria-label="Lihat ${t.name}">↗</a>
      </div>
      <p>${t.tagline}</p>
      <div class="theme-feature-line">${t.features.slice(0,3).map(x => `<span>${x}</span>`).join('<i></i>')}</div>
      <div class="theme-footer">
        <a class="theme-action primary" href="${detailUrl}">Lihat Detail <span>→</span></a>
        ${demo}
      </div>
    </div>
  </article>`;
}
function render(){
  const q = (search?.value || navSearch?.value || '').trim().toLowerCase();
  const data = themes.filter(t => {
    const matchesCategory = activeCategory === 'Semua' || t.category === activeCategory;
    const haystack = `${t.name} ${t.category} ${t.collection} ${t.tagline}`.toLowerCase();
    return matchesCategory && (!q || haystack.includes(q));
  });
  themeCount.textContent = `${data.length} THEMES`;
  grid.innerHTML = data.length ? data.map((t, i) => card(t, i)).join('') : `<div class="empty">Tema yang kamu cari belum ditemukan.</div>`;
}

filters.innerHTML = categories.map(c => `<button type="button" class="filter ${c === 'Semua' ? 'active' : ''}" data-category="${c}">${c}</button>`).join('');
filters.addEventListener('click', e => {
  const b = e.target.closest('.filter');
  if(!b) return;
  activeCategory = b.dataset.category;
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('active', x === b));
  render();
});

search.addEventListener('input', () => { navSearch.value = search.value; render(); });
navSearch.addEventListener('input', () => { search.value = navSearch.value; render(); });

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
mobileMenu.addEventListener('click', e => {
  if(e.target.closest('a')){
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
  }
});

window.addEventListener('scroll', () => {
  document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 25);
}, {passive:true});

render();
