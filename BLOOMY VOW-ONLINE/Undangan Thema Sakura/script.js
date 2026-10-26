// ==================================================
// DATABASE UNDANGAN DIGITAL
// SCRIPT.JS - VERSI BERSIH
// ==================================================


// ==================================================
// GOOGLE APPS SCRIPT
// ==================================================

const DATABASE_API =
    "https://script.google.com/macros/s/AKfycbxKcjFZEKfJ4hyjeaj818jDtY2rCt1gH5kCYPlCugvLzMgkGNtv4QSucuaTYxL7FQezWA/exec";


// ==================================================
// DATA DEFAULT
// Dipakai hanya kalau database belum tersedia
// ==================================================

const weddingData = {

    groom:
        "Galih",

    bride:
        "Ratna",

    brideParents:
        "Bapak Abdul & Ibu Dini",

    groomParents:
        "Bapak Jalil & Ibu Lesti",

    bridePhoto:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",

    groomPhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",

    coverPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",

    weddingDate:
        "24 September 2026",

    eventDate:
        "Kamis, 24 September 2026",

    akadTime:
        "12.00 – 14.00 WIB",

    resepsiTime:
        "15.00 – 17.00 WIB",

    countdownDate:
        "September 24, 2026 08:00:00",

    venue:
        "Gedung Hanami Ballroom",

    address:
        "Jl. Sakura No. 10, Serang, Banten",

    mapsURL:
        "https://www.google.com/maps/search/?api=1&query=Gedung+Hanami+Ballroom+Serang+Banten",

    bank: {

        name:
            "Bank BCA",

        account:
            "99999999999",

        owner:
            "Galih"

    },

    dana: {

        name:
            "DANA",

        account:
            "081234567890",

        owner:
            "Galih"

    }

};


// ==================================================
// COUNTDOWN
// ==================================================

let countdownTargetDate =
    new Date(
        weddingData.countdownDate
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        countdownTargetDate -
        now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    if (distance <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(
            2,
            "0"
        );

    hoursElement.textContent =
        String(hours).padStart(
            2,
            "0"
        );

    minutesElement.textContent =
        String(minutes).padStart(
            2,
            "0"
        );

    secondsElement.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// ==================================================
// FORMAT TANGGAL
// ==================================================

function formatWeddingDate(
    dateString
) {

    if (!dateString) {

        return weddingData.eventDate;

    }


    const value =
        String(dateString)
            .trim();


    // Format DD/MM/YYYY

    const parts =
        value.split("/");


    if (
        parts.length === 3 &&
        parts[0].length <= 2
    ) {

        const day =
            parseInt(
                parts[0],
                10
            );

        const month =
            parseInt(
                parts[1],
                10
            );

        const year =
            parseInt(
                parts[2],
                10
            );


        if (
            !isNaN(day) &&
            !isNaN(month) &&
            !isNaN(year)
        ) {

            const date =
                new Date(
                    year,
                    month - 1,
                    day
                );


            const days = [
                "MINGGU",
                "SENIN",
                "SELASA",
                "RABU",
                "KAMIS",
                "JUMAT",
                "SABTU"
            ];


            const months = [
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


            return (
                days[
                    date.getDay()
                ] +
                ", " +
                day +
                " " +
                months[
                    month - 1
                ] +
                " " +
                year
            );

        }

    }


    return value;

}


// ==================================================
// TANGGAL UNTUK COUNTDOWN
// ==================================================

function createCountdownDate(
    dateString
) {

    if (!dateString) {

        return null;

    }


    const parts =
        String(dateString)
            .trim()
            .split("/");


    if (
        parts.length !== 3
    ) {

        return null;

    }


    const day =
        parseInt(
            parts[0],
            10
        );

    const month =
        parseInt(
            parts[1],
            10
        );

    const year =
        parseInt(
            parts[2],
            10
        );


    if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year)
    ) {

        return null;

    }


    return new Date(
        year,
        month - 1,
        day,
        8,
        0,
        0
    ).getTime();

}


// ==================================================
// GOOGLE DRIVE IMAGE
// ==================================================

function driveImageURL(url) {

    if (!url) {
        return "";
    }

    const value = String(url).trim();

    // Ambil File ID dari:
    // https://drive.google.com/open?id=FILE_ID
    // https://drive.google.com/file/d/FILE_ID/view
    // https://drive.google.com/uc?id=FILE_ID
    const match =
        value.match(
            /(?:[?&]id=|\/d\/)([^&/]+)/
        );

    if (match && match[1]) {

        return (
            "https://lh3.googleusercontent.com/d/" +
            match[1]
        );

    }

    // Kalau bukan Google Drive,
    // gunakan URL aslinya
    return value;
}


// ==================================================
// CEK URL GAMBAR
// ==================================================

function isValidImageURL(
    url
) {

    if (!url) {

        return false;

    }


    return /^https?:\/\//i.test(
        String(url).trim()
    );

}


