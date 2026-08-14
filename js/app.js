(() => {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];

  const escapeHTML = (value = "") =>
    String(value).replace(
      /[&<>'"]/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[character],
    );

  const icon = (name, size) =>
    `<i data-lucide="${escapeHTML(name)}"${size ? ` data-size="${size}"` : ""} aria-hidden="true"></i>`;

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons({
        attrs: { "stroke-width": 1.8 },
      });
    }
  }

  function renderToolMarquee() {
    const target = $("#tool-marquee");
    if (!target) return;

    const group = (hidden = false) => `
      <div class="marquee-group"${hidden ? ' aria-hidden="true"' : ""}>
        ${data.tools
          .map(
            (tool) => `
          <span class="tool">
            <span class="tool-logo"><img src="${escapeHTML(tool.icon)}" alt="" /></span>
            <span>${escapeHTML(tool.name)}</span>
          </span>
        `,
          )
          .join("")}
      </div>`;

    target.innerHTML = group() + group(true);
  }

  function renderServices() {
    const target = $("#services-grid");
    if (!target) return;

    target.innerHTML = data.services
      .map(
        (service, index) => `
      <article class="expertise-card ${service.featured ? "featured" : ""} reveal" style="--delay:${index * 80}ms">
        <div class="card-topline"><span>${escapeHTML(service.number)}</span>${icon(service.icon)}</div>
        <div>
          <h3>${escapeHTML(service.title)}</h3>
          <p>${escapeHTML(service.description)}</p>
        </div>
        <ul>${service.points.map((point) => `<li>${icon("check", 15)} ${escapeHTML(point)}</li>`).join("")}</ul>
        ${service.featured ? `<a href="#contact">Discuss a dashboard ${icon("arrow-up-right", 18)}</a>` : ""}
      </article>
    `,
      )
      .join("");
  }

  function findProject(projectId) {
    return data.projects.find((project) => project.id === projectId);
  }

  function dashboardVisual(project, className = "") {
    const metrics = project.metrics || [];

    if (project.image) {
      const imageAlt = project.imageAlt || `${project.title} dashboard preview`;

      return `
    <div class="dashboard-art image-art ${className}">
      <img
        src="${escapeHTML(project.image)}"
        alt="${escapeHTML(imageAlt)}"
        loading="lazy"
        decoding="async"
        width="1600"
        height="900"
      />
    </div>
  `;
    }
    return `
      <div class="dashboard-art theme-${escapeHTML(project.theme || "ocean")} ${className}">
        <div class="art-browser"><span></span><span></span><span></span><b>4Sight / ${escapeHTML(project.category)}</b></div>
        <div class="art-body">
          <aside><strong>4S</strong><i></i><i></i><i></i><i></i><i></i></aside>
          <div class="art-canvas">
            <div class="art-heading"><div><small>EXECUTIVE INTELLIGENCE</small><b>${escapeHTML(project.shortTitle || project.title)}</b></div><span>● LIVE</span></div>
            <div class="art-metrics">
              ${metrics
                .slice(0, 3)
                .map(
                  (metric) =>
                    `<article><small>${escapeHTML(metric.label)}</small><strong>${escapeHTML(metric.value)}</strong><span>${escapeHTML(metric.delta)}</span></article>`,
                )
                .join("")}
            </div>
            <div class="art-panels">
              <div class="art-trend"><div><span>Performance trend</span><b>+18.6%</b></div><svg viewBox="0 0 520 170" aria-hidden="true"><path class="art-area" d="M0 143 C52 132 66 98 112 112 S184 82 226 91 S290 50 335 67 S402 39 438 49 S486 26 520 17 L520 170 L0 170Z"/><path class="art-line" d="M0 143 C52 132 66 98 112 112 S184 82 226 91 S290 50 335 67 S402 39 438 49 S486 26 520 17"/></svg><div class="art-axis"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span></div></div>
              <div class="art-side"><span>Contribution</span><div class="art-ring"><strong>72%</strong></div><div class="art-bars"><i></i><i></i><i></i></div></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderGlimpses() {
    const target = $("#glimpse-track");

    if (!target || !Array.isArray(data.glimpses)) return;

    const validGlimpses = data.glimpses.filter(
      (glimpse) =>
        typeof glimpse.image === "string" && glimpse.image.trim() !== "",
    );

    if (!validGlimpses.length) {
      target.innerHTML = `
      <p class="glimpse-empty">
        Add dashboard images in data/site-data.js.
      </p>
    `;

      return;
    }

    target.innerHTML = validGlimpses
      .map(
        (glimpse, index) => `
        <article
          class="glimpse-slide ${index === 0 ? "active" : ""}"
          data-slide-index="${index}"
          aria-label="${escapeHTML(
            glimpse.imageAlt || `Dashboard preview ${index + 1}`,
          )}"
        >
          <div class="glimpse-card">
            <div class="glimpse-visual">
              <div class="dashboard-art image-art glimpse-dashboard">
                <img
                  src="${escapeHTML(glimpse.image)}"
                  alt="${escapeHTML(
                    glimpse.imageAlt || `Dashboard preview ${index + 1}`,
                  )}"
                  loading="${index === 0 ? "eager" : "lazy"}"
                  decoding="async"
                  width="1600"
                  height="900"
                />
              </div>
            </div>
          </div>
        </article>
      `,
      )
      .join("");
  }
  function renderProjectFilters() {
    const target = $("#project-filter");

    if (
      !target ||
      !Array.isArray(data.projects) ||
      !Array.isArray(data.projectTypes)
    ) {
      return;
    }

    /*
     * Only show filters that currently have projects.
     * This prevents empty categories from appearing.
     */
    const availableTypes = data.projectTypes.filter(
      (type) =>
        type === "All" ||
        data.projects.some((project) => project.type === type),
    );

    target.innerHTML = availableTypes
      .map(
        (type, index) => `
        <button
          type="button"
          class="${index === 0 ? "active" : ""}"
          data-project-type="${escapeHTML(type)}"
          aria-pressed="${index === 0}"
        >
          ${escapeHTML(type)}
        </button>
      `,
      )
      .join("");
  }
  function renderProjects(projectType = "All") {
    const target = $("#projects-grid");

    if (!target || !Array.isArray(data.projects)) return;

    const projects =
      projectType === "All"
        ? data.projects
        : data.projects.filter((project) => project.type === projectType);

    if (!projects.length) {
      target.innerHTML = `
      <p class="projects-empty">
        No demos are available in this category yet.
      </p>
    `;

      return;
    }

    const createProjectCard = (project) => `
    <article
      class="project-card project-slide${
        project.image ? " has-project-image" : ""
      }"
      data-project="${escapeHTML(project.id)}"
    >
      <button
        type="button"
        aria-label="View ${escapeHTML(project.title)}"
      >
        <div class="project-visual">
          ${dashboardVisual(project, "project-dashboard")}

          <span class="project-open" aria-hidden="true">
            ${icon("expand", 20)}
          </span>
        </div>

        <div class="project-meta">
          <div>
            <span>
              ${escapeHTML(project.category)}
            </span>

            <h3>
              ${escapeHTML(project.title)}
            </h3>
          </div>

          <p>
            ${escapeHTML(project.description)}
          </p>
        </div>

        <div class="project-tags">
          ${(project.tags || [])
            .map(
              (tag) => `
                <span>${escapeHTML(tag)}</span>
              `,
            )
            .join("")}
        </div>
      </button>
    </article>
  `;

    target.innerHTML = `
    <div class="project-carousel">
      <div class="project-carousel-header">
        <div>
          <span>Demo library</span>

          <strong>
            ${String(projects.length).padStart(2, "0")}
            ${projects.length === 1 ? "project" : "projects"}
          </strong>
        </div>

        <div class="project-carousel-controls">
          <button
            type="button"
            data-project-prev
            aria-label="Previous project"
          >
            ${icon("arrow-left", 18)}
          </button>

          <button
            type="button"
            data-project-next
            aria-label="Next project"
          >
            ${icon("arrow-right", 18)}
          </button>
        </div>
      </div>

      <div class="project-carousel-track">
        ${projects.map(createProjectCard).join("")}
      </div>
    </div>
  `;

    $$("[data-project]", target).forEach((card) => {
      card.addEventListener("click", () => {
        openProject(card.dataset.project);
      });
    });

    setupProjectCarousel();
    refreshIcons();
  }
  function setupProjectCarousel() {
    const carousel = $(".project-carousel");
    if (!carousel) return;

    const track = $(".project-carousel-track", carousel);

    const previousButton = $("[data-project-prev]", carousel);

    const nextButton = $("[data-project-next]", carousel);

    if (!track) return;

    /*
     * Calculate the width of one project card plus its gap.
     */
    const getScrollDistance = () => {
      const firstCard = $(".project-slide", track);

      if (!firstCard) {
        return track.clientWidth;
      }

      const trackStyles = window.getComputedStyle(track);

      const gap = parseFloat(trackStyles.columnGap) || 0;

      return firstCard.getBoundingClientRect().width + gap;
    };

    /*
     * Disable the arrow that cannot scroll further.
     */
    const updateCarouselControls = () => {
      if (!previousButton || !nextButton) return;

      const maximumScroll = track.scrollWidth - track.clientWidth;

      previousButton.disabled = track.scrollLeft <= 4;

      nextButton.disabled = track.scrollLeft >= maximumScroll - 4;
    };

    previousButton?.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollDistance(),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });

    nextButton?.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollDistance(),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });

    track.addEventListener("scroll", updateCarouselControls, { passive: true });

    /*
     * Run after the browser has calculated the carousel width.
     */
    window.requestAnimationFrame(updateCarouselControls);
  }

  function renderSocialLinks() {
    const target = $("#social-links");
    if (!target) return;

    const socialIcons = {
      Facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14.5 8H17V4.5c-.43-.06-1.91-.18-3.67-.18-3.47 0-5.85 2.12-5.85 6.02V13H4v3.91h3.48V24h4.27v-7.09h3.54L15.85 13h-4.1v-2.27c0-1.13.31-1.9 1.94-1.9H14.5Z"
        />
      </svg>
    `,

      LinkedIn: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.5 8.3H3V21h3.5V8.3ZM4.75 3A2.04 2.04 0 1 0 4.75 7.08 2.04 2.04 0 0 0 4.75 3ZM21 13.72c0-3.82-2.04-5.6-4.77-5.6-2.2 0-3.18 1.21-3.73 2.06V8.3H9V21h3.5v-6.3c0-1.66.32-3.27 2.38-3.27 2.03 0 2.05 1.9 2.05 3.38V21H21v-7.28Z"
        />
      </svg>
    `,

      Instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle class="icon-fill" cx="17.4" cy="6.7" r="1.1" />
      </svg>
    `,

      WhatsApp: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.4 3.5A11.6 11.6 0 0 0 2.15 17.48L.5 23.5l6.17-1.62A11.6 11.6 0 0 0 20.4 3.5Z"
        />
        <path
          d="M8.25 6.7c-.23-.52-.48-.53-.7-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.15.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37l-2.25-1.05c-.3-.11-.53-.16-.75.16-.22.31-.84 1.05-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55L8.25 6.7Z"
          class="phone-mark"
        />
      </svg>
    `,
    };

    target.innerHTML = data.socialLinks
      .map((social) => {
        const icon = socialIcons[social.name];
        if (!icon) return "";

        return `
        <a
          class="social-link social-${social.name.toLowerCase()}"
          href="${escapeHTML(social.url)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow 4Sight Metrics on ${escapeHTML(social.name)}"
        >
          ${icon}
        </a>
      `;
      })
      .join("");
  }

  let testimonialIndex = 0;
  function renderTestimonial(index = 0) {
    const target = $("#testimonial-stage");
    if (!target || !data.testimonials.length) return;
    testimonialIndex =
      (index + data.testimonials.length) % data.testimonials.length;
    const testimonial = data.testimonials[testimonialIndex];

    target.innerHTML = `
      <article class="testimonial-card">
        <div class="quote-icon">“</div>
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>“${escapeHTML(testimonial.quote)}”</blockquote>
        <div class="testimonial-author">
          <span>${escapeHTML(testimonial.initials)}</span>
          <div><strong>${escapeHTML(testimonial.name)}</strong><small>${escapeHTML(testimonial.role)} · ${escapeHTML(testimonial.company)}</small></div>
        </div>
        <div class="testimonial-progress">${data.testimonials.map((_, dotIndex) => `<i class="${dotIndex === testimonialIndex ? "active" : ""}"></i>`).join("")}</div>
      </article>`;
  }

  function getSafeProjectUrl(value = "") {
    if (!value || typeof value !== "string") return "";

    try {
      const parsedUrl = new URL(value.trim(), window.location.href);

      const isSecure = parsedUrl.protocol === "https:";

      const isLocalDevelopment =
        parsedUrl.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(parsedUrl.hostname);

      if (!isSecure && !isLocalDevelopment) {
        console.warn("Blocked an unsafe project URL.");
        return "";
      }

      return parsedUrl.href;
    } catch (error) {
      console.warn("The project URL is invalid.", error);
      return "";
    }
  }
  // function getSafePowerBIEmbedUrl(value = "") {
  //   if (!value || typeof value !== "string") return "";

  //   try {
  //     const url = new URL(value);

  //     const isHTTPS = url.protocol === "https:";
  //     const isPowerBI = url.hostname === "app.powerbi.com";

  //     if (!isHTTPS || !isPowerBI) {
  //       console.warn("Blocked an invalid Power BI embed URL.");
  //       return "";
  //     }

  //     return url.href;
  //   } catch (error) {
  //     console.warn("The Power BI embed URL is invalid.", error);
  //     return "";
  //   }
  // }

  // function openProject(projectId) {
  //   const project = findProject(projectId);
  //   const modal = $("#project-modal");

  //   if (!project || !modal) return;

  //   const modalPreview = $("#modal-preview");
  //   const modalStatus = $("#modal-status");
  //   const embedUrl = getSafePowerBIEmbedUrl(project.embedUrl);

  //   $("#modal-title").textContent = project.title;
  //   $("#modal-description").textContent = project.description;

  //   $("#modal-tags").innerHTML = (project.tags || [])
  //     .map((tag) => `<span>${escapeHTML(tag)}</span>`)
  //     .join("");

  //   modalPreview.classList.toggle("has-report", Boolean(embedUrl));

  //   if (embedUrl) {
  //     modalPreview.innerHTML = `
  //     <div class="report-embed-shell">
  //       <iframe
  //         src="${escapeHTML(embedUrl)}"
  //         title="${escapeHTML(project.title)} interactive Power BI report"
  //         loading="eager"
  //         allow="fullscreen"
  //         allowfullscreen
  //         referrerpolicy="strict-origin-when-cross-origin"
  //       ></iframe>
  //     </div>
  //   `;

  //     modalStatus.hidden = true;
  //   } else {
  //     modalPreview.innerHTML = dashboardVisual(project, "modal-dashboard");

  //     modalStatus.hidden = false;
  //     modalStatus.textContent = "Interactive report coming soon.";
  //   }

  //   modal.showModal();
  //   document.body.classList.add("modal-open");
  //   refreshIcons();
  // }

  function openProject(projectId) {
    const project = findProject(projectId);
    const modal = $("#project-modal");

    if (!project || !modal) return;

    const modalPreview = $("#modal-preview");
    const modalStatus = $("#modal-status");

    /*
     * embedUrl takes priority when both properties exist.
     * Otherwise, the normal url property is used.
     */
    const projectSource = project.embedUrl?.trim() || project.url?.trim() || "";

    const projectUrl = getSafeProjectUrl(projectSource);

    $("#modal-title").textContent = project.title;
    $("#modal-description").textContent = project.description;

    $("#modal-tags").innerHTML = (project.tags || [])
      .map((tag) => `<span>${escapeHTML(tag)}</span>`)
      .join("");
    const isPowerBI =
      Boolean(projectUrl) && /^https:\/\/app\.powerbi\.com\//i.test(projectUrl);

    modalPreview.classList.toggle("has-report", Boolean(projectUrl));

    modal.classList.toggle("has-live-project", Boolean(projectUrl));
    modal.classList.toggle("has-web-app", Boolean(projectUrl) && !isPowerBI);
    modal.classList.toggle("has-power-bi", isPowerBI);

    if (projectUrl) {
      modalPreview.innerHTML = `
      <div class="report-embed-shell">
        <iframe
          src="${escapeHTML(projectUrl)}"
          title="${escapeHTML(project.title)} interactive demo"
          loading="eager"
          allow="fullscreen"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    `;

      modalStatus.hidden = true;
    } else {
      modalPreview.innerHTML = dashboardVisual(project, "modal-dashboard");

      modalStatus.hidden = false;
      modalStatus.textContent = "Interactive demo coming soon.";
    }

    modal.showModal();
    document.body.classList.add("modal-open");
    refreshIcons();
  }

  function setupHeader() {
    const header = $(".site-header");
    const nav = $("#site-nav");
    const toggle = $(".nav-toggle");
    const syncHeader = () =>
      header.classList.toggle("scrolled", window.scrollY > 18);

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );
      document.body.classList.toggle("nav-open", isOpen);
    });

    $$("a", nav).forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }),
    );
  }

  function setupReveal() {
    const items = $$(".reveal:not(.is-visible)");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -45px" },
    );

    items.forEach((item) => observer.observe(item));
  }

  function setupGlimpseSlider() {
    const slider = $("[data-glimpse-slider]");

    if (!slider) return;

    const track = $("#glimpse-track", slider);
    const originalSlides = $$(".glimpse-slide", track);
    const currentLabel = $("[data-current-slide]", slider);
    const totalLabel = $("[data-total-slides]", slider);
    const previousButton = $("[data-glimpse-prev]", slider);
    const nextButton = $("[data-glimpse-next]", slider);

    if (!track || !originalSlides.length) return;

    const AUTOPLAY_DELAY = 4000;
    const realSlideCount = originalSlides.length;

    let autoplayTimer;
    let scrollTimer;
    let isTeleporting = false;

    /*
     * Create invisible loop copies:
     * [last clone] [1] [2] [3] [4] [first clone]
     */
    if (realSlideCount > 1) {
      const firstClone = originalSlides[0].cloneNode(true);
      const lastClone = originalSlides[realSlideCount - 1].cloneNode(true);

      firstClone.dataset.loopClone = "first";
      lastClone.dataset.loopClone = "last";

      firstClone.setAttribute("aria-hidden", "true");
      lastClone.setAttribute("aria-hidden", "true");

      firstClone.classList.remove("active");
      lastClone.classList.remove("active");

      track.prepend(lastClone);
      track.append(firstClone);
    }

    const slides = $$(".glimpse-slide", track);

    /*
     * Physical position 1 is the actual first slide.
     * Position 0 is the cloned final slide.
     */
    let current = realSlideCount > 1 ? 1 : 0;

    if (totalLabel) {
      totalLabel.textContent = String(realSlideCount).padStart(2, "0");
    }

    function getLogicalIndex() {
      if (realSlideCount <= 1) return 0;

      return (
        (((current - 1) % realSlideCount) + realSlideCount) % realSlideCount
      );
    }

    function updateActiveSlide() {
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === current);
      });

      if (currentLabel) {
        currentLabel.textContent = String(getLogicalIndex() + 1).padStart(
          2,
          "0",
        );
      }
    }

    function getSlidePosition(slide) {
      return (
        slide.offsetLeft -
        Math.max(20, (track.clientWidth - slide.clientWidth) / 2)
      );
    }

    function scrollToCurrent(behavior = "smooth") {
      const slide = slides[current];

      if (!slide) return;

      track.scrollTo({
        left: getSlidePosition(slide),
        behavior: reducedMotion ? "auto" : behavior,
      });
    }

    /*
     * Move from a clone to its matching real slide.
     * Because both slides look identical, this reset is invisible.
     */
    function normalizeLoopPosition() {
      if (realSlideCount <= 1 || isTeleporting) return;

      let destination = null;

      if (current === 0) {
        destination = realSlideCount;
      } else if (current === slides.length - 1) {
        destination = 1;
      }

      if (destination === null) return;

      isTeleporting = true;
      current = destination;

      updateActiveSlide();
      scrollToCurrent("auto");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          isTeleporting = false;
        });
      });
    }

    function goTo(index, behavior = "smooth") {
      if (realSlideCount <= 1) return;

      current = Math.max(0, Math.min(index, slides.length - 1));

      updateActiveSlide();
      scrollToCurrent(behavior);

      if (behavior === "auto") {
        window.requestAnimationFrame(normalizeLoopPosition);
      }
    }

    function stopAutoplay() {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    function startAutoplay() {
      stopAutoplay();

      if (!reducedMotion && realSlideCount > 1) {
        autoplayTimer = window.setInterval(() => {
          goTo(current + 1);
        }, AUTOPLAY_DELAY);
      }
    }

    previousButton?.addEventListener("click", () => {
      goTo(current - 1);
      startAutoplay();
    });

    nextButton?.addEventListener("click", () => {
      goTo(current + 1);
      startAutoplay();
    });

    /*
     * Keep the active slide correct after mobile swiping.
     */
    track.addEventListener(
      "scroll",
      () => {
        if (isTeleporting) return;

        window.clearTimeout(scrollTimer);

        scrollTimer = window.setTimeout(() => {
          const trackCentre = track.scrollLeft + track.clientWidth / 2;

          let nearestIndex = 0;
          let nearestDistance = Infinity;

          slides.forEach((slide, index) => {
            const slideCentre = slide.offsetLeft + slide.clientWidth / 2;

            const distance = Math.abs(slideCentre - trackCentre);

            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = index;
            }
          });

          current = nearestIndex;
          updateActiveSlide();
          normalizeLoopPosition();
        }, 140);
      },
      { passive: true },
    );

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
    slider.addEventListener("focusin", stopAutoplay);
    slider.addEventListener("focusout", startAutoplay);

    track.addEventListener("pointerdown", stopAutoplay);
    track.addEventListener("pointerup", startAutoplay);
    track.addEventListener("pointercancel", startAutoplay);

    window.addEventListener("resize", () => {
      scrollToCurrent("auto");
    });

    updateActiveSlide();

    window.requestAnimationFrame(() => {
      scrollToCurrent("auto");
      startAutoplay();
    });
  }

  function setupFilters() {
    const filter = $("#project-filter");

    if (!filter) return;

    $$("[data-project-type]", filter).forEach((button) => {
      button.addEventListener("click", () => {
        $$("[data-project-type]", filter).forEach((item) => {
          const isActive = item === button;

          item.classList.toggle("active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        renderProjects(button.dataset.projectType);
      });
    });
  }

  function setupTestimonials() {
    $("[data-testimonial-prev]")?.addEventListener("click", () =>
      renderTestimonial(testimonialIndex - 1),
    );
    $("[data-testimonial-next]")?.addEventListener("click", () =>
      renderTestimonial(testimonialIndex + 1),
    );
  }

  function setupModal() {
    const modal = $("#project-modal");

    if (!modal) return;

    const closeButton = $(".modal-close", modal);
    const modalPreview = $("#modal-preview", modal);

    closeButton?.addEventListener("click", () => {
      modal.close();
    });

    modal.addEventListener("click", (event) => {
      const rect = modal.getBoundingClientRect();

      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (clickedOutside) {
        modal.close();
      }
    });

    modal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");

      modal.classList.remove("has-live-project", "has-web-app", "has-power-bi");

      if (modalPreview) {
        modalPreview.innerHTML = "";
        modalPreview.classList.remove("has-report");
      }
    });
  }

  function setupPainPoints() {
    const items = $$(".pain-item");

    if (!items.length) return;

    function setItemState(item, isOpen) {
      const trigger = $("[data-pain-trigger]", item);

      item.classList.toggle("is-open", isOpen);

      trigger?.setAttribute("aria-expanded", String(isOpen));
    }

    items.forEach((item) => {
      const trigger = $("[data-pain-trigger]", item);

      trigger?.addEventListener("click", () => {
        const shouldOpen = !item.classList.contains("is-open");

        items.forEach((otherItem) => {
          setItemState(otherItem, false);
        });

        if (shouldOpen) {
          setItemState(item, true);
        }
      });
    });
  }

  function setupFAQ() {
    $$(".faq-list details").forEach((detail) =>
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        $$(".faq-list details").forEach((other) => {
          if (other !== detail) other.removeAttribute("open");
        });
      }),
    );
  }

  function setupContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const required = $$("[required]", form);
      required.forEach((field) => field.classList.remove("invalid"));
      const invalid = required.filter((field) => !field.checkValidity());
      const status = $(".form-status", form);

      if (invalid.length) {
        invalid.forEach((field) => field.classList.add("invalid"));
        invalid[0].focus();
        status.textContent = "Please complete the highlighted fields.";
        status.classList.add("error");
        return;
      }

      const formData = new FormData(form);
      const subject = encodeURIComponent(
        `Website enquiry — ${formData.get("service")}`,
      );
      const body = encodeURIComponent(
        `Name: ${formData.get("firstName")} ${formData.get("lastName")}\n` +
          `Email: ${formData.get("email")}\n` +
          `Service: ${formData.get("service")}\n\n${formData.get("message")}`,
      );
      status.textContent = "Opening your email app…";
      status.classList.remove("error");
      window.location.href = `mailto:hello@4sightmetrics.com?subject=${subject}&body=${body}`;
    });
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(
      () => toast.classList.remove("show"),
      3400,
    );
  }

  function initialize() {
    renderToolMarquee();
    renderServices();
    renderGlimpses();
    renderProjectFilters();
    renderProjects();
    renderSocialLinks();
    renderTestimonial();
    setupHeader();
    setupGlimpseSlider();
    setupFilters();
    setupTestimonials();
    setupModal();
    setupPainPoints();
    setupFAQ();
    setupContactForm();
    setupReveal();
    refreshIcons();

    $("[data-back-top]")?.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }),
    );
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();

