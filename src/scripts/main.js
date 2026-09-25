/* ==========================================================================
   TraceIT — Interacciones
   Vanilla JS, sin dependencias. La clase .js la añade un script en línea del layout.
   Astro lo empaqueta y minifica. Todo es mejora progresiva: sin JS la web
   sigue siendo navegable y el contenido visible.
   ========================================================================== */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* Cabecera: fondo de cristal al hacer scroll ----------------------------- */
  const header = document.querySelector(".site-header");
  const updateHeader = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  requestAnimationFrame(updateHeader);
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Menú móvil ------------------------------------------------------------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      menu.inert = !open;
    };
    menu.inert = true;
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => e.matches && setOpen(false));
  }

  /* Apariciones al hacer scroll ------------------------------------------- */
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    [...group.children].forEach((child, i) => {
      if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", group.dataset.stagger || "");
      child.style.setProperty("--i", i);
    });
  });

  const revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* Proceso: la línea se "traza" con el scroll ----------------------------- */
  const steps = document.querySelector("[data-steps]");
  if (steps) {
    const items = [...steps.querySelectorAll(".step")];
    let queued = false;
    const update = () => {
      queued = false;
      const rect = steps.getBoundingClientRect();
      const front = window.innerHeight * 0.62;
      const progress = Math.min(1, Math.max(0, (front - rect.top) / rect.height));
      steps.style.setProperty("--p", progress.toFixed(4));
      items.forEach((item) => {
        const node = item.querySelector(".step__node").getBoundingClientRect();
        item.classList.toggle("is-active", node.top + node.height / 2 <= front);
      });
    };
    const request = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  /* Maqueta del hero: inclinación 3D suave siguiendo el ratón -------------- */
  const mock = document.querySelector("[data-tilt]");
  if (mock && finePointer && !reduceMotion) {
    const area = mock.closest("section") || mock;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      mock.style.setProperty("--rx", `${(y * -5).toFixed(2)}deg`);
      mock.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      mock.style.setProperty("--mx", x.toFixed(3));
      mock.style.setProperty("--my", y.toFixed(3));
    };
    area.addEventListener("pointermove", (e) => {
      const r = area.getBoundingClientRect();
      x = (e.clientX - r.left) / r.width - 0.5;
      y = (e.clientY - r.top) / r.height - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    });
    area.addEventListener("pointerleave", () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    });
  }

  /* Contadores de la maqueta ----------------------------------------------- */
  // Formato español con separador de miles también en números de 4 cifras (1.284)
  const fmt = (n, decimals) => {
    const [int, dec] = n.toFixed(decimals).split(".");
    return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? "," + dec : "");
  };
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = fmt(target, decimals) + suffix;
      return;
    }
    const duration = 1800;
    const delay = 700;
    let start = null;
    const tick = (t) => {
      if (start === null) start = t;
      const p = Math.min(1, Math.max(0, (t - start - delay) / duration));
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  /* Foco de luz que sigue al cursor en tarjetas ---------------------------- */
  if (finePointer) {
    document.querySelectorAll(".spot").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--sx", `${e.clientX - r.left}px`);
        card.style.setProperty("--sy", `${e.clientY - r.top}px`);
      });
    });
  }

  /* Proyectos: filtros ----------------------------------------------------- */
  const filterBar = document.querySelector("[data-filter]");
  if (filterBar) {
    const cards = [...document.querySelectorAll("[data-cat]")];
    const live = document.querySelector("[data-filter-status]");
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-value]");
      if (!btn) return;
      const value = btn.dataset.value;
      const apply = () => {
        filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        let visible = 0;
        cards.forEach((card) => {
          const show = value === "todos" || card.dataset.cat.split(" ").includes(value);
          card.hidden = !show;
          if (show) visible++;
        });
        if (live) live.textContent = `${visible} ${visible === 1 ? "proyecto" : "proyectos"}`;
      };
      if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply);
      else apply();
    });
  }

  /* Pestañas (sectores): patrón ARIA tabs con teclado ---------------------- */
  document.querySelectorAll("[data-tabs]").forEach((wrap) => {
    const tabs = [...wrap.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).classList.toggle("is-active", on);
      });
      if (focus) tab.focus();
    };
    wrap.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      select(tab, false);
      // En móvil la ficha va debajo de los sectores: si queda fuera de la vista, se desplaza hasta ella
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel.getBoundingClientRect().top > window.innerHeight * 0.75) {
        panel.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
    wrap.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      let next = null;
      if (step) next = (i + step + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(tabs[next], true);
    });
  });

  /* Formulario de contacto (Web3Forms) ------------------------------------- */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const status = form.querySelector("[data-status]");
    const submit = form.querySelector('[type="submit"]');
    const success = document.querySelector("[data-form-success]");
    const messages = {
      valueMissing: "Este campo es obligatorio.",
      typeMismatch: "Introduce un email válido, por ejemplo nombre@empresa.com.",
      consent: "Necesitamos tu consentimiento para poder responderte.",
    };
    let attempted = false;

    const validateField = (input) => {
      const wrap = input.closest(".field, .consent");
      if (!wrap) return true;
      const error = wrap.querySelector(".field__error span");
      let msg = "";
      if (input.validity.valueMissing) msg = input.type === "checkbox" ? messages.consent : messages.valueMissing;
      else if (input.validity.typeMismatch) msg = messages.typeMismatch;
      wrap.classList.toggle("is-invalid", Boolean(msg));
      input.setAttribute("aria-invalid", String(Boolean(msg)));
      if (error) error.textContent = msg;
      return !msg;
    };

    const required = [...form.querySelectorAll("[required]")];
    required.forEach((input) => {
      const evt = input.type === "checkbox" ? "change" : "input";
      input.addEventListener(evt, () => attempted && validateField(input));
      input.addEventListener("blur", () => attempted && validateField(input));
    });

    const collect = () => {
      const data = new FormData(form);
      const merged = new FormData();
      for (const key of new Set(data.keys())) merged.append(key, data.getAll(key).join(", "));
      return merged;
    };

    const mailtoFallback = (data) => {
      const to = form.dataset.fallbackEmail;
      const lines = [];
      for (const [key, value] of data.entries()) {
        if (["access_key", "botcheck", "subject", "from_name", "consentimiento"].includes(key) || !value) continue;
        lines.push(`${key}: ${value}`);
      }
      const url = `mailto:${to}?subject=${encodeURIComponent("Nuevo proyecto — contacto desde la web")}&body=${encodeURIComponent(lines.join("\n"))}`;
      window.location.href = url;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      attempted = true;
      const results = required.map(validateField);
      if (results.includes(false)) {
        const firstInvalid = required[results.indexOf(false)];
        firstInvalid.focus();
        status.textContent = "Revisa los campos marcados.";
        return;
      }
      status.textContent = "";
      const data = collect();
      if (data.get("botcheck")) return;

      const key = String(data.get("access_key") || "");
      if (!key || key.startsWith("TU_")) {
        mailtoFallback(data);
        status.textContent = "Se abrirá tu programa de correo con el mensaje preparado. Si no se abre, escríbenos a " + form.dataset.fallbackEmail + ".";
        return;
      }

      const original = submit.innerHTML;
      submit.disabled = true;
      submit.innerHTML = 'Enviando <svg class="icon spin" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
      try {
        const res = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || "Error");
        form.hidden = true;
        success.hidden = false;
        success.querySelector("h2").focus();
      } catch (err) {
        status.textContent =
          "No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos directamente a " + form.dataset.fallbackEmail + ".";
      } finally {
        submit.disabled = false;
        submit.innerHTML = original;
      }
    });
  }

  /* Año actual en el pie --------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