// ==================================================
// JSONP
// ==================================================

function loadJSONP(
    url
) {

    return new Promise(
        function(
            resolve,
            reject
        ) {

            const callbackName =
                "databaseCallback_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .substring(2);


            const script =
                document.createElement(
                    "script"
                );


            let finished =
                false;


            const timeout =
                setTimeout(
                    function() {

                        if (finished) {
                            return;
                        }

                        finished = true;

                        script.remove();

                        delete window[
                            callbackName
                        ];

                        reject(
                            new Error(
                                "Server terlalu lama merespons."
                            )
                        );

                    },
                    30000
                );


            window[
                callbackName
            ] =
                function(response) {

                    if (finished) {
                        return;
                    }

                    finished = true;

                    clearTimeout(
                        timeout
                    );

                    script.remove();

                    delete window[
                        callbackName
                    ];

                    resolve(
                        response
                    );

                };


            script.onerror =
                function() {

                    if (finished) {
                        return;
                    }

                    finished = true;

                    clearTimeout(
                        timeout
                    );

                    script.remove();

                    delete window[
                        callbackName
                    ];

                    reject(
                        new Error(
                            "Gagal mengambil data dari Google Sheet."
                        )
                    );

                };


            script.src =
                url +
                (
                    url.includes("?")
                        ? "&"
                        : "?"
                ) +
                "callback=" +
                encodeURIComponent(
                    callbackName
                ) +
                "&t=" +
                Date.now();


            document.head.appendChild(
                script
            );

        }
    );

}


// ==================================================
// UPDATE NAMA
// ==================================================

function updateNames(
    groom,
    bride
) {

    document
        .querySelectorAll(
            ".groom-name"
        )
        .forEach(
            function(element) {

                element.textContent =
                    groom;

            }
        );


    document
        .querySelectorAll(
            ".bride-name"
        )
        .forEach(
            function(element) {

                element.textContent =
                    bride;

            }
        );


    // Nama di kartu mempelai

    const mempelaiNames =
        document.querySelectorAll(
            ".mempelai-card h3"
        );


    if (
        mempelaiNames.length >= 2
    ) {

        mempelaiNames[0]
            .textContent =
            bride;

        mempelaiNames[1]
            .textContent =
            groom;

    }


    // Nama di cover

    const coverName =
        document.querySelector(
            ".cover-content h1"
        );


    if (coverName) {

        coverName.innerHTML =
            groom +
            "<span>&amp;</span>" +
            bride;

    }


    // Nama footer

    const footerName =
        document.querySelector(
            "footer h2"
        );


    if (footerName) {

        footerName.textContent =
            groom +
            " & " +
            bride;

    }


    // Judul browser

    document.title =
        groom +
        " & " +
        bride +
        " | Wedding Invitation";

}


// ==================================================
// UPDATE ORANG TUA
// ==================================================

function updateParents(
    brideParents,
    groomParents
) {

    const parents =
        document.querySelectorAll(
            ".mempelai-card .mempelai-parent"
        );


    if (
        parents.length >= 2
    ) {

        parents[0].innerHTML =
            "Putri dari<br>" +
            brideParents;

        parents[1].innerHTML =
            "Putra dari<br>" +
            groomParents;

    }

}


// ==================================================
// UPDATE TANGGAL
// ==================================================

function updateDates(
    formattedDate
) {

    document
        .querySelectorAll(
            ".cover-date"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formattedDate;

            }
        );


    document
        .querySelectorAll(
            ".hero-date"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formattedDate;

            }
        );


    document
        .querySelectorAll(
            ".event-card .event-date"
        )
        .forEach(
            function(element) {

                element.textContent =
                    formattedDate;

            }
        );

}


// ==================================================
// UPDATE JAM
// ==================================================

