// // NAV SCROLL
// const nav = document.getElementById("mainNav");

// window.addEventListener("scroll", () => {
//   nav.classList.toggle("scrolled", window.scrollY > 60);
// });

// // INTERSECTION OBSERVER
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

// // FORM
// document.getElementById("submitBtn").addEventListener("click", () => {
//   const name = document.getElementById("fullName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const area = document.getElementById("practiceArea").value;

//   if (!name || !email || !area) {
//     return;
//   }

//   document.getElementById("formContent").style.display = "none";
//   document.getElementById("formSuccess").classList.add("show");
// });
// ─── EMAILJS INIT ───
// Replace these with your actual EmailJS credentials
// Sign up free at https://www.emailjs.com
// Service ID: create a service connected to Gmail
// Template ID: create a template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{company}}, {{practice_area}}, {{message}}
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // e.g. "abcDEF123456"

emailjs.init(EMAILJS_PUBLIC_KEY);

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
    // Use innerHTML to support <br/> in translations
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

// ─── FORM SUBMIT via EmailJS ───
document.getElementById("submitBtn").addEventListener("click", () => {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const company = document.getElementById("company").value.trim();
  const area = document.getElementById("practiceArea").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !area) {
    // Simple validation highlight
    if (!name)
      document.getElementById("fullName").style.borderColor =
        "rgba(255,80,80,0.6)";
    if (!email)
      document.getElementById("email").style.borderColor =
        "rgba(255,80,80,0.6)";
    if (!area)
      document.getElementById("practiceArea").style.borderColor =
        "rgba(255,80,80,0.6)";
    return;
  }

  const btn = document.getElementById("submitBtn");
  const originalText = btn.innerHTML;
  btn.innerHTML =
    currentLang === "ar"
      ? "<span>جارٍ الإرسال...</span>"
      : "<span>Sending...</span>";
  btn.disabled = true;

  const templateParams = {
    from_name: name,
    from_email: email,
    phone: phone || "—",
    company: company || "—",
    practice_area: area,
    message: message || "—",
    to_email: "aya.abdelgoad@gmail.com",
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      document.getElementById("formContent").style.display = "none";
      document.getElementById("formSuccess").classList.add("show");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      btn.innerHTML =
        currentLang === "ar"
          ? "<span>حدث خطأ — حاول مجدداً →</span>"
          : "<span>Error — Please try again →</span>";
      btn.disabled = false;
      btn.style.background = "rgba(255,80,80,0.7)";
    });
});

// Reset red borders on focus
["fullName", "email", "practiceArea"].forEach((id) => {
  document.getElementById(id).addEventListener("focus", function () {
    this.style.borderColor = "";
  });
});
