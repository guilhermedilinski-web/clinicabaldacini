/* =========================================================
   Clínica Baldacini — scripts
   ========================================================= */

/* -----------------------------------------------------------
   1) CONFIGURAÇÃO DO WHATSAPP  ←  EDITE AQUI
   - Coloque o número com DDI + DDD, somente dígitos.
     Ex.: Brasil (41) 99999-8888  ->  "5541999998888"
   ----------------------------------------------------------- */
const WHATSAPP = {
  numero: "5511940121589",
  mensagem: "Olá! Gostaria de agendar uma consulta com a Dra. Iara Baldacini."
};

(function () {
  "use strict";

  // Aplica o link do WhatsApp em todos os elementos .js-whatsapp
  const waUrl =
    "https://wa.me/" + WHATSAPP.numero +
    "?text=" + encodeURIComponent(WHATSAPP.mensagem);
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.setAttribute("href", waUrl);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // Header com fundo ao rolar
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // Scroll reveal
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const sibs = [...entry.target.parentElement.querySelectorAll(".reveal")];
            entry.target.style.transitionDelay = Math.min(sibs.indexOf(entry.target), 4) * 80 + "ms";
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("in"));
  }

  // Indicador de progresso de scroll (rail lateral + barra de topo)
  const railFill = document.getElementById("railFill");
  const scrollTop = document.getElementById("scrollTop");
  const dots = [...document.querySelectorAll(".rail-dot")];
  const sections = dots.map((d) => document.querySelector(d.getAttribute("href")));

  function updateProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    if (railFill) railFill.style.height = pct * 100 + "%";
    if (scrollTop) scrollTop.style.width = pct * 100 + "%";

    const mark = window.scrollY + window.innerHeight * 0.35;
    let activeIndex = 0;
    sections.forEach((sec, i) => { if (sec && sec.offsetTop <= mark) activeIndex = i; });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === activeIndex);
      d.classList.toggle("passed", i < activeIndex);
    });
  }
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  // Carrosséis (Equipe e Espaço): 3 por vez no PC/TV, 1 no celular, troca a cada 8s + setas
  document.querySelectorAll("[data-carousel]").forEach(function (car) {
    const track = car.querySelector(".car-track");
    const slides = Array.prototype.slice.call(track ? track.children : []);
    const prev = car.querySelector(".car-prev");
    const next = car.querySelector(".car-next");
    if (!track || slides.length === 0) return;
    let index = 0;
    let timer = null;
    const delay = parseInt(car.getAttribute("data-autoplay"), 10) || 8000;

    function per() {
      return parseInt(getComputedStyle(car).getPropertyValue("--per"), 10) || 1;
    }
    function maxIndex() {
      return Math.max(0, slides.length - per());
    }
    function apply() {
      const w = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.style.transform = "translateX(" + -index * (w + gap) + "px)";
      const hide = maxIndex() <= 0;
      if (prev) prev.style.display = hide ? "none" : "";
      if (next) next.style.display = hide ? "none" : "";
    }
    function go(i) {
      const m = maxIndex();
      index = i > m ? 0 : i < 0 ? m : i;
      apply();
    }
    function start() {
      stop();
      if (slides.length > per()) timer = setInterval(function () { go(index + 1); }, delay);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    if (prev) prev.addEventListener("click", function () { go(index - 1); start(); });
    if (next) next.addEventListener("click", function () { go(index + 1); start(); });
    car.addEventListener("mouseenter", stop);
    car.addEventListener("mouseleave", start);
    let rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { index = Math.min(index, maxIndex()); apply(); }, 150);
    });
    apply();
    start();
  });

  // Ano no rodapé
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
