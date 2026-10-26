// =========================================
// ⚙️ DATA UNDANGAN
// =========================================

const API_URL = "https://script.google.com/macros/s/AKfycbxKcjFZEKfJ4hyjeaj818jDtY2rCt1gH5kCYPlCugvLzMgkGNtv4QSucuaTYxL7FQezWA/exec";

// =========================================
// 🔗 AMBIL DATA UNDANGAN DARI GOOGLE SHEETS
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const urlParams =
        new URLSearchParams(window.location.search);

    const invitationId =
        urlParams.get("id");

    // Tidak ada ID → gunakan data lokal
    if (!invitationId) {
        return;
    }

    const callbackName =
        "weddingAPI_" + Date.now();

    const apiScript =
        document.createElement("script");

    window[callbackName] = function (response) {

        if (!response.success) {

            console.error(
                "API Undangan:",
                response.message
            );

            delete window[callbackName];
            apiScript.remove();

            return;
        }

        const data = response.data;

// =========================================
// DATA DARI GOOGLE SHEETS
// =========================================

const eventDate =
    data["Tanggal Pernikahan"] || weddingData.eventDate;

// =========================================
// FORMAT TANGGAL INDONESIA
// =========================================

function formatWeddingDate(dateString) {

    if (!dateString) {
        return weddingData.weddingDate;
    }

    const parts = dateString.split("/");

    if (parts.length !== 3) {
        return dateString;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const monthNames = [
        "JANUARI",
        "FEBRUARI",
        "MARET",
        "APRIL",
        "MEI",
        "JUNI",
        "JULI",
        "AGUSTUS",
        "SEPTEMBER",
        "OKTOBER",
        "NOVEMBER",
        "DESEMBER"
    ];

    const dateObject =
        new Date(year, month - 1, day);

    const dayNames = [
        "MINGGU",
        "SENIN",
        "SELASA",
        "RABU",
        "KAMIS",
        "JUMAT",
        "SABTU"
    ];

    return (
        dayNames[dateObject.getDay()] +
        ", " +
        day +
        " " +
        monthNames[month - 1] +
        " " +
        year
    );
}


const formattedWeddingDate =
    formatWeddingDate(eventDate);


const akadTime =
    data["Jam Akad"] || weddingData.akadTime;

const resepsiTime =
    data["Jam Resepsi"] || weddingData.resepsiTime;

const venue =
    data["Nama Gedung"] || weddingData.venue;

const address =
    data["Alamat"] || weddingData.address;

    

// =========================================
// UPDATE TANGGAL DI WEBSITE
// =========================================

document
    .querySelectorAll(
        ".cover-date, .hero-date, .event-date"
    )
    .forEach(function (element) {

        element.textContent =
            formattedWeddingDate;

    });


// =========================================
// UPDATE WAKTU ACARA
// =========================================

const eventTimes =
    document.querySelectorAll(".event-card .event-time");

if (eventTimes[0]) {
    eventTimes[0].textContent = akadTime;
}

if (eventTimes[1]) {
    eventTimes[1].textContent = resepsiTime;
}

// =========================================
// FOTO MEMPELAI DARI GOOGLE DRIVE
// =========================================

function convertDriveUrl(url) {

    if (!url) {
        return "";
    }

    const match =
        url.match(/[?&]id=([^&]+)/);

    if (match && match[1]) {

        return (
            "https://drive.google.com/thumbnail?id=" +
            match[1] +
            "&sz=w1000"
        );

    }

    return url;
}


const bridePhoto =
    data["Foto Wanita"] ||
    weddingData.bridePhoto;

const groomPhoto =
    data["Foto Pria"] ||
    weddingData.groomPhoto;


const mempelaiPhotos =
    document.querySelectorAll(
        ".mempelai-photo img"
    );


if (mempelaiPhotos[0] && bridePhoto) {

    mempelaiPhotos[0].src =
        convertDriveUrl(bridePhoto);

}


if (mempelaiPhotos[1] && groomPhoto) {

    mempelaiPhotos[1].src =
        convertDriveUrl(groomPhoto);

}

// =========================================
// WEDDING GIFT DARI GOOGLE SHEETS
// =========================================

const bankAccount =
    data["Nomor Rekening"] ||
    weddingData.bank.account;

const bankOwner =
    data["Nama Pemilik Rekening"] ||
    weddingData.bank.owner;

const danaAccount =
    data["Nomor DANA"] ||
    weddingData.dana.account;

const danaOwner =
    data["Nama Pemilik DANA"] ||
    weddingData.dana.owner;


// Simpan ke weddingData
weddingData.bank.account = bankAccount;
weddingData.bank.owner = bankOwner;

weddingData.dana.account = danaAccount;
weddingData.dana.owner = danaOwner;


// =========================================
// UPDATE TAMPILAN REKENING
// =========================================

const giftAccounts =
    document.querySelectorAll(".gift-account");

const giftOwners =
    document.querySelectorAll(".gift-name");


// BCA
if (giftAccounts[0]) {
    giftAccounts[0].textContent = bankAccount;
}

if (giftOwners[0]) {
    giftOwners[0].textContent = bankOwner;
}


// DANA
if (giftAccounts[1]) {
    giftAccounts[1].textContent = danaAccount;
}

if (giftOwners[1]) {
    giftOwners[1].textContent = danaOwner;
}

// =========================================
// GOOGLE MAPS DARI GOOGLE SHEETS
// =========================================

const mapsURL =
    data["Google Maps"] ||
    weddingData.mapsURL ||
    "";


// Simpan ke weddingData
weddingData.mapsURL = mapsURL;


// =========================================
// UPDATE TOMBOL GOOGLE MAPS
// =========================================

const mapsButton =
    document.querySelector(
        ".location-card .location-button"
    );

if (mapsButton && mapsURL) {

    mapsButton.href = mapsURL;
    mapsButton.target = "_blank";
}

// =========================================
// NAMA ORANG TUA DARI GOOGLE SHEETS
// =========================================

const brideParents =
    data["Orang Tua Wanita"] ||
    weddingData.brideParents;

const groomParents =
    data["Orang Tua Pria"] ||
    weddingData.groomParents;


// Simpan ke weddingData
weddingData.brideParents = brideParents;
weddingData.groomParents = groomParents;


// =========================================
// UPDATE NAMA ORANG TUA MEMPELAI
// =========================================

const mempelaiParents =
    document.querySelectorAll(".mempelai-parent");


// Mempelai wanita
if (mempelaiParents[0]) {
    mempelaiParents[0].innerHTML =
        "Putri dari<br>" +
        brideParents;
}


// Mempelai pria
if (mempelaiParents[1]) {
    mempelaiParents[1].innerHTML =
        "Putra dari<br>" +
        groomParents;
}



// =========================================
// UPDATE GEDUNG & ALAMAT
// =========================================

const eventLocations =
    document.querySelectorAll(".event-card .event-location");

eventLocations.forEach(function (element) {

    element.innerHTML =
        venue +
        "<br>" +
        address.replace(/,\s*/g, "<br>");

});


const locationTitle =
    document.querySelector(".location-card h3");

if (locationTitle) {
    locationTitle.textContent = venue;
}


const locationAddress =
    document.querySelector(".location-card p");

if (locationAddress) {
    locationAddress.innerHTML =
        address.replace(/,\s*/g, "<br>");
}

        // Ambil nama dari database
        const groom =
            data["Nama Pria"] || weddingData.groom;

        const bride =
            data["Nama Wanita"] || weddingData.bride;

        // Update nama di weddingData
        weddingData.groom = groom;
        weddingData.bride = bride;

// =========================================
// UPDATE NAMA DI COVER
// =========================================

const coverName =
    document.querySelector(".cover-content h1");

if (coverName) {

    coverName.textContent = "";

    const groomText =
        document.createTextNode(groom + " ");

    const ampersand =
        document.createElement("span");

    ampersand.textContent = "&";

    const brideText =
        document.createTextNode(" " + bride);

    coverName.appendChild(groomText);
    coverName.appendChild(ampersand);
    coverName.appendChild(brideText);
}


// =========================================
// UPDATE JUDUL BROWSER
// =========================================

document.title =
    groom + " & " + bride + " | Wedding Invitation";

        // Update semua nama pria
        document
            .querySelectorAll(".groom-name")
            .forEach(function (element) {
                element.textContent = groom;
            });

        // Update semua nama wanita
        document
            .querySelectorAll(".bride-name")
            .forEach(function (element) {
                element.textContent = bride;
            });

        console.log(
            "Data undangan berhasil dimuat:",
            data
        );

        delete window[callbackName];
        apiScript.remove();
    };

    apiScript.src =
        API_URL +
        "?id=" +
        encodeURIComponent(invitationId) +
        "&callback=" +
        callbackName;

    document.head.appendChild(apiScript);

});

