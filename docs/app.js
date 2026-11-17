(function () {
  const { STR, SORTS, REGIONS } = window.SKI;
  const stays = window.STAYS;
  const $ = id => document.getElementById(id);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  // ---- state lives in the URL (lang, sort, region, pass, refundable, open stay)
  const q = new URLSearchParams(location.search);
  const storedLang = (() => { try { return localStorage.getItem("ski.lang"); } catch (e) { return null; } })();
  const navLang = (navigator.language || "de").slice(0, 2);
  const pick = (v, list, d) => (list.includes(v) ? v : d);
  const st = {
    lang: pick(q.get("lang") || storedLang || navLang, ["de", "en", "ro"], "de"),
    sort: pick(q.get("sort"), SORTS, "couple"),
    region: pick(q.get("region"), REGIONS, "all"),
    withPass: q.get("pass") === "1",
    refundable: q.get("refundable") === "1",
    open: stays.some(s => s.id === q.get("stay")) ? q.get("stay") : null,
    groupOn: false, user: null, ratingList: [], ratings: null
  };

  function syncUrl() {
    const p = new URLSearchParams();
    if (st.lang !== "de") p.set("lang", st.lang);
    if (st.sort !== "couple") p.set("sort", st.sort);
    if (st.region !== "all") p.set("region", st.region);
    if (st.withPass) p.set("pass", "1");
    if (st.refundable) p.set("refundable", "1");
    if (st.open) p.set("stay", st.open);
    const s = p.toString();
    history.replaceState(null, "", s ? "?" + s : location.pathname);
  }

  function renderStatic() {
    const t = STR[st.lang];
    document.documentElement.lang = st.lang;
    document.title = t.title;
    document.querySelector('meta[name="description"]').setAttribute("content", t.desc);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const v = t[el.dataset.i18n];
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t[el.dataset.i18nAria]));
    document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === st.lang)));
    $("board").innerHTML = SKI.board(stays, st.lang);
    $("facts").innerHTML = SKI.facts(st.lang);
    $("thead").innerHTML = SKI.thead(st.lang);
  }

  function renderControls() {
    const t = STR[st.lang];
    $("sort").innerHTML = SKI.seg(SORTS, t.sortBy, st.sort, "sort");
    $("region").innerHTML = SKI.seg(REGIONS, t.regions, st.region, "region");
    $("withPass").checked = st.withPass;
    $("refundable").checked = st.refundable;
  }

  function renderRows() {
    const html = SKI.rows(stays, st.lang, st);
    $("rows").innerHTML = html;
    const none = !html;
    $("empty").hidden = !none;
    document.querySelector(".scroller").hidden = none;
  }

  // ---- group ratings (group.js emits "ski:group")
  function aggregate() {
    if (!st.user) { st.ratings = null; return; }
    const m = {};
    for (const x of st.ratingList) {
      const g = m[x.stay] || (m[x.stay] = { sum: 0, n: 0, mine: false });
      g.sum += x.stars; g.n++; if (x.uid === st.user.uid) g.mine = true;
    }
    for (const k in m) m[k].avg = m[k].sum / m[k].n;
    st.ratings = m;
  }
  function renderGroup() {
    const t = STR[st.lang].g, btn = $("authBtn"), gb = $("groupbar");
    btn.hidden = !st.groupOn;
    btn.textContent = st.user ? t.signOut : t.signIn;
    btn.dataset.act = st.user ? "signout" : "signin";
    gb.hidden = !st.groupOn;
    if (st.user) {
      const a = stays.filter(s => st.ratings && st.ratings[s.id] && st.ratings[s.id].mine).length;
      gb.textContent = SKI.fmt(a === stays.length ? t.done : t.progress, { n: st.user.name, a, b: stays.length });
    } else gb.textContent = t.invite;
  }
  window.addEventListener("ski:group", e => {
    const d = e.detail;
    st.groupOn = d.on; st.user = d.user; st.ratingList = d.list || [];
    aggregate(); renderGroup(); renderRows();
    const typing = document.activeElement && document.activeElement.closest && document.activeElement.closest(".grp__form");
    if (st.open && sheet.open && !typing) fillSheet(st.open);
  });

  function renderAll() {
    renderStatic(); renderControls(); renderRows(); renderGroup();
    if (st.open && $("sheet").open) fillSheet(st.open);
    syncUrl();
  }

  // ---- controls
  document.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (b && b.dataset.lang) { st.lang = b.dataset.lang; try { localStorage.setItem("ski.lang", st.lang); } catch (err) {} renderAll(); return; }
    if (b && b.dataset.sort) { st.sort = b.dataset.sort; renderControls(); renderRows(); syncUrl(); return; }
    if (b && b.dataset.region) { st.region = b.dataset.region; renderControls(); renderRows(); syncUrl(); return; }
    if (b && b.id === "reset") { st.region = "all"; st.refundable = false; renderControls(); renderRows(); syncUrl(); return; }
    if (b && b.dataset.act === "signin") { window.SKIG.signIn().catch(() => alert(STR[st.lang].g.err)); return; }
    if (b && b.dataset.act === "signout") { window.SKIG.signOut(); return; }
    if (b && b.dataset.act === "unrate") { window.SKIG.remove(b.dataset.stay).catch(() => alert(STR[st.lang].g.err)); return; }
    if (e.target.closest(".grp")) return;
    const opener = e.target.closest("[data-open]");
    if (opener) { openSheet(opener.dataset.open, opener); return; }
    const tr = e.target.closest("tbody tr");
    if (tr && !e.target.closest("a")) openSheet(tr.dataset.id, tr.querySelector("[data-open]"));
  });
  document.addEventListener("submit", async e => {
    const f = e.target.closest(".grp__form"); if (!f) return;
    e.preventDefault();
    const t = STR[st.lang].g, msg = f.querySelector(".grp__msg"), btn = f.querySelector('button[type="submit"]');
    const stars = Number((f.querySelector('input[name="stars"]:checked') || {}).value || 0);
    if (!stars) { msg.textContent = t.mine + ": ★"; return; }
    btn.disabled = true;
    try { await window.SKIG.save(f.dataset.stay, stars, f.elements.comment.value.trim()); msg.textContent = t.saved; document.activeElement.blur(); }
    catch (err) { msg.textContent = t.err; }
    finally { btn.disabled = false; }
  });
  $("withPass").addEventListener("change", e => { st.withPass = e.target.checked; renderRows(); syncUrl(); });
  $("refundable").addEventListener("change", e => { st.refundable = e.target.checked; renderRows(); syncUrl(); });

  // translucent bar gets its rule only once content scrolls under it
  const bar = $("bar");
  const onScroll = () => bar.classList.toggle("is-scrolled", scrollY > 4);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---- sheet: critically damped spring, 1:1 drag, momentum projection
  const sheet = $("sheet"), panel = $("sheetPanel"), grip = $("sheetGrip"), body = $("sheetBody");
  let y = 0, v = 0, target = 0, raf = 0, onRest = null, lastOpener = null;
  const RESPONSE = 0.36, DAMPING = 1;
  const k = Math.pow(2 * Math.PI / RESPONSE, 2), c = 4 * Math.PI * DAMPING / RESPONSE;
  const H = () => panel.getBoundingClientRect().height || innerHeight;
  const paint = () => {
    panel.style.transform = `translate3d(0, ${y}px, 0)`;
    sheet.style.setProperty("--scrim", String(Math.max(0, Math.min(1, 1 - y / H()))));
  };
  function springTo(to, velocity, done) {
    target = to; if (velocity !== undefined) v = velocity; onRest = done || null;
    if (reduceMotion.matches) { y = to; v = 0; paint(); const cb = onRest; onRest = null; cb && cb(); return; }
    cancelAnimationFrame(raf);
    let last = performance.now();
    const step = now => {
      const dt = Math.min(0.032, (now - last) / 1000); last = now;
      const a = -k * (y - target) - c * v;
      v += a * dt; y += v * dt;
      paint();
      if (Math.abs(y - target) < 0.5 && Math.abs(v) < 5) {
        y = target; v = 0; paint(); const cb = onRest; onRest = null; cb && cb(); return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  function fillSheet(id) {
    const s = stays.find(x => x.id === id);
    $("sheet-title").textContent = s.name;
    $("sheet-place").textContent = s.place[st.lang];
    $("sheetBody").innerHTML = SKI.sheet(s, st.lang, st);
  }

  function openSheet(id, opener) {
    lastOpener = opener || null;
    st.open = id; fillSheet(id); syncUrl();
    if (!sheet.open) {
      sheet.showModal();
      body.scrollTop = 0;
      y = H(); v = 0; paint();
    }
    springTo(0);
  }
  function closeSheet(velocity) {
    springTo(H(), velocity, () => {
      sheet.close(); st.open = null; syncUrl();
      if (lastOpener && document.contains(lastOpener)) lastOpener.focus();
    });
  }
  $("sheetClose").addEventListener("click", () => closeSheet());
  sheet.addEventListener("cancel", e => { e.preventDefault(); closeSheet(); });
  sheet.addEventListener("click", e => { if (e.target === sheet) closeSheet(); });

  // drag the grip (or the panel while scrolled to the top) and the sheet follows 1:1
  let drag = null;
  function project(vel, rate = 0.998) { return (vel / 1000) * rate / (1 - rate); }
  panel.addEventListener("pointerdown", e => {
    const onGrip = grip.contains(e.target);
    if (!onGrip && (body.scrollTop > 0 || e.pointerType === "mouse" || e.target.closest("a, button, summary, input, textarea, label"))) return;
    cancelAnimationFrame(raf);
    drag = { id: e.pointerId, start: e.clientY, from: y, hist: [{ t: performance.now(), y: e.clientY }], live: onGrip };
  });
  panel.addEventListener("pointermove", e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = e.clientY - drag.start;
    if (!drag.live) { if (dy > 10) { drag.live = true; drag.start = e.clientY; panel.setPointerCapture(e.pointerId); } else return; }
    else if (!panel.hasPointerCapture(e.pointerId)) panel.setPointerCapture(e.pointerId);
    const raw = drag.from + (e.clientY - drag.start);
    y = raw < 0 ? -(-raw * 40) / (40 + -raw * 0.55) : raw; // rubber-band above the top
    paint();
    drag.hist.push({ t: performance.now(), y: e.clientY });
    if (drag.hist.length > 6) drag.hist.shift();
  });
  const endDrag = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const wasLive = drag.live, h = drag.hist; drag = null;
    if (!wasLive) return;
    const a = h[0], b = h[h.length - 1];
    const vel = b.t > a.t ? ((b.y - a.y) / (b.t - a.t)) * 1000 : 0;
    const landing = y + project(vel);
    if (landing > H() * 0.45) closeSheet(vel); else springTo(0, vel);
  };
  panel.addEventListener("pointerup", endDrag);
  panel.addEventListener("pointercancel", endDrag);

  renderAll();
  if (st.open) openSheet(st.open);
})();
