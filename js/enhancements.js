/**
 * Super Cleaners London — Professional Frontend Enhancements (v1 & v2)
 * Responsive Header & Mobile Drawer, Scroll Spy, IntersectionObserver Animations,
 * Postcode Coverage Checker, FAQ Accordion & Accessible Interactive Modal
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =========================================================================
       1. Sticky Header & Scroll Progress Bar
       ========================================================================= */
    const header = document.getElementById("site-header");
    const progressBar = document.getElementById("scroll-progress-bar");

    const updateHeaderAndProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      if (header) {
        if (scrollY > 24) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      }

      if (progressBar) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;
        progressBar.style.width = `${pct}%`;
      }
    };

    window.addEventListener("scroll", updateHeaderAndProgress, { passive: true });
    updateHeaderAndProgress();

    /* =========================================================================
       2. Responsive Tablet & Mobile Navigation Drawer
       ========================================================================= */
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const menuToggleIcon = document.getElementById("mobile-menu-icon");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const mobileBackdrop = document.getElementById("mobile-nav-backdrop");

    let isMenuOpen = false;

    const getFocusableElements = (container) => {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const openMobileMenu = () => {
      if (!menuToggle || !mobileDrawer || !mobileBackdrop) return;
      isMenuOpen = true;
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");
      if (menuToggleIcon) menuToggleIcon.textContent = "close";

      mobileDrawer.classList.add("is-open");
      mobileDrawer.setAttribute("aria-hidden", "false");
      mobileBackdrop.classList.add("is-open");
      document.body.classList.add("nav-open");

      const focusables = getFocusableElements(mobileDrawer);
      if (focusables.length > 0) {
        setTimeout(() => focusables[0].focus(), 50);
      }
    };

    const closeMobileMenu = (restoreFocus = false) => {
      if (!menuToggle || !mobileDrawer || !mobileBackdrop || !isMenuOpen) return;
      isMenuOpen = false;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      if (menuToggleIcon) menuToggleIcon.textContent = "menu";

      mobileDrawer.classList.remove("is-open");
      mobileDrawer.setAttribute("aria-hidden", "true");
      mobileBackdrop.classList.remove("is-open");
      document.body.classList.remove("nav-open");

      if (restoreFocus) {
        menuToggle.focus();
      }
    };

    if (menuToggle && mobileDrawer && mobileBackdrop) {
      menuToggle.addEventListener("click", () => {
        if (isMenuOpen) {
          closeMobileMenu(true);
        } else {
          openMobileMenu();
        }
      });

      mobileBackdrop.addEventListener("click", () => closeMobileMenu(true));

      // Close drawer when any navigation link or CTA inside it is clicked
      mobileDrawer.querySelectorAll("a[href]").forEach((link) => {
        link.addEventListener("click", () => {
          closeMobileMenu(false);
        });
      });

      // Close on Escape and trap Tab focus inside mobile drawer when open
      document.addEventListener("keydown", (e) => {
        if (!isMenuOpen) return;

        if (e.key === "Escape") {
          e.preventDefault();
          closeMobileMenu(true);
          return;
        }

        if (e.key === "Tab") {
          const focusables = [menuToggle, ...getFocusableElements(mobileDrawer)];
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });

      // Automatically close mobile drawer if viewport expands to desktop nav breakpoint
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 1200 && isMenuOpen) {
          closeMobileMenu(false);
        }
      });
    }

    /* =========================================================================
       3. Active Navigation Link Scroll Spy
       ========================================================================= */
    const navLinks = document.querySelectorAll(
      ".scl-nav-link[href^='#'], .scl-mobile-nav-link[href^='#']"
    );
    const trackedSections = Array.from(
      document.querySelectorAll("main section[id], footer[id]")
    );

    const setActiveNavByHash = (id) => {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const navTarget = link.getAttribute("data-nav-target");
        const isMatch = href === `#${id}` || navTarget === id;
        if (isMatch) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        } else {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        }
      });
    };

    if (trackedSections.length > 0 && navLinks.length > 0) {
      const updateActiveSection = () => {
        const scrollPosition = window.scrollY + 140;
        let currentSectionId = trackedSections[0].id;

        for (const section of trackedSections) {
          if (section.offsetTop <= scrollPosition) {
            currentSectionId = section.id;
          }
        }
        setActiveNavByHash(currentSectionId);
      };

      window.addEventListener("scroll", updateActiveSection, { passive: true });
      updateActiveSection();
    }

    /* =========================================================================
       4. Scroll-Triggered Animations (IntersectionObserver)
       ========================================================================= */
    // Automatically assign staggered delays to children inside [data-stagger-group]
    document.querySelectorAll("[data-stagger-group]").forEach((group) => {
      const step = parseInt(group.getAttribute("data-stagger-step") || "90", 10);
      const children = group.querySelectorAll(":scope > [data-animate]");
      children.forEach((child, idx) => {
        if (!child.style.getPropertyValue("--stagger-delay")) {
          child.style.setProperty("--stagger-delay", `${idx * step}ms`);
        }
      });
    });

    const animatedElements = document.querySelectorAll("[data-animate]");

    if (prefersReducedMotion) {
      animatedElements.forEach((el) => el.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
      const animationObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -48px 0px",
        }
      );

      animatedElements.forEach((el) => animationObserver.observe(el));
    } else {
      animatedElements.forEach((el) => el.classList.add("is-visible"));
    }

    /* =========================================================================
       5. Animated Number Counters
       ========================================================================= */
    const counters = document.querySelectorAll(".counter-number, .counter-num");

    const animateCounterElement = (el) => {
      const rawTarget =
        el.getAttribute("data-target") || el.textContent.replace(/[^0-9.]/g, "");
      const target = parseFloat(rawTarget);
      if (isNaN(target)) return;

      if (prefersReducedMotion) {
        el.textContent = target.toLocaleString();
        return;
      }

      const isFloat = String(rawTarget).includes(".");
      const duration = 1600;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = easeOut * target;

        el.textContent = isFloat
          ? current.toFixed(1)
          : Math.floor(current).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = isFloat
            ? target.toFixed(1)
            : target.toLocaleString();
        }
      };

      requestAnimationFrame(step);
    };

    if (counters.length > 0 && "IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounterElement(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );

      counters.forEach((counter) => counterObserver.observe(counter));
    }

    /* =========================================================================
       6. Interactive London Borough & Postcode Coverage Checker (V1 & V2)
       ========================================================================= */
    const boroughDirectory = {
      fulham: {
        pin: "pin-fulham",
        postcode: "SW6",
        label: "Fulham & Parsons Green",
      },
      chelsea: {
        pin: "pin-chelsea",
        postcode: "SW3 / SW10",
        label: "Chelsea & King's Road",
      },
      hammersmith: {
        pin: "pin-hammersmith",
        postcode: "W6",
        label: "Hammersmith",
      },
      "parsons-green": {
        pin: "pin-parsons-green",
        postcode: "SW6",
        label: "Parsons Green",
      },
      putney: {
        pin: "pin-putney",
        postcode: "SW15",
        label: "Putney",
      },
      "south-kensington": {
        pin: "pin-south-kensington",
        postcode: "SW7",
        label: "South Kensington",
      },
      kensington: {
        pin: "pin-south-kensington",
        postcode: "W8 / SW7",
        label: "Kensington & South Kensington",
      },
      battersea: {
        pin: "pin-battersea",
        postcode: "SW11",
        label: "Battersea",
      },
      clapham: {
        pin: "pin-clapham",
        postcode: "SW4",
        label: "Clapham",
      },
      chiswick: {
        pin: "pin-chiswick",
        postcode: "W4",
        label: "Chiswick",
      },
      "west-brompton": {
        pin: "pin-west-brompton",
        postcode: "SW10",
        label: "West Brompton",
      },
      wandsworth: {
        pin: "pin-wandsworth",
        postcode: "SW18",
        label: "Wandsworth",
      },
      bromley: {
        pin: "pin-bromley",
        postcode: "BR1",
        label: "Bromley & Surrounds",
      },
      westminster: {
        pin: "pin-central-london",
        postcode: "SW1 / W1",
        label: "Westminster & Central London",
      },
    };

    const showPostcodeStatus = (message, isPrimaryMatch = true) => {
      const statusBox = document.getElementById("postcode-status");
      if (!statusBox) return;
      statusBox.className = isPrimaryMatch
        ? "p-3 rounded-xl text-body-sm font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center gap-2 shadow-sm"
        : "p-3 rounded-xl text-body-sm font-semibold bg-secondary-fixed/70 text-primary border border-secondary/30 flex items-center gap-2 shadow-sm";
      statusBox.innerHTML = `<span class="material-symbols-outlined text-emerald-600 text-[20px] shrink-0">verified</span><span>${message}</span>`;
      statusBox.classList.remove("hidden");
    };

    const highlightBorough = (key) => {
      const data = boroughDirectory[key];
      if (!data) return;

      document
        .querySelectorAll(".map-pin")
        .forEach((p) => p.classList.remove("pin-highlight"));
      document
        .querySelectorAll("[data-borough]")
        .forEach((b) => b.classList.remove("ring-2", "ring-secondary", "bg-secondary-fixed/60"));

      const matchingButtons = document.querySelectorAll(
        `[data-borough="${key}"]`
      );
      matchingButtons.forEach((btn) =>
        btn.classList.add("ring-2", "ring-secondary", "bg-secondary-fixed/60")
      );

      const pin = document.getElementById(data.pin);
      if (pin) {
        pin.classList.add("pin-highlight");
        setTimeout(() => pin.classList.remove("pin-highlight"), 3600);
      }

      const postcodeInput = document.getElementById("postcode-input");
      if (postcodeInput) {
        postcodeInput.value = `${data.label} (${data.postcode})`;
      }

      showPostcodeStatus(
        `Instant Availability: Vetted housekeepers ready in <strong>${data.label} (${data.postcode})</strong> — same-day &amp; recurring slots open.`,
        true
      );
    };

    document.querySelectorAll("[data-borough]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-borough");
        highlightBorough(key);
      });
    });

    const checkPostcodeBtn = document.getElementById("check-postcode-btn");
    const postcodeInput = document.getElementById("postcode-input");

    if (checkPostcodeBtn && postcodeInput) {
      const evaluatePostcodeInput = () => {
        const rawValue = postcodeInput.value.trim();
        if (!rawValue) {
          postcodeInput.focus();
          return;
        }
        const normalized = rawValue.toLowerCase();
        let matchedKey = null;

        for (const [key, info] of Object.entries(boroughDirectory)) {
          const codeParts = info.postcode.toLowerCase().split(/[\/\s]+/);
          if (
            normalized.includes(key.replace("-", " ")) ||
            normalized.includes(key) ||
            codeParts.some((code) => code && normalized.includes(code))
          ) {
            matchedKey = key;
            break;
          }
        }

        if (matchedKey) {
          highlightBorough(matchedKey);
        } else {
          showPostcodeStatus(
            `Yes — <strong>${rawValue.toUpperCase()}</strong> is within our Greater London coverage area! Call <strong>020 3664 9304</strong> or WhatsApp us for immediate slot confirmation.`,
            false
          );
        }
      };

      checkPostcodeBtn.addEventListener("click", evaluatePostcodeInput);
      postcodeInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          evaluatePostcodeInput();
        }
      });
    }

    /* =========================================================================
       7. FAQ Accordion Single-Open Coordination
       ========================================================================= */
    const faqDetails = document.querySelectorAll("#faq details");
    faqDetails.forEach((targetDetail) => {
      targetDetail.addEventListener("toggle", () => {
        if (targetDetail.open) {
          faqDetails.forEach((otherDetail) => {
            if (otherDetail !== targetDetail && otherDetail.open) {
              otherDetail.removeAttribute("open");
            }
          });
        }
      });
    });

    /* =========================================================================
       8. Hero Audio Toggle (Version 1) & Interactive Video Tour Modal (V1 & V2)
       ========================================================================= */
    const audioBtn = document.getElementById("audio-toggle-btn");
    const audioIcon = document.getElementById("audio-icon");
    const audioText = document.getElementById("audio-status-text");
    let isMuted = true;

    if (audioBtn && audioIcon && audioText) {
      audioBtn.addEventListener("click", () => {
        isMuted = !isMuted;
        audioBtn.setAttribute("aria-pressed", String(!isMuted));
        if (isMuted) {
          audioIcon.textContent = "volume_off";
          audioText.textContent = "Ambient Sound Off";
        } else {
          audioIcon.textContent = "volume_up";
          audioText.textContent = "Ambient Sound On";
        }
      });
    }

    // Video Tour / Showcase Modal
    const modalOverlay = document.getElementById("scl-showcase-modal");
    const modalCloseBtn = document.getElementById("scl-modal-close");
    let lastModalTrigger = null;

    const openShowcaseModal = (triggerEl) => {
      if (!modalOverlay) return;
      lastModalTrigger = triggerEl || document.activeElement;
      modalOverlay.classList.add("is-open");
      modalOverlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open");
      if (modalCloseBtn) {
        setTimeout(() => modalCloseBtn.focus(), 50);
      }
    };

    const closeShowcaseModal = () => {
      if (!modalOverlay || !modalOverlay.classList.contains("is-open")) return;
      modalOverlay.classList.remove("is-open");
      modalOverlay.setAttribute("aria-hidden", "true");
      if (!isMenuOpen) {
        document.body.classList.remove("nav-open");
      }
      if (lastModalTrigger && typeof lastModalTrigger.focus === "function") {
        lastModalTrigger.focus();
      }
    };

    document.querySelectorAll("[data-open-showcase-modal]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openShowcaseModal(btn);
      });
    });

    const heroVideo = document.getElementById("hero-team-video");
    const heroVideoOverlay = document.getElementById("hero-video-overlay");
    const heroVideoPlayBtn = document.getElementById("video-play-btn");

    if (heroVideo && heroVideoOverlay && heroVideoPlayBtn) {
      heroVideo.controls = false;
      let ignorePlayUntil = 0;

      heroVideoPlayBtn.addEventListener("click", () => {
        if (Date.now() < ignorePlayUntil) return;
        heroVideo.hidden = false;
        heroVideo.play().catch((error) => {
          console.error("Unable to play the hero video:", error);
          heroVideo.hidden = true;
          heroVideoOverlay.hidden = false;
        });
      });

      heroVideo.addEventListener("click", () => {
        if (!heroVideo.paused) {
          ignorePlayUntil = Date.now() + 400;
          heroVideo.pause();
        }
      });

      heroVideo.addEventListener("play", () => {
        heroVideoOverlay.hidden = true;
      });

      heroVideo.addEventListener("pause", () => {
        heroVideo.currentTime = 0;
        heroVideo.hidden = true;
        heroVideoOverlay.hidden = false;
      });

      heroVideo.addEventListener("ended", () => {
        heroVideo.currentTime = 0;
        heroVideo.hidden = true;
        heroVideoOverlay.hidden = false;
      });
    }

    if (modalOverlay) {
      if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeShowcaseModal);
      }
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          closeShowcaseModal();
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("is-open")) {
          e.preventDefault();
          closeShowcaseModal();
        }
      });
    }

    /* =========================================================================
       9. Interactive Hero Badges (Scroll Parallax, Mouse Reaction & Click-to-Pin)
       ========================================================================= */
    const heroSection = document.getElementById("home");
    const parallaxBadges = document.querySelectorAll("[data-hero-parallax]");
    const interactiveBadges = document.querySelectorAll(".scl-hero-badge");

    if (parallaxBadges.length > 0 && !prefersReducedMotion) {
      let mouseNormX = 0;
      let mouseNormY = 0;
      let tickingParallax = false;

      const updateBadgeTransforms = () => {
        const scrollY = Math.min(window.scrollY || window.pageYOffset, 750);

        parallaxBadges.forEach((wrap) => {
          const speedY = parseFloat(wrap.getAttribute("data-scroll-speed-y") || "-0.16");
          const speedX = parseFloat(wrap.getAttribute("data-scroll-speed-x") || "0.05");
          const rotFactor = parseFloat(wrap.getAttribute("data-scroll-rot") || "0.015");
          const mouseFactor = parseFloat(wrap.getAttribute("data-mouse-factor") || "14");

          const moveY = scrollY * speedY + mouseNormY * mouseFactor;
          const moveX = scrollY * speedX + mouseNormX * mouseFactor;
          const rot = scrollY * rotFactor + mouseNormX * 2.2;

          wrap.style.setProperty("--parallax-x", `${moveX.toFixed(1)}px`);
          wrap.style.setProperty("--parallax-y", `${moveY.toFixed(1)}px`);
          wrap.style.setProperty("--parallax-rot", `${rot.toFixed(2)}deg`);
        });

        tickingParallax = false;
      };

      const requestParallaxUpdate = () => {
        if (!tickingParallax) {
          tickingParallax = true;
          requestAnimationFrame(updateBadgeTransforms);
        }
      };

      window.addEventListener("scroll", requestParallaxUpdate, { passive: true });

      if (heroSection) {
        heroSection.addEventListener(
          "mousemove",
          (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouseNormY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            requestParallaxUpdate();
          },
          { passive: true }
        );

        heroSection.addEventListener("mouseleave", () => {
          mouseNormX = 0;
          mouseNormY = 0;
          requestParallaxUpdate();
        });
      }

      updateBadgeTransforms();
    }

    // Click to pin/expand badge details or jump to target section
    interactiveBadges.forEach((badge) => {
      badge.addEventListener("click", (e) => {
        const jumpLink = e.target.closest("[data-badge-jump]");
        if (jumpLink) {
          const targetSelector = jumpLink.getAttribute("data-badge-jump");
          const targetEl = targetSelector ? document.querySelector(targetSelector) : null;
          if (targetEl) {
            e.stopPropagation();
            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          return;
        }

        const wasPinned = badge.classList.contains("is-pinned");
        interactiveBadges.forEach((b) => {
          b.classList.remove("is-pinned");
          b.setAttribute("aria-expanded", "false");
        });
        if (!wasPinned) {
          badge.classList.add("is-pinned");
          badge.setAttribute("aria-expanded", "true");
        }
      });

      badge.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          badge.click();
        }
      });
    });

    /* =========================================================================
       10. Scroll-Reactive Section Elements ([data-scroll-float]) Across Page
       ========================================================================= */
    const scrollFloatElements = document.querySelectorAll("[data-scroll-float]");

    if (scrollFloatElements.length > 0 && !prefersReducedMotion) {
      let tickingScrollFloat = false;

      const updateScrollFloatElements = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;

        scrollFloatElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Only compute when element is near or inside the viewport
          if (rect.bottom < -180 || rect.top > vh + 180) return;

          // progress ranges from -1 (bottom of screen) to +1 (top of screen), 0 at center
          const elemCenter = rect.top + rect.height * 0.5;
          const progress = Math.max(
            -1.25,
            Math.min(1.25, (vh * 0.5 - elemCenter) / (vh * 0.55))
          );

          const rangeY = parseFloat(el.getAttribute("data-float-y") || "-18");
          const rangeX = parseFloat(el.getAttribute("data-float-x") || "0");
          const rangeRot = parseFloat(el.getAttribute("data-float-rot") || "0");

          const moveY = progress * rangeY;
          const moveX = progress * rangeX;
          const rot = progress * rangeRot;

          el.style.setProperty("--sf-y", `${moveY.toFixed(1)}px`);
          el.style.setProperty("--sf-x", `${moveX.toFixed(1)}px`);
          el.style.setProperty("--sf-rot", `${rot.toFixed(2)}deg`);
        });

        tickingScrollFloat = false;
      };

      window.addEventListener(
        "scroll",
        () => {
          if (!tickingScrollFloat) {
            tickingScrollFloat = true;
            requestAnimationFrame(updateScrollFloatElements);
          }
        },
        { passive: true }
      );

      updateScrollFloatElements();
    }

    /* =========================================================================
       11. 3D Interactive Card Tilt & Cursor Spotlight ([data-tilt-card])
       ========================================================================= */
    const tiltCards = document.querySelectorAll("[data-tilt-card]");

    if (tiltCards.length > 0 && !prefersReducedMotion) {
      tiltCards.forEach((card) => {
        const maxTilt = parseFloat(card.getAttribute("data-tilt-max") || "3.5");

        card.addEventListener(
          "mousemove",
          (e) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width;
            const relY = (e.clientY - rect.top) / rect.height;

            const tiltY = (relX - 0.5) * 2 * maxTilt;
            const tiltX = (0.5 - relY) * 2 * maxTilt;

            card.style.setProperty("--tilt-rx", `${tiltX.toFixed(2)}deg`);
            card.style.setProperty("--tilt-ry", `${tiltY.toFixed(2)}deg`);
            card.style.setProperty("--spot-x", `${(relX * 100).toFixed(1)}%`);
            card.style.setProperty("--spot-y", `${(relY * 100).toFixed(1)}%`);
          },
          { passive: true }
        );

        card.addEventListener("mouseleave", () => {
          card.style.setProperty("--tilt-rx", "0deg");
          card.style.setProperty("--tilt-ry", "0deg");
        });
      });
    }

    /* =========================================================================
       12. Interactive Section Badges (.scl-section-badge) Click-to-Pin
       ========================================================================= */
    document.querySelectorAll(".scl-section-badge").forEach((secBadge) => {
      secBadge.addEventListener("click", (e) => {
        const jumpTarget = secBadge.getAttribute("data-badge-jump");
        if (jumpTarget) {
          const targetEl = document.querySelector(jumpTarget);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
        }
        secBadge.classList.toggle("is-pinned");
      });
    });

    /* =========================================================================
       13. Interactive Before/After Comparison Cards & Category Filter
       ========================================================================= */
    document.querySelectorAll("[data-ba-card]").forEach((baCard) => {
      const beforePane = baCard.querySelector(".ba-before-pane");
      const afterPane = baCard.querySelector(".ba-after-pane");

      if (beforePane && afterPane) {
        beforePane.addEventListener("mouseenter", () => {
          baCard.setAttribute("data-ba-mode", "before");
        });
        afterPane.addEventListener("mouseenter", () => {
          baCard.setAttribute("data-ba-mode", "after");
        });
        baCard.addEventListener("mouseleave", () => {
          baCard.removeAttribute("data-ba-mode");
        });
      }

      baCard.querySelectorAll("[data-ba-set]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const mode = btn.getAttribute("data-ba-set");
          if (mode === "split") {
            baCard.removeAttribute("data-ba-mode");
          } else {
            baCard.setAttribute("data-ba-mode", mode);
          }
        });
      });
    });

    // Global Before/After Gallery Category Filter (used on Domestic V2 & V1)
    window.filterGallery = function (category, btn) {
      const items = document.querySelectorAll(".gallery-item");
      if (btn && btn.parentElement) {
        const buttons = btn.parentElement.querySelectorAll("button");
        buttons.forEach((b) => {
          b.classList.remove("tab-active", "bg-brand-navy", "text-white");
          b.classList.add("text-slate-600");
        });
        btn.classList.add("tab-active");
        btn.classList.remove("text-slate-600");
      }

      items.forEach((item) => {
        const itemCat = item.getAttribute("data-category");
        if (category === "all" || itemCat === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    };

    /* =========================================================================
       14. Interactive Toast Notification & Quote / RFP Form Handling
       ========================================================================= */
    let toastEl = document.getElementById("scl-toast");
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "scl-toast";
      toastEl.className = "scl-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }

    let toastTimer = null;
    window.sclShowToast = function (title, message) {
      if (!toastEl) return;
      toastEl.innerHTML = `
        <div class="flex items-start gap-3.5">
          <div class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
            ✓
          </div>
          <div class="flex-1 text-left">
            <div class="text-sm font-bold text-white">${title}</div>
            <div class="text-xs text-slate-300 mt-0.5 leading-relaxed">${message}</div>
          </div>
          <button type="button" aria-label="Dismiss notification" class="text-slate-400 hover:text-white text-sm font-bold px-1.5" onclick="document.getElementById('scl-toast').classList.remove('is-visible')">✕</button>
        </div>
      `;
      toastEl.classList.add("is-visible");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastEl.classList.remove("is-visible");
      }, 6500);
    };

    // Live Domestic Price Calculator (Domestic V1 & V2)
    window.updateLiveEstimate = function () {
      const freqEl = document.getElementById("calc-freq");
      const hoursEl = document.getElementById("calc-hours");
      const displayEl = document.getElementById("estimate-display");
      if (!freqEl || !hoursEl || !displayEl) return;

      const rate = parseFloat(freqEl.value) || 19.5;
      const hours = parseFloat(hoursEl.value) || 2.5;
      const total = (rate * hours).toFixed(2);
      displayEl.innerHTML = `£${total} <span class="text-xs font-sans text-slate-500 font-normal">/ visit (${hours} hrs @ £${rate.toFixed(2)}/hr)</span>`;
    };

    window.calculateAndConfirm = function () {
      const pcInput = document.getElementById("calc-postcode");
      const pc = pcInput && pcInput.value ? pcInput.value.toUpperCase() : "London";
      const displayEl = document.getElementById("estimate-display");
      const estText = displayEl ? displayEl.textContent.split("/")[0].trim() : "£48.75";
      window.sclShowToast(
        `Priority Domestic Slot Reserved (${pc})`,
        `Estimated session total: <strong>${estText}</strong>. Our Chelsea &amp; Fulham housekeeping desk will confirm your dedicated DBS-vetted cleaner via WhatsApp/Phone within 15 minutes.`
      );
    };

    // Intercept forms with [data-scl-form] for smooth toast feedback
    document.querySelectorAll("form[data-scl-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formType = form.getAttribute("data-scl-form");
        const dialogParent = form.closest("dialog");
        if (dialogParent && typeof dialogParent.close === "function") {
          dialogParent.close();
        }
        if (formType === "commercial-rfp") {
          window.sclShowToast(
            "Commercial RFP Logged — Priority B2B Desk",
            "Thank you. A dedicated Commercial Operations Supervisor will review your specification and respond within 60 minutes with a tailored SLA &amp; site audit slot."
          );
        } else {
          window.calculateAndConfirm();
        }
      });
    });
  });
})();