function updateTimes(
    akadTime,
    resepsiTime
) {

    const eventTimes =
        document.querySelectorAll(
            ".event-card .event-time"
        );


    if (
        eventTimes[0]
    ) {

        eventTimes[0]
            .textContent =
            akadTime;

    }


    if (
        eventTimes[1]
    ) {

        eventTimes[1]
            .textContent =
            resepsiTime;

    }

}


// ==================================================
// UPDATE LOKASI
// ==================================================

function updateLocation(
    venue,
    address,
    mapsURL
) {

    // Detail acara

    document
        .querySelectorAll(
            ".event-card .event-location"
        )
        .forEach(
            function(element) {

                element.innerHTML =
                    venue +
                    "<br>" +
                    address.replace(
                        /,\s*/g,
                        "<br>"
                    );

            }
        );


    // Judul lokasi

    const venueElement =
        document.querySelector(
            ".location-card h3"
        );


    if (venueElement) {

        venueElement.textContent =
            venue;

    }


    // Alamat lokasi

    const addressElement =
        document.querySelector(
            ".location-card p"
        );


    if (addressElement) {

        addressElement.innerHTML =
            address.replace(
                /,\s*/g,
                "<br>"
            );

    }


    // Semua tombol lokasi

    document
        .querySelectorAll(
            ".location-button"
        )
        .forEach(
            function(button) {

                if (mapsURL) {

                    button.href =
                        mapsURL;

                    button.target =
                        "_blank";

                    button.rel =
                        "noopener noreferrer";

                }

            }
        );

}


// ==================================================
// UPDATE REKENING / DANA
// ==================================================

function updateGift(
    bankAccount,
    bankOwner,
    danaAccount,
    danaOwner
) {

    const accounts =
        document.querySelectorAll(
            ".gift-account"
        );


    const names =
        document.querySelectorAll(
            ".gift-name"
        );


    if (
        accounts[0]
    ) {

        accounts[0]
            .textContent =
            bankAccount;

    }


    if (
        accounts[1]
    ) {

        accounts[1]
            .textContent =
            danaAccount;

    }


    if (
        names[0]
    ) {

        names[0]
            .textContent =
            "a.n. " +
            bankOwner;

    }


    if (
        names[1]
    ) {

        names[1]
            .textContent =
            "a.n. " +
            danaOwner;

    }

}


// ==================================================
// UPDATE FOTO MEMPELAI
// ==================================================

function updateMempelaiPhotos(
    bridePhoto,
    groomPhoto
) {

    const photos =
        document.querySelectorAll(
            ".mempelai-card .mempelai-photo img"
        );


    if (
        photos[0] &&
        isValidImageURL(
            bridePhoto
        )
    ) {

        photos[0].src =
            driveImageURL(
                bridePhoto
            );

    }


    if (
        photos[1] &&
        isValidImageURL(
            groomPhoto
        )
    ) {

        photos[1].src =
            driveImageURL(
                groomPhoto
            );

    }

}


// ==================================================
// UPDATE FOTO COVER
// ==================================================

function updateCoverPhoto(
    coverURL
) {

    const coverImage =
        document.querySelector(
            ".cover-photo img"
        );


    if (!coverImage) {

        return;

    }


    if (
        isValidImageURL(
            coverURL
        )
    ) {

        coverImage.src =
            driveImageURL(
                coverURL
            );

    }

}


// ==================================================
// UPDATE FOTO PASANGAN
// ==================================================

function updateCouplePhoto(couplePhoto) {

const photo =
    document.getElementById(
        "couplePhoto"
    );

    const placeholder =
        document.querySelector(
            ".story-photo .photo-placeholder"
        );

    if (!photo) {
        return;
    }

    if (couplePhoto) {

        photo.src =
            driveImageURL(
                couplePhoto
            );

        photo.style.display =
            "block";

        if (placeholder) {
            placeholder.style.display =
                "none";
        }

    }

}

// ==================================================
// LOAD DATABASE
// ==================================================

