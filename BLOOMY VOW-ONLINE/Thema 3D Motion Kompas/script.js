// ==================================================
// WEDDING PASSPORT
// SCRIPT UTAMA — VERSI PERBAIKAN
// ==================================================



/* ===== DATA UNDANGAN ===== */
var C = {
    n1: 'Adinda',
    n2: 'Dimas',
    tgl: '20 APRIL 2025',
    tamu: 'Nama Tamu',

    p1: {
        jenis: 'BRIDE',
        kode: 'JKT20042025',
        nama: 'Sapt. Adinda Ramadhan, S.Farm',
        ortu: [
            'Imanul Hakim, Ak., MSIF',
            '& Endang Saptorini, S.E., M.Pd.'
        ],
        ket: 'PUTRI DARI',
        foto: './assets/foto-pengantin-wanita.png'
    },

    p2: {
        jenis: 'GROOM',
        kode: 'JKT20042025',
        nama: 'Dimas Anggara, BS MS',
        ortu: [
            'Hafid Sungkar, Ir',
            '& Fauziah Badeges, Ir'
        ],
        ket: 'PUTRA DARI',
        foto: './assets/foto-pengantin-pria.png'
    },

    acara: [
        {
            j: 'Wedding Ceremony',
            s: 'Akad Nikah',
            t: 'SABTU, 17 FEBRUARI 2025',
            w: 'Pukul 08.00 WIB - Selesai',
            a: [
                'Is Plaza Ballroom',
                'Jln. Pramuka Raya 150 Jakarta Timur'
            ],
            m: 'https://maps.google.com/?q=Jakarta',
            iso: '2025-02-17T01:00:00Z'
        },
        {
            j: 'Wedding Reception',
            s: 'Resepsi Pernikahan',
            t: 'SABTU, 17 FEBRUARI 2025',
            w: 'Pukul 11.00 WIB - Selesai',
            a: [
                'Is Plaza Ballroom',
                'Jln. Pramuka Raya 150 Jakarta Timur'
            ],
            m: 'https://maps.google.com/?q=Jakarta'
        }
    ],

    
foto: [
    './assets/gallery-1.jpg',
    './assets/gallery-2.jpg',
    './assets/gallery-3.jpg',
    './assets/gallery-4.jpg',
    './assets/gallery-5.jpg',
    './assets/gallery-6.jpg',
    './assets/gallery-7.jpg',
    './assets/gallery-8.jpg'
],

    fotoBerdua: './assets/foto-berdua.png',

    cerita: [
        [
            'Perkenalan',
            'Tahun 2015 Kami dipertemukan saat menjadi Mahasiswa Baru, kami berada di satu Jurusan dan Kelas yang sama, pada saat itu kami hanya teman biasa.'
        ],
        [
            'Awal Hubungan',
            'Setahun kemudian kami menjadi sahabat dekat, hingga di akhir Tahun 2016 dia menyatakan perasaannya kepada saya dan perjalanan hubungan kami hingga saat ini sudah hampir 5 tahun.'
        ],
        [
            'Lamaran',
            'Setelah waktu yang lama kami menjalin hubungan, dia mengajak untuk serius dan pada Tanggal 17 Januari 2021 dia membawa kedua orangtuanya ke keluarga saya untuk melamar saya dan menyampaikan niat menuju ke pernikahan.'
        ],
        [
            'Pernikahan',
            'Minggu, 25 Juli 2021 Kami melangsungkan akad nikah secara sederhana. Dengan Ridha Allah SWT dan kedua orangtua, Kami memulai lembaran baru dengan berbagai cerita indah didalamnya.'
        ]
    ],

    rek: [
        {
            b: 'BANK ABC',
            no: '1234567890',
            an: 'a.n. Adinda Ramadhan'
        },
        {
            b: 'E-WALLET',
            no: '081234567890',
            an: 'a.n. Dimas Anggara'
        }
    ]
};
// ============================

