// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pixxen roofing control js start
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const heading = document.querySelector(".roofing-hero-title");
  const heroImg = document.querySelector(".roofing-hero-img");

  const split = new SplitText(heading, {
    type: "lines",
    linesClass: "split-line",
    mask: "lines",
  });

  gsap.set(heroImg, { scale: 1.08, opacity: 0, filter: "blur(8px)" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  tl.fromTo(split.lines,
      { yPercent: 110, opacity: 0, filter: "blur(6px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.12, ease: "power4.out" },
      0
    )

    .to(heroImg, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power3.out",
    }, 0)

    .from(".roofing-hero-desc", {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.6)

    // CTA button — fades/rises in with a light blur, sits between desc and price
    .fromTo(".roofing-hero-cta",
      { y: 16, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
      0.75
    )

    .from(".roofing-hero-price", {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.95)

    .from(".roofing-hero-check-item", {
      x: -16,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    }, 1.15);
});

// 
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headings = gsap.utils.toArray(".roofing-heading-reveal");

  headings.forEach((heading) => {
    let split;

    const createAnimation = () => {
      // Clean up the previous SplitText instance
      if (split) {
        split.revert();
      }

      // Create a new split based on the current screen width
      split = new SplitText(heading, {
        type: "lines",
        linesClass: "split-line",
        mask: "lines",
      });

      // Set initial state
      gsap.set(split.lines, {
        yPercent: 110,
        opacity: 0,
      });

      // Create animation
      gsap.to(split.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    };

    createAnimation();

    // Re-split when the window is resized
    let resizeTimer;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        // Kill existing ScrollTrigger for this heading
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === heading) {
            trigger.kill();
          }
        });

        createAnimation();

        // Refresh ScrollTrigger positions
        ScrollTrigger.refresh();
      }, 250);
    });
  });
});


// Roofing niche image rotate
document.querySelectorAll('.roofing-spacification-niche').forEach(row => {
  const img = row.querySelector('img');
  const base = gsap.getProperty(img, "rotation"); // or set manually
  row.addEventListener('mouseenter', () => gsap.to(img, { rotation: -5, duration: 0.5, ease: "power2.out" }));
  row.addEventListener('mouseleave', () => gsap.to(img, { rotation: base, duration: 0.5, ease: "power2.out" }));
});


// 
(function () {
  const list = document.getElementById("roofing-faq-list");
  if (!list) return;

  const items = list.querySelectorAll(".roofing-faq-item");

  function setOpen(item, open) {
    const trigger = item.querySelector(".roofing-faq-trigger");
    const panel = item.querySelector(".roofing-faq-panel");
    const icon = item.querySelector(".roofing-faq-icon");
    const title = item.querySelector(".roofing-faq-title");

    trigger.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("grid-rows-[0fr]", !open);
    panel.classList.toggle("grid-rows-[1fr]", open);
    
    // Rotate plus icon into an "x" when open
    icon.classList.toggle("rotate-45", open);

    // Toggle title text color
    title.classList.toggle("text-[#1B59DA]", open);
    title.classList.toggle("text-[#1F2021]", !open);
  }

  items.forEach((item) => {
    item.querySelector(".roofing-faq-trigger").addEventListener("click", () => {
      const trigger = item.querySelector(".roofing-faq-trigger");
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // One open at a time: close the others first
      items.forEach((other) => {
        if (other !== item) setOpen(other, false);
      });
      setOpen(item, !isOpen);
    });
  });
})();