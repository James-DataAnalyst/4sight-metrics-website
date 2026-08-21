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
            <span class="tool-logo"><img src="${escapeHTML(tool.heroIcon || tool.icon)}" alt="" /></span>
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
      .map((service, index) => {
        const operator =
          index === 0
            ? `
            <div class="expertise-operator" aria-hidden="true">
              <span>+</span>
            </div>
          `
            : index === 1
              ? `
              <div class="expertise-operator" aria-hidden="true">
                <span>=</span>
              </div>
            `
              : "";

        const card = `
        <article
          class="expertise-card ${
            service.result ? "result-card" : "source-card"
          } reveal"
          style="--delay:${index * 80}ms"
        >
          <div class="card-topline">
            <span>${escapeHTML(service.number)}</span>

            <span class="expertise-icon">
              ${icon(service.icon, 20)}
            </span>
          </div>

          <div class="expertise-card-copy">
            <span class="card-label">
              ${service.result ? "Connected intelligence" : "Business signals"}
            </span>

            <h3>${escapeHTML(service.title)}</h3>

            <p>${escapeHTML(service.description)}</p>
          </div>

          <ul class="expertise-metrics">
            ${service.points
              .map(
                (point) => `
                  <li>
                    ${icon(service.result ? "arrow-right" : "check", 15)}
                    <span>${escapeHTML(point)}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>

          ${
            service.result
              ? `
 <a
  class="expertise-cta expertise-cta-primary"
  href="#contact"
>
  <span>Get Started</span>

  <span class="expertise-cta-arrow">
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 7h10v10"></path>
      <path d="M7 17 17 7"></path>
    </svg>
  </span>
</a>
  `
              : ""
          }
        </article>
      `;

        return card + operator;
      })
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
            <div class="art-heading"><div><small>EXECUTIVE INTELLIGENCE</small><b>${escapeHTML(project.shortTitle || project.title)}</b></div><span>&#9679; LIVE</span></div>
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
  ${icon("eye", 16)}
  <span>View report</span>
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
  <span>Sample dashboards</span>
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

  /* =========================================================
     CLIENT TESTIMONIAL CAROUSEL: RENDERING AND RESPONSIVE HEIGHT
     ========================================================= */

  let testimonialIndex = 0;
  function renderTestimonial(index = 0) {
    const target = $("#testimonial-stage");
    if (!target || !data.testimonials.length) return;

    testimonialIndex =
      (index + data.testimonials.length) % data.testimonials.length;

    target.innerHTML = `
      <div class="testimonial-track">
        ${data.testimonials
          .map(
            (testimonial, slideIndex) => `
              <article
                class="testimonial-card"
                aria-label="Testimonial ${slideIndex + 1} of ${data.testimonials.length}"
                aria-hidden="${slideIndex !== testimonialIndex}"
              >
                <div class="quote-icon" aria-hidden="true">&ldquo;</div>

                <div class="stars" role="img" aria-label="5 out of 5 stars">
                  <span aria-hidden="true">&#9733;</span>
                  <span aria-hidden="true">&#9733;</span>
                  <span aria-hidden="true">&#9733;</span>
                  <span aria-hidden="true">&#9733;</span>
                  <span aria-hidden="true">&#9733;</span>
                </div>

                <blockquote>
                  &ldquo;${escapeHTML(testimonial.quote)}&rdquo;
                </blockquote>

                <div class="testimonial-card-footer">
                  <div class="testimonial-author">
                    <strong>${escapeHTML(testimonial.name)}</strong>
                    <small>${escapeHTML(testimonial.role)}</small>
                  </div>

                  <div class="testimonial-progress" aria-hidden="true">
                    ${data.testimonials
                      .map(
                        (_, dotIndex) =>
                          `<i class="${dotIndex === slideIndex ? "active" : ""}"></i>`,
                      )
                      .join("")}
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>`;

    const track = $(".testimonial-track", target);
    track.style.transform = `translate3d(-${testimonialIndex * 100}%, 0, 0)`;

    syncTestimonialHeight();
  }

  function syncTestimonialHeight() {
    const stage = $("#testimonial-stage");
    if (!stage) return;

    const cards = $$(".testimonial-card", stage);
    const activeCard = cards[testimonialIndex];

    if (!activeCard) return;
    stage.style.height = `${activeCard.offsetHeight}px`;
  }

  function setTestimonialSlide(index) {
    const stage = $("#testimonial-stage");
    if (!stage) return;

    const track = $(".testimonial-track", stage);
    if (!track || !data.testimonials.length) return;

    testimonialIndex =
      (index + data.testimonials.length) % data.testimonials.length;

    track.style.transform = `translate3d(-${testimonialIndex * 100}%, 0, 0)`;

    $$(".testimonial-card", track).forEach((card, slideIndex) => {
      card.setAttribute("aria-hidden", String(slideIndex !== testimonialIndex));
    });

    window.requestAnimationFrame(syncTestimonialHeight);
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

  /* =========================================================
     CLIENT TESTIMONIAL CAROUSEL: CONTROLS, AUTOPLAY AND SWIPE
     ========================================================= */

  function setupTestimonials() {
    const stage = $("#testimonial-stage");
    const previousButton = $("[data-testimonial-prev]");
    const nextButton = $("[data-testimonial-next]");

    if (!stage || data.testimonials.length < 2) return;

    const carousel = stage.closest(".testimonial-carousel") || stage;

    const rotationDelay = 6500;
    let rotationTimer = null;
    let touchStartX = 0;

    if ("ResizeObserver" in window) {
      const testimonialResizeObserver = new ResizeObserver(
        syncTestimonialHeight,
      );

      $$(".testimonial-card", stage).forEach((card) =>
        testimonialResizeObserver.observe(card),
      );
    } else {
      window.addEventListener("resize", syncTestimonialHeight);
    }

    const stopRotation = () => {
      window.clearInterval(rotationTimer);
      rotationTimer = null;
    };

    const startRotation = () => {
      stopRotation();

      // Respect accessibility preferences and do not rotate in a hidden tab.
      if (reducedMotion || document.hidden) return;

      rotationTimer = window.setInterval(() => {
        setTestimonialSlide(testimonialIndex + 1);
      }, rotationDelay);
    };

    const showTestimonial = (offset) => {
      setTestimonialSlide(testimonialIndex + offset);
      startRotation();
    };

    previousButton?.addEventListener("click", () => showTestimonial(-1));
    nextButton?.addEventListener("click", () => showTestimonial(1));

    // Give visitors time to read when they interact with the review.
    carousel.addEventListener("mouseenter", stopRotation);
    carousel.addEventListener("mouseleave", startRotation);
    carousel.addEventListener("focusin", stopRotation);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) startRotation();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopRotation();
      else startRotation();
    });

    // Allow the same natural swipe gesture used by the glimpse carousel.
    stage.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].clientX;
        stopRotation();
      },
      { passive: true },
    );

    stage.addEventListener(
      "touchend",
      (event) => {
        const distance = event.changedTouches[0].clientX - touchStartX;

        if (Math.abs(distance) >= 45) {
          showTestimonial(distance < 0 ? 1 : -1);
        } else {
          startRotation();
        }
      },
      { passive: true },
    );

    startRotation();
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

  const legalDocuments = {
    privacy: {
      title: "Privacy Policy",
    },
    terms: {
      title: "Terms of Use",
    },
    accessibility: {
      title: "Accessibility Statement",
    },
    cookies: {
      title: "Cookie Policy",
    },
  };

  const legalSectionHeadings = new Set(
    [
      "Information We May Collect",
      "How We Use Information",
      "How Information May Be Shared",
      "Cookies and Analytics",
      "Third-Party Scheduling Platforms",
      "Third-Party Websites",
      "Data Security",
      "Data Retention",
      "Your Privacy Choices",
      "Marketing Communications",
      "Children's Privacy",
      "Changes to This Privacy Policy",
      "Privacy Questions",
      "Website Purpose",
      "No Client or Professional Relationship",
      "Data, Dashboards and Analytics",
      "No Guarantee of Results",
      "Demonstration Dashboards",
      "Third-Party Platforms and Services",
      "Client Responsibility",
      "Testimonials",
      "Permitted Use",
      "Intellectual Property",
      "Accuracy and Availability",
      "Third-Party Links",
      "Disclaimer of Warranties",
      "Limitation of Liability",
      "Governing Law",
      "Changes to These Terms",
      "Questions",
      "Our Accessibility Efforts",
      "Accessibility Assistance",
      "What Are Cookies?",
      "Types of Cookies We May Use",
      "Essential Cookies",
      "Analytics Cookies",
      "Functional Cookies",
      "Marketing Cookies",
      "Cookie Preferences",
      "Third-Party Technologies",
      "Changes to This Cookie Policy",
    ].map((heading) => heading.toLowerCase()),
  );

  let legalDocumentsPromise;
  let lastLegalTrigger = null;

  function splitLegalDocuments(source = "") {
    const normalizedSource = source.replace(/\r/g, "").replace(/\u00a0/g, " ");
    const headingPattern =
      /^\s*(?:\*\*)?([1-8])\.\s+([A-Z][A-Z ]+)(?:\*\*)?\s*$/gm;
    const matches = [...normalizedSource.matchAll(headingPattern)];
    const documentKeys = {
      1: "privacy",
      2: "terms",
      3: "accessibility",
      4: "cookies",
    };
    const documents = {};

    matches.forEach((match, index) => {
      const documentKey = documentKeys[match[1]];
      const start = match.index + match[0].length;
      const end = matches[index + 1]?.index ?? normalizedSource.length;

      if (documentKey) {
        documents[documentKey] = normalizedSource
          .slice(start, end)
          .replace(/^\s*---\s*$/gm, "")
          .trim();
      }
    });

    if (Object.keys(documents).length !== 4) {
      throw new Error("The four legal documents could not be identified.");
    }

    return documents;
  }

  function loadLegalDocuments() {
    if (!legalDocumentsPromise) {
      const legalFileUrl = new URL(
        "data/legal/legal-content.md",
        document.baseURI,
      );

      legalDocumentsPromise = fetch(legalFileUrl, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to load legal information.");
          }

          return response.text();
        })
        .then(splitLegalDocuments)
        .catch((error) => {
          legalDocumentsPromise = null;
          throw error;
        });
    }

    return legalDocumentsPromise;
  }

  function formatLegalInline(value = "") {
    return escapeHTML(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function legalMarkdownToHTML(markdown = "") {
    const lines = markdown.split(/\r?\n/);
    const output = [];

    let paragraph = [];
    let listOpen = false;

    const flushParagraph = () => {
      if (!paragraph.length) return;

      output.push(`<p>${formatLegalInline(paragraph.join(" "))}</p>`);

      paragraph = [];
    };

    const closeList = () => {
      if (!listOpen) return;

      output.push("</ul>");
      listOpen = false;
    };

    lines.forEach((rawLine) => {
      const line = rawLine
        .replace(/\u00a0/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (!line) {
        flushParagraph();
        closeList();
        return;
      }

      const markdownHeading = line.match(/^\*\*(.+?)\*\*$/);
      const plainHeading = legalSectionHeadings.has(line.toLowerCase());

      if (markdownHeading || plainHeading) {
        flushParagraph();
        closeList();

        const headingText = markdownHeading ? markdownHeading[1] : line;
        output.push(`<h3>${formatLegalInline(headingText)}</h3>`);
        return;
      }

      const bullet = line.match(/^(?:-|\u2022)\s*(.+)$/);

      if (bullet) {
        flushParagraph();

        if (!listOpen) {
          output.push("<ul>");
          listOpen = true;
        }

        output.push(`<li>${formatLegalInline(bullet[1])}</li>`);
        return;
      }

      closeList();
      paragraph.push(line);
    });

    flushParagraph();
    closeList();

    return output.join("");
  }

  function setupLegalDialog() {
    const dialog = $("#legal-dialog");
    const title = $("#legal-dialog-title");
    const content = $("#legal-dialog-body");

    if (!dialog || !title || !content) return;

    $$("[data-legal-document]").forEach((button) => {
      button.addEventListener("click", async () => {
        const documentKey = button.dataset.legalDocument;
        const documentConfig = legalDocuments[documentKey];

        if (!documentConfig) return;

        lastLegalTrigger = button;
        title.textContent = documentConfig.title;
        content.innerHTML =
          '<p class="legal-loading">Loading legal informationâ€¦</p>';

        dialog.showModal();
        document.body.classList.add("legal-open");

        try {
          const documents = await loadLegalDocuments();
          const section = documents[documentKey];

          if (!section) {
            throw new Error("Legal document was not found.");
          }

          content.innerHTML = legalMarkdownToHTML(section);
          content.scrollTop = 0;
          content.focus({ preventScroll: true });
        } catch (error) {
          console.error("Unable to load legal document:", error);
          content.innerHTML = `
          <p class="legal-error">
            We could not load this document. Please try again.
          </p>
        `;
        }
      });
    });

    $$("[data-legal-close]", dialog).forEach((button) => {
      button.addEventListener("click", () => dialog.close());
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("legal-open");
      lastLegalTrigger?.focus();
    });
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
    setupLegalDialog();
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