// 2. HELPER
// ==================================================

var $ = function (id) {
    return document.getElementById(id);
};

var B = document.body;

var Q = function (selector) {
    return document.querySelectorAll(selector);
};


// 3. NAMA TAMU, NAMA PASANGAN, DAN TANGGAL
// ==================================================

if ($('guest')) {
    $('guest').textContent =
        new URLSearchParams(location.search).get('to') || C.tamu;
}

Q('.n').forEach(function (el) {
    el.textContent = C.n1.toUpperCase() + ' & ' + C.n2.toUpperCase();
});

Q('.dt').forEach(function (el) {
    el.textContent = C.tgl;
});

if ($('fin')) {
    $('fin').textContent = C.n1 + ' & ' + C.n2;
}

if (C.fotoBerdua && $('cimg') && $('ctx')) {
    $('cimg').setAttribute('href', C.fotoBerdua);
    $('ctx').remove();
}


// 4. BARCODE PASPOR
// ==================================================

(function () {
    var x = 0;
    var s = '';
    var r = 7;

    function rnd() {
        r = (r * 9301 + 49297) % 233280;
        return r / 233280;
    }

    while (x < 300) {
        var w = 1 + Math.floor(rnd() * 4);

        if (rnd() > 0.35) {
            s += '<rect x="' + x + '" width="' + w + '" height="50"/>';
        }

        x += w + 1 + Math.floor(rnd() * 2);
    }

    var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
        x +
        ' 50" preserveAspectRatio="none">' +
        '<g fill="#111">' +
        s +
        '</g></svg>';

    document.documentElement.style.setProperty(
        '--bar',
        'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")'
    );
})();


// 5. KARTU PASPOR
// ==================================================

var PH =
    '<svg viewBox="0 0 90 114">' +
    '<defs>' +
    '<linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#d6dce2"/>' +
    '<stop offset="1" stop-color="#8e9aa8"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<rect width="90" height="114" fill="url(#pg)"/>' +
    '<circle cx="45" cy="42" r="17" fill="#fff" fill-opacity=".75"/>' +
    '<path d="M12 114c2-30 16-40 33-40s31 10 33 40z" fill="#fff" fill-opacity=".75"/>' +
    '</svg>';

function pass(p) {
    return (
        '<div class="pp rv">' +
            '<div class="rep">REPUBLIK INDONESIA</div>' +
            '<h5>PASSPORT PROFILE</h5>' +
            '<small>PROFIL PASPOR</small>' +

            '<div class="top">' +
                '<div class="pic">' +
                    (p.foto
                        ? '<img alt="" src="' + p.foto + '">'
                        : PH) +
                '</div>' +

                '<dl>' +
                    '<dt>TYPE / JENIS</dt>' +
                    '<dd>' + p.jenis + '</dd>' +
                    '<dt>CODE / KODE</dt>' +
                    '<dd>IDN</dd>' +
                    '<dt>PASSPORT NO. / NO. PASPOR</dt>' +
                    '<dd>' + p.kode + '</dd>' +
                '</dl>' +
            '</div>' +

            '<div class="fold"></div>' +

            '<dl>' +
                '<dt>FULL NAME / NAMA LENGKAP</dt>' +
                '<dd>' + p.nama + '</dd>' +
                '<dt>DAUGHTER OF / ' + p.ket + '</dt>' +
                '<dd class="s">' + p.ortu.join('<br>') + '</dd>' +
                '<dt>NATIONALITY / KEBANGSAAN</dt>' +
                '<dd class="s">INDONESIA <small style="font-size:9px">ID</small></dd>' +
            '</dl>' +

            '<svg class="stamp" viewBox="0 0 80 80">' +
                '<use href="#glb" width="80" height="80"/>' +
                '<use href="#plane" x="-4" y="-6" width="30" height="30" transform="rotate(-40 11 9)"/>' +
            '</svg>' +

            '<hr>' +

            '<div class="mrz">' +
                p.jenis + ' &lt;&lt; PASSPORT &lt;&lt; TO &lt;&lt; MARRIAGE &lt;&lt;<br>' +
                'COUPLE &lt;&lt; IDN &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;' +
            '</div>' +
        '</div>'
    );
}

