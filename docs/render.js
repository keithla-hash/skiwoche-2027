// Pure string renderers: run in the browser and in build.mjs (prerender for no-JS).
(function (root) {
  const STR = {
    de: {
      title: "Skiwoche Januar 2027",
      desc: "Elf Ski-Unterkünfte für drei Paare und zwei Kleinkinder im Januar 2027 im direkten Vergleich.",
      langLabel: "Sprache",
      h1: "Elf Unterkünfte. Eine Skiwoche.",
      lead: "Drei Paare, zwei Kleinkinder, Januar 2027. Tippt eine Zeile für Details.",
      figCouple: "günstigster Preis pro Paar",
      figKm: "Pistenkilometer mit einem Pass",
      figDrive: "kürzeste Anfahrt ab Fulda",
      sort: "Sortieren", region: "Region",
      sortBy: { couple: "Preis pro Paar", km: "Pisten", drive: "Anfahrt", rating: "Bewertung", group: "Gruppe" },
      regions: { all: "Alle", oetztal: "Ötztal", paznaun: "Paznaun", montblanc: "Mont Blanc" },
      withPass: "Pro Paar inkl. 2 Skipässe",
      refundable: "Nur stornierbar",
      ledgerTitle: "Vergleich",
      th: { name: "Unterkunft", group: "Gruppe", dates: "Zeitraum", total: "Gesamt", couple: "Pro Paar", night: "Pro Nacht", beds: "Betten", bus: "Skibus", areas: "Gebiete in 20 Min.", km: "Pisten-km", drive: "Anfahrt", rating: "Bewertung", cancel: "Storno" },
      bedFit: { yes: "Doppelbett je Paar", partly: "Nicht für jedes Paar", singles: "Nur Einzelbetten", open: "Noch offen" },
      bus: { yes: "Ja, gratis", partly: "Zug gratis", open: "Nicht geprüft" },
      cancel: { no: "Nein", yes: "Kostenlos", option: "Mit Aufpreis", talk: "Absprechen", open: "Nicht geprüft" },
      source: { private: "Privat", booking: "Booking, geprüft", airbnb: "Airbnb, geprüft", expedia: "Expedia über trivago" },
      nights: n => `${n} Nächte`,
      rooms: n => `${n} Schlafzimmer`,
      reviews: n => `${n} Bewertungen`,
      kmPass: (k, p) => `${k} km mit ${p}`,
      kmLocal: k => `${k} km vor Ort`,
      inclPass: "inkl. Skipässe",
      onlyStay: "nur Unterkunft",
      empty: "Keine Unterkunft passt zu diesen Filtern.",
      reset: "Filter zurücksetzen",
      passNote: "Pro Paar = Unterkunft geteilt durch drei. Mit Skipass: plus zwei 6-Tage-Pässe für Erwachsene zum höchsten bekannten Preis; online und früh gekauft meist günstiger. Kleinkinder fahren überall gratis oder fast gratis.",
      factsTitle: "Gut zu wissen",
      facts: [
        ["Auswahl", "Pflicht: 3 echte Schlafzimmer mit Doppelbett (Wohnzimmer zählt nicht), mindestens 2 Bäder, höchstens 20 Min. zum Lift in Ötztal, Paznaun oder Chamonix-Tal. Gesucht wurde jede Anreise vom 2. bis 9.1. mit 7 oder 8 Nächten; gezeigt ist der günstigste Zeitraum. Ausnahme: die Privatwohnung gibt es nur vom 4. bis 10.1. (6 Nächte)."],
        ["Privatwohnung", "Gastgeberin vorab fragen: Bettart in den 3 Zimmern, ob die Kinder kostenlos sind, Anzahlung und Storno, und ob sie euch für die Ötztaler Gästekarte anmeldet. Die Karte macht den Skibus gratis."],
        ["Skibus", "Ötztal: gratis mit Gästekarte. Paznaun: gratis mit Skipass und Ausrüstung. Chamonix-Tal: Zug Mont-Blanc Express mit Gästekarte gratis, Busse nur ermäßigt."],
        ["Skipässe 6 Tage", "Ötztal Superskipass 469 € (Kasse, ab 7.1.), gilt in 6 Gebieten mit rund 365 km. Silvretta Skipass ca. 451 € für rund 366 km. Chamonix Le Pass 265 bis 373 € für 98 km, Mont-Blanc Unlimited 350 bis 499 € für 711 km."],
        ["Storno", "Auf Booking nicht stornierbar: Sabine, Aillouds. Mit Storno gegen Aufpreis: A little corner of paradise (Booking, 2.040 € bis 9.12.). Bei den Airbnb-Angeboten die Storno-Regel vor dem Buchen prüfen. Airbnb-Bewertungen (von 5) sind auf die 10er-Skala umgerechnet."],
        ["Vignette", "Österreich ab 2027 nur digital, 10 Tage ca. 13 €. Für Mont Blanc über die Schweiz zusätzlich 40 CHF Jahresvignette."]
      ],
      stand: "Stand 17.11.2026. Preise für 6 Erwachsene und 2 Kinder, ganze Unterkunft; sie können sich täglich ändern.",
      sources: "Quellen",
      close: "Schließen",
      open: "Angebot öffnen",
      contact: "Kontakt läuft über Bekannte",
      dl: { dates: "Zeitraum", price: "Preis gesamt", couple: "Pro Paar", night: "Pro Nacht", beds: "Zimmer und Betten", bus: "Skibus", lift: "Zur Piste", areas: "Skigebiete in der Nähe", km: "Pisten", pass: "Skipass 6 Tage", kids: "Kinder", glacier: "Gletscher", drive: "Anfahrt ab Fulda", extras: "Extras", basis: "Preisbasis" },
      plus: "Dafür", minus: "Dagegen",
      yes: "Ja", no: "Nein",
      noRating: "Keine",
      driveFmt: (km, h, m) => `${km} km, ca. ${h}:${String(m).padStart(2, "0")} Std.`,
      to: " bis ",
      locale: "de-DE",
      g: {"th": "Gruppe", "sort": "Gruppe", "signIn": "Mit Google anmelden", "signOut": "Abmelden", "title": "Eure Bewertungen", "lead": "Jede Person bewertet jede Unterkunft mit 1 bis 5 Sternen, gern mit kurzem Kommentar. Alle sehen alle Bewertungen.", "hint": "Melde dich mit Google an, um zu bewerten und die Bewertungen der anderen zu sehen.", "mine": "Deine Bewertung", "comment": "Kommentar (optional)", "save": "Speichern", "saved": "Gespeichert", "remove": "Bewertung löschen", "none": "Noch keine Bewertungen.", "off": "Bewertungen sind noch nicht freigeschaltet.", "missing": "Du fehlst noch", "votes": "Stimmen", "vote": "Stimme", "progress": "Angemeldet als {n}. Du hast {a} von {b} Unterkünften bewertet.", "done": "Angemeldet als {n}. Du hast alle {b} Unterkünfte bewertet, danke!", "invite": "Bitte bewertet jede Unterkunft: mit Google anmelden, Zeile öffnen, Sterne vergeben.", "err": "Das hat nicht geklappt. Bitte nochmal versuchen.", "starsLbl": "{n} von 5 Sternen", "you": "du"}
    },
    en: {
      title: "Ski week January 2027",
      desc: "Eleven ski stays for three couples and two toddlers in January 2027, compared side by side.",
      langLabel: "Language",
      h1: "Eleven places. One ski week.",
      lead: "Three couples, two toddlers, January 2027. Tap a row for details.",
      figCouple: "lowest price per couple",
      figKm: "slope kilometres on one pass",
      figDrive: "shortest drive from Fulda",
      sort: "Sort", region: "Region",
      sortBy: { couple: "Price per couple", km: "Slopes", drive: "Drive", rating: "Rating", group: "Group" },
      regions: { all: "All", oetztal: "Ötztal", paznaun: "Paznaun", montblanc: "Mont Blanc" },
      withPass: "Per couple incl. 2 ski passes",
      refundable: "Refundable only",
      ledgerTitle: "Comparison",
      th: { name: "Stay", group: "Group", dates: "Dates", total: "Total", couple: "Per couple", night: "Per night", beds: "Beds", bus: "Ski bus", areas: "Areas within 20 min", km: "Slope km", drive: "Drive", rating: "Rating", cancel: "Cancellation" },
      bedFit: { yes: "Double bed per couple", partly: "Not for every couple", singles: "Single beds only", open: "Still open" },
      bus: { yes: "Yes, free", partly: "Train free", open: "Not checked" },
      cancel: { no: "No", yes: "Free", option: "At extra cost", talk: "To agree", open: "Not checked" },
      source: { private: "Private", booking: "Booking, checked", airbnb: "Airbnb, checked", expedia: "Expedia via trivago" },
      nights: n => `${n} nights`,
      rooms: n => `${n} bedrooms`,
      reviews: n => `${n} reviews`,
      kmPass: (k, p) => `${k} km with ${p}`,
      kmLocal: k => `${k} km on site`,
      inclPass: "incl. ski passes",
      onlyStay: "stay only",
      empty: "No stay matches these filters.",
      reset: "Reset filters",
      passNote: "Per couple = the stay divided by three. With ski passes: plus two 6-day adult passes at the highest known price; usually cheaper online and early. Toddlers ski free or almost free everywhere.",
      factsTitle: "Good to know",
      facts: [
        ["Shortlist", "Musts: 3 real bedrooms with a double bed (the living room does not count), at least 2 bathrooms, at most 20 min to a lift in the Ötztal, Paznaun or Chamonix valley. Every arrival from 2 to 9 Jan with 7 or 8 nights was searched; the cheapest dates are shown. Exception: the private flat is only free from 4 to 10 Jan (6 nights)."],
        ["Private flat", "Ask the host first: bed type in the 3 rooms, whether the kids stay free, deposit and cancellation, and whether she registers you for the Ötztal guest card. The card makes the ski bus free."],
        ["Ski bus", "Ötztal: free with the guest card. Paznaun: free with ski pass and gear. Chamonix valley: Mont-Blanc Express train free with the guest card, buses only discounted."],
        ["6-day ski passes", "Ötztal Superskipass €469 (desk price from 7 Jan), valid in 6 areas with about 365 km. Silvretta Skipass about €451 for about 366 km. Chamonix Le Pass €265 to 373 for 98 km, Mont-Blanc Unlimited €350 to 499 for 711 km."],
        ["Cancellation", "Non-refundable on Booking: Sabine, Aillouds. Cancellable at extra cost: A little corner of paradise (Booking, €2,040 until 9 Dec). Check the cancellation rule of the Airbnb offers before booking. Airbnb ratings (out of 5) are converted to the 10-point scale."],
        ["Vignette", "Austria is digital-only from 2027, 10 days about €13. For Mont Blanc via Switzerland add the CHF 40 annual vignette."]
      ],
      stand: "As of 17 Nov 2026. Prices for 6 adults and 2 kids, whole property; they can change daily.",
      sources: "Sources",
      close: "Close",
      open: "Open offer",
      contact: "Contact goes through friends",
      dl: { dates: "Dates", price: "Total price", couple: "Per couple", night: "Per night", beds: "Rooms and beds", bus: "Ski bus", lift: "To the slope", areas: "Ski areas nearby", km: "Slopes", pass: "6-day ski pass", kids: "Kids", glacier: "Glacier", drive: "Drive from Fulda", extras: "Extras", basis: "Price basis" },
      plus: "For", minus: "Against",
      yes: "Yes", no: "No",
      noRating: "None",
      driveFmt: (km, h, m) => `${km} km, about ${h}:${String(m).padStart(2, "0")} h`,
      to: " to ",
      locale: "en-GB",
      g: {"th": "Group", "sort": "Group", "signIn": "Sign in with Google", "signOut": "Sign out", "title": "Your ratings", "lead": "Everyone rates every place with 1 to 5 stars, ideally with a short comment. Everyone sees all ratings.", "hint": "Sign in with Google to rate and to see everyone else’s ratings.", "mine": "Your rating", "comment": "Comment (optional)", "save": "Save", "saved": "Saved", "remove": "Delete rating", "none": "No ratings yet.", "off": "Ratings are not switched on yet.", "missing": "You haven’t rated", "votes": "votes", "vote": "vote", "progress": "Signed in as {n}. You have rated {a} of {b} places.", "done": "Signed in as {n}. You have rated all {b} places, thank you!", "invite": "Please rate every place: sign in with Google, open a row, give stars.", "err": "That did not work. Please try again.", "starsLbl": "{n} of 5 stars", "you": "you"}
    },
    ro: {
      title: "Săptămâna de schi, ianuarie 2027",
      desc: "Unsprezece cazări la schi pentru trei cupluri și doi copii mici în ianuarie 2027, comparate direct.",
      langLabel: "Limba",
      h1: "Unsprezece cazări. O săptămână de schi.",
      lead: "Trei cupluri, doi copii mici, ianuarie 2027. Atingeți un rând pentru detalii.",
      figCouple: "cel mai mic preț pe cuplu",
      figKm: "kilometri de pârtie cu un abonament",
      figDrive: "cel mai scurt drum din Fulda",
      sort: "Sortare", region: "Regiune",
      sortBy: { couple: "Preț pe cuplu", km: "Pârtii", drive: "Drum", rating: "Notă", group: "Grup" },
      regions: { all: "Toate", oetztal: "Ötztal", paznaun: "Paznaun", montblanc: "Mont Blanc" },
      withPass: "Pe cuplu cu 2 skipass-uri",
      refundable: "Doar cu anulare",
      ledgerTitle: "Comparație",
      th: { name: "Cazare", group: "Grup", dates: "Perioadă", total: "Total", couple: "Pe cuplu", night: "Pe noapte", beds: "Paturi", bus: "Skibus", areas: "Domenii în 20 min", km: "Km pârtie", drive: "Drum", rating: "Notă", cancel: "Anulare" },
      bedFit: { yes: "Pat dublu pentru fiecare cuplu", partly: "Nu pentru toate cuplurile", singles: "Doar paturi single", open: "Încă neclar" },
      bus: { yes: "Da, gratuit", partly: "Tren gratuit", open: "Neverificat" },
      cancel: { no: "Nu", yes: "Gratuită", option: "Cu cost extra", talk: "De stabilit", open: "Neverificat" },
      source: { private: "Privat", booking: "Booking, verificat", airbnb: "Airbnb, verificat", expedia: "Expedia via trivago" },
      nights: n => `${n} nopți`,
      rooms: n => `${n} dormitoare`,
      reviews: n => `${n} recenzii`,
      kmPass: (k, p) => `${k} km cu ${p}`,
      kmLocal: k => `${k} km pe loc`,
      inclPass: "cu skipass-uri",
      onlyStay: "doar cazarea",
      empty: "Nicio cazare nu corespunde acestor filtre.",
      reset: "Resetează filtrele",
      passNote: "Pe cuplu = cazarea împărțită la trei. Cu skipass: plus două abonamente de 6 zile pentru adulți, la cel mai mare preț cunoscut; de obicei mai ieftin online și din timp. Copiii mici schiază peste tot gratuit sau aproape gratuit.",
      factsTitle: "Bine de știut",
      facts: [
        ["Selecție", "Obligatoriu: 3 dormitoare reale cu pat dublu (livingul nu contează), minimum 2 băi, maximum 20 min până la un lift în Ötztal, Paznaun sau valea Chamonix. Am căutat fiecare sosire între 2 și 9 ian. cu 7 sau 8 nopți; se arată perioada cea mai ieftină. Excepție: apartamentul privat e liber doar 4-10 ian. (6 nopți)."],
        ["Apartamentul privat", "Întrebați gazda înainte: ce paturi sunt în cele 3 camere, dacă copiii stau gratuit, avansul și anularea, și dacă vă înregistrează pentru cardul de oaspete Ötztal. Cu cardul, skibusul e gratuit."],
        ["Skibus", "Ötztal: gratuit cu cardul de oaspete. Paznaun: gratuit cu skipass și echipament. Valea Chamonix: trenul Mont-Blanc Express gratuit cu cardul de oaspete, autobuzele doar reduse."],
        ["Skipass 6 zile", "Ötztal Superskipass 469 € (la casă, de la 7 ian.), valabil în 6 domenii cu cca. 365 km. Silvretta Skipass cca. 451 € pentru cca. 366 km. Chamonix Le Pass 265-373 € pentru 98 km, Mont-Blanc Unlimited 350-499 € pentru 711 km."],
        ["Anulare", "Fără anulare pe Booking: Sabine, Aillouds. Anulare contra cost: A little corner of paradise (Booking, 2.040 € până pe 9.12.). La ofertele Airbnb verificați regula de anulare înainte de rezervare. Notele Airbnb (din 5) sunt convertite la scara de 10."],
        ["Vinietă", "Austria are din 2027 doar vinietă digitală, 10 zile cca. 13 €. Pentru Mont Blanc prin Elveția se adaugă vinieta anuală de 40 CHF."]
      ],
      stand: "Situația la 17.11.2026. Prețuri pentru 6 adulți și 2 copii, toată cazarea; se pot schimba zilnic.",
      sources: "Surse",
      close: "Închide",
      open: "Deschide oferta",
      contact: "Contactul e prin prieteni",
      dl: { dates: "Perioadă", price: "Preț total", couple: "Pe cuplu", night: "Pe noapte", beds: "Camere și paturi", bus: "Skibus", lift: "Până la pârtie", areas: "Domenii schiabile aproape", km: "Pârtii", pass: "Skipass 6 zile", kids: "Copii", glacier: "Ghețar", drive: "Drum din Fulda", extras: "Extra", basis: "Baza de preț" },
      plus: "Pentru", minus: "Împotrivă",
      yes: "Da", no: "Nu",
      noRating: "Fără",
      driveFmt: (km, h, m) => `${km} km, cca. ${h}:${String(m).padStart(2, "0")} h`,
      to: " până la ",
      locale: "ro-RO",
      g: {"th": "Grup", "sort": "Grup", "signIn": "Conectare cu Google", "signOut": "Deconectare", "title": "Notele voastre", "lead": "Fiecare persoană notează fiecare cazare cu 1 până la 5 stele, ideal cu un scurt comentariu. Toți văd toate notele.", "hint": "Conectează-te cu Google ca să notezi și să vezi notele celorlalți.", "mine": "Nota ta", "comment": "Comentariu (opțional)", "save": "Salvează", "saved": "Salvat", "remove": "Șterge nota", "none": "Încă nicio notă.", "off": "Notele nu sunt încă activate.", "missing": "Nu ai notat încă", "votes": "voturi", "vote": "vot", "progress": "Conectat ca {n}. Ai notat {a} din {b} cazări.", "done": "Conectat ca {n}. Ai notat toate cele {b} cazări, mulțumim!", "invite": "Vă rugăm notați fiecare cazare: conectare cu Google, deschideți un rând, dați stele.", "err": "Nu a mers. Încearcă din nou.", "starsLbl": "{n} din 5 stele", "you": "tu"}
    }
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const eur = (n, lang) => new Intl.NumberFormat(STR[lang].locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(n));
  const num = (n, lang, d = 1) => new Intl.NumberFormat(STR[lang].locale, { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
  const intn = (n, lang) => new Intl.NumberFormat(STR[lang].locale).format(n);
  const perCouple = (s, withPass) => s.total / 3 + (withPass ? 2 * s.pass : 0);
  const hm = min => [Math.floor(min / 60), min % 60];
  const dates = (s, lang) => {
    const f = new Intl.DateTimeFormat(STR[lang].locale, lang === "en" ? { day: "numeric", month: "short" } : { day: "numeric", month: "numeric" });
    return `${f.format(new Date(s.from + "T12:00:00"))}${STR[lang].to}${f.format(new Date(s.to + "T12:00:00"))}`;
  };
  const shortDrive = (s, lang) => { const [h, m] = hm(s.driveMin); return `${h}:${String(m).padStart(2, "0")} h`; };

  const SORTS = ["couple", "group", "km", "drive", "rating"];
  const REGIONS = ["all", "oetztal", "paznaun", "montblanc"];

  function view(stays, st) {
    let list = stays.filter(s => (st.region === "all" || s.region === st.region) && (!st.refundable || s.cancel === "yes" || s.cancel === "option"));
    const key = {
      couple: s => perCouple(s, st.withPass),
      km: s => -s.kmPass,
      drive: s => s.driveMin,
      rating: s => -(s.rating || 0),
      group: s => { const g = st.ratings && st.ratings[s.id]; return g && g.n ? -g.avg : 1; }
    }[st.sort];
    return list.slice().sort((a, b) => key(a) - key(b));
  }

  function board(stays, lang) {
    const t = STR[lang];
    const minCouple = Math.min(...stays.map(s => s.total / 3));
    const maxKm = Math.max(...stays.map(s => s.kmPass));
    const minDrive = Math.min(...stays.map(s => s.driveMin));
    const [h, m] = hm(minDrive);
    return `<div class="board__item"><dt>${esc(t.figCouple)}</dt><dd class="fig">${esc(eur(minCouple, lang))}</dd></div>`
      + `<div class="board__item"><dt>${esc(t.figKm)}</dt><dd class="fig">${esc(intn(maxKm, lang))}</dd></div>`
      + `<div class="board__item"><dt>${esc(t.figDrive)}</dt><dd class="fig">${h}:${String(m).padStart(2, "0")}&nbsp;h</dd></div>`;
  }

  function seg(items, labels, current, attr) {
    return items.map(k => `<button type="button" data-${attr}="${k}" aria-pressed="${k === current}">${esc(labels[k])}</button>`).join("");
  }

  const COLS = ["name", "couple", "group", "total", "night", "dates", "beds", "bus", "areas", "km", "drive", "rating", "cancel"];

  function thead(lang) {
    const t = STR[lang];
    return COLS.map(c => `<th scope="col" class="c-${c}">${esc(t.th[c])}</th>`).join("");
  }

  function rows(stays, lang, st) {
    const t = STR[lang];
    return view(stays, st).map(s => {
      const pc = perCouple(s, st.withPass);
      const rating = s.rating ? `${num(s.rating, lang)}<span class="sub">${esc(t.reviews(s.reviews))}</span>` : `<span class="muted">${esc(t.noRating)}</span>`;
      const cells = {
        name: `<th scope="row" class="c-name"><button type="button" class="rowbtn" data-open="${s.id}"><span class="rowbtn__name">${esc(s.name)}</span><span class="rowbtn__place">${esc(s.place[lang])}</span></button><span class="tag tag--${s.source}">${esc(t.source[s.source])}</span></th>`,
        couple: `<td class="c-couple num" data-label="${esc(t.th.couple)}"><span class="price">${esc(eur(pc, lang))}</span><span class="sub">${esc(st.withPass ? t.inclPass : t.onlyStay)}</span></td>`,
        group: groupCell(s, t, st),
        total: `<td class="c-total num" data-label="${esc(t.th.total)}">${esc(eur(s.total, lang))}</td>`,
        night: `<td class="c-night num" data-label="${esc(t.th.night)}">${esc(eur(s.total / s.nights, lang))}</td>`,
        dates: `<td class="c-dates" data-label="${esc(t.th.dates)}">${esc(dates(s, lang))}<span class="sub">${esc(t.nights(s.nights))}</span></td>`,
        beds: `<td class="c-beds" data-label="${esc(t.th.beds)}"><span class="fit fit--${s.bedFit}">${esc(t.bedFit[s.bedFit])}</span><span class="sub">${esc(t.rooms(s.bedrooms))}</span></td>`,
        bus: `<td class="c-bus" data-label="${esc(t.th.bus)}">${esc(t.bus[s.bus])}</td>`,
        areas: `<td class="c-areas num" data-label="${esc(t.th.areas)}">${s.areas20}</td>`,
        km: `<td class="c-km num" data-label="${esc(t.th.km)}">${esc(intn(s.kmPass, lang))}<span class="sub">${esc(t.kmLocal(s.kmLocal))}</span></td>`,
        drive: `<td class="c-drive num" data-label="${esc(t.th.drive)}">${esc(shortDrive(s, lang))}<span class="sub">${esc(intn(s.driveKm, lang))} km</span></td>`,
        rating: `<td class="c-rating num" data-label="${esc(t.th.rating)}">${rating}</td>`,
        cancel: `<td class="c-cancel" data-label="${esc(t.th.cancel)}"><span class="cx cx--${s.cancel}">${esc(t.cancel[s.cancel])}</span></td>`
      };
      return `<tr data-id="${s.id}">${COLS.map(c => cells[c]).join("")}</tr>`;
    }).join("");
  }


  const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => o[k]);
  function groupCell(s, t, st) {
    const g = st.ratings && st.ratings[s.id];
    let inner;
    if (!g || !g.n) inner = `<span class="muted">${esc(t.noRating)}</span>`;
    else inner = `<span class="gscore">${num(g.avg, t.locale.slice(0, 2))}<span class="gstar" aria-hidden="true">★</span></span><span class="sub">${g.n} ${esc(g.n === 1 ? t.g.vote : t.g.votes)}</span>`;
    if (st.user && !(g && g.mine)) inner += `<span class="sub gmiss">${esc(t.g.missing)}</span>`;
    return `<td class="c-group num" data-label="${esc(t.th.group)}">${inner}</td>`;
  }

  function groupBlock(s, lang, st) {
    const t = STR[lang], g = t.g;
    const head = `<section class="grp" aria-labelledby="grp-h"><h3 id="grp-h">${esc(g.title)}</h3><p class="grp__lead">${esc(g.lead)}</p>`;
    if (!st.groupOn) return head + `<p class="muted">${esc(g.off)}</p></section>`;
    if (!st.user) return head + `<p>${esc(g.hint)}</p><button type="button" class="btn btn--primary" data-act="signin">${esc(g.signIn)}</button></section>`;
    const list = (st.ratingList || []).filter(x => x.stay === s.id).sort((a, b) => b.stars - a.stars);
    const mine = list.find(x => x.uid === st.user.uid);
    const val = mine ? mine.stars : 0;
    const stars = [1, 2, 3, 4, 5].map(n => `<label class="star"><input type="radio" name="stars" value="${n}"${n === val ? " checked" : ""}><span aria-hidden="true">★</span><span class="visually-hidden">${esc(fmt(g.starsLbl, { n }))}</span></label>`).join("");
    const form = `<form class="grp__form" data-stay="${s.id}"><fieldset class="stars"><legend>${esc(g.mine)}</legend>${stars}</fieldset>`
      + `<label class="grp__c"><span>${esc(g.comment)}</span><textarea name="comment" rows="2" maxlength="400">${esc(mine ? mine.comment : "")}</textarea></label>`
      + `<div class="grp__actions"><button type="submit" class="btn btn--primary btn--small">${esc(g.save)}</button>${mine ? `<button type="button" class="btn btn--secondary btn--small" data-act="unrate" data-stay="${s.id}">${esc(g.remove)}</button>` : ""}<span class="grp__msg" role="status"></span></div></form>`;
    const others = list.length ? `<ul class="grp__list">${list.map(x => `<li><span class="grp__who">${esc(x.name)}${x.uid === st.user.uid ? ` (${esc(g.you)})` : ""}</span><span class="grp__stars" aria-label="${esc(fmt(g.starsLbl, { n: x.stars }))}">${"★".repeat(x.stars)}<span class="grp__off">${"★".repeat(5 - x.stars)}</span></span>${x.comment ? `<span class="grp__txt">${esc(x.comment)}</span>` : ""}</li>`).join("")}</ul>` : `<p class="muted">${esc(g.none)}</p>`;
    return head + form + others + `</section>`;
  }

  function facts(lang) {
    return STR[lang].facts.map(([k, v]) => `<div class="facts__item"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  }

  function sheet(s, lang, st) {
    const t = STR[lang], d = t.dl;
    const [h, m] = hm(s.driveMin);
    const row = (k, v) => `<div class="kv"><dt>${esc(k)}</dt><dd>${v}</dd></div>`;
    const price = esc(eur(s.total, lang)) + (s.totalNote ? `<span class="sub">${esc(s.totalNote[lang])}</span>` : "");
    const rating = s.rating ? `${num(s.rating, lang)} <span class="muted">(${esc(t.reviews(s.reviews))})</span>` : esc(s.ratingNote ? s.ratingNote[lang] : t.noRating);
    const list = arr => `<ul class="pc">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const action = s.url
      ? `<a class="btn btn--primary" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(t.open)}</a>`
      : `<p class="muted">${esc(t.contact)}</p>`;
    return `
      <div class="sheet__figs">
        <div><span class="fig fig--s">${esc(eur(perCouple(s, false), lang))}</span><span class="sub">${esc(d.couple)}, ${esc(t.onlyStay)}</span></div>
        <div><span class="fig fig--s">${esc(eur(perCouple(s, true), lang))}</span><span class="sub">${esc(d.couple)}, ${esc(t.inclPass)}</span></div>
        <div><span class="fig fig--s">${esc(intn(s.kmPass, lang))}</span><span class="sub">${esc(d.km)} (${esc(s.passName)})</span></div>
      </div>
      ${groupBlock(s, lang, st)}
      <div class="sheet__cols">
        <div>
          <h3>${esc(t.plus)}</h3>${list(s.pros[lang])}
        </div>
        <div>
          <h3>${esc(t.minus)}</h3>${list(s.cons[lang])}
        </div>
      </div>
      <dl class="kvs">
        ${row(d.dates, `${esc(dates(s, lang))}, ${esc(t.nights(s.nights))}`)}
        ${row(d.price, price)}
        ${s.priceBasis ? row(d.basis, esc(s.priceBasis[lang])) : ""}
        ${row(d.night, esc(eur(s.total / s.nights, lang)))}
        ${row(d.beds, `<span class="fit fit--${s.bedFit}">${esc(t.bedFit[s.bedFit])}</span><span class="sub">${esc(s.beds[lang])}</span>`)}
        ${row(d.lift, esc(s.toLift[lang]))}
        ${row(d.bus, esc(s.busText[lang]))}
        ${row(d.areas, esc(s.areasList[lang]))}
        ${row(d.km, `${esc(t.kmPass(intn(s.kmPass, lang), s.passName))}<span class="sub">${esc(t.kmLocal(s.kmLocal))}</span>`)}
        ${row(d.pass, esc(s.passText[lang]))}
        ${row(d.kids, esc(s.kidsPass[lang]))}
        ${row(d.glacier, esc(s.glacier ? t.yes : t.no))}
        ${row(d.drive, esc(t.driveFmt(intn(s.driveKm, lang), h, m)))}
        ${row(t.th.rating, rating)}
        ${row(t.th.cancel, `<span class="cx cx--${s.cancel}">${esc(t.cancel[s.cancel])}</span>`)}
        ${row(d.extras, esc(s.extras[lang]))}
      </dl>
      <div class="sheet__action">${action}</div>`;
  }

  root.SKI = { STR, SORTS, REGIONS, board, seg, thead, rows, facts, sheet, view, fmt };
})(typeof window !== "undefined" ? window : globalThis);
