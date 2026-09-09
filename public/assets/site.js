const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const revealItems = [...document.querySelectorAll(".reveal")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const precisePointer = window.matchMedia("(pointer: fine)");

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });
  });
});

let wheelDistance = 0;
let wheelLocked = false;
let wheelResetTimer;

function closestSectionIndex() {
  return sections.reduce((closest, section, index) => {
    const currentDistance = Math.abs(section.offsetTop - window.scrollY);
    const closestDistance = Math.abs(sections[closest].offsetTop - window.scrollY);
    return currentDistance < closestDistance ? index : closest;
  }, 0);
}

function animateToSection(section, onComplete) {
  const start = window.scrollY;
  const destination = section.offsetTop;
  const distance = destination - start;
  const duration = 980;
  const startedAt = performance.now();

  document.documentElement.classList.add("is-auto-scrolling");

  function frame(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(frame);
      return;
    }

    window.scrollTo(0, destination);
    document.documentElement.classList.remove("is-auto-scrolling");
    onComplete();
  }

  window.requestAnimationFrame(frame);
}

window.addEventListener("wheel", (event) => {
  if (!precisePointer.matches || reducedMotion.matches || event.ctrlKey) return;

  event.preventDefault();
  window.clearTimeout(wheelResetTimer);

  if (wheelLocked) return;

  wheelDistance += event.deltaY;
  wheelResetTimer = window.setTimeout(() => {
    wheelDistance = 0;
  }, 140);

  if (Math.abs(wheelDistance) < 34) return;

  const direction = wheelDistance > 0 ? 1 : -1;
  const currentIndex = closestSectionIndex();
  const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
  wheelDistance = 0;

  if (nextIndex === currentIndex) return;

  wheelLocked = true;
  animateToSection(sections[nextIndex], () => {
    window.setTimeout(() => {
      wheelLocked = false;
    }, 320);
  });
}, { passive: false });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { threshold: [0.45, 0.7] }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.setTimeout(() => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}, 1200);