const weddingData = {

    groom: "Rangga Hardika Candra",

bride: "Dewi Fatimah",

brideParents: "Bapak Robiin & Ibu Mar'ati",

groomParents: "Bapak Suhardi & Ibu Sudartini",

bridePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",

groomPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",

coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",

weddingDate: "24 September 2026",

eventDate: "Kamis, 24 September 2026",

akadTime: "12.00 – 14.00 WIB",

resepsiTime: "15.00 – 17.00 WIB",

countdownDate: "September 24, 2026 08:00:00",

    venue: "Gedung Hanami Ballroom",

    address: "Jl. Sakura No. 10, Serang, Banten",

    mapsURL: "https://www.google.com/maps/search/?api=1&query=Gedung+Hanami+Ballroom+Serang+Banten",

    bank: {
        name: "Bank BCA",
        account: "99999999999",
        owner: "Rangga Hardika Candra"
    },

    dana: {
        name: "DANA",
        account: "081234567890",
        owner: "Rangga Hardika Candra"
    }

};


// =========================================
// COUNTDOWN
// =========================================

const weddingDate = new Date(
    weddingData.countdownDate
).getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").innerText = days;

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =========================
   SAKURA BERGUGURAN
========================= */

const sakuraContainer = document.querySelector(".sakura-falling");

