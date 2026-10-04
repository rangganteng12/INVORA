/* =========================================================
   BLACK & GOLD WEDDING INVITATION
   MAIN JAVASCRIPT
========================================================= */

document.body.style.overflow = "hidden";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       OPEN INVITATION
    ===================================================== */

    const openBtn = document.getElementById("openBtn");
    const cover = document.getElementById("cover");
    const invitation = document.getElementById("invitation");

    if (openBtn && cover) {

openBtn.addEventListener("click", function () {

    cover.classList.add("hide");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setTimeout(function () {

        document.documentElement.style.overflow = "";
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";

        if (invitation) {

            invitation.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 700);

});

    }


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const weddingDate =
        new Date(
            "September 30, 2026 09:00:00"
        ).getTime();


    function updateCountdown() {

        const now = new Date().getTime();

        const distance =
            weddingDate - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (
            !days ||
            !hours ||
            !minutes ||
            !seconds
        ) {
            return;
        }


        if (distance <= 0) {

            days.innerText = "000";
            hours.innerText = "00";
            minutes.innerText = "00";
            seconds.innerText = "00";

            return;
        }


        const d =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const h =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const m =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const s =
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            );


        days.innerText =
            String(d).padStart(3, "0");

        hours.innerText =
            String(h).padStart(2, "0");

        minutes.innerText =
            String(m).padStart(2, "0");

        seconds.innerText =
            String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

/* =====================================================
   GOLD DUST ANIMATION
   PREMIUM / NATURAL / WIND EFFECT
===================================================== */

if (cover) {

    /* ---------------------------------------------
       BUAT CONTAINER
    --------------------------------------------- */

    let goldContainer =
        document.getElementById("cover-gold-particles");

    if (!goldContainer) {

        goldContainer =
            document.createElement("div");

        goldContainer.id =
            "cover-gold-particles";

        cover.appendChild(goldContainer);
    }


    /* ---------------------------------------------
       CSS ANIMATION DIBUAT LANGSUNG OLEH JS
       supaya tidak bentrok dengan CSS lama
    --------------------------------------------- */

    if (!document.getElementById("gold-dust-animation")) {

        const style =
            document.createElement("style");

        style.id =
            "gold-dust-animation";

        style.innerHTML = `

            #cover-gold-particles {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;

                overflow: hidden !important;

                pointer-events: none !important;

                z-index: 999 !important;
            }


            #cover-gold-particles
            .gold-dust {

                position: absolute !important;

                display: block !important;

                border-radius: 50% !important;

                background:
                    radial-gradient(
                        circle,
                        #fff9d8 0%,
                        #f5d36b 35%,
                        #c48a25 65%,
                        rgba(196,138,37,0) 100%
                    ) !important;

                box-shadow:
                    0 0 4px
                    rgba(255,220,120,.9),

                    0 0 10px
                    rgba(220,170,60,.5) !important;

                pointer-events: none !important;

                animation:
                    goldWindFall
                    var(--duration)
                    linear
                    infinite !important;

                animation-delay:
                    var(--delay) !important;

                opacity:
                    var(--opacity) !important;

                will-change:
                    transform,
                    opacity !important;
            }


            @keyframes goldWindFall {

                0% {

                    transform:
                        translate3d(
                            0,
                            -30px,
                            0
                        )
                        rotate(0deg)
                        scale(.7);

                }


                15% {

                    transform:
                        translate3d(
                            var(--wind1),
                            15vh,
                            0
                        )
                        rotate(60deg)
                        scale(1);

                }


                30% {

                    transform:
                        translate3d(
                            var(--wind2),
                            30vh,
                            0
                        )
                        rotate(130deg)
                        scale(.85);

                }


                45% {

                    transform:
                        translate3d(
                            var(--wind3),
                            45vh,
                            0
                        )
                        rotate(190deg)
                        scale(1);

                }


                60% {

                    transform:
                        translate3d(
                            var(--wind4),
                            60vh,
                            0
                        )
                        rotate(250deg)
                        scale(.8);

                }


                75% {

                    transform:
                        translate3d(
                            var(--wind5),
                            75vh,
                            0
                        )
                        rotate(310deg)
                        scale(.9);

                }


                90% {

                    opacity: .35;

                }


                100% {

                    transform:
                        translate3d(
                            var(--wind6),
                            110vh,
                            0
                        )
                        rotate(360deg)
                        scale(.65);

                    opacity: 0;

                }

            }

        `;

        document.head.appendChild(style);
    }


    /* ---------------------------------------------
       BERSIHKAN PARTIKEL LAMA
    --------------------------------------------- */

    goldContainer.innerHTML = "";


    /* ---------------------------------------------
       BUAT PARTIKEL
    --------------------------------------------- */

    const jumlah =
        6;


    for (
        let i = 0;
        i < jumlah;
        i++
    ) {

        const dust =
            document.createElement("span");


        dust.className =
            "gold-dust";


        /* posisi horizontal */

        dust.style.left =
            Math.random() * 100 + "%";


        /* posisi awal */

        dust.style.top =
            (-10 - Math.random() * 30) + "%";


        /* ukuran */

        const size =
            1 +
            Math.random() * 1.2;


        dust.style.width =
            size + "px";


        dust.style.height =
            size + "px";


        /* durasi */

        dust.style.setProperty(
            "--duration",
            (28 + Math.random() * 17) + "s"
        );


        /* delay negatif
           supaya langsung terlihat */

        dust.style.setProperty(
            "--delay",
            (-Math.random() * 15) + "s"
        );


        /* opacity */

        dust.style.setProperty(
            "--opacity",
            (0.12 + Math.random() * 0.28)
        );


        /* gerakan angin */

        const wind =
            20 +
            Math.random() * 55;


        dust.style.setProperty(
            "--wind1",
            (-wind) + "px"
        );


        dust.style.setProperty(
            "--wind2",
            (wind * 0.4) + "px"
        );


        dust.style.setProperty(
            "--wind3",
            (-wind * 0.7) + "px"
        );


        dust.style.setProperty(
            "--wind4",
            (wind * 0.8) + "px"
        );


        dust.style.setProperty(
            "--wind5",
            (-wind * 0.4) + "px"
        );


        dust.style.setProperty(
            "--wind6",
            (wind * 0.6) + "px"
        );


        goldContainer.appendChild(
            dust
        );

    }

}

    /* =====================================================
       COPY NOMOR REKENING
    ===================================================== */

    const copyBtn =
        document.getElementById(
            "copyBtn"
        );


    if (copyBtn) {

        copyBtn.addEventListener(
            "click",
            function () {

                const nomor =
                    "1234567890";


                navigator.clipboard
                    .writeText(nomor)
                    .then(function () {

                        const oldText =
                            copyBtn.innerText;


                        copyBtn.innerText =
                            "BERHASIL DISALIN";


                        setTimeout(
                            function () {

                                copyBtn.innerText =
                                    oldText;

                            },
                            2000
                        );

                    });

            }
        );

    }

});



