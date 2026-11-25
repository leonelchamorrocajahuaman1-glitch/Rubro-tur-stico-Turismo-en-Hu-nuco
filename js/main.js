/* =========================================================
   WILD · Turismo en Huánuco — interacción
   ========================================================= */
(() => {
  "use strict";

  const DATA = window.WILD_DATA;
  const CREDITS = window.WILD_CREDITS || {};
  const IMG = (slug) => `assets/img/${slug}.jpg`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const reduceMQ = matchMedia("(prefers-reduced-motion: reduce)");
  const phoneMQ = matchMedia("(max-width: 720px)");
  const params = new URLSearchParams(location.search);
  const REC = params.get("rec") === "1";

  /* =======================================================
     PORTADA · líneas del fondo
     ======================================================= */
  (function drawLines() {
    const svg = $("#lines");
    let seed = 11;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    let out = "";
    for (let i = 0; i < 15; i++) {
      const sx = -520 + i * 118 + (rnd() - 0.5) * 60;
      const ex = sx + 780 + rnd() * 180;
      const c1x = sx + 520 + rnd() * 140, c1y = 700 + rnd() * 90;
      const c2x = sx + 160 + rnd() * 160, c2y = 240 + rnd() * 90;
      const w = (1.2 + rnd() * 2.7).toFixed(2);
      const o = (0.55 + rnd() * 0.3).toFixed(2);
      out += `<path d="M${sx.toFixed(1)} 1000 C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${ex.toFixed(1)} -40" stroke-width="${w}" stroke-opacity="${o}"/>`;
    }
    svg.innerHTML = out;
  })();

  /* =======================================================
     PORTADA · línea de tiempo de la apertura
     ======================================================= */
  const DUR = 2100;
  const pill = $("#pill"), hair = $("#hairline"), mark = $(".mark");
  const nav = $(".nav"), foot = $(".foot"), white = $(".hero__white"), lines = $(".hero__lines"), rule = $("#rule");
  const fadeIns = [...$$(".pill__icon"), $(".pill__caption"), $(".mark__eyebrow")];
  const video = $("#scene");

  const E1 = "cubic-bezier(.5,0,.3,1)", E2 = "cubic-bezier(.45,0,.3,1)", E3 = "cubic-bezier(.4,0,.2,1)";
  const EDROP = "cubic-bezier(.2,.8,.2,1)", EASE = "cubic-bezier(.4,0,.2,1)";

  function pillFrames(phone) {
    if (phone) {
      const H = "((100vw - 40px) / 1.85)";
      return [
        { height: "1.5px", offset: 0 },
        { height: "1.5px", offset: 0.14, easing: E1 },
        { height: `calc(${H} * 0.10)`, offset: 0.3, easing: E2 },
        { height: `calc(${H} * 0.55)`, offset: 0.58, easing: E3 },
        { height: `calc(${H} * 1)`, offset: 1 }
      ];
    }
    return [
      { width: "0.012em", offset: 0 },
      { width: "0.012em", offset: 0.14, easing: E1 },
      { width: "0.16em", offset: 0.3, easing: E2 },
      { width: "1.81em", offset: 0.58, easing: E3 },
      { width: "3.62em", offset: 1 }
    ];
  }

  const hold = (prop, a, b, from, to, easing) => [
    { [prop]: a, offset: 0 },
    { [prop]: a, offset: from, easing },
    { [prop]: b, offset: to },
    { [prop]: b, offset: 1 }
  ];

  function build() {
    const phone = phoneMQ.matches;
    const opts = { duration: DUR, fill: "both" };
    const gap = phone
      ? [{ gap: "0.03em", offset: 0 }, { gap: "0.03em", offset: 0.14, easing: E2 }, { gap: "0.065em", offset: 0.58, easing: E3 }, { gap: "0.1em", offset: 1 }]
      : [{ gap: "0.026em", offset: 0 }, { gap: "0.026em", offset: 0.14, easing: E2 }, { gap: "0.05em", offset: 0.58, easing: E3 }, { gap: "0.085em", offset: 1 }];

    const list = [
      pill.animate(pillFrames(phone), opts),
      pill.animate([
        { clipPath: phone ? "inset(0% 50%)" : "inset(50% 0%)", offset: 0, easing: EASE },
        { clipPath: "inset(0% 0%)", offset: 0.14 },
        { clipPath: "inset(0% 0%)", offset: 1 }
      ], opts),
      hair.animate(hold("opacity", 1, 0, 0.14, 0.3, "ease-in-out"), opts),
      mark.animate(gap, opts),
      white.animate(hold("opacity", 1, 0, 0.45, 0.78, "ease-in-out"), opts),
      lines.animate(hold("opacity", 0, 1, 0.45, 0.78, "ease-in-out"), opts),
      nav.animate(hold("transform", "translateY(-140%)", "translateY(0)", 0.5, 0.86, EDROP), opts),
      foot.animate(hold("transform", "translateY(160%)", "translateY(0)", 0.52, 0.9, EDROP), opts),
      rule.animate(hold("transform", "scaleX(0)", "scaleX(1)", 0.4, 0.95, EASE), opts),
      ...fadeIns.map((el) => el.animate([{ opacity: 0, offset: 0 }, { opacity: 0, offset: 0.8, easing: "ease-out" }, { opacity: 1, offset: 1 }], opts))
    ];
    list.forEach((a) => a.pause());
    return list;
  }

  let tl = build();
  let busy = false;
  let token = 0;

  const setTime = (t) => tl.forEach((a) => (a.currentTime = t));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  function run(rate) {
    tl.forEach((a) => { a.playbackRate = rate; a.play(); });
    return Promise.all(tl.map((a) => a.finished)).catch(() => {});
  }
  const unlock = () => document.body.classList.remove("is-intro");

  async function open() {
    const my = ++token;
    busy = true;
    setTime(0);
    await run(1);
    if (my === token) { busy = false; unlock(); }
  }
  async function collapse() {
    const my = ++token;
    busy = true;
    setTime(DUR);
    await run(-1);
    return my === token;
  }
  async function replay() {
    if (busy || reduceMQ.matches) return;
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
    if (!(await collapse())) return;
    await wait(260);
    if (busy) open();
  }
  function settle() {
    token++;
    busy = false;
    tl.forEach((a) => a.cancel());
    tl = build();
    tl.forEach((a) => { a.playbackRate = 1; a.finish(); });
    unlock();
  }

  $("#replay").addEventListener("click", replay);

  let lastW = innerWidth, rAF = 0;
  addEventListener("resize", () => {
    // ignora los cambios de alto de la barra del navegador móvil
    if (innerWidth === lastW && !busy) return;
    lastW = innerWidth;
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(settle);
  });

  /* ----- video ----- */
  const playBtn = $("#playToggle");
  function setPlaying(on) {
    playBtn.setAttribute("aria-pressed", String(on));
    if (on) { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
    else video.pause();
  }
  playBtn.addEventListener("click", () => setPlaying(video.paused));

  video.muted = true;
  if (reduceMQ.matches) {
    video.removeAttribute("autoplay");
    video.pause();
    playBtn.setAttribute("aria-pressed", "false");
  }

  // Pausa el video cuando la portada no está a la vista
  new IntersectionObserver(([e]) => {
    if (playBtn.getAttribute("aria-pressed") !== "true") return;
    if (e.isIntersecting) { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
    else video.pause();
  }, { threshold: 0.05 }).observe($(".hero"));

  // Leyenda sincronizada con el lugar que aparece en el video
  const caps = DATA.heroCaptions;
  const capBox = $("[data-cap]"), capName = $("#capName"), capNote = $("#capNote");
  let capIdx = 0;
  video.addEventListener("timeupdate", () => {
    const t = video.currentTime;
    let i = 0;
    for (let k = 0; k < caps.length; k++) if (t >= caps[k].t) i = k;
    if (i === capIdx) return;
    capIdx = i;
    capBox.style.opacity = 0;
    setTimeout(() => {
      capName.textContent = caps[i].name;
      capNote.textContent = caps[i].note;
      capBox.style.opacity = 1;
    }, 300);
  });

  window.__recVideo = (t) => {
    const d = isFinite(video.duration) && video.duration > 0 ? video.duration : 24;
    return (((t % d) + d) % d) + 1 / 120;
  };

  /* ----- inicio ----- */
  function start() {
    tl.forEach((a) => a.cancel());
    tl = build();
    if (reduceMQ.matches) { tl.forEach((a) => a.finish()); unlock(); return; }
    if (location.hash && location.hash !== "#top") { settle(); return; }
    open();
    if (REC) setTimeout(collapse, 4900);
  }
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, wait(2500)]).then(start);

  /* =======================================================
     BARRA FIJA
     ======================================================= */
  const bar = $("#bar");
  const hero = $(".hero");
  new IntersectionObserver(([e]) => {
    const on = !e.isIntersecting;
    bar.classList.toggle("is-on", on);
    bar.setAttribute("aria-hidden", String(!on));
    $$("a, button", bar).forEach((a) => (on ? a.removeAttribute("tabindex") : a.setAttribute("tabindex", "-1")));
    toTop.hidden = !on;
  }, { rootMargin: "-30% 0px 0px 0px" }).observe(hero);

  /* ----- sección activa en la barra ----- */
  const barLinks = $$("#bar ul a");
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      barLinks.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + e.target.id)));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["huanuco", "destinos", "experiencias", "planifica", "preguntas", "contacto"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionIO.observe(el);
  });

  /* ----- volver arriba ----- */
  const toTop = $("#toTop");
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMQ.matches ? "auto" : "smooth" });
    $(".nav a").focus({ preventScroll: true });
  });

  /* ----- menú móvil ----- */
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) $(".menu__close", menu).focus();
    else menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener("click", () => setMenu(true));
  menu.addEventListener("click", (e) => {
    if (e.target === menu || e.target.closest("[data-menu-close]")) setMenu(false);
    else if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (menu.hidden) return;
    if (e.key === "Escape") { setMenu(false); return; }
    if (e.key === "Tab") { // mantiene el foco dentro del menú
      const items = $$("a, button", menu);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ----- los enlaces internos siempre funcionan, incluso durante la apertura ----- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.closest("dialog")) return;
    const id = a.getAttribute("href").slice(1);
    const target = id === "top" ? hero : document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (busy) settle();
    unlock();
    target.scrollIntoView({ behavior: reduceMQ.matches ? "auto" : "smooth" });
    history.replaceState(null, "", id === "top" ? location.pathname + location.search : "#" + id);
  });

  /* =======================================================
     IMÁGENES con respaldo
     ======================================================= */
  function imgHTML(slug, alt, label) {
    if (!slug) return `<div class="ph">${esc(label || alt)}</div>`;
    return `<img src="${IMG(slug)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-fallback="${esc(label || alt)}">`;
  }
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG" || !img.dataset.fallback) return;
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = img.dataset.fallback;
    img.replaceWith(ph);
  }, true);

  $$("[data-bg]").forEach((el) => {
    const src = IMG(el.dataset.bg);
    const probe = new Image();
    probe.onload = () => (el.style.backgroundImage = `url("${src}")`);
    probe.src = src;
  });

  /* =======================================================
     DESTINOS
     ======================================================= */
  const dests = DATA.destinations;
  const cats = DATA.categories;
  const arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

  $("#cards").innerHTML = dests.map((d) => `
    <button class="card reveal" type="button" data-id="${d.id}" data-cat="${d.cat}" aria-haspopup="dialog">
      <div class="card__media">
        ${imgHTML(d.img, d.name, d.short)}
        <span class="card__tag">${esc(cats[d.cat])}</span>
        <span class="card__go" aria-hidden="true">${arrow}</span>
      </div>
      <div class="card__body">
        <p class="card__place">${esc(d.place)}</p>
        <h3 class="card__name">${esc(d.name)}</h3>
        <p class="card__line">${esc(d.line)}</p>
      </div>
    </button>`).join("");

  // Filtros
  const chips = $$(".chip");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    $$(".card").forEach((card) => {
      card.hidden = !(f === "all" || card.dataset.cat === f);
      if (!card.hidden) card.classList.add("is-in");
    });
  }));

  // Modal
  const modal = $("#modal");
  let current = 0;
  let lastFocus = null;

  function credit(slug) {
    const c = CREDITS[slug];
    if (!c) return "";
    return `Foto: ${esc(c.artist)} · <a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.license)}</a>, Wikimedia Commons`;
  }

  function fill(i) {
    current = (i + dests.length) % dests.length;
    const d = dests[current];
    $("#m-media").innerHTML = imgHTML(d.img, d.name, d.short).replace(' loading="lazy"', "") +
      (CREDITS[d.img] ? `<p class="modal__credit">${credit(d.img)}</p>` : "");
    $("#m-tag").textContent = cats[d.cat];
    $("#m-title").textContent = d.name;
    $("#m-place").textContent = d.place + ", Huánuco";
    $("#m-intro").textContent = d.intro;
    $("#m-see").innerHTML = d.see.map((s) => `<li>${esc(s)}</li>`).join("");
    $("#m-access").textContent = d.access;
    $("#m-tips").innerHTML = d.tips.map((s) => `<li>${esc(s)}</li>`).join("");
    $("#m-ask").dataset.id = d.id;
    const prev = dests[(current - 1 + dests.length) % dests.length];
    const next = dests[(current + 1) % dests.length];
    $("#m-prev-name").textContent = prev.short;
    $("#m-next-name").textContent = next.short;
    $("#m-prev").setAttribute("aria-label", "Destino anterior: " + prev.short);
    $("#m-next").setAttribute("aria-label", "Destino siguiente: " + next.short);
    $("#m-count").textContent = `${current + 1} / ${dests.length}`;
    $("#m-share span").textContent = "Copiar enlace";
    const body = $(".modal__body");
    body.scrollTop = 0;
    $(".modal__inner").scrollTop = 0;
  }

  function openModal(id) {
    const i = dests.findIndex((d) => d.id === id);
    if (i < 0) return;
    lastFocus = document.activeElement;
    fill(i);
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    requestAnimationFrame(() => { $(".modal__inner").scrollTop = 0; $(".modal__body").scrollTop = 0; });
    history.replaceState(null, "", `#destino-${id}`);
  }
  function closeModal() {
    if (modal.open) modal.close();
  }
  modal.addEventListener("close", () => {
    if (location.hash.startsWith("#destino-")) history.replaceState(null, "", "#destinos");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });
  function go(step) {
    fill(current + step);
    history.replaceState(null, "", `#destino-${dests[current].id}`);
  }
  $("#m-next").addEventListener("click", () => go(1));
  $("#m-prev").addEventListener("click", () => go(-1));
  modal.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, select")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  });
  // Deslizar en el celular para cambiar de destino
  let touchX = null;
  modal.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 70) go(dx < 0 ? 1 : -1);
  });

  // Copiar el enlace directo al destino
  $("#m-share").addEventListener("click", async () => {
    const label = $("#m-share span");
    const url = location.href.split("#")[0] + "#destino-" + dests[current].id;
    try {
      await navigator.clipboard.writeText(url);
      label.textContent = "¡Enlace copiado!";
    } catch {
      const tmp = document.createElement("textarea");
      tmp.value = url;
      tmp.setAttribute("readonly", "");
      tmp.style.cssText = "position:fixed;opacity:0";
      modal.appendChild(tmp);
      tmp.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      tmp.remove();
      label.textContent = ok ? "¡Enlace copiado!" : "No se pudo copiar";
    }
    setTimeout(() => (label.textContent = "Copiar enlace"), 2200);
  });
  $("#m-ask").addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    closeModal();
    const box = $(`#interests input[value="${id}"]`);
    if (box) box.checked = true;
    $("#contacto").scrollIntoView({ behavior: reduceMQ.matches ? "auto" : "smooth" });
    setTimeout(() => $("#f-name").focus({ preventScroll: true }), 600);
  });

  $("#cards").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModal(card.dataset.id);
  });

  // Enlace directo a un destino: #destino-kotosh
  if (location.hash.startsWith("#destino-")) {
    const id = location.hash.slice(9);
    setTimeout(() => { $("#destinos").scrollIntoView(); openModal(id); }, 50);
  }

  /* =======================================================
     EXPERIENCIAS
     ======================================================= */
  const byId = Object.fromEntries(dests.map((d) => [d.id, d]));
  $("#expList").innerHTML = DATA.experiences.map((x) => `
    <article class="exp reveal">
      <span class="exp__n">${x.n}</span>
      <div>
        <h3>${esc(x.title)}</h3>
        ${x.links.length ? `<div class="exp__links">${x.links.map((id) => `<button type="button" data-open="${id}">${esc(byId[id].short)}</button>`).join("")}</div>` : ""}
      </div>
      <p>${esc(x.text)}</p>
      <div class="exp__pill">${imgHTML(x.img, x.title, x.ph || x.title)}</div>
    </article>`).join("");
  $("#expList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) openModal(b.dataset.open);
  });

  /* =======================================================
     CONTACTO
     ======================================================= */
  $("#interests").innerHTML = dests.map((d) =>
    `<label><input type="checkbox" name="interes" value="${d.id}"><span>${esc(d.short)}</span></label>`).join("");

  const form = $("#form");
  const rules = [
    ["#f-name", "#e-name", (v) => v.trim().length >= 2, "Escribe tu nombre."],
    ["#f-email", "#e-email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), "Escribe un correo válido."],
    ["#f-msg", "#e-msg", (v) => v.trim().length >= 10, "Cuéntanos un poco más (mínimo 10 caracteres)."]
  ];
  function check(rule) {
    const [inp, err, ok, msg] = rule;
    const el = $(inp);
    const valid = ok(el.value);
    el.setAttribute("aria-invalid", String(!valid));
    el.setAttribute("aria-describedby", err.slice(1));
    $(err).textContent = valid ? "" : msg;
    return valid;
  }
  rules.forEach((r) => $(r[0]).addEventListener("blur", () => { if ($(r[0]).value) check(r); }));

  /* Envío por FormSubmit (https://formsubmit.co): reenvía cada consulta
     al correo de CONTACT_EMAIL. La primera vez, FormSubmit manda un correo
     de activación a esa dirección y hay que confirmarlo una sola vez.
     Después puedes reemplazar el correo por el alias aleatorio que
     FormSubmit te envía, para no exponer tu dirección en el código
     (cámbialo aquí y en el atributo action del formulario en index.html). */
  const CONTACT_EMAIL = "leonelchamorrocajahuaman1@gmail.com";
  const ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;
  const submitBtn = $("button[type=submit]", form);
  const okBox = $("#formOk");

  function say(html, isError) {
    okBox.innerHTML = html;
    okBox.classList.add("is-on");
    okBox.classList.toggle("is-error", !!isError);
    okBox.focus();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const results = rules.map(check);
    if (results.includes(false)) {
      $(rules[results.indexOf(false)][0]).focus();
      return;
    }
    const fd = new FormData(form);
    if (fd.get("_honey")) return; // trampa para bots
    const ids = fd.getAll("interes");
    const nombre = fd.get("nombre").trim();
    const correo = fd.get("email").trim();
    const payload = {
      "Nombre": nombre,
      "Correo": correo,
      "Viaja desde": fd.get("origen") || "No indicado",
      "Fecha aproximada": fd.get("fecha") || "No indicada",
      "Destinos de interés": ids.length ? ids.map((id) => byId[id].name).join(", ") : "No indicados",
      "Mensaje": fd.get("mensaje").trim(),
      _subject: "Nueva consulta turística de " + nombre + " · WILD Huánuco",
      _replyto: correo,
      _template: "table",
      _captcha: "false"
    };

    const label = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";
    okBox.classList.remove("is-on");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "HTTP " + res.status);
      const picks = ids.map((id) => byId[id].short);
      say(esc(`¡Gracias, ${nombre.split(" ")[0]}! Recibimos tu consulta${picks.length ? ` sobre ${picks.join(", ")}` : ""}. Te escribiremos pronto para ayudarte a descubrir Huánuco.`));
      form.reset();
      $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
    } catch (err) {
      console.warn("Formulario de contacto:", err);
      const body = Object.entries(payload)
        .filter(([k]) => !k.startsWith("_"))
        .map(([k, v]) => k + ": " + v)
        .join("\n");
      const mailto = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(payload._subject) + "&body=" + encodeURIComponent(body);
      say(`No pudimos enviar tu consulta en este momento. <a href="${esc(mailto)}">Envíala por correo</a> o inténtalo de nuevo en unos minutos.`, true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = label;
    }
  });

  /* =======================================================
     CRÉDITOS · AÑO · REVEAL
     ======================================================= */
  $("#credits").innerHTML = Object.entries(CREDITS).map(([, c]) =>
    `<li>${esc(c.title.replace(/\.jpg$/i, ""))} — ${esc(c.artist)}, <a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.license)}</a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
})();