function createSakura() {

    const petal = document.createElement("div");

    petal.classList.add("sakura-petal");

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    petal.style.animationDelay =
        Math.random() * 3 + "s";

    petal.style.transform =
        `scale(${0.6 + Math.random() * 0.8})`;

    sakuraContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}

setInterval(createSakura, 500);

for (let i = 0; i < 15; i++) {
    createSakura();
}

/* =========================
   GALLERY CAROUSEL
========================= */

const galleryImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b"
];

let galleryIndex = 0;

const galleryMainImage = document.getElementById("gallery-main-image");
const galleryCurrent = document.getElementById("gallery-current");
const galleryThumbs = document.querySelectorAll(".gallery-thumb");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");


function showGalleryImage(index) {
    if (!galleryMainImage || !galleryCurrent) {
    return;
}

    galleryIndex = index;

    // Animasi keluar
    galleryMainImage.classList.add("gallery-changing");

    setTimeout(() => {

        // Ganti foto
        galleryMainImage.src = galleryImages[galleryIndex];

        // Nomor foto
        galleryCurrent.textContent =
            String(galleryIndex + 1).padStart(2, "0");

        // Update thumbnail
        galleryThumbs.forEach((thumb, i) => {
            thumb.classList.toggle(
                "active",
                i === galleryIndex
            );
        });

        // Animasi masuk
        galleryMainImage.onload = () => {
            galleryMainImage.classList.remove("gallery-changing");
        };

    }, 250);
}


/* Tombol sebelumnya */

if (galleryPrev) {

    galleryPrev.addEventListener("click", () => {

        let newIndex = galleryIndex - 1;

        if (newIndex < 0) {
            newIndex = galleryImages.length - 1;
        }

        showGalleryImage(newIndex);

    });

}


/* Tombol berikutnya */

if (galleryNext) {

    galleryNext.addEventListener("click", () => {

        let newIndex = galleryIndex + 1;

        if (newIndex >= galleryImages.length) {
            newIndex = 0;
        }

        showGalleryImage(newIndex);

    });

}

/* Klik thumbnail */

galleryThumbs.forEach((thumb, index) => {

    thumb.addEventListener("click", () => {

        showGalleryImage(index);

    });

});

/* =========================
   AUTO SLIDE GALERI
========================= */

let galleryAutoSlide = setInterval(() => {

    let nextIndex = galleryIndex + 1;

    if (nextIndex >= galleryImages.length) {
        nextIndex = 0;
    }

    showGalleryImage(nextIndex);

}, 5000);

/* =========================
   AUTO SCROLL UNDANGAN
========================= */

const openInvitationButton =
    document.querySelector(".open-button");

let invitationScrolling = false;
let invitationScrollTimer;

