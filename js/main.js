/* =====================================================================
 *  PORTFOLIO CONTROLLER — Abd Al-Rahman Ahmad
 *  Zero-dependency bilingual (EN/AR) interactive controller built on
 *  modern baseline Web APIs with graceful progressive enhancement.
 * ===================================================================== */

(() => {
  "use strict";

  const BASE = window.PORTFOLIO;
  const I18N = window.PORTFOLIO_I18N || {};
  if (!BASE) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isReducedMotion = () => reducedMotionQuery.matches;
  const supportsHoverTilt = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const esc = (str) =>
    String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const getPath = (obj, path) =>
    String(path || "")
      .split(".")
      .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

  /* ---------------- Inline SVG Icon Registry ---------------- */
  const SVG_PATHS = {
    sites:
      '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    debug:
      '<path d="M9 9V6a3 3 0 0 1 6 0v3"/><rect x="6" y="9" width="12" height="11" rx="5"/><path d="M3 13h3M18 13h3M4 8l2.5 2M20 8l-2.5 2M4 18l2.5-1.5M20 18l-2.5-1.5M12 9v11"/>',
    workspace:
      '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="m10 12-2 2 2 2M14 12l2 2-2 2"/>',
    database:
      '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>',
    ssh:
      '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 9 3 3-3 3M12 15h5"/>',
    cloud:
      '<path d="M17.5 19H7a4.5 4.5 0 0 1-.4-8.98A6 6 0 0 1 18 11.5 3.75 3.75 0 0 1 17.5 19Z"/>',
    ai:
      '<path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/>',
    ux:
      '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    shield:
      '<path d="M12 3 4 6.5v5.5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6.5L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    bag:
      '<path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    brain:
      '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M10 10h4v4h-4z"/>',
    target:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    scan:
      '<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><rect x="7" y="8" width="10" height="8" rx="1.5"/><path d="M10 11h4M10 13.5h2.5"/>',
    layers:
      '<path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
    server:
      '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><circle cx="7" cy="7.5" r="1" fill="currentColor"/><circle cx="7" cy="16.5" r="1" fill="currentColor"/>',
    smartphone:
      '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 18h4"/>',
    gitBranch:
      '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="8" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M6 8.5v7M8.5 6H13a5 5 0 0 1 5 2"/>',
    graduationCap:
      '<path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11.5v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
    award:
      '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5L16.5 21l-1-9"/>',
    users:
      '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 19.5c0-3 2.9-5 6.5-5s6.5 2 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.5c2.5.4 4.5 2 4.5 4.5"/>',
    zap:
      '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    github:
      '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor" stroke="none"/>',
    linkedin:
      '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-4a2 2 0 0 1 4 0v4M11.5 10.5v6"/>',
    mail:
      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    external:
      '<path d="M14 4h6v6M10 14 20 4M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    lock:
      '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    copy:
      '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    search:
      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    star:
      '<path d="m12 3 2.6 5.3 5.9.8-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.8L12 3Z"/>',
    check:
      '<path d="m5 12 4.5 4.5L19 7"/>',
  };

  function iconSvg(name, size = 18, extraClass = "") {
    const body = SVG_PATHS[name] || SVG_PATHS.layers;
    const cls = extraClass ? ` class="${extraClass}"` : "";
    return `<svg${cls} viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  /* ---------------- Application State ---------------- */
  let currentLang = document.documentElement.lang === "ar" ? "ar" : "en";
  let currentDeckTab = "topology";
  let currentCodeMode = "json";
  let currentOsIdx = 0;
  let currentModId = BASE.laravelDev?.modules?.[0]?.id || "sites";
  let ldSearchQuery = "";
  let currentProjCat = "all";
  let currentSkillGroupKey = "all"; // "all" or canonical BASE.skills group name

  /* ---------------- Dictionary & Merged View Helpers ---------------- */
  function dict(lang = currentLang) {
    return I18N[lang] || I18N.en || {};
  }

  function getData(lang = currentLang) {
    const d = dict(lang);
    const ar = lang === "ar" ? d.data || {} : {};
    const ldBase = BASE.laravelDev;
    const arMods = ar.laravelDevModules || {};

    return {
      ...BASE,
      name: ar.name || BASE.name,
      shortName: ar.shortName || BASE.shortName,
      title: ar.title || BASE.title,
      location: ar.location || BASE.location,
      roles: ar.roles || BASE.roles,
      stats: ar.stats || BASE.stats,
      about: ar.about || BASE.about,
      aboutTags: ar.aboutTags || BASE.aboutTags,
      education: ar.education || BASE.education,
      services: BASE.services.map((s, idx) => ({
        ...s,
        title: ar.services?.[idx]?.title || s.title,
        text: ar.services?.[idx]?.text || s.text,
      })),
      laravelDev: {
        ...ldBase,
        tagline: ar.laravelDevTagline || ldBase.tagline,
        platforms: ar.laravelDevPlatforms || ldBase.platforms,
        modules: ldBase.modules.map((m) => ({
          ...m,
          label: arMods[m.id]?.label || m.label,
          summary: arMods[m.id]?.summary || m.summary,
        })),
      },
      projects: BASE.projects.map((p) => {
        const lp = ar.projects?.[p.id];
        if (!lp) return p;
        return {
          ...p,
          title: lp.title || p.title,
          badge: lp.badge || p.badge,
          description: lp.description || p.description,
          features: lp.features || p.features,
          architecture: {
            ...p.architecture,
            challenge: lp.challenge || p.architecture?.challenge,
            solution: lp.solution || p.architecture?.solution,
          },
        };
      }),
      experience: BASE.experience.map((job, idx) => ({
        ...job,
        ...(ar.experience?.[idx] || {}),
        tech: job.tech,
      })),
    };
  }

  /* ---------------- Accessible Toast Notification ---------------- */
  let toastTimer = null;
  let lastToastMsg = "";

  function showToast(message) {
    const toast = $("#toast");
    if (!toast || !message) return;
    // Append a non-breaking space when repeating identically so VoiceOver re-announces.
    const nextMsg = message === lastToastMsg ? `${message}\u00A0` : message;
    lastToastMsg = nextMsg;
    toast.textContent = nextMsg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  async function copyText(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        // Ignore fallback copy failures
      }
      area.remove();
    }
    if (successMessage) showToast(successMessage);
  }

  /* ---------------- Native Top-Layer Dialog Helpers ---------------- */
  const canTransitionDisplay =
    typeof CSS !== "undefined" &&
    CSS.supports?.("transition-behavior", "allow-discrete") &&
    "transitionBehavior" in document.documentElement.style;

  const closingListeners = new WeakMap();

  function openDialog(dlg) {
    if (!dlg) return;
    dlg.removeAttribute("data-closing");
    if (!dlg.open) dlg.showModal();
  }

  function closeTopLayer(dlg) {
    if (!dlg || !dlg.open) return;
    if (!canTransitionDisplay || isReducedMotion()) {
      dlg.removeAttribute("data-closing");
      dlg.close();
      return;
    }
    if (dlg.hasAttribute("data-closing")) return;
    dlg.setAttribute("data-closing", "");

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      dlg.removeEventListener("transitionend", onEnd);
      clearTimeout(fallbackTimer);
      dlg.removeAttribute("data-closing");
      if (dlg.open) dlg.close();
    };
    const onEnd = (e) => {
      if (e.target === dlg) finish();
    };
    dlg.addEventListener("transitionend", onEnd);
    const fallbackTimer = setTimeout(finish, 340);
    closingListeners.set(dlg, finish);
  }

  function outsideDialog(e, dlg) {
    const r = dlg.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  }

  function initDialogs() {
    const dialogs = [$("#cmdDialog"), $("#projectDialog"), $("#mobileDrawer")].filter(Boolean);
    const supportsClosedBy = "closedBy" in HTMLDialogElement.prototype;

    dialogs.forEach((dlg) => {
      // Intercept Escape / native cancel so exit animation completes cleanly.
      dlg.addEventListener("cancel", (e) => {
        if (canTransitionDisplay && !isReducedMotion()) {
          e.preventDefault();
          closeTopLayer(dlg);
        }
      });

      // Sync aria-expanded if mobileDrawer closes via Esc / native close
      if (dlg.id === "mobileDrawer") {
        dlg.addEventListener("close", () => {
          $("#menuOpenBtn")?.setAttribute("aria-expanded", "false");
        });
      }

      // Light-dismiss polyfill for browsers without native closedby="any"
      if (!supportsClosedBy) {
        let downOutside = false;
        dlg.addEventListener("pointerdown", (e) => {
          downOutside = e.target === dlg && outsideDialog(e, dlg);
        });
        dlg.addEventListener("pointerup", (e) => {
          if (downOutside && e.target === dlg && outsideDialog(e, dlg)) {
            closeTopLayer(dlg);
          }
          downOutside = false;
        });
      }
    });
  }

  /* ---------------- Roving-Tabindex Tablist Utility ---------------- */
  function attachTabKeyboardNav(container, selector, options = {}) {
    if (!container) return;
    const { vertical = false, onSelect } = options;

    container.addEventListener("keydown", (e) => {
      const btn = e.target.closest(selector);
      if (!btn || !container.contains(btn)) return;

      const items = $$(selector, container);
      if (!items.length) return;
      const idx = items.indexOf(btn);
      const isRtl = document.documentElement.dir === "rtl";

      let nextIdx = -1;
      if (e.key === "Home") {
        nextIdx = 0;
      } else if (e.key === "End") {
        nextIdx = items.length - 1;
      } else if (e.key === "ArrowRight") {
        nextIdx = (idx + (isRtl ? -1 : 1) + items.length) % items.length;
      } else if (e.key === "ArrowLeft") {
        nextIdx = (idx + (isRtl ? 1 : -1) + items.length) % items.length;
      } else if (vertical && e.key === "ArrowDown") {
        nextIdx = (idx + 1) % items.length;
      } else if (vertical && e.key === "ArrowUp") {
        nextIdx = (idx - 1 + items.length) % items.length;
      }

      if (nextIdx === -1) return;
      e.preventDefault();
      const target = items[nextIdx];
      target.focus();
      target.scrollIntoView({ block: "nearest", inline: "nearest" });
      if (onSelect) onSelect(target);
    });
  }

  /* ---------------- View Transition Wrapper ---------------- */
  function withScopedTransition(el, fn) {
    if (!el || isReducedMotion()) {
      fn();
      return;
    }
    if (typeof el.startViewTransition === "function") {
      el.startViewTransition(() => fn());
      return;
    }
    fn();
  }

  function withDocumentTransition(fn) {
    if (isReducedMotion() || typeof document.startViewTransition !== "function") {
      fn();
      return;
    }
    document.startViewTransition(() => fn());
  }

  /* ---------------- Card Reactive Specular Glow & 3D Tilt ---------------- */
  let pointerEventsBound = false;

  function enhanceInteractiveCards() {
    if (pointerEventsBound) return;
    pointerEventsBound = true;
    const canHover = supportsHoverTilt();

    document.addEventListener(
      "pointermove",
      (e) => {
        if (!canHover) return;
        const card = e.target.closest(".card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);

        if (card.classList.contains("project") && !isReducedMotion()) {
          const rx = ((rect.height / 2 - y) / rect.height) * 3.5;
          const ry = ((x - rect.width / 2) / rect.width) * 3.5;
          card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        }
      },
      { passive: true }
    );

    document.addEventListener("pointerout", (e) => {
      const card = e.target.closest?.(".card.project");
      if (!card) return;
      if (!card.contains(e.relatedTarget)) {
        card.style.transform = "";
      }
    });
  }

  /* ---------------- Offline / Broken Skill Image Fallback ---------------- */
  const TECH_BADGE_MAP = {
    php: "PHP",
    laravel: "LVL",
    "laravel blade": "BLD",
    python: "PY",
    django: "DJ",
    "django 5": "DJ5",
    redis: "RDS",
    flutter: "FLT",
    dart: "DART",
    vue: "VUE",
    "vue.js": "VUE",
    nuxtjs: "NUXT",
    "nuxt.js": "NUXT",
    tailwind: "TW",
    "tailwind css": "TW",
    linux: "LNX",
    "linux admin": "LNX",
    nginx: "NGX",
    docker: "DCK",
    bash: "SH",
    "github actions ci/cd": "CI/CD",
    "cloudflare workers/tunnels": "CF",
    "firebase (fcm)": "FCM",
    mysql: "SQL",
    postgresql: "PG",
    sqlite: "LITE",
  };

  function toTechBadge(raw) {
    const clean = String(raw || "Tech").trim();
    return TECH_BADGE_MAP[clean.toLowerCase()] || clean.slice(0, 4).toUpperCase();
  }

  function initSkillImageFallbacks() {
    document.addEventListener(
      "error",
      (e) => {
        const img = e.target;
        if (!(img instanceof HTMLImageElement)) return;
        if (!img.closest("#skillsGrid, #servicesGrid")) return;

        const label = img.dataset.fallback || img.alt || "Tech";
        const chip = document.createElement("div");
        chip.className = img.closest("#servicesGrid") ? "service-glyph" : "skill-badge";
        chip.textContent = toTechBadge(label);
        chip.setAttribute("aria-hidden", "true");
        img.replaceWith(chip);
      },
      true
    );
  }

  /* ---------------- Hero Telemetry Deck ---------------- */
  function renderHeroDeck(tabId = currentDeckTab) {
    currentDeckTab = tabId;
    const data = getData();
    const d = dict();
    const isAr = currentLang === "ar";
    const tabsEl = $("#deckTabs");
    const panel = $("#deckPanel");
    if (!tabsEl || !panel) return;

    const consoleTabs = d.hero?.consoleTabs || [
      { id: "topology", label: "Architecture" },
      { id: "sadd", label: "SADD Engine" },
      { id: "ld", label: "Laravel Dev" },
    ];

    tabsEl.innerHTML = consoleTabs
      .map((tab) => {
        const selected = tab.id === currentDeckTab;
        return `<button type="button" class="deck-tab" role="tab" id="deck-tab-${tab.id}" data-deck="${tab.id}" aria-selected="${selected}" ${
          selected ? "" : 'tabindex="-1"'
        }>${esc(tab.label)}</button>`;
      })
      .join("");

    panel.setAttribute("aria-labelledby", `deck-tab-${currentDeckTab}`);

    if (currentDeckTab === "topology") {
      panel.innerHTML = `
        <div class="topo-wrap">
          <div class="topo-col">
            <div class="topo-node">
              <span class="topo-node-k">${isAr ? "الأنظمة الخلفية" : "BACK-END CORE"}</span>
              <span class="topo-node-v">Laravel · Django 5</span>
              <span class="topo-node-s">${isAr ? "تعدد المستأجرين + RBAC" : "Multi-Tenant RBAC & APIs"}</span>
            </div>
            <div class="topo-node">
              <span class="topo-node-k">${isAr ? "الواجهات والموبايل" : "EDGE & MOBILE"}</span>
              <span class="topo-node-v">Flutter · Nuxt.js</span>
              <span class="topo-node-s">${isAr ? "Cloudflare Workers + RTL" : "Workers + Native RTL/LTR"}</span>
            </div>
          </div>

          <div class="topo-core" aria-label="${esc(data.name)}"><span>${esc(BASE.initials)}</span></div>

          <div class="topo-col">
            <div class="topo-node">
              <span class="topo-node-k">${isAr ? "الذكاء الاصطناعي والأمن" : "AI & APPSEC"}</span>
              <span class="topo-node-v">Gemini · GPT-4o</span>
              <span class="topo-node-s">${isAr ? "+15 أداة فحص معزولة" : "15+ Sandboxed Scanners"}</span>
            </div>
            <div class="topo-node">
              <span class="topo-node-k">${isAr ? "البيانات والتوسع" : "DATA & SCALE"}</span>
              <span class="topo-node-v">MariaDB · Redis</span>
              <span class="topo-node-s">${isAr ? "Master-Slave · +1M مستخدم" : "Replication · 1M+ Users"}</span>
            </div>
          </div>
        </div>
        <div class="deck-foot-strip">
          <span><strong dir="ltr">Laravel Dev ${esc(BASE.laravelDev.version)}</strong> · ${isAr ? "8 وحدات · 29 مدير CLI" : "8 Modules · 29 CLI Managers"}</span>
          <span>${isAr ? "المقياس:" : "Scale:"} <strong dir="ltr">1M+</strong> · <span dir="ltr">GPA <strong>89%</strong></span></span>
        </div>
      `;
    } else if (currentDeckTab === "sadd") {
      const stages = BASE.projects.find((p) => p.id === "sadd")?.architecture?.pipeline || [];
      panel.innerHTML = `
        <div class="sim-head">
          <span>sadd.roayatalmostaqbal.net</span>
          <span class="sim-pill">DJANGO 5 · CELERY · SSE</span>
        </div>
        <div class="sim-steps">
          ${stages
            .map(
              (s, idx) => `
            <div class="sim-step">
              <span class="sim-idx">0${idx + 1}</span>
              <span class="sim-name">${esc(s.title)}</span>
              <span class="sim-meta">${esc(s.detail)}</span>
            </div>`
            )
            .join("")}
        </div>
        <div class="deck-foot-strip">
          <span>TOTP MFA + SHA-256 Audit</span>
          <span><strong>EN / AR</strong> Executive PDF</span>
        </div>
      `;
    } else {
      panel.innerHTML = `
        <div class="sim-head">
          <span>laravel-dev ${esc(BASE.laravelDev.version)} · mcp</span>
          <span class="sim-pill amber">JSON-RPC 2.0</span>
        </div>
        <pre class="sim-code" dir="ltr"><code><span class="tk-key">$</span> laravel-dev <span class="tk-str">site:create</span> shop --nginx --ssl
<span class="tk-key">✓</span> https://shop.test mapped via mkcert + PHP 8.4
<span class="tk-key">$</span> laravel-dev <span class="tk-str">mcp</span> --stdio
<span class="tk-key">→</span> Exposing <span class="tk-num">22</span> workspace &amp; profiler tools to IDE agent
<span class="tk-key">$</span> laravel-dev <span class="tk-str">timemachine</span> snapshot pre-deploy
<span class="tk-key">✓</span> Stored .env + DB dump + public assets (<span class="tk-num">142ms</span>)</code></pre>
        <div class="deck-foot-strip">
          <span>Navicat DB + TCP :9912</span>
          <span><strong>29</strong> Bash Modules · GTK3/WebKit2</span>
        </div>
      `;
    }
  }

  /* ---------------- Static Social Links ---------------- */
  function renderSocials() {
    const d = dict();
    const { contact } = BASE;
    const links = [
      { label: "GitHub", href: contact.github, icon: "github", external: true },
      { label: "LinkedIn", href: contact.linkedin, icon: "linkedin", external: true },
      { label: d.sections?.contact?.emailBtn || "Email", href: `mailto:${contact.email}`, icon: "mail", external: false },
    ];
    const html = links
      .map(
        (l) => `
      <a href="${esc(l.href)}"${l.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>
        ${iconSvg(l.icon, 16)}
        <span>${esc(l.label)}</span>
      </a>`
      )
      .join("");

    ["#heroSocials", "#contactSocials"].forEach((sel) => {
      const box = $(sel);
      if (box) box.innerHTML = html;
    });
  }

  /* ---------------- Stats & Counter Animation ---------------- */
  let statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;
    statsAnimated = true;
    $$("#stats b[data-count]").forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || "";
      if (isReducedMotion()) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = 950;
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function renderStats() {
    const data = getData();
    const icons = ["users", "zap", "shield", "award"];
    const grid = $("#stats");
    if (!grid) return;

    grid.innerHTML = data.stats
      .map(
        (s, idx) => `
      <div class="stat">
        <div class="stat-icon">${iconSvg(icons[idx % icons.length], 17)}</div>
        <b data-count="${esc(s.value)}" data-suffix="${esc(s.suffix)}">${
          statsAnimated || isReducedMotion() ? `${esc(s.value)}${esc(s.suffix)}` : `0${esc(s.suffix)}`
        }</b>
        <span>${esc(s.label)}</span>
      </div>`
      )
      .join("");
  }

  /* ---------------- About & Code Blueprint ---------------- */
  function getProfileSnippetPlain() {
    if (currentCodeMode === "yaml") {
      return `engineer: "Abd Al-Rahman Ahmad"
role: "Back-End Software Engineer & Technical Lead"
location: "Amman, Jordan"
education:
  degree: "B.Sc. Information Security & Networks"
  gpa: "89%"
credentials:
  - "Google Crash Course on Python (92.5%)"
languages:
  - Arabic (Native)
  - English (Fluent)
production_scale:
  ecommerce_users: "1,000,000+"
  security_scanners: "15+ containers (SADD SaaS)"
  api_speedup: "~40% via indexing & replication"
open_source:
  project: "Laravel Dev v2.5.0"
  modules: 8
  cli_managers: 29`;
    }

    return JSON.stringify(
      {
        name: BASE.name,
        role: BASE.title,
        location: BASE.location,
        education: {
          degree: "B.Sc. InfoSec & Networks",
          gpa: "89%",
        },
        credentials: ["Google Python (92.5%)"],
        languages: ["Arabic (Native)", "English (Fluent)"],
        highlights: {
          scale: "1M+ users · 4-dev lead",
          securitySaaS: "SADD (15+ DAST/SAST scanners + Gemini)",
          openSource: "Laravel Dev v2.5.0 (8 modules, MCP server)",
        },
      },
      null,
      2
    );
  }

  function highlightCodeSnippet(raw, mode) {
    return esc(raw)
      .split("\n")
      .map((line) => {
        if (mode === "yaml") {
          return line
            .replace(/^(\s*[a-zA-Z0-9_-]+)(:)/, '<span class="tk-key">$1</span>$2')
            .replace(/(&quot;[^&]*&quot;)/g, '<span class="tk-str">$1</span>')
            .replace(/:\s(\d+)(?=\s*$)/, ': <span class="tk-num">$1</span>');
        }
        return line
          .replace(/(&quot;[a-zA-Z0-9_]+&quot;)(:)/g, '<span class="tk-key">$1</span>$2')
          .replace(/(:\s*)(&quot;[^&]*&quot;)/g, '$1<span class="tk-str">$2</span>');
      })
      .join("\n");
  }

  function renderAbout() {
    const data = getData();
    const aboutEl = $("#aboutText");
    const tagsEl = $("#aboutTags");
    const codeEl = $("#codeProfile");

    if (aboutEl) {
      aboutEl.innerHTML = data.about.map((p) => `<p>${esc(p)}</p>`).join("");
    }
    if (tagsEl) {
      tagsEl.innerHTML = data.aboutTags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join("");
    }
    if (codeEl) {
      codeEl.innerHTML = highlightCodeSnippet(getProfileSnippetPlain(), currentCodeMode);
    }

    $$(".code-mode-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.mode === currentCodeMode));
    });
  }

  function renderEducation() {
    const data = getData();
    const grid = $("#eduGrid");
    if (!grid) return;
    const icons = ["graduationCap", "award"];

    grid.innerHTML = data.education
      .map(
        (ed, i) => `
      <article class="card edu-card">
        <div class="edu-left">
          <div class="edu-icon">${iconSvg(icons[i % icons.length], 22)}</div>
          <div>
            <span class="edu-badge">${esc(ed.badge)}</span>
            <h3>${esc(ed.title)}</h3>
            <p class="edu-org">${esc(ed.org)}</p>
          </div>
        </div>
        <span class="edu-score">${esc(ed.score)}</span>
      </article>`
      )
      .join("");
  }

  /* ---------------- Core Expertise / Services ---------------- */
  function renderServices() {
    const data = getData();
    const grid = $("#servicesGrid");
    if (!grid) return;
    const glyphIcons = ["server", "shield", "smartphone", "gitBranch"];

    grid.innerHTML = data.services
      .map(
        (s, idx) => `
      <article class="card service reveal" style="--d:${(idx * 0.06).toFixed(2)}s">
        <div class="service-top">
          <div class="service-glyph">${iconSvg(glyphIcons[idx % glyphIcons.length], 22)}</div>
          <div class="icons">
            ${s.icons
              .map(
                (ic) =>
                  `<img src="https://skillicons.dev/icons?i=${encodeURIComponent(ic)}" alt="" data-fallback="${esc(ic)}" width="30" height="30" loading="lazy" decoding="async" />`
              )
              .join("")}
          </div>
        </div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </article>`
      )
      .join("");
  }

  /* ---------------- Flagship Laravel Dev Workbench ---------------- */
  function getFilteredModuleMatches(ld, query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const hits = [];
    ld.modules.forEach((mod) => {
      const modMatch = `${mod.label} ${mod.summary}`.toLowerCase().includes(q);
      mod.features.forEach((feat) => {
        if (modMatch || `${feat.name} ${feat.desc}`.toLowerCase().includes(q)) {
          hits.push({ ...feat, moduleLabel: mod.label, moduleId: mod.id });
        }
      });
    });
    return hits;
  }

  function renderLaravelDevPanel() {
    const data = getData();
    const ld = data.laravelDev;
    const panel = $("#ldModPanel");
    if (!panel) return;

    const activeMod = ld.modules.find((m) => m.id === currentModId) || ld.modules[0];
    const searchHits = getFilteredModuleMatches(ld, ldSearchQuery);

    if (searchHits !== null) {
      const isAr = currentLang === "ar";
      panel.setAttribute("aria-labelledby", `ld-mod-${activeMod.id}`);
      panel.innerHTML = `
        <div class="sp-panel-head">
          <h4>${isAr ? `نتائج البحث (${searchHits.length})` : `Filtered Features (${searchHits.length})`}</h4>
          <p>${isAr ? `الميزات المطابقة لعبارة "${esc(ldSearchQuery)}" عبر جميع الوحدات الـ 8:` : `Matching capabilities for "${esc(ldSearchQuery)}" across all 8 modules:`}</p>
        </div>
        <div class="sp-feats">
          ${
            searchHits.length
              ? searchHits
                  .map(
                    (f) => `
              <div class="sp-feat">
                <b>${esc(f.name)}</b>
                <span>${esc(f.desc)}</span>
              </div>`
                  )
                  .join("")
              : `<div class="sp-feat"><b>${isAr ? "لا توجد نتائج" : "No matches"}</b><span>${
                  isAr ? "جرّب البحث عن MCP أو SSL أو Navicat أو SSH" : "Try filtering for MCP, SSL, Navicat, SSH, or Horizon."
                }</span></div>`
          }
        </div>
      `;
      return;
    }

    panel.setAttribute("aria-labelledby", `ld-mod-${activeMod.id}`);
    panel.innerHTML = `
      <div class="sp-panel-head">
        <h4>${esc(activeMod.label)}</h4>
        <p>${esc(activeMod.summary)}</p>
      </div>
      <div class="sp-feats">
        ${activeMod.features
          .map(
            (f) => `
          <div class="sp-feat">
            <b>${esc(f.name)}</b>
            <span>${esc(f.desc)}</span>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  function syncLaravelDevModuleTabs() {
    const tabsEl = $("#ldModTabs");
    if (!tabsEl) return;
    $$(".sp-mod-btn", tabsEl).forEach((btn) => {
      const selected = btn.dataset.mod === currentModId;
      btn.setAttribute("aria-selected", String(selected));
      if (selected) {
        btn.removeAttribute("tabindex");
      } else {
        btn.setAttribute("tabindex", "-1");
      }
    });
  }

  function renderLaravelDev() {
    const box = $("#laravelDevBox");
    if (!box) return;
    const data = getData();
    const d = dict();
    const ldD = d.laravelDev || {};
    const ld = data.laravelDev;
    const activeInstall = ld.installCmds[currentOsIdx] || ld.installCmds[0];

    box.innerHTML = `
      <div class="sp-window-bar">
        <div class="code-dots" aria-hidden="true"><i></i><i></i><i></i></div>
        <span class="sp-window-title">laravel-dev ${esc(ld.version)} — desktop &amp; cli cockpit</span>
      </div>
      <div class="sp-inner">
        <div class="sp-top">
          <div class="sp-title-wrap">
            <div class="sp-badges">
              <span class="sp-ver">${esc(ld.version)} · ${esc(ldD.releaseBadge || "Public Release")}</span>
              ${ld.platforms.map((pl) => `<span class="sp-os">${esc(pl)}</span>`).join("")}
            </div>
            <h3>
              ${iconSvg("ssh", 26)}
              <span>${esc(ld.name)}</span>
            </h3>
            <p>${esc(ld.tagline)}</p>
          </div>

          <div class="sp-actions">
            <a class="btn btn-primary btn-sm" id="repoUrl" href="${esc(ld.repoUrl)}" target="_blank" rel="noopener noreferrer">
              ${iconSvg("github", 16)}
              <span>${esc(ldD.repoBtn || "Public GitHub Repo")}</span>
            </a>
            <a class="btn btn-ghost btn-sm" id="releasesUrl" href="${esc(ld.releasesUrl)}" target="_blank" rel="noopener noreferrer">
              ${iconSvg("external", 15)}
              <span>${esc(ldD.releasesBtn || "Installers & Releases")}</span>
            </a>
          </div>
        </div>

        <div class="sp-controls-row">
          <div class="sp-install">
            <div class="sp-os-tabs" role="group" aria-label="Installer OS">
              ${ld.installCmds
                .map(
                  (c, idx) =>
                    `<button type="button" class="sp-os-btn" data-os-idx="${idx}" aria-pressed="${idx === currentOsIdx}">${esc(c.os)}</button>`
                )
                .join("")}
            </div>
            <code class="sp-cmd" id="ldInstallCmd" dir="ltr">${esc(activeInstall.cmd)}</code>
            <button type="button" class="btn btn-ghost btn-sm" id="ldCopyCmd" aria-label="Copy install command">
              ${iconSvg("copy", 14)}
              <span>${esc(ldD.copyBtn || "Copy")}</span>
            </button>
          </div>

          <div class="sp-search-wrap">
            ${iconSvg("search", 16)}
            <input
              type="search"
              id="ldSearchInput"
              class="sp-search"
              value="${esc(ldSearchQuery)}"
              placeholder="${esc(ldD.searchPlaceholder || "Filter modules or features...")}"
              aria-label="${esc(ldD.searchPlaceholder || "Filter modules or features")}"
            />
          </div>
        </div>

        <div class="sp-explorer">
          <div class="sp-nav" role="tablist" aria-label="Laravel Dev modules" id="ldModTabs">
            ${ld.modules
              .map((m) => {
                const selected = m.id === currentModId;
                return `
                  <button
                    type="button"
                    class="sp-mod-btn"
                    role="tab"
                    id="ld-mod-${esc(m.id)}"
                    data-mod="${esc(m.id)}"
                    aria-selected="${selected}"
                    ${selected ? "" : 'tabindex="-1"'}
                  >
                    <span class="sp-mod-icon">${iconSvg(m.id, 17)}</span>
                    <span>${esc(m.label)}</span>
                    <span class="sp-mod-count">${m.features.length}</span>
                  </button>`;
              })
              .join("")}
          </div>

          <div class="sp-panel" id="ldModPanel" role="tabpanel" tabindex="0"></div>
        </div>

        <div class="sp-tech-row">
          ${ld.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
        </div>
      </div>
    `;

    renderLaravelDevPanel();

    attachTabKeyboardNav($("#ldModTabs"), ".sp-mod-btn", {
      vertical: true,
      onSelect: (btn) => {
        currentModId = btn.dataset.mod;
        ldSearchQuery = "";
        const searchEl = $("#ldSearchInput");
        if (searchEl) searchEl.value = "";
        syncLaravelDevModuleTabs();
        renderLaravelDevPanel();
      },
    });
  }

  /* ---------------- Projects & Case Study Modal ---------------- */
  const PROJECT_CATS = ["all", "security", "web", "mobile", "hackathon"];

  function getFilteredProjects(cat = currentProjCat) {
    const data = getData();
    return cat === "all" ? data.projects : data.projects.filter((p) => p.category.includes(cat));
  }

  function renderProjectFilters() {
    const box = $("#projectFilters");
    if (!box) return;
    const d = dict();
    const catLabels = d.projects?.catLabels || {};

    box.innerHTML = PROJECT_CATS.map((cat) => {
      const count = cat === "all" ? BASE.projects.length : BASE.projects.filter((p) => p.category.includes(cat)).length;
      const pressed = cat === currentProjCat;
      return `
        <button type="button" class="tab" data-cat="${cat}" aria-pressed="${pressed}">
          <span>${esc(catLabels[cat] || cat)}</span>
          <span class="tab-count">${count}</span>
        </button>`;
    }).join("");
  }

  function renderProjects(animate = false) {
    const grid = $("#projectsGrid");
    if (!grid) return;
    const d = dict();
    const pStrings = d.projects || {};
    const list = getFilteredProjects(currentProjCat);

    const draw = () => {
      grid.innerHTML = list
        .map((p, idx) => {
          const isFeatured = Boolean(p.featured && currentProjCat === "all");
          const isSaddFeatured = p.id === "sadd" && isFeatured && Array.isArray(p.architecture?.pipeline);

          return `
            <article class="card project${isFeatured ? " featured" : ""}${animate ? " pop-in" : ""}" style="animation-delay:${idx * 0.05}s">
              <div class="p-head">
                <div class="p-emoji">${iconSvg(p.icon || "layers", 22)}</div>
                <div>
                  <h3>${esc(p.title)}</h3>
                  <span class="p-tag">${esc(p.badge)}</span>
                </div>
                ${isFeatured ? `<span class="p-star" title="Flagship Architecture" aria-label="Flagship project">${iconSvg("star", 16)}</span>` : ""}
              </div>

              <div class="p-body">
                <div>
                  <p class="p-desc">${esc(p.description)}</p>
                  <div class="p-tech">
                    ${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
                  </div>
                </div>

                <div>
                  ${
                    isSaddFeatured
                      ? `<div class="sadd-schematic" aria-label="SADD 5-stage pipeline">
                          ${p.architecture.pipeline
                            .map(
                              (node) => `
                            <div class="sadd-stage" dir="ltr">
                              <span>${esc(node.stage)}</span>
                              <b>${esc(node.title)}</b>
                              <small>${esc(node.detail)}</small>
                            </div>`
                            )
                            .join("")}
                        </div>`
                      : ""
                  }
                  <ul class="p-features">
                    ${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}
                  </ul>
                </div>
              </div>

              <div class="p-foot">
                <div class="p-links">
                  ${
                    p.links?.demo
                      ? `<a href="${esc(p.links.demo)}" target="_blank" rel="noopener noreferrer">${iconSvg("external", 14)}<span>${esc(pStrings.liveBtn || "Live Platform")}</span></a>`
                      : ""
                  }
                  ${
                    p.links?.github
                      ? `<a href="${esc(p.links.github)}" target="_blank" rel="noopener noreferrer">${iconSvg("github", 15)}<span>${esc(pStrings.githubBtn || "GitHub Repo")}</span></a>`
                      : ""
                  }
                  ${
                    !p.links?.demo && !p.links?.github
                      ? `<span class="p-private">${iconSvg("lock", 13)}<span>${esc(pStrings.privateLabel || "Private production / client system")}</span></span>`
                      : ""
                  }
                </div>

                <button type="button" class="p-inspect-btn" data-project-id="${esc(p.id)}">
                  ${iconSvg("layers", 14)}
                  <span>${esc(pStrings.inspectBtn || "Architecture & Case Study")}</span>
                </button>
              </div>
            </article>`;
        })
        .join("");
    };

    if (animate) {
      withScopedTransition(grid, draw);
    } else {
      draw();
    }
  }

  function openProjectModal(projectId) {
    const dlg = $("#projectDialog");
    if (!dlg) return;
    const data = getData();
    const d = dict();
    const pStrings = d.projects || {};
    const project = data.projects.find((p) => p.id === projectId);
    if (!project) return;

    const arch = project.architecture || {};
    $("#caseBadge").textContent = `${project.badge}${arch.role ? ` · ${arch.role}` : ""}`;
    $("#caseTitle").textContent = project.title;

    $("#caseBody").innerHTML = `
      <p class="p-desc">${esc(project.description)}</p>

      <div class="case-cols">
        <div class="case-box">
          <h3>${esc(pStrings.modalChallenge || "Engineering Challenge")}</h3>
          <p>${esc(arch.challenge || "")}</p>
        </div>
        <div class="case-box">
          <h3>${esc(pStrings.modalSolution || "Architectural Solution")}</h3>
          <p>${esc(arch.solution || "")}</p>
        </div>
      </div>

      ${
        Array.isArray(arch.pipeline) && arch.pipeline.length
          ? `<div>
              <h3 style="font-size:.82rem;font-family:var(--mono);color:var(--accent);margin-bottom:.55rem;text-transform:uppercase">${esc(
                pStrings.modalPipeline || "System Pipeline"
              )}</h3>
              <div class="case-pipeline">
                ${arch.pipeline
                  .map(
                    (node) => `
                  <div class="case-node" dir="ltr">
                    <span>${esc(node.stage)}</span>
                    <b>${esc(node.title)}</b>
                    <small>${esc(node.detail)}</small>
                  </div>`
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }

      ${
        Array.isArray(arch.metrics) && arch.metrics.length
          ? `<div>
              <h3 style="font-size:.82rem;font-family:var(--mono);color:var(--accent);margin-bottom:.55rem;text-transform:uppercase">${esc(
                pStrings.modalImpact || "Key Guarantees & Metrics"
              )}</h3>
              <div class="case-metrics">
                ${arch.metrics.map((m) => `<span class="case-metric">${esc(m)}</span>`).join("")}
              </div>
            </div>`
          : ""
      }

      <div>
        <h3 style="font-size:.82rem;font-family:var(--mono);color:var(--accent);margin-bottom:.55rem;text-transform:uppercase">${esc(
          pStrings.modalFeatures || "Delivered Capabilities"
        )}</h3>
        <ul class="p-features">
          ${project.features.map((f) => `<li>${esc(f)}</li>`).join("")}
        </ul>
      </div>

      <div class="p-tech">
        ${project.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
      </div>

      ${
        project.links?.demo || project.links?.github
          ? `<div class="p-links">
              ${
                project.links.demo
                  ? `<a href="${esc(project.links.demo)}" target="_blank" rel="noopener noreferrer">${iconSvg("external", 14)}<span>${esc(
                      pStrings.liveBtn || "Live Platform"
                    )}</span></a>`
                  : ""
              }
              ${
                project.links.github
                  ? `<a href="${esc(project.links.github)}" target="_blank" rel="noopener noreferrer">${iconSvg("github", 15)}<span>${esc(
                      pStrings.githubBtn || "GitHub Repo"
                    )}</span></a>`
                  : ""
              }
            </div>`
          : ""
      }
    `;

    openDialog(dlg);
  }

  /* ---------------- Experience Timeline ---------------- */
  function renderExperience() {
    const list = $("#timeline");
    if (!list) return;
    const data = getData();

    list.innerHTML = data.experience
      .map(
        (job, idx) => `
      <li class="t-item reveal" style="--d:${(idx * 0.06).toFixed(2)}s">
        <article class="card">
          <div class="t-top">
            <span class="t-period">${esc(job.period)}</span>
            <span class="t-highlight">${esc(job.highlight)}</span>
          </div>
          <h3>${esc(job.role)}</h3>
          <p class="t-company">${esc(job.company)} · ${esc(job.location)}</p>
          <ul>
            ${job.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}
          </ul>
          <div class="t-tech">
            ${job.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
          </div>
        </article>
      </li>`
      )
      .join("");
  }

  /* ---------------- Skills Tabs & Matrix ---------------- */
  function slugify(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function renderSkillTabs() {
    const tabsEl = $("#skillTabs");
    if (!tabsEl) return;
    const d = dict();
    const groupLabels = d.skills?.groupLabels || {};
    const allLabel = d.skills?.allLabel || "All";
    const groups = Object.keys(BASE.skills);

    const makeTab = (key, label, count) => {
      const selected = currentSkillGroupKey === key;
      const id = `skill-tab-${slugify(key)}`;
      return `
        <button
          type="button"
          class="tab"
          role="tab"
          id="${id}"
          data-group="${esc(key)}"
          aria-selected="${selected}"
          ${selected ? "" : 'tabindex="-1"'}
        >
          <span>${esc(label)}</span>
          <span class="tab-count">${count}</span>
        </button>`;
    };

    const totalCount = groups.reduce((sum, g) => sum + BASE.skills[g].length, 0);
    tabsEl.innerHTML =
      makeTab("all", allLabel, totalCount) +
      groups.map((g) => makeTab(g, groupLabels[g] || g, BASE.skills[g].length)).join("");
  }

  function renderSkillsPanel(animate = false) {
    const grid = $("#skillsGrid");
    if (!grid) return;

    const groups = Object.keys(BASE.skills);
    const items =
      currentSkillGroupKey === "all"
        ? groups.flatMap((g) => BASE.skills[g])
        : BASE.skills[currentSkillGroupKey] || [];

    const activeTabId = `skill-tab-${slugify(currentSkillGroupKey)}`;
    grid.setAttribute("aria-labelledby", activeTabId);

    const draw = () => {
      grid.innerHTML = items
        .map(
          (sk, idx) => `
        <div class="card skill${animate ? " pop-in" : ""}" style="animation-delay:${Math.min(idx * 0.02, 0.36).toFixed(2)}s">
          ${
            sk.icon
              ? `<img src="https://skillicons.dev/icons?i=${encodeURIComponent(sk.icon)}" alt="" data-fallback="${esc(
                  sk.name
                )}" width="46" height="46" loading="lazy" decoding="async" />`
              : `<div class="skill-badge" aria-hidden="true">${esc(sk.tag || sk.name.slice(0, 5))}</div>`
          }
          <span>${esc(sk.name)}</span>
        </div>`
        )
        .join("");
    };

    if (animate) {
      withScopedTransition(grid, draw);
    } else {
      draw();
    }
  }

  /* ---------------- Command Palette (⌘K / Ctrl+K) ---------------- */
  let cmdActiveIdx = 0;

  function buildCommandItems() {
    const data = getData();
    const d = dict();
    const c = d.cmd || {};
    const groups = c.groups || {};
    const nav = d.nav || {};
    const act = c.actions || {};

    const items = [];

    const sectionList = [
      { href: "#about", label: nav.about || "About", sub: "#about" },
      { href: "#services", label: nav.services || "Expertise", sub: "#services" },
      { href: "#laravel-dev", label: nav.laravelDev || "Laravel Dev", sub: "#laravel-dev" },
      { href: "#projects", label: nav.projects || "Projects", sub: "#projects" },
      { href: "#experience", label: nav.experience || "Experience", sub: "#experience" },
      { href: "#skills", label: nav.skills || "Skills", sub: "#skills" },
      { href: "#contact", label: nav.contact || "Contact", sub: "#contact" },
    ];
    sectionList.forEach((s) => {
      items.push({
        group: groups.sections || "Navigation Sections",
        label: s.label,
        sub: s.sub,
        run: () => {
          closeTopLayer($("#cmdDialog"));
          document.querySelector(s.href)?.scrollIntoView({ behavior: isReducedMotion() ? "auto" : "smooth" });
        },
      });
    });

    data.projects.forEach((p) => {
      items.push({
        group: groups.projects || "Project Architectures",
        label: p.title,
        sub: p.tech.slice(0, 3).join(" · "),
        run: () => {
          closeTopLayer($("#cmdDialog"));
          setTimeout(() => openProjectModal(p.id), canTransitionDisplay && !isReducedMotion() ? 220 : 10);
        },
      });
    });

    data.laravelDev.modules.forEach((m) => {
      items.push({
        group: groups.modules || "Laravel Dev Modules",
        label: m.label,
        sub: `${m.features.length} features`,
        run: () => {
          currentModId = m.id;
          ldSearchQuery = "";
          const s = $("#ldSearchInput");
          if (s) s.value = "";
          syncLaravelDevModuleTabs();
          renderLaravelDevPanel();
          closeTopLayer($("#cmdDialog"));
          $("#laravel-dev")?.scrollIntoView({ behavior: isReducedMotion() ? "auto" : "smooth" });
        },
      });
    });

    items.push(
      {
        group: groups.actions || "Quick Actions",
        label: act.theme || "Toggle Dark / Light Theme",
        sub: "Theme",
        run: () => {
          toggleTheme();
          closeTopLayer($("#cmdDialog"));
        },
      },
      {
        group: groups.actions || "Quick Actions",
        label: act.lang || "Switch Language (EN / AR)",
        sub: currentLang === "en" ? "العربية" : "English",
        run: () => {
          closeTopLayer($("#cmdDialog"));
          setLanguage(currentLang === "en" ? "ar" : "en");
        },
      },
      {
        group: groups.actions || "Quick Actions",
        label: act.copyEmail || "Copy Email",
        sub: BASE.contact.email,
        run: () => {
          copyText(BASE.contact.email, d.toasts?.emailCopied);
          closeTopLayer($("#cmdDialog"));
        },
      },
      {
        group: groups.actions || "Quick Actions",
        label: act.copyPhone || "Copy Phone",
        sub: BASE.contact.phone,
        run: () => {
          copyText(BASE.contact.phone, d.toasts?.phoneCopied);
          closeTopLayer($("#cmdDialog"));
        },
      },
      {
        group: groups.actions || "Quick Actions",
        label: act.downloadCv || "Download CV (.pdf)",
        sub: "PDF",
        run: () => {
          closeTopLayer($("#cmdDialog"));
          const a = document.createElement("a");
          a.href = BASE.contact.cvUrl;
          a.download = "Abd_AlRahman_Ahmad_CV.pdf";
          a.click();
        },
      },
      {
        group: groups.actions || "Quick Actions",
        label: act.github || "Open GitHub",
        sub: "@X-Dynamite-X",
        run: () => {
          window.open(BASE.contact.github, "_blank", "noopener,noreferrer");
          closeTopLayer($("#cmdDialog"));
        },
      },
      {
        group: groups.actions || "Quick Actions",
        label: act.linkedin || "Open LinkedIn",
        sub: "LinkedIn",
        run: () => {
          window.open(BASE.contact.linkedin, "_blank", "noopener,noreferrer");
          closeTopLayer($("#cmdDialog"));
        },
      }
    );

    return items;
  }

  let visibleCmdItems = [];

  function renderCmdResults(query = "") {
    const resultsEl = $("#cmdResults");
    if (!resultsEl) return;
    const d = dict();
    const q = query.trim().toLowerCase();
    const all = buildCommandItems();
    visibleCmdItems = q
      ? all.filter((item) => `${item.label} ${item.sub} ${item.group}`.toLowerCase().includes(q))
      : all;

    if (!visibleCmdItems.length) {
      resultsEl.innerHTML = `<div class="cmd-empty">${esc(d.cmd?.empty || "No matching commands found.")}</div>`;
      return;
    }

    cmdActiveIdx = Math.min(cmdActiveIdx, visibleCmdItems.length - 1);
    let lastGroup = "";
    let itemIdx = 0;

    resultsEl.innerHTML = visibleCmdItems
      .map((item) => {
        let heading = "";
        if (item.group !== lastGroup) {
          lastGroup = item.group;
          heading = `<div class="cmd-group-label">${esc(item.group)}</div>`;
        }
        const selected = itemIdx === cmdActiveIdx;
        const btn = `
          <button type="button" class="cmd-item" role="option" data-cmd-idx="${itemIdx}" aria-selected="${selected}">
            <span>${esc(item.label)}</span>
            <span class="cmd-item-sub">${esc(item.sub)}</span>
          </button>`;
        itemIdx += 1;
        return heading + btn;
      })
      .join("");
  }

  function updateCmdSelection(nextIdx) {
    if (!visibleCmdItems.length) return;
    cmdActiveIdx = (nextIdx + visibleCmdItems.length) % visibleCmdItems.length;
    const btns = $$("#cmdResults .cmd-item");
    btns.forEach((b, i) => b.setAttribute("aria-selected", String(i === cmdActiveIdx)));
    btns[cmdActiveIdx]?.scrollIntoView({ block: "nearest" });
  }

  function openCmdPalette() {
    const dlg = $("#cmdDialog");
    if (!dlg) return;
    cmdActiveIdx = 0;
    const input = $("#cmdInput");
    if (input) input.value = "";
    renderCmdResults("");
    openDialog(dlg);
    input?.focus();
  }

  /* ---------------- Theme Toggle ---------------- */
  function toggleTheme() {
    const meta = $('meta[name="color-scheme"]');
    if (!meta) return;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = meta.content === "light" || meta.content === "dark" ? meta.content : prefersDark ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    meta.content = next;
    try {
      localStorage.setItem("color-scheme", next);
    } catch {
      // Ignore storage failures
    }
    const themeColorMeta = $('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.content = next === "dark" ? "#06090d" : "#f4f7f5";
    showToast(dict().toasts?.themeSwitched);
  }

  /* ---------------- Language Switcher & i18n Binding ---------------- */
  function applyStaticBindings() {
    const d = dict();
    const data = getData();

    document.documentElement.lang = currentLang;
    document.documentElement.dir = d.dir || "ltr";

    $("#skipLink").textContent = d.skipLink || "Skip to main content";
    $("#langLabel").textContent = d.langLabel || (currentLang === "en" ? "العربية" : "English");
    $("#langToggle")?.setAttribute("aria-label", d.langSwitchAria || "Switch language");
    $("#themeToggle")?.setAttribute("aria-label", d.themeToggleAria || "Toggle color theme");
    $("#menuOpenBtn")?.setAttribute("aria-label", d.menuToggleAria || "Open menu");
    $("#menuCloseBtn")?.setAttribute("aria-label", d.menuCloseAria || "Close menu");
    $("#backToTop")?.setAttribute("aria-label", d.backToTop || "Back to top");
    $("#cmdInput")?.setAttribute("placeholder", d.cmd?.placeholder || "Search commands...");

    $$("[data-i18n]").forEach((el) => {
      const val = getPath(d, el.dataset.i18n);
      if (typeof val === "string") el.textContent = val;
    });

    $$("[data-bind]").forEach((el) => {
      const val = getPath(data, el.dataset.bind);
      if (typeof val === "string") el.textContent = val;
    });

    $("#year").textContent = String(new Date().getFullYear());
  }

  function renderAllDynamic() {
    renderHeroDeck(currentDeckTab);
    renderSocials();
    renderStats();
    renderAbout();
    renderEducation();
    renderServices();
    renderLaravelDev();
    renderProjectFilters();
    renderProjects(false);
    renderExperience();
    renderSkillTabs();
    renderSkillsPanel(false);
    initScrollReveal();
  }

  function setLanguage(lang) {
    if (lang !== "en" && lang !== "ar") return;
    currentLang = lang;
    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch {
      // Ignore storage failures
    }

    withDocumentTransition(() => {
      applyStaticBindings();
      renderAllDynamic();
      startTyping();
    });

    showToast(dict(lang).toasts?.langSwitched);
  }

  /* ---------------- Typing Headline Controller ---------------- */
  let typeTimer = null;

  function startTyping() {
    clearTimeout(typeTimer);
    const out = $("#typed");
    if (!out) return;
    const roles = getData().roles || [];
    if (!roles.length) return;

    if (isReducedMotion()) {
      out.textContent = roles[0];
      return;
    }

    let rIdx = 0;
    let cIdx = 0;
    let deleting = false;

    const tick = () => {
      const word = roles[rIdx % roles.length];
      out.textContent = deleting ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);
      let delay = deleting ? 32 : 58;

      if (!deleting && cIdx === word.length) {
        delay = 1850;
        deleting = true;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
        delay = 340;
      }
      typeTimer = setTimeout(tick, delay);
    };

    out.textContent = "";
    tick();
  }

  /* ---------------- Scroll Reveal, Scrollspy & Back-to-Top ---------------- */
  let revealObserver = null;

  function initScrollReveal() {
    const items = $$(".reveal:not(.in)");
    if (!items.length) return;

    if (isReducedMotion() || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      animateCounters();
      return;
    }

    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          if (entry.target.closest("#home, .hero")) animateCounters();
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach((el) => revealObserver.observe(el));

    // Also watch #stats directly so counters always trigger when stats enter viewport
    const statsEl = $("#stats");
    if (statsEl && !statsAnimated) {
      const statsObs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            animateCounters();
            statsObs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      statsObs.observe(statsEl);
    }
  }

  function initScrollObservers() {
    // 1. Back-to-top visibility via existing 380px .scroll-sentinel
    const backBtn = $("#backToTop");
    const backSentinel = $(".scroll-sentinel");
    if (backBtn && backSentinel && "IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          backBtn.classList.toggle("visible", !entries[0].isIntersecting);
        },
        { threshold: 0 }
      ).observe(backSentinel);
    }

    // 2. Sticky header elevation via lightweight 32px top sentinel
    const navEl = $("#nav");
    if (navEl && "IntersectionObserver" in window) {
      const navSentinel = document.createElement("div");
      navSentinel.setAttribute("aria-hidden", "true");
      navSentinel.style.cssText =
        "position:absolute;inset-block-start:0;inset-inline-start:0;inline-size:1px;block-size:32px;pointer-events:none;visibility:hidden";
      document.body.prepend(navSentinel);

      new IntersectionObserver(
        (entries) => {
          navEl.classList.toggle("scrolled", !entries[0].isIntersecting);
        },
        { threshold: 0 }
      ).observe(navSentinel);
    }

    // 3. Scroll progress fallback if CSS animation-timeline: scroll() is unsupported
    if (!CSS.supports?.("animation-timeline: scroll()")) {
      let ticking = false;
      const updateProgress = () => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        doc.style.setProperty("--p", (window.scrollY / max).toFixed(4));
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateProgress);
          }
        },
        { passive: true }
      );
      updateProgress();
    }

    // 4. Scrollspy accessibility (aria-current) + drawer active state + desktop CSS fallback
    const supportsNativeTargetCurrent = CSS.supports?.("selector(:target-current)");
    const sections = $$("main > section[id]");
    const desktopLinks = $$("#navLinks a");
    const drawerLinks = $$("#drawerLinks a");

    if (sections.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        (entries) => {
          const hit = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          if (!hit) return;
          const activeHref = `#${hit.target.id}`;

          desktopLinks.forEach((a) => {
            const match = a.getAttribute("href") === activeHref;
            if (match) a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
            if (!supportsNativeTargetCurrent) {
              a.classList.toggle("active", match);
            }
          });

          drawerLinks.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === activeHref);
          });
        },
        { rootMargin: "-22% 0px -60% 0px", threshold: 0 }
      );
      sections.forEach((sec) => spy.observe(sec));
    }
  }

  /* ---------------- Subtle Engineering Canvas Backdrop ---------------- */
  function initCanvasBackground() {
    const canvas = $("#bg");
    if (!canvas || isReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let rafId = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.min(34, Math.max(16, Math.floor((w * h) / 48000)));
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 1.4 + Math.random() * 1.4,
    }));

    const isDarkTheme = () => {
      const m = $('meta[name="color-scheme"]')?.content;
      if (m === "light") return false;
      if (m === "dark") return true;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const drawFrame = () => {
      if (document.hidden || isReducedMotion()) {
        rafId = null;
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const dark = isDarkTheme();
      const rgb = dark ? "52, 211, 153" : "5, 150, 105";
      const maxDist = 140;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (dark ? 0.12 : 0.08);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${rgb}, ${dark ? 0.32 : 0.22})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && rafId === null && !isReducedMotion()) {
        rafId = requestAnimationFrame(drawFrame);
      }
    });

    rafId = requestAnimationFrame(drawFrame);
  }

  /* ---------------- Global Event Delegation ---------------- */
  function bindEvents() {
    // Theme & Language buttons
    $("#themeToggle")?.addEventListener("click", toggleTheme);
    $("#langToggle")?.addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "ar" : "en");
    });

    // Skip link focus reliability
    $("#skipLink")?.addEventListener("click", () => {
      $("#hero-title")?.focus({ preventScroll: true });
    });

    // Mobile drawer
    const drawer = $("#mobileDrawer");
    $("#menuOpenBtn")?.addEventListener("click", () => {
      $("#menuOpenBtn")?.setAttribute("aria-expanded", "true");
      openDialog(drawer);
    });
    $("#menuCloseBtn")?.addEventListener("click", () => closeTopLayer(drawer));
    $("#drawerLinks")?.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeTopLayer(drawer);
    });
    $("#drawerCmdBtn")?.addEventListener("click", () => {
      closeTopLayer(drawer);
      setTimeout(openCmdPalette, canTransitionDisplay && !isReducedMotion() ? 220 : 10);
    });

    // Command palette triggers & keyboard shortcut
    $("#cmdBtn")?.addEventListener("click", openCmdPalette);
    $("#footerCmdBtn")?.addEventListener("click", openCmdPalette);
    $("#cmdCloseBtn")?.addEventListener("click", () => closeTopLayer($("#cmdDialog")));

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const dlg = $("#cmdDialog");
        if (dlg?.open) closeTopLayer(dlg);
        else openCmdPalette();
      }
    });

    $("#cmdInput")?.addEventListener("input", (e) => {
      cmdActiveIdx = 0;
      renderCmdResults(e.target.value);
    });

    $("#cmdInput")?.addEventListener("keydown", (e) => {
      if (!visibleCmdItems.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        updateCmdSelection(cmdActiveIdx + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        updateCmdSelection(cmdActiveIdx - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        visibleCmdItems[cmdActiveIdx]?.run();
      }
    });

    $("#cmdResults")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".cmd-item");
      if (!btn) return;
      const idx = Number(btn.dataset.cmdIdx);
      visibleCmdItems[idx]?.run();
    });

    // Hero telemetry deck tabs
    $("#deckTabs")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".deck-tab");
      if (!btn) return;
      renderHeroDeck(btn.dataset.deck);
    });
    attachTabKeyboardNav($("#deckTabs"), ".deck-tab", {
      onSelect: (btn) => renderHeroDeck(btn.dataset.deck),
    });

    // About code card format switch & copy
    $$(".code-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCodeMode = btn.dataset.mode;
        renderAbout();
      });
    });

    $("#copyProfileBtn")?.addEventListener("click", () => {
      const btn = $("#copyProfileBtn");
      const label = btn?.querySelector("span");
      const d = dict();
      copyText(getProfileSnippetPlain(), d.toasts?.codeCopied);
      if (label) {
        label.textContent = d.about?.copiedCode || "Copied";
        setTimeout(() => {
          label.textContent = dict().about?.copyCode || "Copy";
        }, 1600);
      }
    });

    // Laravel Dev workbench interactions (delegated so language re-renders stay wired)
    $("#laravelDevBox")?.addEventListener("click", (e) => {
      const osBtn = e.target.closest(".sp-os-btn");
      if (osBtn) {
        currentOsIdx = Number(osBtn.dataset.osIdx) || 0;
        const cmds = getData().laravelDev.installCmds;
        const cmdEl = $("#ldInstallCmd");
        if (cmdEl && cmds[currentOsIdx]) cmdEl.textContent = cmds[currentOsIdx].cmd;
        $$(".sp-os-btn").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.osIdx) === currentOsIdx)));
        return;
      }

      if (e.target.closest("#ldCopyCmd")) {
        const text = $("#ldInstallCmd")?.textContent || "";
        copyText(text, dict().laravelDev?.copiedToast);
        return;
      }

      const modBtn = e.target.closest(".sp-mod-btn");
      if (modBtn) {
        currentModId = modBtn.dataset.mod;
        ldSearchQuery = "";
        const searchEl = $("#ldSearchInput");
        if (searchEl) searchEl.value = "";
        syncLaravelDevModuleTabs();
        renderLaravelDevPanel();
      }
    });

    $("#laravelDevBox")?.addEventListener("input", (e) => {
      if (e.target.id === "ldSearchInput") {
        ldSearchQuery = e.target.value;
        renderLaravelDevPanel();
      }
    });

    // Project filters & Case Study dialog triggers
    $("#projectFilters")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab[data-cat]");
      if (!btn || btn.dataset.cat === currentProjCat) return;
      currentProjCat = btn.dataset.cat;
      $$(".tab[data-cat]", $("#projectFilters")).forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.cat === currentProjCat))
      );
      renderProjects(true);
    });

    $("#projectsGrid")?.addEventListener("click", (e) => {
      const inspectBtn = e.target.closest(".p-inspect-btn[data-project-id]");
      if (inspectBtn) openProjectModal(inspectBtn.dataset.projectId);
    });

    $("#caseCloseBtn")?.addEventListener("click", () => closeTopLayer($("#projectDialog")));

    // Skill category tabs
    const selectSkillTab = (btn) => {
      if (!btn || btn.dataset.group === currentSkillGroupKey) return;
      currentSkillGroupKey = btn.dataset.group;
      $$("#skillTabs .tab").forEach((b) => {
        const selected = b.dataset.group === currentSkillGroupKey;
        b.setAttribute("aria-selected", String(selected));
        if (selected) b.removeAttribute("tabindex");
        else b.setAttribute("tabindex", "-1");
      });
      renderSkillsPanel(true);
    };

    $("#skillTabs")?.addEventListener("click", (e) => {
      selectSkillTab(e.target.closest(".tab[data-group]"));
    });
    attachTabKeyboardNav($("#skillTabs"), ".tab[data-group]", { onSelect: selectSkillTab });

    // Contact copy buttons (never disabled during feedback!)
    $("#copyEmailBtn")?.addEventListener("click", () => {
      copyText(BASE.contact.email, dict().toasts?.emailCopied);
    });
    $("#copyPhoneBtn")?.addEventListener("click", () => {
      copyText(BASE.contact.phone, dict().toasts?.phoneCopied);
    });
  }

  /* ---------------- Boot ---------------- */
  initSkillImageFallbacks();
  initDialogs();
  applyStaticBindings();
  renderAllDynamic();
  bindEvents();
  enhanceInteractiveCards();
  startTyping();
  initScrollObservers();
  initCanvasBackground();
})();
