// // ─── THEME TOGGLE ───
// const themeToggleBtn = document.getElementById("themeToggle");
// const themeIcon = themeToggleBtn.querySelector(".theme-icon");

// // Load saved preference
// const savedTheme = localStorage.getItem("theme") || "dark";
// if (savedTheme === "light") {
//   document.body.classList.add("light-theme");
//   themeIcon.textContent = "☀️";
// }

// themeToggleBtn.addEventListener("click", () => {
//   const isLight = document.body.classList.toggle("light-theme");
//   themeIcon.textContent = isLight ? "☀️" : "🌙";
//   localStorage.setItem("theme", isLight ? "light" : "dark");
// });

// // ─── LANGUAGE SYSTEM ───
// let currentLang = "en";

// function applyLanguage(lang) {
//   currentLang = lang;
//   const html = document.getElementById("htmlRoot");

//   if (lang === "ar") {
//     html.setAttribute("lang", "ar");
//     html.setAttribute("dir", "rtl");
//     document.body.classList.add("rtl");
//   } else {
//     html.setAttribute("lang", "en");
//     html.setAttribute("dir", "ltr");
//     document.body.classList.remove("rtl");
//   }

//   // Update all elements with data-en / data-ar attributes
//   document.querySelectorAll("[data-en]").forEach((el) => {
//     const text = el.getAttribute(`data-${lang}`);
//     if (!text) return;
//     if (text.includes("<br") || text.includes("&")) {
//       el.innerHTML = text;
//     } else {
//       el.textContent = text;
//     }
//   });

//   // Update placeholders
//   document.querySelectorAll(`[data-placeholder-${lang}]`).forEach((el) => {
//     el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
//   });

//   // Update select options
//   document.querySelectorAll("select option[data-en]").forEach((opt) => {
//     const text = opt.getAttribute(`data-${lang}`);
//     if (text) opt.textContent = text;
//   });

//   // Update page title
//   const titleEl = document.querySelector("title");
//   const titleText = titleEl.getAttribute(`data-${lang}`);
//   if (titleText) document.title = titleText;

//   // Toggle lang button label
//   document.querySelector(".lang-en").style.display =
//     lang === "en" ? "inline" : "none";
//   document.querySelector(".lang-ar").style.display =
//     lang === "ar" ? "inline" : "none";
// }

// document.getElementById("langToggle").addEventListener("click", () => {
//   applyLanguage(currentLang === "en" ? "ar" : "en");
// });

// // ─── NAV SCROLL ───
// const nav = document.getElementById("mainNav");
// window.addEventListener("scroll", () => {
//   nav.classList.toggle("scrolled", window.scrollY > 60);
// });

// // ─── MOBILE NAV TOGGLE ───
// document.getElementById("navToggle").addEventListener("click", () => {
//   document.querySelector(".nav-links").classList.toggle("open");
// });

// // ─── INTERSECTION OBSERVER ───
// const revealEls = document.querySelectorAll(".reveal");
// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((e) => {
//       if (e.isIntersecting) {
//         e.target.classList.add("visible");
//         observer.unobserve(e.target);
//       }
//     });
//   },
//   { threshold: 0.12 },
// );
// revealEls.forEach((el) => observer.observe(el));
// ─── THEME TOGGLE ───
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");

// Load saved preference
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.textContent = "☀️";
}

themeToggleBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
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

  // Update all elements with data-en / data-ar attributes
  document.querySelectorAll("[data-en]").forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;
    if (text.includes("<br") || text.includes("&")) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  // Update placeholders
  document.querySelectorAll(`[data-placeholder-${lang}]`).forEach((el) => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });

  // Update select options
  document.querySelectorAll("select option[data-en]").forEach((opt) => {
    const text = opt.getAttribute(`data-${lang}`);
    if (text) opt.textContent = text;
  });

  // Update page title
  const titleEl = document.querySelector("title");
  const titleText = titleEl.getAttribute(`data-${lang}`);
  if (titleText) document.title = titleText;

  // Toggle lang button label
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
  { threshold: 0.12 },
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
  const clipTop = 56; // hides Google's teal header
  const clipBottom = 72; // hides "Google Forms" branding footer

  const containerW = wrapper.clientWidth;
  const scale = containerW / nativeW;

  // Visible height = scaled content minus clipped portions
  const visibleH = nativeH * scale - (clipTop + clipBottom);

  // Apply scale to scaler div
  scaler.style.transform = `scale(${scale})`;
  scaler.style.width = nativeW + "px";
  scaler.style.height = nativeH + "px";

  // Update clip (values are in post-scale pixels)
  const clipTopPx = Math.round(clipTop / scale);
  const clipBottomPx = Math.round(clipBottom / scale);
  scaler.style.clipPath = `inset(${clipTopPx}px 0 ${clipBottomPx}px 0)`;
  scaler.style.marginTop = `-${clipTopPx}px`;

  // Set wrapper height to the true visible area
  wrapper.style.height = Math.round(visibleH) + "px";
}

scaleGForm();
window.addEventListener("resize", scaleGForm);