if (openInvitationButton) {

    openInvitationButton.addEventListener("click", function (event) {

        event.preventDefault();

        // Mulai dari bagian Countdown
        const countdownSection =
            document.querySelector("#countdown");

        if (countdownSection) {
            countdownSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        // Tunggu sedikit setelah scroll awal
        setTimeout(() => {

            if (invitationScrolling) return;

            invitationScrolling = true;

            invitationScrollTimer = setInterval(() => {

                window.scrollBy(0, 1);

                // Berhenti ketika sampai paling bawah
                if (
                    window.innerHeight + window.scrollY
                    >= document.documentElement.scrollHeight - 5
                ) {
                    clearInterval(invitationScrollTimer);
                    invitationScrolling = false;
                }

            }, 50);

        }, 1000);

    });

}

// =========================================
// BUKA UNDANGAN
// =========================================

const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");

if (openBtn && cover) {

    openBtn.addEventListener("click", function () {

        // Tutup cover
        cover.classList.add("hide");

        // Aktifkan scroll halaman
        document.documentElement.style.overflow = "";
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";

        // Putar musik
        if (weddingMusic) {

            weddingMusic.play()
                .then(() => {

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                })
                .catch(() => {

                    console.log("Musik gagal diputar.");

                });

        }

        // Masuk ke section opening
        setTimeout(function () {

            const opening =
                document.querySelector(".opening");

            if (opening) {

                opening.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 700);

    });

}


// =========================================
// NAMA TAMU OTOMATIS DARI URL
// =========================================

// =========================================
// NAMA TAMU + ID UNDANGAN DARI URL
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const urlParams =
        new URLSearchParams(window.location.search);

    // ID undangan
    const invitationId =
        urlParams.get("id");

    // Nama tamu
    const guestName =
        urlParams.get("to");


    // =========================================
    // TAMPILKAN NAMA TAMU DI COVER
    // =========================================

    if (guestName) {

        const decodedGuestName =
            decodeURIComponent(guestName);

        const guestElement =
            document.querySelector(".cover-guest strong");

        if (guestElement) {
            guestElement.textContent =
                decodedGuestName;
        }


        // =========================================
        // ISI OTOMATIS NAMA DI RSVP
        // =========================================

        const rsvpNameInput =
            document.getElementById("rsvpName");

        if (rsvpNameInput) {
            rsvpNameInput.value =
                decodedGuestName;
        }

    }


    // =========================================
    // DEBUG
    // =========================================

    console.log(
        "ID Undangan:",
        invitationId
    );

    console.log(
        "Nama Tamu:",
        guestName
    );

});

// =========================================
// 🎵 MUSIC SYSTEM
// =========================================

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicBtn");

const coverOpen =
    document.getElementById("coverOpen");


// =========================================
// PLAY MUSIC
// =========================================

function playWeddingMusic() {

    if (!weddingMusic) return;

    weddingMusic.play()
        .then(() => {

            if (musicButton) {
                musicButton.classList.add("playing");
            }

        })
        .catch((error) => {

            console.log(
                "Musik belum dapat diputar:",
                error
            );

        });

}


// =========================================
// PAUSE MUSIC
// =========================================

function pauseWeddingMusic() {

    if (!weddingMusic) return;

    weddingMusic.pause();

    if (musicButton) {
        musicButton.classList.remove("playing");
    }

}


// =========================================
// TOMBOL MUSIK
// =========================================

if (musicButton && weddingMusic) {

    musicButton.addEventListener(
        "click",
        function () {

            if (weddingMusic.paused) {

                playWeddingMusic();

            } else {

                pauseWeddingMusic();

            }

        }
    );


    weddingMusic.addEventListener(
        "play",
        function () {

            musicButton.classList.add("playing");

        }
    );


    weddingMusic.addEventListener(
        "pause",
        function () {

            musicButton.classList.remove("playing");

        }
    );

}


// =========================================
// FUNGSI PLAY
// =========================================

function playWeddingMusic() {

    if (!weddingMusic) return;

    weddingMusic.play()
        .then(() => {

            if (musicButton) {
                musicButton.classList.add("playing");
                musicButton.textContent = "♫";
            }

        })
        .catch((error) => {

            console.log("Musik belum dapat diputar:", error);

        });
}


// =========================================
// FUNGSI PAUSE
// =========================================

function pauseWeddingMusic() {

    if (!weddingMusic) return;

    weddingMusic.pause();

    if (musicButton) {
        musicButton.classList.remove("playing");
        musicButton.textContent = "♪";
    }

}


// =========================================
// TOMBOL BUKA UNDANGAN
// =========================================

if (coverOpen) {

    coverOpen.addEventListener("click", function () {

        playWeddingMusic();

    });

}


// =========================================
// TOMBOL MUSIK
// =========================================

if (musicButton && weddingMusic) {

    musicButton.addEventListener("click", function () {

        if (weddingMusic.paused) {

            playWeddingMusic();

        } else {

            pauseWeddingMusic();

        }

    });

}


// =========================================
// JIKA MUSIK BERHENTI
// =========================================

if (weddingMusic) {

    weddingMusic.addEventListener("pause", function () {

        if (musicButton) {
            musicButton.classList.remove("playing");
            musicButton.textContent = "♪";
        }

    });


    weddingMusic.addEventListener("play", function () {

        if (musicButton) {
            musicButton.classList.add("playing");
            musicButton.textContent = "♫";
        }

    });

}


// =========================================
// RSVP → WHATSAPP
// =========================================

const rsvpButton = document.getElementById("rsvpButton");

if (rsvpButton) {
    rsvpButton.addEventListener("click", function () {

        const name = document.getElementById("rsvpName").value.trim();
        const attendance = document.getElementById("rsvpAttendance").value;
        const guests = document.getElementById("rsvpGuests").value.trim();

        // Cek kelengkapan
        if (!name || !attendance || !guests) {
            alert("Mohon lengkapi nama, kehadiran, dan jumlah tamu.");
            return;
        }

const message =
`Halo ${weddingData.groom} & ${weddingData.bride},

Saya ${name} ingin mengonfirmasi kehadiran.

Kehadiran: ${attendance}
Jumlah tamu: ${guests} orang

Terima kasih.`;

        const whatsappNumber = "6285775423618";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
}

// =========================================
// GALERI LIGHTBOX
// =========================================

const galleryItems = document.querySelectorAll(".gallery-item img");
const galleryLightbox = document.getElementById("galleryLightbox");
const galleryLightboxImage = document.getElementById("galleryLightboxImage");
const galleryClose = document.getElementById("galleryClose");

galleryItems.forEach(function (image) {

    image.addEventListener("click", function () {

        galleryLightboxImage.src = this.src;

        galleryLightbox.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

});


/* TUTUP LIGHTBOX */

if (galleryClose) {

    galleryClose.addEventListener("click", function () {

        galleryLightbox.style.display = "none";

        galleryLightboxImage.src = "";

        document.body.style.overflow = "";

    });

}


/* KLIK AREA GELAP UNTUK MENUTUP */

if (galleryLightbox) {

    galleryLightbox.addEventListener("click", function (event) {

        if (event.target === galleryLightbox) {

            galleryLightbox.style.display = "none";

            galleryLightboxImage.src = "";

            document.body.style.overflow = "";

        }

    });

}

// =========================================
// TUTUP LIGHTBOX DENGAN ESC
// =========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && galleryLightbox) {

        galleryLightbox.style.display = "none";

        if (galleryLightboxImage) {
            galleryLightboxImage.src = "";
        }

        document.body.style.overflow = "";
    }

});

// =========================================
// 💳 COPY NOMOR REKENING
// =========================================

function copyAccount(accountNumber) {

    navigator.clipboard.writeText(accountNumber)
        .then(function () {

            alert("Nomor rekening berhasil disalin.");

        })
        .catch(function () {

            alert("Nomor rekening: " + accountNumber);

        });

}

// =========================================
// 🔗 HUBUNGKAN DATA UNDANGAN KE WEBSITE
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // NAMA PASANGAN
    // =========================

    const groomNames = document.querySelectorAll(".groom-name");
    const brideNames = document.querySelectorAll(".bride-name");

    groomNames.forEach(function (el) {
        el.textContent = weddingData.groom;
    });

    brideNames.forEach(function (el) {
        el.textContent = weddingData.bride;
    });

    // =========================
// NAMA DI COVER
// =========================

const coverNames =
    document.querySelector(".cover-content h1");

if (coverNames) {

    coverNames.innerHTML =
        weddingData.groom +
        ' <span>&</span> ' +
        weddingData.bride;

}

    // =========================
// NAMA FOOTER
// =========================

const footerName = document.querySelector("footer h2");

if (footerName) {
    footerName.textContent =
        weddingData.groom + " & " + weddingData.bride;
}

    // =========================
    // NAMA DI MEMPELAI
    // =========================

    const mempelaiNames =
        document.querySelectorAll(".mempelai-card h3");

    if (mempelaiNames.length >= 2) {

        mempelaiNames[0].textContent = weddingData.bride;
        mempelaiNames[1].textContent = weddingData.groom;

    }

    // =========================
// NAMA ORANG TUA MEMPELAI
// =========================

const mempelaiParents =
    document.querySelectorAll(".mempelai-parent");

if (mempelaiParents.length >= 2) {

    mempelaiParents[0].innerHTML =
        "Putri dari<br>" +
        weddingData.brideParents;

    mempelaiParents[1].innerHTML =
        "Putra dari<br>" +
        weddingData.groomParents;

}


    // =========================
    // TANGGAL HERO
    // =========================

    const heroDate =
        document.querySelector(".hero-date");

    if (heroDate) {
        heroDate.textContent = weddingData.weddingDate;
    }

    // =========================
// TANGGAL COVER
// =========================

const coverDate =
    document.querySelector(".cover-date");

if (coverDate) {
    coverDate.textContent =
        weddingData.eventDate.toUpperCase();
}


    // =========================
    // NAMA VENUE
    // =========================

    const venue =
        document.querySelector(".location-card h3");

    if (venue) {
        venue.textContent = weddingData.venue;
    }


    // =========================
    // ALAMAT
    // =========================

    const address =
        document.querySelector(".location-card p");

    if (address) {
        address.textContent = weddingData.address;
    }


    // =========================
    // REKENING BCA
    // =========================

    const giftAccounts =
        document.querySelectorAll(".gift-account");

    const giftNames =
        document.querySelectorAll(".gift-name");


    if (giftAccounts.length >= 2) {

        giftAccounts[0].textContent =
            weddingData.bank.account;

        giftAccounts[1].textContent =
            weddingData.dana.account;

    }


    if (giftNames.length >= 2) {

        giftNames[0].textContent =
            "a.n. " + weddingData.bank.owner;

        giftNames[1].textContent =
            "a.n. " + weddingData.dana.owner;

    }

});

