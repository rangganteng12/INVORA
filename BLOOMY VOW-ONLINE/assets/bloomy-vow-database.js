/* BLOOMY VOW — shared invitation database integration
 * Loads a public invitation by ?id=ID using the Google Apps Script JSONP endpoint.
 * Designed to preserve each theme's existing visual styling and animation.
 */
(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var invitationId = String(params.get("id") || "").trim();
  var guestName = String(params.get("to") || "").trim();
  var API_URL = "https://script.google.com/macros/s/AKfycbxKcjFZEKfJ4hyjeaj818jDtY2rCt1gH5kCYPlCugvLzMgkGNtv4QSucuaTYxL7FQezWA/exec";

  function first(selector, root) {
    return (root || document).querySelector(selector);
  }

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function value(data, key) {
    return String(data && data[key] != null ? data[key] : "").trim();
  }

  function formatDate(input, uppercase) {
    var match = String(input || "").trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
    if (!match) return input || "";
    var date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]), 12);
    var text = new Intl.DateTimeFormat("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(date);
    text = text.charAt(0).toLocaleUpperCase("id-ID") + text.slice(1);
    return uppercase ? text.toLocaleUpperCase("id-ID") : text;
  }

  function timeParts(input) {
    var match = String(input || "").trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
    if (!match) return null;
    return { hour: Number(match[1]), minute: Number(match[2]) };
  }

  function formatTime(input) {
    var parts = timeParts(input);
    if (!parts) return input || "";
    return String(parts.hour).padStart(2, "0") + ":" + String(parts.minute).padStart(2, "0") + " WIB";
  }

  function eventTimestamp(dateInput, timeInput) {
    var match = String(dateInput || "").trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
    if (!match) return null;
    var time = timeParts(timeInput || "09:00") || { hour: 9, minute: 0 };
    var date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]), time.hour, time.minute, 0, 0);
    if (date.getFullYear() !== Number(match[3]) ||
        date.getMonth() !== Number(match[2]) - 1 ||
        date.getDate() !== Number(match[1])) return null;
    return date.getTime();
  }

  function driveImageUrl(input) {
    var raw = String(input || "").trim();
    if (!/^https?:\/\//i.test(raw)) return "";
    var match = raw.match(/[?&]id=([^&]+)/) || raw.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      try {
        return "https://drive.google.com/thumbnail?id=" +
          encodeURIComponent(decodeURIComponent(match[1])) + "&sz=w1200";
      } catch (_) {
        return "https://drive.google.com/thumbnail?id=" +
          encodeURIComponent(match[1]) + "&sz=w1200";
      }
    }
    return raw;
  }

  function setText(selector, text, root) {
    if (!text) return;
    all(selector, root).forEach(function (element) {
      element.textContent = text;
    });
  }

  function setCoupleHeading(element, groom, bride) {
    if (!element || (!groom && !bride)) return;
    var spans = all(":scope > span", element);
    if (spans.length >= 2) {
      if (groom) spans[0].textContent = groom;
      if (bride) spans[spans.length - 1].textContent = bride;
      return;
    }
    var separator = first(":scope > em", element);
    if (separator) {
      var keptSeparator = separator.cloneNode(true);
      element.replaceChildren(
        document.createTextNode((groom || "") + " "),
        keptSeparator,
        document.createTextNode(" " + (bride || ""))
      );
    } else {
      element.textContent = [groom, bride].filter(Boolean).join(" & ");
    }
  }

  function setPhoto(element, url) {
    if (!element || !url) return;
    if (element.tagName === "IMG") {
      element.src = url;
      element.removeAttribute("srcset");
      return;
    }
    var img = first("img", element);
    if (img) {
      img.src = url;
      img.removeAttribute("srcset");
      return;
    }
    element.style.backgroundImage = 'url("' + url.replace(/"/g, "%22") + '")';
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";
  }

  function setCoverPhoto(url) {
    if (!url) return;
    all(".cover-background source").forEach(function (source) {
      source.srcset = url;
    });
    var coverImg = first(".cover-background img");
    if (coverImg) setPhoto(coverImg, url);
    all(".cover-bg, .cover-art").forEach(function (el) {
      setPhoto(el, url);
    });
  }

  function setGuest() {
    if (!guestName) return;
    setText("#guestName, #guest, .cover-guest", guestName);
  }

  function updateCommonTemplate(data) {
    var groom = value(data, "Nama Pria");
    var bride = value(data, "Nama Wanita");
    var groomParents = value(data, "Orang Tua Pria");
    var brideParents = value(data, "Orang Tua Wanita");
    var weddingDate = value(data, "Tanggal Pernikahan");
    var timeAkad = value(data, "Jam Akad");
    var timeResepsi = value(data, "Jam Resepsi");
    var venue = value(data, "Nama Gedung");
    var address = value(data, "Alamat");
    var mapUrl = value(data, "Google Maps");
    var groomPhoto = driveImageUrl(value(data, "Foto Pria"));
    var bridePhoto = driveImageUrl(value(data, "Foto Wanita"));
    var coverPhoto = driveImageUrl(value(data, "Foto Cover"));
    var couplePhoto = driveImageUrl(value(data, "Foto Pasangan")) || coverPhoto;

    all(".cover-content h1, .hero-content h2, .opening-content h2, .footer h2, .closing h2").forEach(function (heading) {
      setCoupleHeading(heading, groom, bride);
    });

    setText("#groomCover, #groomHero, #groomName, #groomFooter, .groom-name", groom);
    setText("#brideCover, #brideHero, #brideName, #brideFooter, .bride-name", bride);
    if (groom || bride) {
      document.title = [groom, bride].filter(Boolean).join(" & ") + " | Wedding Invitation";
    }

    var personCards = all(".couple-grid .person-card, .couple-grid .person");
    if (personCards.length >= 2) {
      var groomCard = personCards[0];
      var brideCard = personCards[personCards.length - 1];
      setText("h3", groom, groomCard);
      setText("h3", bride, brideCard);
      var groomParagraphs = all("p", groomCard);
      var brideParagraphs = all("p", brideCard);
      if (groomParents && groomParagraphs.length > 1) groomParagraphs[1].textContent = "Putra dari " + groomParents;
      if (brideParents && brideParagraphs.length > 1) brideParagraphs[1].textContent = "Putri dari " + brideParents;
      setPhoto(first(".portrait-wrap, .portrait, .person-photo, .person-image", groomCard), groomPhoto);
      setPhoto(first(".portrait-wrap, .portrait, .person-photo, .person-image", brideCard), bridePhoto);
      all(".portrait span", groomCard).forEach(function (el) { if (groomPhoto) el.style.display = "none"; });
      all(".portrait span", brideCard).forEach(function (el) { if (bridePhoto) el.style.display = "none"; });
    }

    // Themes with explicit portrait IDs
    setPhoto(first("#groomPhoto, #groomPortrait, .portrait-groom"), groomPhoto);
    setPhoto(first("#bridePhoto, #bridePortrait, .portrait-bride"), bridePhoto);
    setCoverPhoto(coverPhoto);
    setPhoto(first(".photo-bg, .hero-art, .opening-photo"), couplePhoto);

    if (weddingDate) {
      setText("#coverDate, .cover-date", formatDate(weddingDate, true));
      setText("#heroDate, .hero-date, .opening-date", formatDate(weddingDate, false));
      setText(".event-date, #eventDate1, #eventDate2", formatDate(weddingDate, false));
    }
    setText(".cover-note", venue);
    if (venue || address) {
      setText("#heroPlace", [venue, address].filter(Boolean).join(" · "));
      setText(".hero-place", [venue, address].filter(Boolean).join(" · "));
      setText("#locationTitle, .location-content h2, .location-card h3", venue);
      setText("#locationAddress, .location-address, .location-content p:not(.section-kicker):not(.eyebrow)", address);
    }
    var mapButton = first("#mapsLink, .location-content a.outline-button, .location-card a[target='_blank']");
    if (mapButton && /^https?:\/\//i.test(mapUrl)) {
      mapButton.href = mapUrl;
      mapButton.target = "_blank";
      mapButton.rel = "noopener noreferrer";
    }

    var eventCards = all(".event-grid article");
    [timeAkad, timeResepsi].forEach(function (time, index) {
      var eventCard = eventCards[index];
      if (!eventCard) return;
      if (time) {
        var timeHeading = first("h3", eventCard);
        if (timeHeading) timeHeading.textContent = formatTime(time);
      }
      var paragraphs = all("p", eventCard);
      if (weddingDate && paragraphs.length > 1) paragraphs[1].textContent = formatDate(weddingDate, false);
      var place = first("span:not(.event-icon), .event-place", eventCard);
      if (place && (venue || address)) place.textContent = [venue, address].filter(Boolean).join(" · ");
    });

    // Gallery: only replace a demo image if the matching database field contains a URL.
    var galleryImages = all(".gallery img, .gallery-track img, .gallery-item img, .gallery-slide img");
    for (var i = 0; i < 6; i++) {
      var galleryUrl = driveImageUrl(value(data, "Gallery " + (i + 1)));
      if (galleryUrl && galleryImages[i]) setPhoto(galleryImages[i], galleryUrl);
    }

    var accountNumber = value(data, "Nomor Rekening");
    var accountName = value(data, "Nama Pemilik Rekening");
    var accountBank = value(data, "Nama Bank") || "TRANSFER BANK";
    setText("#bankNumber, .bank-card strong, .bank strong", accountNumber);
    setText("#bankOwner, #bank-card-owner, .bank-card small, .bank small, .bank p", accountName ? "a.n. " + accountName : "");
    setText("#bankName, .bank-card span, .bank small:first-child", accountBank);

    var danaNumber = value(data, "Nomor DANA");
    var danaName = value(data, "Nama Pemilik DANA");
    if (danaNumber) {
      var gift = first(".gift-section, .gift");
      if (gift && !first("[data-bloomy-dana]", gift)) {
        var cardClass = first(".bank-card", gift) ? "bank-card" : "bank";
        var danaCard = document.createElement("div");
        danaCard.className = cardClass;
        danaCard.setAttribute("data-bloomy-dana", "true");
        var label = document.createElement(cardClass === "bank-card" ? "span" : "small");
        label.textContent = "DANA";
        var number = document.createElement("strong");
        number.textContent = danaNumber;
        var owner = document.createElement(cardClass === "bank-card" ? "small" : "p");
        owner.textContent = danaName ? "a.n. " + danaName : "";
        var copy = document.createElement("button");
        copy.type = "button";
        copy.textContent = "SALIN NOMOR DANA";
        copy.addEventListener("click", function () {
          var write = navigator.clipboard && navigator.clipboard.writeText
            ? navigator.clipboard.writeText(danaNumber)
            : Promise.reject(new Error("Clipboard tidak tersedia"));
          write.then(function () {
            copy.textContent = "TERSALIN";
          }).catch(function () {
            window.prompt("Salin nomor DANA:", danaNumber);
          });
        });
        danaCard.appendChild(label);
        danaCard.appendChild(number);
        danaCard.appendChild(owner);
        danaCard.appendChild(copy);
        var existingCard = first(".bank-card, .bank", gift);
        if (existingCard) existingCard.insertAdjacentElement("afterend", danaCard);
        else gift.appendChild(danaCard);
      }
    }

    var target = eventTimestamp(weddingDate, timeAkad || "09:00");
    if (target !== null && first("#days") && first("#hours") && first("#minutes") && first("#seconds")) {
      function updateCountdownFromDatabase() {
        var remaining = Math.max(0, target - Date.now());
        var values = [
          Math.floor(remaining / 86400000),
          Math.floor(remaining / 3600000) % 24,
          Math.floor(remaining / 60000) % 60,
          Math.floor(remaining / 1000) % 60
        ];
        ["#days", "#hours", "#minutes", "#seconds"].forEach(function (selector, index) {
          var el = first(selector);
          if (el) el.textContent = String(values[index]).padStart(index === 0 ? 3 : 2, "0");
        });
      }
      updateCountdownFromDatabase();
      window.setInterval(updateCountdownFromDatabase, 500);
    }
  }

  function update3DMotion(data) {
    var groom = value(data, "Nama Pria");
    var bride = value(data, "Nama Wanita");
    var date = value(data, "Tanggal Pernikahan");
    var akad = value(data, "Jam Akad");
    var resepsi = value(data, "Jam Resepsi");
    var venue = value(data, "Nama Gedung");
    var address = value(data, "Alamat");
    var maps = value(data, "Google Maps");
    var parentsGroom = value(data, "Orang Tua Pria");
    var parentsBride = value(data, "Orang Tua Wanita");
    var groomPhoto = driveImageUrl(value(data, "Foto Pria"));
    var bridePhoto = driveImageUrl(value(data, "Foto Wanita"));
    var coverPhoto = driveImageUrl(value(data, "Foto Cover"));
    var couplePhoto = driveImageUrl(value(data, "Foto Pasangan"));
    var guest = guestName || "Tamu Undangan";

    setText("#guest, #guestName", guest);
    setText(".n", [groom, bride].filter(Boolean).join(" & ").toLocaleUpperCase("id-ID"));
    setText(".dt", formatDate(date, true));
    setText("#fin", [groom, bride].filter(Boolean).join(" & "));
    if (groom || bride) document.title = [groom, bride].filter(Boolean).join(" & ") + " | BLOOMY VOW";

    // Update the source object too, for functions/buttons that read it later.
    if (window.C && typeof window.C === "object") {
      if (groom) window.C.n1 = groom;
      if (bride) window.C.n2 = bride;
      if (date) window.C.tgl = formatDate(date, true);
      window.C.tamu = guest;
      if (window.C.p1) {
        if (bride) window.C.p1.nama = bride;
        if (parentsBride) window.C.p1.ortu = [parentsBride];
        if (bridePhoto) window.C.p1.foto = bridePhoto;
      }
      if (window.C.p2) {
        if (groom) window.C.p2.nama = groom;
        if (parentsGroom) window.C.p2.ortu = [parentsGroom];
        if (groomPhoto) window.C.p2.foto = groomPhoto;
      }
      if (date && window.C.acara && window.C.acara.length) {
        window.C.acara.forEach(function (event, index) {
          event.t = formatDate(date, true);
          event.w = "Pukul " + formatTime(index === 0 ? akad : resepsi) + " · Selesai";
          event.a = [venue, address].filter(Boolean);
          if (maps) event.m = maps;
        });
      }
      var galleryUrls = [];
      for (var g = 1; g <= 6; g++) {
        var galleryUrl = driveImageUrl(value(data, "Gallery " + g));
        if (galleryUrl) galleryUrls.push(galleryUrl);
      }
      if (galleryUrls.length) window.C.foto = galleryUrls;
      if (couplePhoto) window.C.fotoBerdua = couplePhoto;
      var accountNumber = value(data, "Nomor Rekening");
      var accountName = value(data, "Nama Pemilik Rekening");
      var danaNumber = value(data, "Nomor DANA");
      var danaName = value(data, "Nama Pemilik DANA");
      if (accountNumber) window.C.rek = [{ b: "TRANSFER BANK", no: accountNumber, an: accountName ? "a.n. " + accountName : "" }];
      if (danaNumber) {
        if (!window.C.rek) window.C.rek = [];
        window.C.rek.push({ b: "DANA", no: danaNumber, an: danaName ? "a.n. " + danaName : "" });
      }
      var targetTime = eventTimestamp(date, akad || "09:00");
      if (targetTime !== null) window.T = new Date(targetTime);
    }

    // Passport profile cards (the template creates these before the API response arrives).
    var passportCards = all("#pps .pp");
    [passportCards[1], passportCards[0]].forEach(function (card, index) {
      if (!card) return;
      var name = index === 0 ? groom : bride;
      var parents = index === 0 ? parentsGroom : parentsBride;
      var photo = index === 0 ? groomPhoto : bridePhoto;
      var detailLists = all("dl", card);
      var detailList = detailLists.length ? detailLists[detailLists.length - 1] : null;
      var dds = detailList ? all("dd", detailList) : [];
      if (name && dds[0]) dds[0].textContent = name;
      if (parents && dds[1]) dds[1].textContent = parents;
      setPhoto(first(".pic img", card), photo);
    });

    // Update dates, time and venue inside event cards already built by script.js.
    var eventCards = all("#event .card.ev");
    [akad, resepsi].forEach(function (time, index) {
      var card = eventCards[index];
      if (!card) return;
      var dds = all(".body dd", card);
      if (date && dds[0]) dds[0].textContent = formatDate(date, true);
      if (time && dds[1]) dds[1].textContent = "Pukul " + formatTime(time) + " · Selesai";
      if (dds[2] && (venue || address)) dds[2].textContent = [venue, address].filter(Boolean).join(" · ");
      var link = first("a.b2.b3", card);
      if (link && /^https?:\/\//i.test(maps)) link.href = maps;
    });

    var galleryImages = all("#gallery img");
    for (var i = 0; i < 6; i++) {
      var imageUrl = driveImageUrl(value(data, "Gallery " + (i + 1)));
      if (imageUrl && galleryImages[i]) setPhoto(galleryImages[i], imageUrl);
    }

    var account = value(data, "Nomor Rekening");
    var accountOwner = value(data, "Nama Pemilik Rekening");
    var dana = value(data, "Nomor DANA");
    var danaOwner = value(data, "Nama Pemilik DANA");
    var giftCards = all("#bk > div");
    if (giftCards[0]) {
      setText("small", account ? "TRANSFER BANK" : "", giftCards[0]);
      setText("b", account, giftCards[0]);
      var textNode = Array.prototype.slice.call(giftCards[0].childNodes).find(function (node) {
        return node.nodeType === 3 && node.textContent.trim();
      });
      if (textNode && accountOwner) textNode.textContent = "a.n. " + accountOwner + " ";
    }
    if (dana) {
      if (!giftCards[1]) {
        var bk = first("#bk");
        if (bk) {
          var danaCard = document.createElement("div");
          var label = document.createElement("small");
          label.textContent = "DANA";
          var number = document.createElement("b");
          number.textContent = dana;
          var owner = document.createElement("span");
          owner.textContent = danaOwner ? "a.n. " + danaOwner : "";
          var copy = document.createElement("button");
          copy.type = "button";
          copy.dataset.c = dana;
          copy.textContent = "SALIN NOMOR";
          danaCard.appendChild(label);
          danaCard.appendChild(number);
          danaCard.appendChild(owner);
          danaCard.appendChild(document.createElement("br"));
          danaCard.appendChild(copy);
          bk.appendChild(danaCard);
        }
      } else {
        setText("small", "DANA", giftCards[1]);
        setText("b", dana, giftCards[1]);
      }
    }

    if (coverPhoto) {
      var coverImage = first(".cover-background img");
      setPhoto(coverImage, coverPhoto);
      all(".cover-background source").forEach(function (source) { source.srcset = coverPhoto; });
    }
    if (couplePhoto) {
      var coupleImg = first("#cimg");
      if (coupleImg) coupleImg.setAttribute("href", couplePhoto);
    }
  }

  function applyData(data) {
    if (!data || typeof data !== "object") return;
    if (guestName) setGuest();

    if (window.location.pathname.toLowerCase().indexOf("3d%20motion%20kompas") !== -1 ||
        window.location.pathname.toLowerCase().indexOf("3d motion kompas") !== -1) {
      update3DMotion(data);
    } else {
      updateCommonTemplate(data);
    }

    document.documentElement.setAttribute("data-bloomy-db", "loaded");
    console.info("BLOOMY VOW: database loaded for invitation", invitationId);
  }

  setGuest();
  if (!invitationId) return;

  var callbackName = "__bloomyVowDb_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  var script = document.createElement("script");
  var finished = false;
  var timer = window.setTimeout(function () {
    if (finished) return;
    finished = true;
    script.remove();
    try { delete window[callbackName]; } catch (_) {}
    console.error("BLOOMY VOW: database request timed out.");
    if (window.__bloomyVowFinishLoading) window.__bloomyVowFinishLoading(false, "Koneksi database terlalu lama.\nSilakan muat ulang undangan.");
  }, 20000);

  window[callbackName] = function (response) {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    script.remove();
    try { delete window[callbackName]; } catch (_) {}
    if (!response || response.success !== true || !response.data) {
      console.error("BLOOMY VOW: invitation data was not found.", response && response.message);
      if (window.__bloomyVowFinishLoading) window.__bloomyVowFinishLoading(false, "Data undangan tidak ditemukan.\nPeriksa tautan undangan.");
      return;
    }
    try {
      applyData(response.data);
      if (window.__bloomyVowFinishLoading) window.__bloomyVowFinishLoading(true);
    } catch (error) {
      console.error("BLOOMY VOW: failed to apply invitation data.", error);
      if (window.__bloomyVowFinishLoading) window.__bloomyVowFinishLoading(false, "Undangan mengalami kendala saat dimuat.\nSilakan muat ulang.");
    }
  };

  script.onerror = function () {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    try { delete window[callbackName]; } catch (_) {}
    script.remove();
    console.error("BLOOMY VOW: failed to reach the invitation database.");
    if (window.__bloomyVowFinishLoading) window.__bloomyVowFinishLoading(false, "Database tidak dapat dihubungi.\nPeriksa koneksi internet.");
  };

  script.src = API_URL + "?id=" + encodeURIComponent(invitationId) +
    "&callback=" + encodeURIComponent(callbackName) + "&t=" + Date.now();
  document.head.appendChild(script);
})();