if ($('pps')) {
    $('pps').innerHTML = pass(C.p1) + pass(C.p2);
}


// 6. PEMBUAT KARTU KONTEN
// ==================================================

function card(cls, title, subtitle, fd, body) {
    return (
        '<div class="rv card ' + cls + '">' +

            '<div class="band ' + (fd ? 'fd' : 'ev') + '">' +

                '<h3>' +
                    title +

                    (fd
                        ? '<em>' + subtitle + '</em>'
                        : '<small>' + subtitle + '</small>') +

                '</h3>' +

                '<svg viewBox="0 0 120 46">' +
                    '<use href="' +
                        (fd ? '#glb' : '#doodle') +
                    '" width="120" height="46"/>' +
                '</svg>' +

            '</div>' +

            '<div class="cb">' +
                '<div class="cbi">' +
                    '<div class="body">' +
                        body +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="foot"></div>' +

        '</div>'
    );
}


// 7. KARTU ACARA
// ==================================================

var MAP =
    '<svg viewBox="0 0 24 24">' +
    '<circle cx="10.5" cy="10.5" r="6"/>' +
    '<path d="M15 15l5 5M8 10.5h5M10.5 8v5"/>' +
    '</svg>';

if ($('event')) {
    $('event').innerHTML = C.acara.map(function (a) {
        return card(
            'ev',
            a.j,
            a.s,
            0,

            '<dl>' +
                '<dt>DATE / TANGGAL</dt>' +
                '<dd>' + a.t + '</dd>' +

                '<dt style="margin-top:12px">TIME / WAKTU</dt>' +
                '<dd class="s">' + a.w + '</dd>' +

                '<dt style="margin-top:12px">ADDRESS / ALAMAT</dt>' +
                '<dd class="s">' + a.a.join('<br>') + '</dd>' +
            '</dl>' +

            '<a class="b2 b3" href="' + a.m +
                '" target="_blank" rel="noopener" ' +
                'style="margin-left:0;border-left:4px solid var(--m);background:var(--m)">' +

                MAP + 'Open Maps' +

            '</a>'
        );
    }).join('');
}


// 8. GALERI
// ==================================================


/* ==========================================
   OUR GALLERY — PREWEDDING PHOTO SLIDER
   ========================================== */

// Foto contoh dari Unsplash.
// Ganti C.foto dengan foto pasangan sendiri saat siap.
var demoGalleryPhotos = [
    'https://images.unsplash.com/photo-1694709283346-bbc66a18e731?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1708569177091-d93e951adb1d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1643224467857-8871ba13bb25?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1761574047929-0ce2dd9bdc70?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1772634734731-d52d06e46ff4?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1759054711263-7f6b1b383660?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1785394809415-41f5f6d4041b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1704265056303-7c708ba3f657?auto=format&fit=crop&w=1200&q=85'
];

var galleryPhotos = (
    Array.isArray(C.foto) && C.foto.length
) ? C.foto : demoGalleryPhotos;

// Buat galeri foto
var galleryBody = '<div class="gal">' +
    galleryPhotos.map(function (src, i) {
        return (
            '<div class="gal-item" ' +
                'data-gallery-index="' + i + '" ' +
                'role="button" tabindex="0" ' +
                'aria-label="Buka foto pasangan ' + (i + 1) + '">' +
                '<img src="' + src + '" ' +
                    'alt="Foto pasangan ' + (i + 1) + '" ' +
                    'loading="lazy" decoding="async">' +
                '<span class="gal-zoom-mark">＋</span>' +
            '</div>'
        );
    }).join('') +
    '</div>';