async function loadInvitationData() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const invitationId =
        params.get("id");


    if (!invitationId) {

        console.log(
            "ID undangan tidak ditemukan. Menggunakan data default."
        );

        return;

    }


    try {

        const response =
            await loadJSONP(
                DATABASE_API +
                "?id=" +
                encodeURIComponent(
                    invitationId
                )
            );


        if (
            !response ||
            !response.success ||
            !response.data
        ) {

            throw new Error(
                response &&
                response.message
                    ? response.message
                    : "Data undangan gagal dimuat."
            );

        }


        const data =
            response.data;


        // ==================================
        // AMBIL DATA
        // ==================================

        const groom =
            data["Nama Pria"] ||
            weddingData.groom;


        const bride =
            data["Nama Wanita"] ||
            weddingData.bride;


        const brideParents =
            data["Orang Tua Wanita"] ||
            weddingData.brideParents;


        const groomParents =
            data["Orang Tua Pria"] ||
            weddingData.groomParents;


        const weddingDate =
            data["Tanggal Pernikahan"] ||
            weddingData.eventDate;


        const akadTime =
            data["Jam Akad"] ||
            weddingData.akadTime;


        const resepsiTime =
            data["Jam Resepsi"] ||
            weddingData.resepsiTime;


        const venue =
            data["Nama Gedung"] ||
            weddingData.venue;


        const address =
            data["Alamat"] ||
            weddingData.address;


        const mapsURL =
            data["Google Maps"] ||
            weddingData.mapsURL;


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


        const bridePhoto =
            data["Foto Wanita"] ||
            weddingData.bridePhoto;


        const groomPhoto =
            data["Foto Pria"] ||
            weddingData.groomPhoto;


        const coverPhoto =
            data["Foto Cover"] ||
            weddingData.coverPhoto;

            const couplePhoto =
    data["Foto Pasangan"] || "";

            const gallery1 =
    data["Gallery 1"] || "";

const gallery2 =
    data["Gallery 2"] || "";

const gallery3 =
    data["Gallery 3"] || "";

const gallery4 =
    data["Gallery 4"] || "";

const gallery5 =
    data["Gallery 5"] || "";

const gallery6 =
    data["Gallery 6"] || "";

const dynamicGalleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6
]
    .filter(isValidImageURL)
    .map(driveImageURL);

if (dynamicGalleryImages.length > 0) {
    galleryImages = dynamicGalleryImages;
}

const galleryItems = document.querySelectorAll(".gallery-item img");

galleryItems.forEach((img, index) => {
    if (galleryImages[index]) {
        img.src = galleryImages[index];
    }
});


        // ==================================
        // UPDATE weddingData
        // ==================================

        weddingData.groom =
            groom;

        weddingData.bride =
            bride;

        weddingData.brideParents =
            brideParents;

        weddingData.groomParents =
            groomParents;

        weddingData.eventDate =
            weddingDate;

        weddingData.akadTime =
            akadTime;

        weddingData.resepsiTime =
            resepsiTime;

        weddingData.venue =
            venue;

        weddingData.address =
            address;

        weddingData.mapsURL =
            mapsURL;

        weddingData.bank.account =
            bankAccount;

        weddingData.bank.owner =
            bankOwner;

        weddingData.dana.account =
            danaAccount;

        weddingData.dana.owner =
            danaOwner;

        weddingData.bridePhoto =
            bridePhoto;

        weddingData.groomPhoto =
            groomPhoto;

        weddingData.coverPhoto =
            coverPhoto;

        weddingData.couplePhoto =
    couplePhoto;

        // ==================================
        // UPDATE SEMUA TAMPILAN
        // ==================================

        updateNames(
            groom,
            bride
        );


        updateParents(
            brideParents,
            groomParents
        );


        const formattedDate =
            formatWeddingDate(
                weddingDate
            );


        updateDates(
            formattedDate
        );


        updateTimes(
            akadTime,
            resepsiTime
        );


        updateLocation(
            venue,
            address,
            mapsURL
        );


        updateGift(
            bankAccount,
            bankOwner,
            danaAccount,
            danaOwner
        );


        updateMempelaiPhotos(
            bridePhoto,
            groomPhoto
        );


        updateCoverPhoto(
            coverPhoto
        );

        updateCouplePhoto(
    couplePhoto
);

        // ==================================
        // COUNTDOWN DINAMIS
        // ==================================

        const newCountdown =
            createCountdownDate(
                weddingDate
            );


        if (newCountdown) {

            countdownTargetDate =
                newCountdown;

            updateCountdown();

        }


        console.log(
            "Data undangan berhasil dimuat:",
            data
        );


    } catch(error) {

        console.error(
            "Database error:",
            error
        );

    }

}


// ==================================================
// NAMA TAMU
// ==================================================

function loadGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const guest =
        params.get("to");


    if (!guest) {

        return;

    }


    const guestName =
        decodeURIComponent(
            guest
        );


    const guestElement =
        document.querySelector(
            ".cover-guest strong"
        );


    if (guestElement) {

        guestElement.textContent =
            guestName;

    }


    const rsvpName =
        document.getElementById(
            "rsvpName"
        );


    if (rsvpName) {

        rsvpName.value =
            guestName;

    }

}

// ==================================================
// PESAN & UCAPAN FIREBASE
// ==================================================

function setupMessages() {

    const button =
        document.getElementById("messageButton");

    const nameInput =
        document.getElementById("messageName");

    const messageInput =
        document.getElementById("messageText");

    const messageList =
        document.getElementById("messageList");

    if (
        !button ||
        !nameInput ||
        !messageInput ||
        !messageList
    ) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );

    const invitationId =
        params.get("id");


    if (!invitationId) {

        console.log(
            "Pesan tidak aktif karena ID undangan tidak ditemukan."
        );

        return;
    }


    async function loadMessages() {

        try {

            const messagesRef =
                window.firebaseCollection(
                    window.firebaseDB,
                    "invitations",
                    invitationId,
                    "messages"
                );


            const snapshot =
                await window.firebaseGetDocs(
                    messagesRef
                );


            messageList.innerHTML = "";


            snapshot.forEach(
                function(doc) {

                    const data =
                        doc.data();


                    const item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "message-item";


                    const name =
                        document.createElement(
                            "strong"
                        );

                    name.textContent =
                        data.name || "Tamu";


                    const message =
                        document.createElement(
                            "p"
                        );

                    message.textContent =
                        data.message || "";


                    item.appendChild(name);

                    item.appendChild(message);

                    messageList.appendChild(item);

                }
            );

        } catch (error) {

            console.error(
                "Gagal memuat pesan:",
                error
            );

        }

    }


    button.addEventListener(
        "click",
        async function() {

            const name =
                nameInput.value.trim();

            const message =
                messageInput.value.trim();


            if (!name || !message) {

                alert(
                    "Mohon isi nama dan pesan terlebih dahulu."
                );

                return;
            }


            try {

                button.disabled = true;

                button.textContent =
                    "Mengirim...";


                const messagesRef =
                    window.firebaseCollection(
                        window.firebaseDB,
                        "invitations",
                        invitationId,
                        "messages"
                    );


                await window.firebaseAddDoc(
                    messagesRef,
                    {
                        name: name,
                        message: message,
                        createdAt: Date.now()
                    }
                );


                nameInput.value = "";

                messageInput.value = "";


                await loadMessages();


                alert(
                    "Ucapan berhasil dikirim."
                );


            } catch (error) {

                console.error(
                    "Gagal mengirim pesan:",
                    error
                );

                alert(
                    "Ucapan gagal dikirim. Silakan coba lagi."
                );

            } finally {

                button.disabled = false;

                button.textContent =
                    "Kirim Ucapan";

            }

        }
    );


    loadMessages();

}


// ==================================================
// MUSIC
// ==================================================

let weddingMusic = null;

let musicButton = null;


function playWeddingMusic() {

    if (!weddingMusic) {

        return;

    }


    weddingMusic
        .play()
        .then(
            function() {

                if (musicButton) {

                    musicButton
                        .classList
                        .add(
                            "playing"
                        );

                }

            }
        )
        .catch(
            function(error) {

                console.log(
                    "Musik belum dapat diputar:",
                    error
                );

            }
        );

}


function pauseWeddingMusic() {

    if (!weddingMusic) {

        return;

    }


    weddingMusic.pause();


    if (musicButton) {

        musicButton
            .classList
            .remove(
                "playing"
            );

    }

}


// ==================================================
// BUKA UNDANGAN
// ==================================================