/* =========================================================
   CINEMATIC HERO INTERACTION
   ========================================================= */

(() => {
  "use strict";

  const visual = document.querySelector("#hero-experience");
  const stage = visual?.querySelector(".hero-stage");

  if (!visual || !stage) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (reducedMotion || coarsePointer) return;

  let animationFrame;

  const updateHero = (event) => {
    const bounds = visual.getBoundingClientRect();

    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;

    const rotateY = (horizontal - 0.5) * 7;
    const rotateX = (0.5 - vertical) * 6;

    cancelAnimationFrame(animationFrame);

    animationFrame = requestAnimationFrame(() => {
      stage.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      stage.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);

      visual.style.setProperty(
        "--pointer-x",
        `${(horizontal * 100).toFixed(1)}%`,
      );

      visual.style.setProperty(
        "--pointer-y",
        `${(vertical * 100).toFixed(1)}%`,
      );
    });
  };
  const resetHero = () => {
    cancelAnimationFrame(animationFrame);

    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");

    visual.style.setProperty("--pointer-x", "50%");
    visual.style.setProperty("--pointer-y", "50%");
  };

  visual.addEventListener("pointermove", updateHero);
  visual.addEventListener("pointerleave", resetHero);
})();

/* =========================================================
   HERO PHOTO STORY
   ========================================================= */