// Tampilkan kartu galeri
$('gallery').innerHTML = card(
    '',
    'Our Gallery',
    '',
    0,
    galleryBody
);

// Viewer diperbesar, diletakkan di body agar tidak terpotong
var galleryViewerMarkup =
    '<div class="gallery-lightbox" id="galleryLightbox" ' +
        'role="dialog" aria-modal="true" ' +
        'aria-label="Galeri foto pasangan" aria-hidden="true">' +

        '<button type="button" class="gl-close" ' +
            'aria-label="Tutup galeri">×</button>' +

        '<button type="button" class="gl-arrow gl-prev" ' +
            'aria-label="Foto sebelumnya">‹</button>' +

        '<div class="gl-content">' +
            '<img id="galleryLightboxImage" src="" alt="">' +
            '<div class="gl-caption">' +
                '<span id="galleryLightboxCount">1 / 8</span>' +
                '<span>Our Moments</span>' +
            '</div>' +
        '</div>' +

        '<button type="button" class="gl-arrow gl-next" ' +
            'aria-label="Foto berikutnya">›</button>' +
    '</div>';

document.body.insertAdjacentHTML(
    'beforeend',
    galleryViewerMarkup
);

// Kontrol viewer
(function () {
    var section = document.getElementById('gallery');
    var viewer = document.getElementById('galleryLightbox');
    var image = document.getElementById('galleryLightboxImage');
    var counter = document.getElementById('galleryLightboxCount');

    if (!section || !viewer || !image || !counter) return;

    var currentIndex = 0;
    var lastTrigger = null;
    var startX = 0;
    var startY = 0;
    var previousOverflow = '';

    function showPhoto(index) {
        var total = galleryPhotos.length;
        if (!total) return;

        currentIndex = (index + total) % total;

        image.src = galleryPhotos[currentIndex];
        image.alt = 'Foto pasangan ' + (currentIndex + 1);
        counter.textContent = (currentIndex + 1) + ' / ' + total;
    }

    function openViewer(index, trigger) {
        lastTrigger = trigger || null;
        showPhoto(index);

        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        viewer.classList.add('is-open');
        viewer.setAttribute('aria-hidden', 'false');
        document.querySelector('.gl-close').focus();
    }

    function closeViewer() {
        viewer.classList.remove('is-open');
        viewer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = previousOverflow;

        if (lastTrigger) lastTrigger.focus();
    }

    // Klik foto untuk memperbesar
    section.addEventListener('click', function (event) {
        var item = event.target.closest('[data-gallery-index]');
        if (!item) return;

        openViewer(
            Number(item.dataset.galleryIndex),
            item
        );
    });

    // Foto juga dapat dibuka dengan Enter atau Space
    section.addEventListener('keydown', function (event) {
        var item = event.target.closest('[data-gallery-index]');
        if (!item) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openViewer(
                Number(item.dataset.galleryIndex),
                item
            );
        }
    });

    viewer.querySelector('.gl-close').addEventListener(
        'click',
        closeViewer
    );

    viewer.querySelector('.gl-prev').addEventListener(
        'click',
        function () {
            showPhoto(currentIndex - 1);
        }
    );

    viewer.querySelector('.gl-next').addEventListener(
        'click',
        function () {
            showPhoto(currentIndex + 1);
        }
    );

    // Klik area gelap untuk menutup
    viewer.addEventListener('click', function (event) {
        if (event.target === viewer) closeViewer();
    });

    // Keyboard: panah kiri/kanan dan Escape
    document.addEventListener('keydown', function (event) {
        if (!viewer.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            closeViewer();
        } else if (event.key === 'ArrowRight') {
            showPhoto(currentIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            showPhoto(currentIndex - 1);
        }
    });

    // Geser foto dengan jari di HP atau drag dengan mouse
    viewer.addEventListener('pointerdown', function (event) {
        startX = event.clientX;
        startY = event.clientY;
    });

    viewer.addEventListener('pointerup', function (event) {
        var dx = event.clientX - startX;
        var dy = event.clientY - startY;

        // Hanya dianggap swipe jika gerak horizontal cukup jauh
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            showPhoto(currentIndex + (dx < 0 ? 1 : -1));
        }
    });
})();