// =========================================
// 💳 COPY REKENING DARI weddingData
// =========================================

// ==================================
// COPY REKENING / DANA
// ==================================

const copyAccountButtons =
    document.querySelectorAll(".copy-account");

copyAccountButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const type = this.dataset.account;

        const giftAccounts =
            document.querySelectorAll(".gift-account");

        let accountNumber = "";

        if (type === "bank" && giftAccounts[0]) {
            accountNumber =
                giftAccounts[0].textContent.trim();
        }

        if (type === "dana" && giftAccounts[1]) {
            accountNumber =
                giftAccounts[1].textContent.trim();
        }

        if (accountNumber) {
            copyAccount(accountNumber);
        }

    });

});

// =========================
// DETAIL ACARA
// =========================

const eventDates = document.querySelectorAll(".event-date");

eventDates.forEach(function (el) {
    el.textContent = weddingData.eventDate;
});


// =========================
// LOKASI DETAIL ACARA
// =========================

const eventLocations = document.querySelectorAll(".event-location");

eventLocations.forEach(function (el) {

    const addressParts = weddingData.address.split(", ");

    el.innerHTML =
        weddingData.venue +
        "<br>" +
        addressParts.join("<br>");

});


// =========================
// JAM ACARA
// =========================

const eventTimes = document.querySelectorAll(".event-time");