function setupCoverButton() {

    const coverOpen =
        document.getElementById(
            "coverOpen"
        );


    const invitationCover =
        document.getElementById(
            "invitationCover"
        );


    const hero =
        document.getElementById(
            "hero"
        );


    if (
        !coverOpen ||
        !invitationCover
    ) {

        return;

    }


    coverOpen.addEventListener(
        "click",
        function() {

            invitationCover
                .classList
                .add(
                    "hide"
                );


            playWeddingMusic();


            setTimeout(
                function() {

                    if (hero) {

                        hero.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                },
                800
            );

        }
    );

}


// ==================================================
// TOMBOL MUSIK
// ==================================================

function setupMusicButton() {

    weddingMusic =
        document.getElementById(
            "weddingMusic"
        );


    musicButton =
        document.getElementById(
            "musicButton"
        );


    if (
        !musicButton ||
        !weddingMusic
    ) {

        return;

    }


    musicButton.addEventListener(
        "click",
        function() {

            if (
                weddingMusic.paused
            ) {

                playWeddingMusic();

            } else {

                pauseWeddingMusic();

            }

        }
    );


    weddingMusic.addEventListener(
        "play",
        function() {

            musicButton
                .classList
                .add(
                    "playing"
                );

        }
    );


    weddingMusic.addEventListener(
        "pause",
        function() {

            musicButton
                .classList
                .remove(
                    "playing"
                );

        }
    );

}


// ==================================================
// COPY REKENING
// ==================================================

function copyAccount(
    accountNumber
) {

    if (!accountNumber) {

        return;

    }


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(
                accountNumber
            )
            .then(
                function() {

                    alert(
                        "Nomor rekening berhasil disalin."
                    );

                }
            )
            .catch(
                function() {

                    alert(
                        "Nomor rekening: " +
                        accountNumber
                    );

                }
            );

        return;

    }


    alert(
        "Nomor rekening: " +
        accountNumber
    );

}


function setupCopyButtons() {

    const buttons =
        document.querySelectorAll(
            ".copy-account"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const type =
                        this.getAttribute(
                            "data-account"
                        );


                    const accounts =
                        document.querySelectorAll(
                            ".gift-account"
                        );


                    let number =
                        "";


                    if (
                        type === "bank" &&
                        accounts[0]
                    ) {

                        number =
                            accounts[0]
                                .textContent
                                .trim();

                    }


                    if (
                        type === "dana" &&
                        accounts[1]
                    ) {

                        number =
                            accounts[1]
                                .textContent
                                .trim();

                    }


                    copyAccount(
                        number
                    );

                }
            );

        }
    );

}


// ==================================================
// RSVP WHATSAPP
// ==================================================

function setupRSVP() {

    const button =
        document.getElementById(
            "rsvpButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        function() {

            const nameInput =
                document.getElementById(
                    "rsvpName"
                );


            const attendanceInput =
                document.getElementById(
                    "rsvpAttendance"
                );


            const guestsInput =
                document.getElementById(
                    "rsvpGuests"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const attendance =
                attendanceInput
                    ? attendanceInput.value
                    : "";


            const guests =
                guestsInput
                    ? guestsInput.value.trim()
                    : "";


            if (
                !name ||
                !attendance ||
                !guests
            ) {

                alert(
                    "Mohon lengkapi nama, kehadiran, dan jumlah tamu."
                );

                return;

            }


            const message =
                "Halo " +
                weddingData.groom +
                " & " +
                weddingData.bride +
                ",\n\n" +
                "Saya " +
                name +
                " ingin mengonfirmasi kehadiran.\n\n" +
                "Kehadiran: " +
                attendance +
                "\n" +
                "Jumlah tamu: " +
                guests +
                " orang\n\n" +
                "Terima kasih.";


            const whatsappNumber =
                "6285775423618";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// ==================================================
// GALLERY
// ==================================================

function setupGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item img"
        );


    const galleryLightbox =
        document.getElementById(
            "galleryLightbox"
        );


    const galleryLightboxImage =
        document.getElementById(
            "galleryLightboxImage"
        );


    const galleryClose =
        document.getElementById(
            "galleryClose"
        );

    let currentGalleryIndex = 0;

    galleryItems.forEach(
        function(image) {

image.addEventListener(
    "click",
    function() {

        if (
            !galleryLightbox ||
            !galleryLightboxImage
        ) {
            return;
        }

        currentGalleryIndex =
            Array.from(galleryItems).indexOf(this);

        galleryLightboxImage.src =
            this.src;


                    galleryLightbox.style.display =
                        "flex";


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");

    if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            currentGalleryIndex--;

            if (currentGalleryIndex < 0) {
                currentGalleryIndex =
                    galleryItems.length - 1;
            }

            galleryLightboxImage.src =
                galleryItems[currentGalleryIndex].src;

        }
    );

}


if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            currentGalleryIndex++;

            if (
                currentGalleryIndex >=
                galleryItems.length
            ) {
                currentGalleryIndex = 0;
            }

            galleryLightboxImage.src =
                galleryItems[currentGalleryIndex].src;

        }
    );

}

    if (galleryClose) {

        galleryClose.addEventListener(
            "click",
            function() {

                galleryLightbox.style.display =
                    "none";

                if (
                    galleryLightboxImage
                ) {

                    galleryLightboxImage.src =
                        "";

                }

                document.body.style.overflow =
                    "";

            }
        );

    }


    if (galleryLightbox) {

        galleryLightbox.addEventListener(
            "click",
            function(event) {

                if (
                    event.target ===
                    galleryLightbox
                ) {

                    galleryLightbox.style.display =
                        "none";

                    if (
                        galleryLightboxImage
                    ) {

                        galleryLightboxImage.src =
                            "";

                    }

                    document.body.style.overflow =
                        "";

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                galleryLightbox
            ) {

                galleryLightbox.style.display =
                    "none";


                if (
                    galleryLightboxImage
                ) {

                    galleryLightboxImage.src =
                        "";

                }


                document.body.style.overflow =
                    "";

            }

        }
    );

}