// 9. LOVE STORY
// ==================================================

if ($('story')) {
    $('story').innerHTML = card(
        '',
        'Love Story',
        '',
        0,

        '<div class="tl">' +

            C.cerita.map(function (item) {
                return (
                    '<div>' +
                        '<h4>' + item[0] + '</h4>' +
                        '<p>' + item[1] + '</p>' +
                    '</div>'
                );
            }).join('') +

            '<p style="font-size:13px;color:#333">' +
                'Bismillahirrahmanirrahim' +
            '</p>' +

        '</div>'
    );
}


// 10. UCAPAN DAN KONFIRMASI KEHADIRAN
// ==================================================

var ICO =
    '<svg viewBox="0 0 24 24">' +
        '<circle cx="12" cy="8" r="4"/>' +
        '<path d="M4 21c0-5 4-7 8-7s8 2 8 7z" fill="currentColor"/>' +
    '</svg>';

if ($('wishes')) {
    $('wishes').innerHTML = card(
        '',
        'Tinggalkan Do’a Ucapan',
        'Berikan ucapan terbaik untuk Kedua Mempelai & Konfirmasi Kehadiran',
        1,

        '<form id="fm">' +

            '<input type="text" id="fn" placeholder="Nama Kamu" required maxlength="40">' +

            '<textarea id="ft" rows="3" placeholder="Berikan Ucapan & Do’a" required maxlength="300"></textarea>' +

            '<div class="lbl">Konfirmasi Kehadiran?</div>' +

            '<div class="rs">' +

                '<label>' +
                    '<input type="radio" name="h" value="Hadir" checked>' +
                    '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M6 10l3 3 5-6"/></svg>' +
                    'Hadir' +
                '</label>' +

                '<label>' +
                    '<input type="radio" name="h" value="Tidak Hadir">' +
                    '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M7 7l6 6M13 7l-6 6"/></svg>' +
                    'Tidak Hadir' +
                '</label>' +

            '</div>' +

            '<button class="send" type="submit">Send</button>' +

        '</form>' +

        '<div class="ms" id="ms"></div>'
    );
}


// 11. HADIAH DIGITAL
// ==================================================

if ($('gift')) {
    $('gift').innerHTML = card(
        '',
        'Wedding Gift',
        '',
        1,

        '<div class="gf">' +

            '<p>' +
                'Mungkin karena jarak, waktu ataupun keadaan yang menghalangi ' +
                'untuk ikut hadir dalam momen bahagia kami, silakan klik tombol ' +
                'di bawah untuk mengirimkan kado/hadiah.' +
            '</p>' +

            '<button class="b2 b3" id="amp" style="margin:0">' +
                '<svg viewBox="0 0 24 24">' +
                    '<rect x="3" y="8" width="18" height="4"/>' +
                    '<path d="M5 12v9h14v-9M12 8v13M12 8S9 3 7 5s2 3 5 3 5-1 3-3-3 3-3 3"/>' +
                '</svg>' +
                'Amplop Digital' +
            '</button>' +

            '<div class="bk" id="bk">' +

                C.rek.map(function (r) {
                    return (
                        '<div>' +
                            '<small>' + r.b + '</small>' +
                            '<b>' + r.no + '</b>' +
                            r.an + '<br>' +
                            '<button type="button" data-c="' + r.no + '">' +
                                'SALIN NOMOR' +
                            '</button>' +
                        '</div>'
                    );
                }).join('') +

            '</div>' +

        '</div>'
    );
}

if ($('amp')) {
    $('amp').onclick = function () {
        $('bk').classList.toggle('on');
    };
}