if (eventTimes.length >= 2) {

    eventTimes[0].textContent =
        weddingData.akadTime;

    eventTimes[1].textContent =
        weddingData.resepsiTime;

}


// =========================
// FOTO MEMPELAI
// =========================

const mempelaiPhotos =
    document.querySelectorAll(".mempelai-photo img");

if (mempelaiPhotos.length >= 2) {

    mempelaiPhotos[0].src =
        weddingData.bridePhoto;

    mempelaiPhotos[1].src =
        weddingData.groomPhoto;

}


// =========================
// FOTO COVER
// =========================

const coverPhoto =
    document.querySelector(".cover-photo img");

if (coverPhoto) {

    coverPhoto.src =
        weddingData.coverPhoto;

}


// =========================
// LINK GOOGLE MAPS
// =========================

const mapsButton =
    document.querySelector(".location-card .location-button");

if (mapsButton) {

    mapsButton.href =
        weddingData.mapsURL;

    mapsButton.target = "_blank";

}

// ==================================================
// DATABASE UNDANGAN - AMBIL DATA DARI GOOGLE SHEET
// ==================================================

const DATABASE_API =
    "https://script.google.com/macros/s/AKfycbxKcjFZEKfJ4hyjeaj818jDtY2rCt1gH5kCYPlCugvLzMgkGNtv4QSucuaTYxL7FQezWA/exec";