// ==================================================
// GALLERY CAROUSEL
// ==================================================

let galleryImages = [];

function setupGalleryCarousel() {

    galleryImages = [
        "https://images.unsplash.com/photo-1519741497674-611481863552",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        "https://images.unsplash.com/photo-1544078751-58fee2d8a03b"
    ];


    let index =
        0;


    const main =
        document.getElementById(
            "gallery-main-image"
        );


    const current =
        document.getElementById(
            "gallery-current"
        );


    const thumbs =
        document.querySelectorAll(
            ".gallery-thumb"
        );


    const previous =
        document.querySelector(
            ".gallery-prev"
        );


    const next =
        document.querySelector(
            ".gallery-next"
        );


    if (!main) {

        return;

    }


    function showImage(
        newIndex
    ) {

        index =
            newIndex;


main.src =
    galleryImages[index];


        if (current) {

            current.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );

        }


        thumbs.forEach(
            function(
                thumb,
                thumbIndex
            ) {

                thumb.classList.toggle(
                    "active",
                    thumbIndex === index
                );

            }
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            function() {

                index--;

                if (index < 0) {

                    index =
                        images.length - 1;

                }

                showImage(
                    index
                );

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            function() {

                index++;

                if (
                    index >=
                    images.length
                ) {

                    index =
                        0;

                }

                showImage(
                    index
                );

            }
        );

    }


    thumbs.forEach(
        function(
            thumb,
            thumbIndex
        ) {

            thumb.addEventListener(
                "click",
                function() {

                    showImage(
                        thumbIndex
                    );

                }
            );

        }
    );


    showImage(
        0
    );


    setInterval(
        function() {

            index++;

            if (
                index >=
                images.length
            ) {

                index =
                    0;

            }

            showImage(
                index
            );

        },
        5000
    );

}


// ==================================================
// SAKURA
// ==================================================

function setupSakura() {

    const container =
        document.querySelector(
            ".sakura-falling"
        );


    if (!container) {

        return;

    }


    function createPetal() {

        const petal =
            document.createElement(
                "div"
            );


        petal.className =
            "sakura-petal";


        petal.style.left =
            Math.random() *
            100 +
            "vw";


        petal.style.animationDuration =
            5 +
            Math.random() *
            6 +
            "s";


        petal.style.animationDelay =
            Math.random() *
            3 +
            "s";


        petal.style.transform =
            "scale(" +
            (
                0.6 +
                Math.random() *
                0.8
            ) +
            ")";


        container.appendChild(
            petal
        );


        setTimeout(
            function() {

                petal.remove();

            },
            12000
        );

    }


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        createPetal();

    }


    setInterval(
        createPetal,
        500
    );

}


// ==================================================
// INIT
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        // URL tamu

        loadGuestName();


        // Music

        setupMusicButton();


        // Tombol buka

        setupCoverButton();


        // Copy rekening

        setupCopyButtons();


        // RSVP

        setupRSVP();

        // Pesan & Ucapan

        setupMessages();

        // Gallery

        setupGallery();

        setupGalleryCarousel();


        // Sakura

        setupSakura();


        // Database

        await loadInvitationData();

    }
);