if ($('bk')) {
    $('bk').onclick = function (event) {
        var nomor = event.target.dataset.c;

        if (!nomor) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(nomor).catch(function () {});
        }

        event.target.textContent = 'TERSALIN ✓';

        setTimeout(function () {
            event.target.textContent = 'SALIN NOMOR';
        }, 1800);
    };
}


// 12. COUNTDOWN DAN KALENDER
// ==================================================

var T = new Date(C.acara[0].iso);

if ($('cd')) {
    $('cd').innerHTML = [
        'Days',
        'Hours',
        'Minutes',
        'Seconds'
    ].map(function (label) {
        return (
            '<div>' +
                '<span>00</span>' +
                '<small>' + label + '</small>' +
            '</div>'
        );
    }).join('');
}

function tick() {
    if (!$('cd')) return;

    var remaining = Math.max(0, T - new Date());

    var values = [
        Math.floor(remaining / 86400000),
        Math.floor(remaining / 3600000) % 24,
        Math.floor(remaining / 60000) % 60,
        Math.floor(remaining / 1000) % 60
    ];

    Q('#cd span').forEach(function (el, index) {
        el.textContent = String(values[index]).padStart(2, '0');
    });
}

tick();
setInterval(tick, 1000);

function formatCalendarDate(date) {
    return date.toISOString().replace(/[-:]|\.\d+/g, '');
}

if ($('cal')) {
    $('cal').href =
        'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent('Pernikahan ' + C.n1 + ' & ' + C.n2) +
        '&dates=' + formatCalendarDate(T) +
        '/' + formatCalendarDate(new Date(+T + 10800000));
}


// 13. DATA UCAPAN
// ==================================================

var W = [];
var KEY = 'wp-wishes';

try {
    W = JSON.parse(localStorage.getItem(KEY) || '[]');
} catch (error) {
    W = [];
}

if (!W.length) {
    W = [
        {
            n: 'Sahabat',
            h: 1,
            t: 'Selamat menempuh hidup baru, semoga bahagia selalu!',
            d: '09-07-2026 13:19'
        },
        {
            n: 'Keluarga',
            h: 0,
            t: 'Maaf belum bisa hadir, doa terbaik untuk kalian.',
            d: '14-05-2026 08:31'
        }
    ];
}


/* Hapus komentar bernama "asa" satu kali */
try {
    W = W.filter(function (item) {
        return String(item.n || '').trim().toLowerCase() !== 'asa';
    });

    localStorage.setItem(KEY, JSON.stringify(W));
} catch (error) {
    console.warn('Tidak dapat memperbarui daftar ucapan:', error);
}


function rw() {
    if (!$('ms')) return;

    $('ms').innerHTML = W.map(function () {
        return (
            '<div class="m">' +
                '<i>' + ICO + '</i>' +
                '<div>' +
                    '<b><span></span><u></u></b>' +
                    '<small></small>' +
                    '<p></p>' +
                '</div>' +
            '</div>'
        );
    }).join('');

    Q('#ms .m').forEach(function (item, index) {
        var wish = W[index];

        item.querySelector('span').textContent = wish.n;
        item.querySelector('u').className = wish.h ? '' : 'x';
        item.querySelector('small').textContent = wish.d;
        item.querySelector('p').textContent = wish.t;
    });
}

rw();

if ($('fm')) {
    $('fm').onsubmit = function (event) {
        event.preventDefault();

        var now = new Date();
        var radio = document.querySelector('[name="h"]:checked');

        W.unshift({
            n: $('fn').value.trim(),
            h: radio && radio.value === 'Hadir' ? 1 : 0,
            t: $('ft').value.trim(),

            d:
                now.toLocaleDateString('id-ID').replace(/\//g, '-') +
                ' ' +
                now.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                }).replace('.', ':')
        });

        try {
            localStorage.setItem(KEY, JSON.stringify(W.slice(0, 50)));
        } catch (error) {}

        rw();
        $('fm').reset();
    };
}