function loadDatabaseInvitation() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const invitationId =
        params.get("id");


    if (!invitationId) {

        console.log(
            "ID undangan tidak ditemukan."
        );

        return;

    }


    const callbackName =
        "databaseInvitation_" +
        Date.now();


    const script =
        document.createElement("script");


    window[callbackName] =
        function(response) {

            try {

                if (
                    !response ||
                    !response.success ||
                    !response.data
                ) {

                    console.log(
                        "Data undangan gagal dimuat."
                    );

                    return;

                }


                const data =
                    response.data;


                // ==================================
                // NAMA PRIA
                // ==================================

                document
                    .querySelectorAll(
                        ".groom-name"
                    )
                    .forEach(function(el) {

                        el.textContent =
                            data["Nama Pria"] || "";

                    });


                // ==================================
                // NAMA WANITA
                // ==================================

                document
                    .querySelectorAll(
                        ".bride-name"
                    )
                    .forEach(function(el) {

                        el.textContent =
                            data["Nama Wanita"] || "";

                    });


                // ==================================
                // NAMA MEMPELAI
                // ==================================

                const mempelaiNames =
                    document.querySelectorAll(
                        ".mempelai-card h3"
                    );


                if (
                    mempelaiNames.length >= 2
                ) {

                    mempelaiNames[0].textContent =
                        data["Nama Wanita"] || "";

                    mempelaiNames[1].textContent =
                        data["Nama Pria"] || "";

                }

// ==================================
// ORANG TUA MEMPELAI
// ==================================

const mempelaiParents =
    document.querySelectorAll(
        ".mempelai-card .mempelai-parent"
    );

if (
    mempelaiParents.length >= 2
) {

    mempelaiParents[0].innerHTML =
        "Putri dari<br>" +
        (data["Orang Tua Wanita"] || "");

    mempelaiParents[1].innerHTML =
        "Putra dari<br>" +
        (data["Orang Tua Pria"] || "");

}

// ==================================
// TANGGAL PERNIKAHAN
// ==================================

const heroDate =
    document.querySelector(".hero-date");

if (heroDate) {

    heroDate.textContent =
        data["Tanggal Pernikahan"] || "";

}


// ==================================
// DETAIL ACARA
// ==================================

const eventDates =
    document.querySelectorAll(
        ".event-card .event-date"
    );

const eventTimes =
    document.querySelectorAll(
        ".event-card .event-time"
    );


// Tanggal kedua acara sama
eventDates.forEach(function(el) {

    el.textContent =
        data["Tanggal Pernikahan"] || "";

});


// Jam Akad
if (eventTimes.length >= 2) {

    eventTimes[0].textContent =
        data["Jam Akad"] || "";

    eventTimes[1].textContent =
        data["Jam Resepsi"] || "";

}

// ==================================
// LOKASI ACARA
// ==================================

const eventLocations =
    document.querySelectorAll(
        ".event-card .event-location"
    );

eventLocations.forEach(function(el) {

    el.innerHTML =
        (data["Nama Gedung"] || "") +
        "<br>" +
        (data["Alamat"] || "");

});


// ==================================
// LOKASI UTAMA
// ==================================

const venueTitle =
    document.querySelector(
        ".location-card h3"
    );

const venueAddress =
    document.querySelector(
        ".location-card p"
    );

const mapsButton =
    document.querySelector(
        ".location-card .location-button"
    );


if (venueTitle) {

    venueTitle.textContent =
        data["Nama Gedung"] || "";

}


if (venueAddress) {

    venueAddress.textContent =
        data["Alamat"] || "";

}


if (mapsButton) {

    mapsButton.href =
        data["Google Maps"] || "#";

}

// ==================================
// WEDDING GIFT
// ==================================

const giftAccounts =
    document.querySelectorAll(".gift-account");

const giftNames =
    document.querySelectorAll(".gift-name");

if (giftAccounts.length >= 2) {

    // Rekening Bank
    giftAccounts[0].textContent =
        data["Nomor Rekening"] || "";

    // DANA
    giftAccounts[1].textContent =
        data["Nomor DANA"] || "";
}

if (giftNames.length >= 2) {

    // Pemilik rekening
    giftNames[0].textContent =
        "a.n. " +
        (data["Nama Pemilik Rekening"] || "");

    // Pemilik DANA
    giftNames[1].textContent =
        "a.n. " +
        (data["Nama Pemilik DANA"] || "");
}

// ==================================
// FOTO MEMPELAI
// ==================================

function databaseDriveImageURL(url) {
    if (!url) return "";

    const match = String(url).match(/[?&]id=([^&]+)/);

    if (match && match[1]) {
        return "https://drive.google.com/thumbnail?id=" +
               match[1] +
               "&sz=w1000";
    }

    return url;
}

const mempelaiPhotos =
    document.querySelectorAll(
        ".mempelai-card .mempelai-photo img"
    );

if (mempelaiPhotos.length >= 2) {

    // Foto wanita
    if (data["Foto Wanita"]) {
        mempelaiPhotos[0].src =
            databaseDriveImageURL(data["Foto Wanita"]);
    }

    // Foto pria
    if (data["Foto Pria"]) {
        mempelaiPhotos[1].src =
            databaseDriveImageURL(data["Foto Pria"]);
    }
}

// ==================================
// GALERI FOTO CUSTOMER
// ==================================

const uploadedGallery = [];

for (let i = 1; i <= 6; i++) {

    const galleryURL =
        data["Gallery " + i] || "";

    if (galleryURL) {
        uploadedGallery.push(
            databaseDriveImageURL(galleryURL)
        );
    }
}

// Jika customer sudah upload galeri,
// gunakan foto customer menggantikan foto template.
if (uploadedGallery.length > 0) {

    // ================================
    // GALERI GRID
    // ================================

    const galleryGridItems =
        document.querySelectorAll(".gallery-item");

    galleryGridItems.forEach(function(item, index) {

        const image =
            item.querySelector("img");

        if (!image) return;

        if (uploadedGallery[index]) {

            image.src = uploadedGallery[index];
            item.style.display = "";

        } else {

            item.style.display = "none";

        }

    });

    // ================================
    // GALERI CAROUSEL
    // ================================

    if (Array.isArray(galleryImages)) {

        galleryImages.length = 0;

        uploadedGallery.forEach(function(url) {
            galleryImages.push(url);
        });

        galleryIndex = 0;

        if (galleryMainImage && galleryImages.length > 0) {
            galleryMainImage.src = galleryImages[0];
        }

        if (galleryCurrent) {
            galleryCurrent.textContent = "01";
        }

    }

    // ================================
    // THUMBNAIL CAROUSEL
    // ================================

    const carouselThumbs =
        document.querySelectorAll(".gallery-thumb");

    carouselThumbs.forEach(function(thumb, index) {

        const image = thumb.querySelector("img");

        if (!image) return;

        if (uploadedGallery[index]) {
            image.src = uploadedGallery[index];
            thumb.style.display = "";
        } else {
            thumb.style.display = "none";
        }

    });

}

        // ==================================
        // JUDUL TAB BROWSER
        // ==================================

        document.title =
            (data["Nama Pria"] || "") +
            " & " +
            (data["Nama Wanita"] || "") +
            " | Wedding Invitation";
        

                console.log(
                    "Data undangan berhasil dimuat:",
                    data
                );


            } finally {

                delete window[
                    callbackName
                ];

                script.remove();

            }

        };


    script.onerror =
        function() {

            console.error(
                "Gagal mengambil data undangan."
            );

            delete window[
                callbackName
            ];

            script.remove();

        };


    script.src =
        DATABASE_API +
        "?id=" +
        encodeURIComponent(
            invitationId
        ) +
        "&callback=" +
        callbackName +
        "&t=" +
        Date.now();


    document.head.appendChild(
        script
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadDatabaseInvitation();

    }
);

