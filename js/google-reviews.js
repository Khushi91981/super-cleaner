/* ==========================================================================
   Super Cleaners London — Live Google Reviews Carousel (Featurable API v2)
   Renders live Google Business Profile reviews in our native website design.
   ========================================================================== */
(function () {
  const API_URL =
    "https://featurable.com/api/v2/widgets/3d225826-58be-4599-8cff-6018ca37c2e2";

  const FALLBACK_REVIEWS = [
    {
      author: { name: "Marcos Marcos", avatarUrl: null },
      rating: { value: 5 },
      text: "Excellent service! We hired Supercleaners for a deep clean after our lease and were thrilled with the results. They came with all their own products, tools, and equipment, and left the property spotless, taking care of every last detail. The service was so good that we've already hired them as our regular cleaners.",
      publishedAt: "2026-11-17T09:55:36.000Z",
    },
    {
      author: { name: "Marisol Aguilar", avatarUrl: null },
      rating: { value: 5 },
      text: "Marcia and Manuela did an absolutely fantastic job with the deep clean before we moved into our new home. They arrived fully equipped with all their own professional products, equipment and tools, and went above and beyond, even cleaning inside the radiators!",
      publishedAt: "2026-11-17T09:55:36.000Z",
    },
    {
      author: { name: "Jacqueline Aguilar", avatarUrl: null },
      rating: { value: 5 },
      text: "I booked Super Cleaners for an end of tenancy cleaning service and the results were amazing! They left the property absolutely spotless, looking as good as new. The team was professional, thorough and did a fantastic job. I would highly recommend their services!",
      publishedAt: "2026-11-09T09:55:36.000Z",
    },
  ];

  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatRelativeDate(isoStr) {
    if (!isoStr) return "Verified Google Review";
    const date = new Date(isoStr);
    if (isNaN(date.getTime())) return "Verified Google Review";
    const diffDays = Math.max(
      0,
      Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    return date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  }

  function getInitials(name) {
    const parts = String(name || "SC")
      .trim()
      .split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function renderStars(count) {
    const rating = Math.min(5, Math.max(1, Math.round(count || 5)));
    let html = "";
    for (let i = 0; i < 5; i++) {
      html += `<span class="material-symbols-outlined text-[19px] ${
        i < rating ? "text-amber-500" : "text-outline-variant/40"
      }" style="font-variation-settings: 'FILL' 1;">star</span>`;
    }
    return html;
  }

  const GOOGLE_G_SVG = `
    <svg aria-hidden="true" class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
      <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
      <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"/>
      <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
    </svg>`;

  document.addEventListener("DOMContentLoaded", () => {
    const gridEl = document.getElementById("google-reviews-grid");
    const prevBtn = document.getElementById("reviews-prev-btn");
    const nextBtn = document.getElementById("reviews-next-btn");
    const dotsEl = document.getElementById("reviews-dots");
    const ratingEl = document.getElementById("google-rating-value");
    const countEl = document.getElementById("google-rating-count");

    if (!gridEl) return;

    let allReviews = [];
    let currentPage = 0;
    let autoplayTimer = null;
    let isPaused = false;
    const AUTOPLAY_MS = 5000;

    function startAutoplay() {
      stopAutoplay();
      const totalPages = Math.max(1, Math.ceil(allReviews.length / getPerPage()));
      if (totalPages <= 1 || isPaused) return;
      autoplayTimer = setInterval(() => {
        if (!isPaused) {
          currentPage += 1;
          renderPage();
        }
      }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function getPerPage() {
      return window.innerWidth < 768 ? 1 : 3;
    }

    function renderPage() {
      const perPage = getPerPage();
      const totalPages = Math.max(1, Math.ceil(allReviews.length / perPage));
      if (currentPage >= totalPages) currentPage = 0;
      if (currentPage < 0) currentPage = totalPages - 1;

      const start = currentPage * perPage;
      const visible = allReviews.slice(start, start + perPage);

      gridEl.innerHTML = visible
        .map((review, idx) => {
          const name = escapeHTML(review.author?.name || "London Client");
          const initials = escapeHTML(getInitials(review.author?.name));
          const avatarUrl = review.author?.avatarUrl;
          const dateLabel = escapeHTML(formatRelativeDate(review.publishedAt));
          const starsHtml = renderStars(review.rating?.value || 5);
          const fullText = String(review.text || "").trim();
          const isLong = fullText.length > 210;
          const shortText = isLong
            ? fullText.slice(0, 210).trim() + "..."
            : fullText;
          const cardId = `gr-text-${start + idx}`;

          const avatarHtml = avatarUrl
            ? `<img alt="${name}" class="w-11 h-11 rounded-full object-cover border border-secondary/20 shrink-0" referrerpolicy="no-referrer" src="${escapeHTML(
                avatarUrl
              )}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="w-11 h-11 rounded-full bg-secondary-fixed/80 text-secondary font-bold text-sm items-center justify-center shrink-0" style="display:none;">${initials}</span>`
            : `<span class="w-11 h-11 rounded-full bg-secondary-fixed/80 text-secondary font-bold text-sm flex items-center justify-center shrink-0">${initials}</span>`;

          return `
            <article class="bg-surface-container-lowest p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-xl border border-secondary/15 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1">
              <div class="flex flex-col gap-3.5">
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    ${avatarHtml}
                    <div class="min-w-0">
                      <p class="font-label-md text-[15px] font-bold text-primary truncate">${name}</p>
                      <p class="font-label-sm text-[12px] text-on-surface-variant">${dateLabel}</p>
                    </div>
                  </div>
                  <div title="Verified Google Review">${GOOGLE_G_SVG}</div>
                </div>

                <div class="flex items-center gap-0.5">${starsHtml}</div>

                <div class="font-body-md text-[14.5px] text-on-surface leading-relaxed">
                  <p id="${cardId}" data-full="${escapeHTML(
            fullText
          )}" data-short="${escapeHTML(shortText)}" data-expanded="false">“${escapeHTML(
            shortText
          )}”</p>
                  ${
                    isLong
                      ? `<button class="gr-toggle-btn text-secondary font-bold text-[13px] mt-1.5 hover:underline cursor-pointer" data-target="${cardId}" type="button">Read more</button>`
                      : ""
                  }
                </div>
              </div>

              <div class="pt-3.5 border-t border-outline-variant/20 flex items-center justify-between text-[12px] text-on-surface-variant font-medium">
                <span class="inline-flex items-center gap-1 text-secondary font-semibold">
                  <span class="material-symbols-outlined text-[16px]">verified</span>
                  Verified Google Review
                </span>
                <span>Google Maps</span>
              </div>
            </article>
          `;
        })
        .join("");

      // Bind Read More / Show Less toggles
      gridEl.querySelectorAll(".gr-toggle-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const p = document.getElementById(btn.getAttribute("data-target"));
          if (!p) return;
          const expanded = p.getAttribute("data-expanded") === "true";
          p.textContent = `“${
            expanded ? p.getAttribute("data-short") : p.getAttribute("data-full")
          }”`;
          p.setAttribute("data-expanded", expanded ? "false" : "true");
          btn.textContent = expanded ? "Read more" : "Show less";
        });
      });

      // Update pagination dots (compact sliding window of max 5 dots so arrows never overflow on mobile)
      if (dotsEl) {
        dotsEl.innerHTML = "";
        if (totalPages > 1) {
          const maxDots = 5;
          let startDot = Math.max(0, currentPage - Math.floor(maxDots / 2));
          let endDot = Math.min(totalPages, startDot + maxDots);
          if (endDot - startDot < maxDots) {
            startDot = Math.max(0, endDot - maxDots);
          }

          for (let i = startDot; i < endDot; i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Reviews page ${i + 1}`);
            dot.className = `h-2.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
              i === currentPage
                ? "w-7 bg-secondary"
                : "w-2.5 bg-secondary/25 hover:bg-secondary/50"
            }`;
            dot.addEventListener("click", () => {
              currentPage = i;
              renderPage();
              startAutoplay();
            });
            dotsEl.appendChild(dot);
          }

          if (totalPages > maxDots) {
            const counter = document.createElement("span");
            counter.className = "text-[12px] font-bold text-on-surface-variant ml-1.5 tabular-nums";
            counter.textContent = `${currentPage + 1}/${totalPages}`;
            dotsEl.appendChild(counter);
          }
        }
      }

      if (prevBtn) {
        prevBtn.style.display = totalPages > 1 ? "inline-flex" : "none";
        prevBtn.classList.add("shrink-0");
      }
      if (nextBtn) {
        nextBtn.style.display = totalPages > 1 ? "inline-flex" : "none";
        nextBtn.classList.add("shrink-0");
      }
    }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          currentPage -= 1;
          renderPage();
          startAutoplay();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          currentPage += 1;
          renderPage();
          startAutoplay();
        });
      }

      // Pause autoplay when hovering over the reviews section
      const reviewsSection = document.getElementById("reviews");
      if (reviewsSection) {
        reviewsSection.addEventListener("mouseenter", () => {
          isPaused = true;
          stopAutoplay();
        });
        reviewsSection.addEventListener("mouseleave", () => {
          isPaused = false;
          startAutoplay();
        });
      }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderPage, 180);
    });

    // Fetch live Google Reviews from Featurable API v2
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        const reviews = data?.widget?.reviews;
        const summary = data?.widget?.gbpLocationSummary;
        if (summary?.rating && ratingEl) {
          ratingEl.textContent = Number(summary.rating).toFixed(1);
        }
        if (summary?.reviewsCount && countEl) {
          countEl.textContent = `${summary.reviewsCount} Verified Google Reviews →`;
        }
        if (Array.isArray(reviews) && reviews.length > 0) {
          allReviews = reviews.filter((r) => r.text && r.text.trim().length > 0);
          if (allReviews.length === 0) allReviews = FALLBACK_REVIEWS;
        } else {
          allReviews = FALLBACK_REVIEWS;
        }
        renderPage();
        startAutoplay();
      })
      .catch(() => {
        allReviews = FALLBACK_REVIEWS;
        renderPage();
        startAutoplay();
      });
  });
})();