(() => {
  "use strict";

  const slideshow = document.querySelector("[data-hero-slideshow]");
  if (!slideshow) return;

  const slides = [...slideshow.querySelectorAll("[data-hero-slide]")];
  const dots = [...slideshow.querySelectorAll("[data-hero-dot]")];
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (slides.length < 2) return;

  const interval = 5500;
  let current = 0;
  let timer = null;
  let isVisible = true;
  let isPaused = false;

  const showSlide = (nextIndex) => {
    current = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const active = index === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    dots.forEach((dot, index) => {
      const active = index === current;
      dot.classList.toggle("is-active", active);

      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();

    if (reducedMotion || isPaused || !isVisible || document.hidden) return;

    timer = window.setInterval(() => {
      showSlide(current + 1);
    }, interval);
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.heroDot));
      start();
    });
  });

  slideshow.addEventListener("pointerenter", () => {
    isPaused = true;
    stop();
  });

  slideshow.addEventListener("pointerleave", () => {
    isPaused = false;
    start();
  });

  slideshow.addEventListener("focusin", () => {
    isPaused = true;
    stop();
  });

  slideshow.addEventListener("focusout", (event) => {
    if (slideshow.contains(event.relatedTarget)) return;
    isPaused = false;
    start();
  });

  document.addEventListener("visibilitychange", start);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        start();
      },
      { threshold: 0.2 },
    );

    observer.observe(slideshow);
  }

  showSlide(0);
  start();
})();