// =========================================================
// BLACK & GOLD — GALLERY LIGHTBOX
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item img"
        );

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "galleryLightboxImage"
        );

    const closeButton =
        document.getElementById(
            "galleryClose"
        );

    const previousButton =
        document.getElementById(
            "galleryPrev"
        );

    const nextButton =
        document.getElementById(
            "galleryNext"
        );


    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    let currentGalleryIndex = 0;


    // =========================================
    // BUKA FOTO
    // =========================================

    function openGallery(index) {

        currentGalleryIndex = index;

        lightboxImage.src =
            galleryItems[
                currentGalleryIndex
            ].src;

        lightbox.style.display =
            "flex";

        document.body.style.overflow =
            "hidden";
    }


    // =========================================
    // TUTUP
    // =========================================

    function closeGallery() {

        lightbox.style.display =
            "none";

        lightboxImage.src = "";

        document.body.style.overflow =
            "";
    }


    // =========================================
    // FOTO SEBELUMNYA
    // =========================================

    function previousGallery() {

        currentGalleryIndex--;

        if (
            currentGalleryIndex < 0
        ) {

            currentGalleryIndex =
                galleryItems.length - 1;
        }

        lightboxImage.src =
            galleryItems[
                currentGalleryIndex
            ].src;
    }


    // =========================================
    // FOTO BERIKUTNYA
    // =========================================

    function nextGallery() {

        currentGalleryIndex++;

        if (
            currentGalleryIndex >=
            galleryItems.length
        ) {

            currentGalleryIndex = 0;
        }

        lightboxImage.src =
            galleryItems[
                currentGalleryIndex
            ].src;
    }


    // =========================================
    // KLIK FOTO
    // =========================================

    galleryItems.forEach(
        function (image, index) {

            image.addEventListener(
                "click",
                function () {

                    openGallery(index);

                }
            );

        }
    );


    // =========================================
    // TOMBOL
    // =========================================

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeGallery
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                previousGallery();

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                nextGallery();

            }
        );

    }


    // =========================================
    // KLIK AREA LUAR FOTO
    // =========================================

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                lightbox
            ) {

                closeGallery();

            }

        }
    );


    // =========================================
    // KEYBOARD
    // =========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                lightbox.style.display !==
                "flex"
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closeGallery();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousGallery();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextGallery();

            }

        }
    );


    // =========================================
    // SWIPE HP
    // =========================================

    let touchStartX = 0;


    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            const touchEndX =
                event.changedTouches[0].clientX;

            const difference =
                touchEndX -
                touchStartX;


            if (
                Math.abs(difference) < 50
            ) {
                return;
            }


            if (difference > 0) {

                previousGallery();

            } else {

                nextGallery();

            }

        },
        { passive: true }
    );

});

