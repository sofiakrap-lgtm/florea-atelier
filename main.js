/* =====================================================================
   Floréa Atelier — main.js
   Geneerinen logiikka: navigaatio, kori, haku/suodatus, lomakkeet,
   kimpun rakentaja, hintalaskuri, galleria. Sisältö tulee site.js:stä.
   Demo: lomakkeet eivät lähetä mihinkään (näyttävät kuittauksen).
   ===================================================================== */
(function () {
  "use strict";
  const F = window.FLOREA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const eur = (n) => `${Number(n).toFixed(0)} €`;

  /* Pieni hyperscript-apuri */
  function h(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined && v !== false) e.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c == null || c === false) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }
  const productById = (id) => F.products.find((p) => p.id === id);

  const ICON = {
    cart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 7H6"/></svg>`,
    menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>`,
    pin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
    clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"/></svg>`,
    mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  };

  /* ===================================================================
     NAVIGAATIO + FOOTER
     =================================================================== */
  function currentPage() {
    const p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }
  function renderNav() {
    const mount = $("[data-nav]");
    if (!mount) return;
    const here = currentPage();
    const links = F.nav.map((n) =>
      h("a", { href: n.href, class: n.href === here ? "active" : "" }, n.label)
    );

    const linksWrap = h("div", { class: "nav-links", id: "navLinks" }, links);
    const toggle = h("button", { class: "nav-toggle", "aria-label": "Valikko", html: ICON.menu,
      onclick: () => linksWrap.classList.toggle("open") });
    const cartBtn = h("button", { class: "cart-btn", "aria-label": "Ostoskori", html: ICON.cart + `<span class="cart-count" data-cart-count>0</span>`,
      onclick: openCart });
    const ctaBtn = h("a", { href: "tilaa.html", class: "btn btn--ghost btn--small nav-cta" }, "Tilaa kukkia");

    mount.className = "site-nav";
    mount.innerHTML = "";
    mount.appendChild(h("div", { class: "wrap" }, [
      h("a", { href: "index.html", class: "nav-brand", "aria-label": F.site.name }, [
        h("img", { class: "brand-full", src: F.site.logoNav, alt: F.site.name }),
        h("img", { class: "brand-mark", src: F.site.logoMark, alt: "" }),
      ]),
      linksWrap,
      h("div", { class: "nav-actions" }, [ctaBtn, cartBtn, toggle]),
    ]));
  }

  function renderFooter() {
    const mount = $("[data-footer]");
    if (!mount) return;
    const col = (title, items) =>
      h("div", { class: "footer-col" }, [h("h4", {}, title), ...items.map((i) =>
        h("a", { href: i.href }, i.label))]);
    mount.className = "site-footer";
    mount.innerHTML = "";
    mount.appendChild(h("div", { class: "wrap" }, [
      h("div", { class: "footer-grid" }, [
        h("div", {}, [
          h("img", { class: "flogo", src: F.site.logoLight, alt: F.site.name }),
          h("p", { class: "muted", style: "max-width:34ch;color:rgba(240,234,216,.8);font-size:.92rem" },
            "Orgaaninen villikukka-ateljee. Demokonsepti — ei oikea liike."),
        ]),
        col("Kauppa", [
          { label: "Kukkakimput", href: "tuotteet.html" },
          { label: "Tilaa kukkia", href: "tilaa.html" },
          { label: "Hintalaskuri", href: "hintalaskuri.html" },
          { label: "Palvelut", href: "palvelut.html" },
        ]),
        col("Ateljee", [
          { label: "Meistä", href: "meista.html" },
          { label: "Kurssit", href: "tapahtumat.html" },
          { label: "Galleria", href: "galleria.html" },
          { label: "Myymälä", href: "myymala.html" },
        ]),
        col("Yhteys", [
          { label: F.site.email, href: "mailto:" + F.site.email },
          { label: "Instagram", href: F.site.social.instagram },
          { label: "Uutiskirje", href: F.site.social.uutiskirje },
        ]),
      ]),
      h("div", { class: "footer-bottom" }, [
        h("span", {}, `© ${new Date().getFullYear()} ${F.site.name} — demomateriaali`),
        h("span", {}, "Almond Cream · Mosswood · Cedar Bark · Golden Fennel · Glacier Mist"),
      ]),
    ]));
  }

  /* fill inline icons: <span data-ico="pin"></span> */
  function renderIcons() {
    $$("[data-ico]").forEach((el) => { const k = el.getAttribute("data-ico"); if (ICON[k]) el.innerHTML = ICON[k]; });
  }
  /* Brändin kukka (orgaaninen, epäsymmetrinen lohkomuoto — logon kukka). fill: currentColor */
  const BRAND_FLOWER = `<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><circle cx="39" cy="31" r="21"/><circle cx="65" cy="35" r="19"/><circle cx="71" cy="58" r="18"/><circle cx="50" cy="69" r="20"/><circle cx="27" cy="55" r="19"/><circle cx="34" cy="76" r="13"/><circle cx="51" cy="49" r="21"/></svg>`;
  /* fill brand-flower mounts: <span data-flower></span> */
  function renderFlowers() {
    $$("[data-flower]").forEach((el) => { el.innerHTML = BRAND_FLOWER; });
  }
  /* rullaava brändinauha: <div data-marquee></div> */
  function renderMarquee() {
    $$("[data-marquee]").forEach((m) => {
      const unit = `<img class="mq-logo" src="${F.site.logoNav}" alt="" />`;
      const seq = unit.repeat(10);
      m.className = "logo-marquee";
      m.setAttribute("aria-hidden", "true");
      m.innerHTML = `<div class="marquee-track">${seq}${seq}</div>`;
    });
  }

  /* ===================================================================
     OSTOSKORI (localStorage)
     =================================================================== */
  const CART_KEY = "florea-cart";
  const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
  const setCart = (c) => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartUI(); };

  function addToCart(id, qty = 1) {
    const cart = getCart();
    const row = cart.find((r) => r.id === id);
    if (row) row.qty += qty; else cart.push({ id, qty });
    setCart(cart);
    openCart();
  }
  function changeQty(id, delta) {
    let cart = getCart();
    const row = cart.find((r) => r.id === id);
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) cart = cart.filter((r) => r.id !== id);
    setCart(cart);
  }
  const removeFromCart = (id) => setCart(getCart().filter((r) => r.id !== id));
  const cartTotal = () => getCart().reduce((s, r) => s + (productById(r.id)?.price || 0) * r.qty, 0);
  const cartCount = () => getCart().reduce((s, r) => s + r.qty, 0);

  function ensureCartDrawer() {
    if ($("#cartDrawer")) return;
    const overlay = h("div", { class: "cart-overlay", id: "cartOverlay", onclick: closeCart });
    const drawer = h("div", { class: "cart-drawer", id: "cartDrawer" }, [
      h("div", { class: "cart-head" }, [
        h("h3", {}, "Ostoskori"),
        h("button", { class: "ci-remove", style: "font-size:.9rem", onclick: closeCart }, "Sulje ✕"),
      ]),
      h("div", { class: "cart-items", id: "cartItems" }),
      h("div", { class: "cart-foot", id: "cartFoot" }),
    ]);
    document.body.append(overlay, drawer);
  }
  const openCart = () => { ensureCartDrawer(); renderCart(); $("#cartOverlay").classList.add("open"); $("#cartDrawer").classList.add("open"); };
  const closeCart = () => { $("#cartOverlay")?.classList.remove("open"); $("#cartDrawer")?.classList.remove("open"); };

  function renderCart() {
    const wrap = $("#cartItems"), foot = $("#cartFoot");
    if (!wrap) return;
    const cart = getCart();
    wrap.innerHTML = "";
    if (!cart.length) {
      wrap.appendChild(h("div", { class: "cart-empty" }, "Korisi on tyhjä. Lisää villi kimppu! 🌿"));
      foot.innerHTML = "";
      return;
    }
    cart.forEach((r) => {
      const p = productById(r.id); if (!p) return;
      wrap.appendChild(h("div", { class: "cart-item" }, [
        h("img", { src: p.img, alt: p.name }),
        h("div", {}, [
          h("div", { class: "ci-name" }, p.name),
          h("div", { class: "ci-price" }, eur(p.price)),
          h("div", { class: "qty" }, [
            h("button", { onclick: () => changeQty(p.id, -1), "aria-label": "Vähennä" }, "−"),
            h("span", {}, String(r.qty)),
            h("button", { onclick: () => changeQty(p.id, 1), "aria-label": "Lisää" }, "+"),
          ]),
        ]),
        h("div", { style: "text-align:right" }, [
          h("div", { class: "price", style: "font-size:1.05rem" }, eur(p.price * r.qty)),
          h("button", { class: "ci-remove", onclick: () => removeFromCart(p.id) }, "Poista"),
        ]),
      ]));
    });
    foot.innerHTML = "";
    foot.append(
      h("div", { class: "summary-total", style: "margin-bottom:14px" }, [
        h("span", { class: "muted" }, "Yhteensä"),
        h("span", { class: "price" }, eur(cartTotal())),
      ]),
      h("a", { href: "tilaa.html", class: "btn btn--primary btn--block" }, "Siirry tilaukseen"),
      h("p", { class: "form-note", style: "text-align:center;margin-top:10px" }, "Demo — maksua ei veloiteta."),
    );
  }
  function updateCartUI() {
    const c = cartCount();
    $$("[data-cart-count]").forEach((el) => { el.textContent = c; el.style.display = c ? "flex" : "none"; });
    if ($("#cartDrawer")?.classList.contains("open")) renderCart();
  }

  /* ===================================================================
     TUOTERUUDUKKO + SUODATUS (tuotteet.html)
     =================================================================== */
  function productCard(p) {
    return h("article", { class: "product-card" }, [
      h("a", { href: `tilaa.html?tuote=${p.id}`, class: "media" }, h("img", { src: p.img, alt: p.name, loading: "lazy" })),
      h("div", { class: "body" }, [
        h("h3", { class: "pc-name" }, p.name),
        h("p", { class: "muted", style: "font-size:.9rem" }, p.desc),
        h("div", { class: "pc-tags" }, [
          h("span", { class: "chip" }, F.filters.style.options.find((o) => o.id === p.style)?.label || p.style),
          h("span", { class: "chip" }, F.filters.color.options.find((o) => o.id === p.color)?.label || p.color),
          h("span", { class: "chip" }, F.filters.size.options.find((o) => o.id === p.size)?.label || p.size),
        ]),
        h("div", { class: "pc-foot" }, [
          h("span", { class: "price" }, eur(p.price)),
          h("button", { class: "btn btn--primary btn--small", onclick: () => addToCart(p.id) }, "Lisää"),
        ]),
      ]),
    ]);
  }

  function initShop() {
    const grid = $("[data-products]");
    if (!grid) return;
    const state = { q: "", occasion: new Set(), style: new Set(), color: new Set(), size: new Set(), price: new Set() };

    // suodatinpaneeli
    const panel = $("[data-filters]");
    if (panel) {
      Object.entries(F.filters).forEach(([key, group]) => {
        const opts = group.options.map((o) =>
          h("label", { class: "filter-option" }, [
            h("input", { type: "checkbox", value: o.id, onchange: (e) => {
              e.target.checked ? state[key].add(o.id) : state[key].delete(o.id); render();
            }}),
            o.label,
          ]));
        panel.appendChild(h("div", { class: "filter-group" }, [h("h4", {}, group.label), ...opts]));
      });
      panel.appendChild(h("button", { class: "btn btn--ghost btn--small btn--block", onclick: () => {
        Object.keys(state).forEach((k) => k !== "q" && state[k].clear());
        $$("input[type=checkbox]", panel).forEach((c) => (c.checked = false));
        const sb = $("[data-search]"); if (sb) sb.value = ""; state.q = "";
        render();
      }}, "Tyhjennä suodattimet"));
    }

    const search = $("[data-search]");
    if (search) search.addEventListener("input", (e) => { state.q = e.target.value.toLowerCase().trim(); render(); });

    function matches(p) {
      if (state.q && !(`${p.name} ${p.desc}`.toLowerCase().includes(state.q))) return false;
      if (state.occasion.size && !p.occasion.some((o) => state.occasion.has(o))) return false;
      if (state.style.size && !state.style.has(p.style)) return false;
      if (state.color.size && !state.color.has(p.color)) return false;
      if (state.size.size && !state.size.has(p.size)) return false;
      if (state.price.size && !state.price.has(p.priceRange)) return false;
      return true;
    }
    function render() {
      const list = F.products.filter(matches);
      const count = $("[data-count]");
      if (count) count.textContent = `${list.length} kimppu${list.length === 1 ? "" : "a"}`;
      grid.innerHTML = "";
      if (!list.length) {
        grid.appendChild(h("div", { class: "empty-state" }, [
          h("p", { class: "lede", style: "margin:0 auto" }, "Ei osumia näillä suodattimilla."),
          h("p", { class: "muted" }, "Kokeile väljentää valintoja."),
        ]));
        return;
      }
      list.forEach((p) => grid.appendChild(productCard(p)));
    }
    render();
  }

  /* ===================================================================
     SUOSITUT (index.html, palvelut.html jne.)
     =================================================================== */
  function initFeatured() {
    $$("[data-featured]").forEach((grid) => {
      const n = parseInt(grid.getAttribute("data-featured")) || 3;
      F.products.slice(0, n).forEach((p) => grid.appendChild(productCard(p)));
    });
  }

  /* ===================================================================
     PALVELUT + ERIKOISTILAUKSET (renderöinti site.js:stä)
     =================================================================== */
  function initServices() {
    $$("[data-services]").forEach((grid) => {
      const n = parseInt(grid.getAttribute("data-services")) || F.services.length;
      F.services.slice(0, n).forEach((s) => {
        grid.appendChild(h("article", { class: "info-card info-card--center" }, [
          s.icon ? h("img", { class: "svc-icon", src: s.icon, alt: "", loading: "lazy" })
                 : h("div", { class: "num" }, s.num),
          h("h3", {}, s.title),
          h("p", {}, s.text),
        ]));
      });
    });
  }
  function initSpecials() {
    $$("[data-specials]").forEach((grid) => {
      F.specials.forEach((s) => {
        grid.appendChild(h("article", { class: "product-card" }, [
          h("div", { class: "media" }, h("img", { src: s.img, alt: s.title, loading: "lazy" })),
          h("div", { class: "body" }, [h("h3", { class: "pc-name" }, s.title), h("p", { class: "muted", style: "font-size:.92rem" }, s.text)]),
        ]));
      });
    });
  }

  /* ===================================================================
     ASIAKASPALAUTTEET (karuselli)
     =================================================================== */
  function initTestimonials() {
    const mount = $("[data-testimonials]");
    if (!mount) return;
    const track = h("div", { class: "tm-track" });
    F.testimonials.forEach((t) => {
      track.appendChild(h("figure", { class: "tm-card" }, [
        h("div", { class: "tm-stars" }, "★".repeat(t.stars)),
        h("blockquote", { class: "tm-quote" }, `“${t.quote}”`),
        h("figcaption", { class: "tm-who" }, "— " + t.who),
      ]));
    });
    function scrollBy(dir) {
      const card = track.querySelector(".tm-card");
      const step = card ? card.offsetWidth + 24 : 360;
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    }
    const nav = h("div", { class: "tm-nav" }, [
      h("button", { class: "tm-arrow", "aria-label": "Edellinen", onclick: () => scrollBy(-1) }, "←"),
      h("button", { class: "tm-arrow", "aria-label": "Seuraava", onclick: () => scrollBy(1) }, "→"),
    ]);
    mount.append(track, nav);
  }

  /* ===================================================================
     KIMPUN RAKENTAJA (tilaa.html)
     =================================================================== */
  function initBuilder() {
    const wrap = $("[data-builder]");
    if (!wrap) return;
    const selected = new Set();
    const grid = h("div", { class: "grid grid-4" });
    F.flowers.forEach((fl) => {
      const card = h("div", { class: "flower-option", onclick: () => {
        selected.has(fl.id) ? selected.delete(fl.id) : selected.add(fl.id);
        card.classList.toggle("selected");
        renderSummary();
      }}, [
        h("div", { class: "check" }, "✓"),
        h("div", { class: "media" }, h("img", { src: fl.img, alt: fl.name, loading: "lazy" })),
        h("div", { class: "fo-body" }, [h("span", { class: "fo-name" }, fl.name), h("span", { class: "muted", style: "font-size:.85rem" }, eur(fl.price) + "/varsi")]),
      ]);
      grid.appendChild(card);
    });

    const BASE = 18; // sidonta + kääre
    const summaryBody = h("div");
    const summary = h("div", { class: "builder-summary" }, [
      h("h3", {}, "Oma kimppu"),
      h("p", { class: "muted", style: "font-size:.9rem;margin-bottom:14px" }, "Valitse kukkalajit vasemmalta."),
      summaryBody,
    ]);
    function renderSummary() {
      const chosen = F.flowers.filter((f) => selected.has(f.id));
      const flowersTotal = chosen.reduce((s, f) => s + f.price * 3, 0); // 3 vartta/laji
      const total = chosen.length ? BASE + flowersTotal : 0;
      summaryBody.innerHTML = "";
      if (!chosen.length) {
        summaryBody.appendChild(h("p", { class: "muted" }, "Ei vielä valintoja."));
      } else {
        chosen.forEach((f) => summaryBody.appendChild(
          h("div", { class: "summary-row" }, [h("span", {}, `${f.name} ×3`), h("span", {}, eur(f.price * 3))])));
        summaryBody.appendChild(h("div", { class: "summary-row" }, [h("span", {}, "Sidonta & kääre"), h("span", {}, eur(BASE))]));
      }
      summaryBody.appendChild(h("div", { class: "summary-total" }, [
        h("span", { class: "muted" }, "Yhteensä"), h("span", { class: "price" }, eur(total))]));
      summaryBody.appendChild(h("button", { class: "btn btn--primary btn--block", style: "margin-top:16px",
        disabled: chosen.length ? null : "disabled",
        onclick: () => { alert(`Kiitos! Oma kimppusi (${chosen.map((c) => c.name).join(", ")}) — ${eur(total)}. Demo: tilausta ei lähetetty.`); }
      }, "Tilaa oma kimppu"));
    }
    renderSummary();
    wrap.classList.add("builder");
    wrap.append(grid, summary);

    // esivalinta ?tuote= → näytä viesti
    const pid = new URLSearchParams(location.search).get("tuote");
    if (pid) {
      const p = productById(pid);
      const note = $("[data-preselect]");
      if (p && note) note.innerHTML = `Valmis kimppu valittuna: <strong>${p.name}</strong> (${eur(p.price)}). Voit myös koota oman alta.`;
    }
  }

  /* ===================================================================
     HINTALASKURI (hintalaskuri.html)
     =================================================================== */
  function initCalculator() {
    const wrap = $("[data-calculator]");
    if (!wrap) return;
    const c = F.calc;
    const state = { occasion: c.occasion.options[0].id, size: c.size.options[1].id, flowers: c.flowers.options[0].id, extras: new Set() };

    function pillGroup(key, group) {
      const pills = group.options.map((o) =>
        h("button", { class: "option-pill" + ((group.multi ? state.extras.has(o.id) : state[key] === o.id) ? " active" : ""), type: "button",
          onclick: (e) => {
            if (group.multi) { state.extras.has(o.id) ? state.extras.delete(o.id) : state.extras.add(o.id); e.target.classList.toggle("active"); }
            else { state[key] = o.id; e.target.parentElement.querySelectorAll(".option-pill").forEach((b) => b.classList.remove("active")); e.target.classList.add("active"); }
            calc();
          }}, group.multi ? `${o.label} +${o.value} €` : o.label));
      return h("div", { class: "field" }, [h("label", {}, group.label), h("div", { class: "option-pills" }, pills)]);
    }
    const priceEl = h("div", { class: "calc-price" }, "—");
    function calc() {
      let total = c.base;
      total *= c.occasion.options.find((o) => o.id === state.occasion).value;
      total += c.size.options.find((o) => o.id === state.size).value;
      total += c.flowers.options.find((o) => o.id === state.flowers).value;
      state.extras.forEach((id) => total += c.extras.options.find((o) => o.id === id).value);
      priceEl.textContent = eur(total);
      return total;
    }

    const form = h("div", { class: "stack-lg" }, [
      pillGroup("occasion", c.occasion),
      pillGroup("size", c.size),
      pillGroup("flowers", c.flowers),
      pillGroup("extras", c.extras),
    ]);
    const panel = h("div", { class: "calc-panel" }, [
      h("span", { class: "eyebrow" }, "Arvio"),
      priceEl,
      h("p", { class: "muted", style: "font-size:.9rem" }, "Suuntaa-antava hinta. Lähetä tarjouspyyntö, niin vahvistamme."),
      h("a", { href: "#tarjous", class: "btn btn--primary btn--block", style: "margin-top:10px" }, "Pyydä tarjous"),
    ]);
    wrap.classList.add("calc-layout");
    wrap.append(form, panel);
    calc();
  }

  /* ===================================================================
     KURSSIT / WORKSHOPIT (tapahtumat.html)
     =================================================================== */
  function initWorkshops() {
    const wrap = $("[data-workshops]");
    if (!wrap) return;
    F.workshops.forEach((w) => {
      wrap.appendChild(h("div", { class: "workshop-card" }, [
        h("div", { class: "workshop-date" }, [h("div", { class: "day" }, w.day), h("div", { class: "mon" }, w.mon)]),
        h("div", { class: "workshop-info" }, [
          h("h3", {}, w.title),
          h("p", { class: "muted", style: "font-size:.95rem" }, w.desc),
          h("div", { class: "workshop-meta" }, [h("span", {}, w.time), h("span", {}, w.spots), h("span", {}, eur(w.price))]),
        ]),
        h("button", { class: "btn btn--primary btn--small", onclick: () => {
          const sel = $("#wsSelect"); if (sel) { sel.value = w.title; sel.scrollIntoView({ behavior: "smooth", block: "center" }); }
        }}, "Ilmoittaudu"),
      ]));
    });
    // täytä ilmoittautumislomakkeen valikko
    const sel = $("#wsSelect");
    if (sel) F.workshops.forEach((w) => sel.appendChild(h("option", { value: w.title }, `${w.day}.${w.mon} — ${w.title}`)));
  }

  /* ===================================================================
     GALLERIA (galleria.html)
     =================================================================== */
  const GALLERY = [
    { img: "assets/images/kimppu-04-elegantti.jpg", cap: "Eleganssi" },
    { img: "assets/images/kimppu-06-haakukat.jpg", cap: "Hääaamu" },
    { img: "assets/images/kimppu-03-varikas.jpg", cap: "Karnevaali" },
    { img: "assets/images/referenssi-mies.jpg", cap: "Referenssi" },
    { img: "assets/images/kimppu-08-tropiikki.jpg", cap: "Tropiikki" },
    { img: "assets/images/kimppu-05-peltokukat.jpg", cap: "Peltokukat" },
    { img: "assets/images/myymala.jpg", cap: "Ateljee" },
    { img: "assets/images/kimppu-09-lilja.jpg", cap: "Liljametsä" },
    { img: "assets/images/pakkaus.jpg", cap: "Paperikääre" },
    { img: "assets/images/kimppu-11-varikas.jpg", cap: "Villi Niitty" },
    { img: "assets/images/workshops.jpg", cap: "Workshop" },
    { img: "assets/images/kukka-auto.jpg", cap: "Kukka-auto" },
  ];
  function initGallery() {
    const wrap = $("[data-gallery]");
    if (!wrap) return;
    GALLERY.forEach((g) => {
      wrap.appendChild(h("figure", { onclick: () => openLightbox(g.img, g.cap) }, [
        h("img", { src: g.img, alt: g.cap, loading: "lazy" }),
        h("figcaption", {}, g.cap),
      ]));
    });
  }
  function openLightbox(src, cap) {
    const box = h("div", { class: "cart-overlay open", style: "display:flex;align-items:center;justify-content:center;padding:5vw",
      onclick: (e) => { if (e.target === box) box.remove(); } }, [
      h("img", { src, alt: cap, style: "max-width:90vw;max-height:88vh;border-radius:18px;box-shadow:var(--shadow)" }),
    ]);
    document.body.appendChild(box);
  }

  /* ===================================================================
     LOMAKKEET (demo: ei lähetä)
     =================================================================== */
  function initForms() {
    $$("form[data-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ok = form.querySelector("[data-success]");
        if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        form.reset();
      });
    });
  }

  /* ===================================================================
     INIT
     =================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    renderNav();
    renderFooter();
    renderIcons();
    renderFlowers();
    renderMarquee();
    updateCartUI();
    initShop();
    initFeatured();
    initServices();
    initSpecials();
    initTestimonials();
    initBuilder();
    initCalculator();
    initWorkshops();
    initGallery();
    initForms();
  });
})();