// 14. NAVIGASI DOCK
// ==================================================

var IC = {
    home: [
        'Home',
        'M3 11l9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z M12 17s-3-1.900-3-4a1.700 1.700 0 0 1 3-1 1.700 1.700 0 0 1 3 1c0 2.100-3 4-3 4z'
    ],

    couple: [
        'Couple',
        'M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20v-1a6 6 0 0 1 12 0v1M17 9a2.500 2.500 0 1 0 0-5M17 14a5 5 0 0 1 5 5v1'
    ],

    event: [
        'Event',
        'M4 5h16v15H4zM4 10h16M8 3v4M16 3v4M9 15h.01M12 15h.01M15 15h.01'
    ],

    gallery: [
        'Gallery',
        'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 16s-3-1.900-3-4a1.700 1.700 0 0 1 3-1 1.700 1.700 0 0 1 3 1c0 2.100-3 4-3 4z'
    ],

    story: [
        'Story',
        'M9 18s-6-3.800-6-8a3.500 3.500 0 0 1 6-2.300A3.500 3.500 0 0 1 15 10M15 21s-6-3.800-6-8a3.500 3.500 0 0 1 6-2.300A3.500 3.500 0 0 1 21 13c0 4.200-6 8-6 8z'
    ],

    wishes: [
        'Wishes',
        'M12 3a9 9 0 1 1-4.500 16.800L3 21l1.300-4.200A9 9 0 0 1 12 3zM12 15s-3.500-2.200-3.500-4.500a2 2 0 0 1 3.500-1.200 2 2 0 0 1 3.500 1.200c0 2.300-3.500 4.500-3.500 4.500z'
    ],

    gift: [
        'Gift',
        'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8S9 3 7 5s2 3 5 3 5-1 3-3-3 3-3 3'
    ]
};

if ($('dock')) {
    $('dock').innerHTML = Object.keys(IC).map(function (key) {
        var target = key === 'event' ? 'date' : key;

        return (
            '<a href="#' + target + '" data-k="' + key +
                '" aria-label="' + IC[key][0] + '">' +

                '<span class="tp">' + IC[key][0] + '</span>' +

                '<svg viewBox="0 0 24 24">' +
                    '<path d="' + IC[key][1] + '"/>' +
                '</svg>' +

            '</a>'
        );
    }).join('');
}


// 15. STATUS NAVIGASI SAAT SCROLL
// ==================================================

var ticking = false;

function upd() {
    ticking = false;

    var height = window.innerHeight;
    var current = 'home';
    var dockTheme = 'l';

    Q('main section[data-k]').forEach(function (section) {
        var rect = section.getBoundingClientRect();

        if (rect.top < height * 0.5) {
            current = section.dataset.k;
        }
    });

    Q('main section[data-dock]').forEach(function (section) {
        var rect = section.getBoundingClientRect();

        if (rect.top < height - 40 && rect.bottom > height - 40) {
            dockTheme = section.dataset.dock;
        }
    });

    Q('.dock a').forEach(function (link) {
        link.classList.toggle('on', link.dataset.k === current);
    });

    if ($('dock')) {
        $('dock').classList.toggle('d', dockTheme === 'd');
    }

    if ($('mus')) {
        $('mus').classList.toggle('d', dockTheme === 'd');
    }
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(upd);
    }
}, { passive: true });

upd();


// 16. ANIMASI SCROLL
// Mengulang saat elemen keluar dan masuk viewport.
// ==================================================

