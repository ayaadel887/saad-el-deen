// ─── THEME TOGGLE ───
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");

// Default is LIGHT. Only apply dark if user explicitly saved it.
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeIcon.textContent = "☀️";
} else {
  themeIcon.textContent = "🌙";
}

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ─── LANGUAGE SYSTEM ───
let currentLang = "en";

function applyLanguage(lang) {
  currentLang = lang;
  const html = document.getElementById("htmlRoot");

  if (lang === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }

  document.querySelectorAll("[data-en]").forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;
    if (text.includes("<br") || text.includes("&")) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll(`[data-placeholder-${lang}]`).forEach((el) => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });

  document.querySelectorAll("select option[data-en]").forEach((opt) => {
    const text = opt.getAttribute(`data-${lang}`);
    if (text) opt.textContent = text;
  });

  const titleEl = document.querySelector("title");
  const titleText = titleEl.getAttribute(`data-${lang}`);
  if (titleText) document.title = titleText;

  document.querySelector(".lang-en").style.display =
    lang === "en" ? "inline" : "none";
  document.querySelector(".lang-ar").style.display =
    lang === "ar" ? "inline" : "none";
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLanguage(currentLang === "en" ? "ar" : "en");
});

// ─── NAV SCROLL ───
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// ─── MOBILE NAV TOGGLE ───
document.getElementById("navToggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});

// Close mobile nav when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("open");
  });
});

// ─── INTERSECTION OBSERVER ───
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
revealEls.forEach((el) => observer.observe(el));

// ─── GOOGLE FORM RESPONSIVE SCALING ───
function scaleGForm() {
  const wrapper = document.getElementById("gformWrapper");
  const scaler = document.getElementById("iframeScaler");
  const iframe = document.getElementById("gformIframe");
  if (!wrapper || !scaler || !iframe) return;

  const nativeW = 640;
  const nativeH = 1127;
  const clipTop = 56;
  const clipBottom = 72;

  const containerW = wrapper.clientWidth;
  const scale = containerW / nativeW;
  const visibleH = nativeH * scale - (clipTop + clipBottom);

  scaler.style.transform = `scale(${scale})`;
  scaler.style.width = nativeW + "px";
  scaler.style.height = nativeH + "px";

  const clipTopPx = Math.round(clipTop / scale);
  const clipBottomPx = Math.round(clipBottom / scale);
  scaler.style.clipPath = `inset(${clipTopPx}px 0 ${clipBottomPx}px 0)`;
  scaler.style.marginTop = `-${clipTopPx}px`;

  wrapper.style.height = Math.round(visibleH) + "px";
}

scaleGForm();
window.addEventListener("resize", scaleGForm);
