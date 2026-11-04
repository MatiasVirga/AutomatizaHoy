/* =========================================================================
   AutomatizaHoy — main.js
   Sin dependencias. Todo se inicializa cuando el DOM está listo.
   ========================================================================= */

/**
 * CONFIGURACIÓN RÁPIDA
 * Cambiá acá el número de WhatsApp y el email y se actualiza en TODA la web.
 * Formato del número: código de país + área + número, sin +, sin 0, sin espacios.
 * Ejemplo Argentina (CABA): 5491123456789
 */
const CONFIG = {
  // Vacío = los botones llevan al formulario de contacto hasta que pongas tu número.
  whatsapp: "5491160186481", // ← Ej.: "5491123456789" (país + área + número, sin + ni espacios)
  email: "hola@automatizahoy.com.ar", // ← REEMPLAZAR si usás otro buzón
};

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- utils */
  const waLink = (message) => {
    const text = encodeURIComponent(message || "¡Hola! Quiero automatizar mi negocio.");
    return `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${text}`;
  };

  /* -------------------------------------------- 1. links de contacto ---- */
  function initContactLinks() {
    $$("[data-wa]").forEach((el) => {
      if (!CONFIG.whatsapp) return;
      el.setAttribute("href", waLink(el.dataset.waMsg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    $$("[data-mail]").forEach((el) => {
      el.setAttribute("href", `mailto:${CONFIG.email}`);
      // Reemplaza sólo el texto del email, sin borrar los íconos internos.
      el.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("@")) {
          node.textContent = node.textContent.replace(/\S+@\S+/, CONFIG.email);
        }
      });
    });
  }

  /* -------------------------------------------------- 2. barra de scroll */
  function initScrollUI() {
    const nav = $("#nav");
    const progress = $("#scrollProgress");
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("is-scrolled", y > 12);

      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(y / max, 1) : 0;
        progress.style.transform = `scaleX(${ratio})`;
      }
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /* ------------------------------------------------------- 3. menú móvil */
  function initMobileMenu() {
    const burger = $("#burger");
    const menu = $("#mobileMenu");
    const closeBtn = $("#menuClose");
    if (!burger || !menu) return;

    let hideTimer = null;

    const open = () => {
      clearTimeout(hideTimer);
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      burger.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Cerrar menú");
      document.body.classList.add("is-locked");
      closeBtn?.focus({ preventScroll: true });
    };

    const close = () => {
      menu.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("is-locked");
      hideTimer = setTimeout(() => {
        menu.hidden = true;
      }, prefersReduced ? 0 : 450);
    };

    const toggle = () => {
      if (menu.classList.contains("is-open")) close();
      else open();
    };

    burger.addEventListener("click", toggle);
    closeBtn?.addEventListener("click", close);

    $$("a", menu).forEach((link) => link.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        close();
        burger.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860 && menu.classList.contains("is-open")) close();
    });
  }

  /* ------------------------------------------------ 4. aparición al scroll */
  function initReveal() {
    const items = $$("[data-reveal]");
    if (!items.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------- 5. contadores ---- */
  function initCounters() {
    const nodes = $$("[data-count]");
    if (!nodes.length) return;

    const animate = (el) => {
      const target = Number(el.dataset.count) || 0;
      if (prefersReduced || target === 0) {
        el.textContent = String(target);
        return;
      }
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(animate);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.7 }
    );

    nodes.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------- 6. acordeón ----- */
  function initAccordion() {
    const buttons = $$(".acc__btn");
    if (!buttons.length) return;

    const closePanel = (btn) => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel || btn.getAttribute("aria-expanded") !== "true") return;

      btn.setAttribute("aria-expanded", "false");
      panel.style.height = `${panel.scrollHeight}px`;
      void panel.offsetHeight; // reflow
      panel.style.height = "0px";

      const finish = (e) => {
        if (e.target !== panel) return;
        panel.hidden = true;
        panel.style.height = "";
        panel.removeEventListener("transitionend", finish);
      };
      panel.addEventListener("transitionend", finish);
    };

    const openPanel = (btn) => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;

      btn.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      panel.style.height = "0px";
      requestAnimationFrame(() => {
        panel.style.height = `${panel.scrollHeight}px`;
      });

      const finish = (e) => {
        if (e.target !== panel) return;
        panel.style.height = "auto";
        panel.removeEventListener("transitionend", finish);
      };
      panel.addEventListener("transitionend", finish);
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        buttons.forEach((other) => closePanel(other));
        if (!isOpen) openPanel(btn);
      });
    });
  }

  /* ------------------------------------------------ 7. spotlight tarjetas */
  function initSpotlight() {
    if (prefersReduced) return;
    $$("[data-spotlight]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ------------------------------------------- 8. sección activa en el nav */
  function initActiveLink() {
    const links = $$(".nav__links a");
    if (!links.length || !("IntersectionObserver" in window)) return;

    const map = new Map();
    links.forEach((link) => {
      const id = link.getAttribute("href");
      const section = id && id.startsWith("#") ? $(id) : null;
      if (section) map.set(section, link);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.remove("is-active"));
          map.get(entry.target)?.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    map.forEach((_, section) => io.observe(section));
  }

  /* ------------------------------------------------- 9. formulario ------ */
  function initForm() {
    const form = $("#contactForm");
    const note = $("#formNote");
    if (!form) return;

    if (!CONFIG.whatsapp) {
      if (note) {
        note.textContent = "Se abre tu email con el mensaje ya escrito. Nada de formularios eternos.";
      }
      const submitLabel = $("#submitLabel");
      if (submitLabel) submitLabel.textContent = "Enviar por email";
      const submitIcon = $('button[type="submit"] use', form);
      if (submitIcon) submitIcon.setAttribute("href", "#i-mail");
    }

    const setNote = (text, state) => {
      if (!note) return;
      note.textContent = text;
      note.classList.remove("is-error", "is-ok");
      if (state) note.classList.add(state);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.elements.namedItem("nombre");
      const negocio = form.elements.namedItem("negocio");
      const tarea = form.elements.namedItem("tarea");
      if (!nombre || !negocio || !tarea) return;

      let ok = true;

      [nombre, tarea].forEach((field) => {
        const valid = field.value.trim().length >= 2;
        field.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      });

      if (!ok) {
        setNote("Completá tu nombre y qué querés automatizar, por favor.", "is-error");
        (nombre.value.trim().length < 2 ? nombre : tarea).focus();
        return;
      }

      const msg =
        `¡Hola! Soy ${nombre.value.trim()}` +
        (negocio.value.trim() ? ` de ${negocio.value.trim()}` : "") +
        `.\n\nQuiero automatizar: ${tarea.value.trim()}`;

      if (CONFIG.whatsapp) {
        window.open(waLink(msg), "_blank", "noopener");
        setNote("Abrimos WhatsApp con el mensaje listo. ¡Nos vemos del otro lado!", "is-ok");
        form.reset();
      } else {
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
          "Quiero automatizar mi negocio"
        )}&body=${encodeURIComponent(msg)}`;
        setNote("Se abrió tu cliente de email con el mensaje listo.", "is-ok");
      }
    });

    $$("input, textarea", form).forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("is-invalid"));
    });
  }

  /* ---------------------------------- 10. comparador antes / después ---- */
  function initCompare() {
    const sliders = $$("[data-compare]");
    if (!sliders.length) return;

    const setPos = (root, value) => root.style.setProperty("--pos", `${value}%`);

    function hintSlider(root) {
      if (prefersReduced) return;
      const range = $(".cmp__range", root);
      if (!range || root.classList.contains("is-touched") || root.dataset.hinted === "1") return;

      root.dataset.hinted = "1";
      const start = performance.now();
      const duration = 1800;

      const tick = (now) => {
        if (root.classList.contains("is-touched")) {
          setPos(root, range.value);
          return;
        }
        const p = Math.min((now - start) / duration, 1);
        const v = Math.round(50 + 22 * Math.sin(p * Math.PI * 2) * (1 - p * 0.35));
        range.value = String(v);
        setPos(root, v);
        if (p < 1) requestAnimationFrame(tick);
        else {
          range.value = "50";
          setPos(root, 50);
        }
      };

      requestAnimationFrame(tick);
    }

    sliders.forEach((root) => {
      const range = $(".cmp__range", root);
      if (!range) return;

      setPos(root, range.value);

      const touch = () => root.classList.add("is-touched");
      range.addEventListener("input", () => {
        setPos(root, range.value);
        touch();
      });
      range.addEventListener("pointerdown", touch);
    });

    /* Pestañas: planilla diaria / resumen semanal */
    const tablist = $(".excel-tabs");
    if (tablist) {
      const tabs = $$(".excel-tab", tablist);

      const activate = (tab, focus) => {
        tabs.forEach((t) => {
          const on = t === tab;
          const panel = document.getElementById(t.getAttribute("aria-controls"));
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
          if (panel) panel.hidden = !on;
        });

        if (focus) tab.focus();
        const panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) hintSlider(panel);
      };

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => activate(tab, false));
        tab.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          const index = tabs.indexOf(tab);
          const next = tabs[(index + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
          activate(next, true);
        });
      });
    }

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          hintSlider(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.55 }
    );

    sliders.forEach((slider) => io.observe(slider));
  }

  /* ------------------------------------------------ 10. volver arriba --- */
  function initToTop() {
    const btn = $("#toTop");
    if (!btn) return;

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------ 11. año -------- */
  function initYear() {
    const el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* -------------------------------------------------------- init -------- */
  function init() {
    initContactLinks();
    initScrollUI();
    initMobileMenu();
    initReveal();
    initCounters();
    initAccordion();
    initSpotlight();
    initCompare();
    initActiveLink();
    initForm();
    initToTop();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
