// Aga Luna — shared interactions

const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".primary-nav");

// Active navigation
const page = body.dataset.page;
if (page) {
  document.querySelector(`[data-nav="${page}"]`)?.classList.add("active");
}

// Sticky-header state
function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Mobile navigation
function closeMenu() {
  if (!nav || !navToggle) return;
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  body.classList.remove("menu-open");
}

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const willOpen = !nav.classList.contains("open");
    nav.classList.toggle("open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
    body.classList.toggle("menu-open", willOpen);
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      navToggle.focus();
    }
  });
}

// Home page "Meet Aga" disclosure
const accordionButton = document.querySelector(".accordion-trigger");
const accordionPanel = document.querySelector("#home-about");

if (accordionButton && accordionPanel) {
  accordionButton.addEventListener("click", () => {
    const isOpen = accordionButton.getAttribute("aria-expanded") === "true";
    accordionButton.setAttribute("aria-expanded", String(!isOpen));
    accordionPanel.hidden = isOpen;

    if (!isOpen) {
      requestAnimationFrame(() => {
        accordionPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  });
}

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Current year
document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

const packageTrigger = document.querySelector(".package-trigger");
const packagePanel = document.querySelector("#package-options");

if (packageTrigger && packagePanel) {
  packageTrigger.addEventListener("click", () => {
    const isOpen =
      packageTrigger.getAttribute("aria-expanded") === "true";

    packageTrigger.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );
    packagePanel.hidden = isOpen;
  });
}
