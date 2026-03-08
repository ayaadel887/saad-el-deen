// NAV SCROLL
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// INTERSECTION OBSERVER
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

// FORM
document.getElementById("submitBtn").addEventListener("click", () => {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const area = document.getElementById("practiceArea").value;

  if (!name || !email || !area) {
    return;
  }

  document.getElementById("formContent").style.display = "none";
  document.getElementById("formSuccess").classList.add("show");
});