var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        var element = entry.target;
        var isHome = element.id === 'home';

        var className = isHome
            ? 'scroll-active'
            : 'in';

        // Home tidak berjalan sebelum cover dibuka.
        if (isHome && B.classList.contains('lock')) {
            element.classList.remove('scroll-active');
            return;
        }

        var visible =
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.08;

        if (visible) {
            // Hanya restart ketika kelas sebelumnya sudah dilepas.
            if (!element.classList.contains(className)) {
                element.classList.remove(className);

                // Paksa browser menerapkan kondisi awal animasi.
                void element.offsetWidth;

                element.classList.add(className);
            }
        } else {
            // Keluar dari layar: reset agar bisa diputar ulang.
            element.classList.remove(className);
        }
    });
}, {
    threshold: [0, 0.08],
    rootMargin: '0px 0px -4% 0px'
});

// Pantau bagian utama.
if ($('home')) {
    io.observe($('home'));
}

// Pantau elemen dengan kelas animasi .rv.
// Elemen kartu paspor dan kartu konten juga termasuk.
Q('.rv').forEach(function (element) {
    io.observe(element);
});



/* ==========================================
   17. MUSIK LATAR PERNIKAHAN
   MP3 otomatis berulang + tombol play/pause
   ========================================== */

var pl = 0;

var bgMusic = new Audio('./assets/music-wedding.mp3');

bgMusic.loop = true;
bgMusic.volume = 0.35;
bgMusic.preload = 'auto';

/* Putar atau jeda musik */
function music(value) {
    pl = value ? 1 : 0;

    var musicButton = $('mus');

    if (musicButton) {
        musicButton.classList.toggle('pl', !!pl);
        musicButton.setAttribute(
            'aria-label',
            pl ? 'Jeda musik' : 'Putar musik'
        );
        musicButton.title = pl ? 'Jeda musik' : 'Putar musik';
    }

    if (!pl) {
        bgMusic.pause();
        return;
    }

    bgMusic.play().catch(function (error) {
        pl = 0;

        if (musicButton) {
            musicButton.classList.remove('pl');
            musicButton.setAttribute('aria-label', 'Putar musik');
            musicButton.title = 'Putar musik';
        }

        console.warn(
            'Musik belum bisa diputar. Periksa file MP3 di folder assets.',
            error
        );
    });
}

/* Tombol musik di pojok bawah */
if ($('mus')) {
    $('mus').onclick = function () {
        music(!pl);
    };
}

// 18. TOMBOL OPEN INVITATION
// ==================================================

if ($('go')) {
    $('go').onclick = function () {
        if (B.classList.contains('open')) return;

        // Mulai animasi membuka cover.
        B.classList.add('open');

        // Setelah cover bergerak keluar, buka scroll halaman.
        setTimeout(function () {
            B.classList.remove('lock');

            upd();

            var home = $('home');

            if (home) {
                home.classList.remove('scroll-active');

                // Paksa animasi home kembali ke kondisi awal.
                void home.offsetWidth;

                home.classList.add('scroll-active');
            }
        }, 1100);

        // Audio dimulai dari interaksi pengguna.
        music(1);
    };
}


// 19. SELESAI
// ==================================================


/* ===== INTERAKSI BUKA-TUTUP PASPOR ===== */
document.addEventListener("click", function (event) {
    var card = event.target.closest("#pps .pp");

    if (!card) return;

    // Jangan mengganggu tombol atau tautan di dalam kartu
    if (event.target.closest("a, button, input, textarea, select, label")) {
        return;
    }

    card.classList.toggle("is-open");
});

/* Dukungan keyboard */
document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;

    var card = event.target.closest
        ? event.target.closest("#pps .pp")
        : null;

    if (!card) return;

    if (event.target.closest("a, button, input, textarea, select, label")) {
        return;
    }

    event.preventDefault();
    card.classList.toggle("is-open");
});


/* Jalankan ayunan setelah putaran awal selesai */
document.querySelectorAll('#cover .cmp .rose').forEach(function (rose) {
    rose.addEventListener('animationend', function (event) {
        if (event.animationName === 'compass-intro') {
            rose.classList.add('swaying');
        }
    }, { once: true });
});

