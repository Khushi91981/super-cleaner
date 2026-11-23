/* ==========================================================================
   Super Cleaners London — Global Header, Mobile Drawer, Floating Social Dock & Footer
   Single source of truth shared across index.html and all inner service pages.
   Works seamlessly on file://, localhost, and GitHub Pages.
   ========================================================================== */
(function () {
  const path = (window.location.pathname || "").toLowerCase();
  const isHome =
    path.endsWith("/") ||
    path.endsWith("/index.html") ||
    path === "" ||
    path === "index.html";
  const isServicesList = path.endsWith("services.html");
  const isDomestic = path.endsWith("domestic-cleaning.html");
  const isProfessional = path.endsWith("professional-cleaning.html");
  const isCommercial = path.endsWith("commercial-cleaning.html");
  const isCarpet = path.endsWith("carpet-upholstery-cleaning.html");
  const isServicePage = isServicesList || isDomestic || isProfessional || isCommercial || isCarpet;
  const isAbout = path.endsWith("about.html");
  const isFaq = path.endsWith("faq.html");
  const isBlog = path.endsWith("blog.html") || path.endsWith("blog-detail.html");
  const isAboutGroup = isAbout || isFaq || isBlog;
  const isAreas = path.endsWith("areas-we-cover.html");

  const homeHref = "index.html";
  const servicesHref = "services.html";
  const areasHref = "areas-we-cover.html";
  const faqHref = "faq.html";
  const blogHref = "blog.html";
  const aboutHref = "about.html";
  const contactHref = "#contact";

  const headerHTML = `
  <!-- RESPONSIVE STICKY HEADER -->
  <header class="scl-header" id="site-header">
    <div class="scl-header-inner">
      <!-- Brand Logo -->
      <a aria-label="Super Cleaners London Home" class="scl-logo-link" href="${homeHref}">
        <img
          alt="Super Cleaners London"
          class="scl-logo-img h-12 sm:h-14 w-auto object-contain"
          src="images/logo.png"
        />
      </a>

      <!-- Desktop Navigation -->
      <nav aria-label="Primary Navigation" class="scl-desktop-nav">
        <a ${isHome ? 'aria-current="page"' : ""} class="scl-nav-link${isHome ? " is-active" : ""}" data-nav-target="home" href="${homeHref}">Home</a>
        <div class="scl-nav-dropdown">
          <a ${isServicePage ? 'aria-current="page"' : ""} class="scl-nav-link${isServicePage ? " is-active" : ""} inline-flex items-center gap-1" data-nav-target="services" href="${servicesHref}">
            <span>Services</span>
            <span class="material-symbols-outlined scl-nav-dropdown-chevron">expand_more</span>
          </a>
          <div class="scl-nav-dropdown-menu" role="menu">
            <div class="scl-nav-dropdown-panel">
              <a class="scl-nav-dropdown-item${isDomestic ? " is-current" : ""}" href="domestic-cleaning.html" role="menuitem">
                <span class="material-symbols-outlined">cottage</span>
                <span>Domestic Cleaning Services</span>
              </a>
              <a class="scl-nav-dropdown-item${isProfessional ? " is-current" : ""}" href="professional-cleaning.html" role="menuitem">
                <span class="material-symbols-outlined">auto_awesome</span>
                <span>Professional Cleaning Services</span>
              </a>
              <a class="scl-nav-dropdown-item${isCommercial ? " is-current" : ""}" href="commercial-cleaning.html" role="menuitem">
                <span class="material-symbols-outlined">apartment</span>
                <span>Commercial Cleaning Services</span>
              </a>
              <a class="scl-nav-dropdown-item${isCarpet ? " is-current" : ""}" href="carpet-upholstery-cleaning.html" role="menuitem">
                <span class="material-symbols-outlined">water_drop</span>
                <span>Carpet &amp; Upholstery Cleaning</span>
              </a>
            </div>
          </div>
        </div>
        <a ${isAreas ? 'aria-current="page"' : ""} class="scl-nav-link${isAreas ? " is-active" : ""}" data-nav-target="coverage-areas" href="${areasHref}">Areas</a>
        <div class="scl-nav-dropdown">
          <a ${isAboutGroup ? 'aria-current="page"' : ""} class="scl-nav-link${isAboutGroup ? " is-active" : ""} inline-flex items-center gap-1" data-nav-target="about-us" href="${aboutHref}">
            <span>About</span>
            <span class="material-symbols-outlined scl-nav-dropdown-chevron">expand_more</span>
          </a>
          <div class="scl-nav-dropdown-menu" role="menu">
            <div class="scl-nav-dropdown-panel">
              <a class="scl-nav-dropdown-item${isAbout ? " is-current" : ""}" href="${aboutHref}" role="menuitem">
                <span class="material-symbols-outlined">groups</span>
                <span>About Us</span>
              </a>
              <a class="scl-nav-dropdown-item${isBlog ? " is-current" : ""}" href="${blogHref}" role="menuitem">
                <span class="material-symbols-outlined">auto_stories</span>
                <span>Blog &amp; Cleaning Tips</span>
              </a>
              <a class="scl-nav-dropdown-item${isFaq ? " is-current" : ""}" href="${faqHref}" role="menuitem">
                <span class="material-symbols-outlined">help</span>
                <span>FAQ</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Header Right Actions -->
      <div class="scl-header-actions">
        <a class="scl-header-phone hidden md:flex items-center gap-1.5 font-bold text-primary hover:text-error transition-colors" href="tel:02036649304" title="Call 020 3664 9304">
          <span class="material-symbols-outlined text-error text-[20px]" style="font-variation-settings: 'FILL' 1;">call</span>
          <span>020 3664 9304</span>
        </a>

        <div class="hidden xl:flex items-center gap-2">
          <a class="inline-flex items-center gap-1 font-bold text-primary hover:text-emerald-700 transition-colors text-sm" href="https://wa.me/447786282887" rel="noopener" target="_blank" title="WhatsApp 07786 282887">
            <span class="material-symbols-outlined text-emerald-600 text-[18px]" style="font-variation-settings: 'FILL' 1;">chat</span>
            <span>07786 282887</span>
          </a>
          <a class="inline-flex items-center gap-1 font-bold text-primary hover:text-emerald-700 transition-colors text-sm" href="https://wa.me/44750700167" rel="noopener" target="_blank" title="WhatsApp 07507 00167">
            <span class="material-symbols-outlined text-emerald-600 text-[18px]" style="font-variation-settings: 'FILL' 1;">chat</span>
            <span>07507 00167</span>
          </a>
        </div>

        <a class="scl-header-cta scl-header-cta--red font-bold px-4 py-2 rounded-full" data-open-showcase-modal href="${contactHref}">
          <span>Book Now</span>
          <span aria-hidden="true">→</span>
        </a>

        <button
          aria-controls="mobile-nav-drawer"
          aria-expanded="false"
          aria-label="Open navigation menu"
          class="scl-menu-toggle"
          id="mobile-menu-toggle"
          type="button"
        >
          <span class="material-symbols-outlined text-[24px]" id="mobile-menu-icon">menu</span>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE & TABLET NAVIGATION BACKDROP & DRAWER -->
  <div aria-hidden="true" class="scl-mobile-backdrop" id="mobile-nav-backdrop"></div>
  <aside
    aria-hidden="true"
    aria-label="Mobile Navigation Menu"
    class="scl-mobile-drawer"
    id="mobile-nav-drawer"
  >
    <div class="p-5 flex flex-col justify-between min-h-full gap-6">
      <div>
        <div class="flex items-center justify-between pb-3 mb-2 border-b border-outline-variant/30">
          <span class="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-bold">Navigation Menu</span>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Open 7 Days
          </span>
        </div>

        <nav aria-label="Mobile Navigation Links" class="scl-mobile-nav-list px-0">
          <!-- 1. Home -->
          <a class="scl-mobile-nav-link${isHome ? " is-active" : ""}" data-nav-target="home" href="${homeHref}">
            <span>Home</span>
          </a>

          <!-- 2. Services (Click text -> services.html, Click arrow -> toggle submenu) -->
          <div class="scl-mobile-accordion">
            <div class="flex items-center justify-between rounded-xl ${isServicePage ? "bg-[#ecf5ff]" : "hover:bg-surface-container-low"} transition-colors">
              <a class="flex-1 py-3 pl-3.5 pr-2 font-semibold text-[15px] ${isServicePage ? "text-secondary" : "text-primary"}" data-nav-target="services" href="${servicesHref}">
                Services
              </a>
              <button
                aria-expanded="false"
                aria-label="Toggle Services submenu"
                class="scl-mobile-subtoggle w-11 h-11 flex items-center justify-center rounded-xl text-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
                data-mobile-submenu="mobile-sub-services"
                type="button"
              >
                <span class="material-symbols-outlined text-[20px] transition-transform duration-200">expand_more</span>
              </button>
            </div>
            <div class="scl-mobile-submenu hidden pl-4 pr-2 py-1 flex flex-col gap-0.5" id="mobile-sub-services">
              <a class="text-[13.5px] ${isDomestic ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="domestic-cleaning.html">• Domestic Cleaning Services</a>
              <a class="text-[13.5px] ${isProfessional ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="professional-cleaning.html">• Professional Cleaning Services</a>
              <a class="text-[13.5px] ${isCommercial ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="commercial-cleaning.html">• Commercial Cleaning Services</a>
              <a class="text-[13.5px] ${isCarpet ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="carpet-upholstery-cleaning.html">• Carpet &amp; Upholstery Cleaning</a>
            </div>
          </div>

          <!-- 3. Areas -->
          <a class="scl-mobile-nav-link${isAreas ? " is-active" : ""}" data-nav-target="coverage-areas" href="${areasHref}">
            <span>Areas</span>
          </a>

          <!-- 4. About (Click text -> about.html, Click arrow -> toggle submenu) -->
          <div class="scl-mobile-accordion">
            <div class="flex items-center justify-between rounded-xl ${isAboutGroup ? "bg-[#ecf5ff]" : "hover:bg-surface-container-low"} transition-colors">
              <a class="flex-1 py-3 pl-3.5 pr-2 font-semibold text-[15px] ${isAboutGroup ? "text-secondary" : "text-primary"}" data-nav-target="about-us" href="${aboutHref}">
                About
              </a>
              <button
                aria-expanded="false"
                aria-label="Toggle About submenu"
                class="scl-mobile-subtoggle w-11 h-11 flex items-center justify-center rounded-xl text-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
                data-mobile-submenu="mobile-sub-about"
                type="button"
              >
                <span class="material-symbols-outlined text-[20px] transition-transform duration-200">expand_more</span>
              </button>
            </div>
            <div class="scl-mobile-submenu hidden pl-4 pr-2 py-1 flex flex-col gap-0.5" id="mobile-sub-about">
              <a class="text-[13.5px] ${isAbout ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="${aboutHref}">• About Us</a>
              <a class="text-[13.5px] ${isBlog ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="${blogHref}">• Blog &amp; Cleaning Tips</a>
              <a class="text-[13.5px] ${isFaq ? "font-bold text-secondary bg-[#ecf5ff]" : "font-medium text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"} px-3 py-2 rounded-lg transition-colors" href="${faqHref}">• FAQ</a>
            </div>
          </div>
        </nav>
      </div>

      <div class="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
        <a class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl btn-primary-red font-label-md text-label-md shadow-md transition-colors" data-open-showcase-modal href="${contactHref}">
          <span class="material-symbols-outlined text-[20px]">calendar_today</span>
          <span>Book Your Clean Online →</span>
        </a>
        <a class="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-container-low text-primary font-label-sm text-label-sm font-bold hover:bg-secondary-fixed transition-colors border border-outline-variant/40" href="tel:02036649304">
          <span class="material-symbols-outlined text-secondary text-[18px]">call</span>
          <span>Call 020 3664 9304</span>
        </a>
        <div class="grid grid-cols-2 gap-2">
          <a class="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 text-white font-label-sm text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm" href="https://wa.me/447786282887" rel="noopener" target="_blank">
            <span class="material-symbols-outlined text-[16px]">chat</span>
            <span>07786 282887</span>
          </a>
          <a class="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 text-white font-label-sm text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm" href="https://wa.me/44750700167" rel="noopener" target="_blank">
            <span class="material-symbols-outlined text-[16px]">chat</span>
            <span>07507 00167</span>
          </a>
        </div>
      </div>
    </div>
  </aside>

  <!-- INTERACTIVE FLOATING CONTACT DOCK (GLOBAL) -->
  <aside
    aria-label="Quick Contact Toolbar"
    class="scl-floating-dock fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 shadow-[0_16px_36px_-6px_rgba(15,39,68,0.22)] p-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/40"
  >
    <!-- Facebook -->
    <div class="relative group flex items-center justify-end">
      <span class="pointer-events-none hidden sm:block absolute right-12 px-3 py-1.5 bg-primary text-on-primary text-xs font-label-sm rounded-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
        Facebook Page
      </span>
      <a aria-label="Follow Super Cleaners London on Facebook" class="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm hover:brightness-105" href="${contactHref}" title="Facebook">
        <svg aria-hidden="true" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
    </div>

    <!-- Instagram -->
    <div class="relative group flex items-center justify-end">
      <span class="pointer-events-none hidden sm:block absolute right-12 px-3 py-1.5 bg-primary text-on-primary text-xs font-label-sm rounded-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
        Follow @SuperCleaners
      </span>
      <a aria-label="Follow Super Cleaners London on Instagram" class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-on-primary flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm hover:brightness-105" href="${contactHref}" title="Instagram">
        <svg aria-hidden="true" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>

    <!-- WhatsApp 1 -->
    <div class="relative group flex items-center justify-end">
      <span class="pointer-events-none hidden sm:block absolute right-12 px-3 py-1.5 bg-emerald-700 text-on-primary text-xs font-label-sm rounded-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
        WhatsApp: 07786 282887
      </span>
      <a aria-label="Chat on WhatsApp 07786 282887" class="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm hover:brightness-105" href="https://wa.me/447786282887" rel="noopener" target="_blank" title="WhatsApp: 07786 282887">
        <svg aria-hidden="true" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>

    <!-- WhatsApp 2 -->
    <div class="relative group flex items-center justify-end">
      <span class="pointer-events-none hidden sm:block absolute right-12 px-3 py-1.5 bg-teal-800 text-on-primary text-xs font-label-sm rounded-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
        WhatsApp: 07507 00167
      </span>
      <a aria-label="Chat on WhatsApp 07507 00167" class="w-10 h-10 rounded-full bg-[#128C7E] text-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm hover:brightness-105" href="https://wa.me/44750700167" rel="noopener" target="_blank" title="WhatsApp: 07507 00167">
        <svg aria-hidden="true" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>

    <!-- Email Us -->
    <div class="relative group flex items-center justify-end">
      <span class="pointer-events-none hidden sm:block absolute right-12 px-3 py-1.5 bg-primary text-on-primary text-xs font-label-sm rounded-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-md">
        Email Support Desk
      </span>
      <a aria-label="Email Super Cleaners London" class="w-10 h-10 rounded-full bg-secondary text-on-primary flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm hover:brightness-110" href="mailto:info@supercleanerslondon.co.uk" title="Send Email">
        <span class="material-symbols-outlined text-[20px]">mail</span>
      </a>
    </div>
  </aside>
  `;

  const footerHTML = `
  <footer class="w-full bg-primary text-surface-variant pt-16 pb-12">
    <div class="max-w-[1320px] mx-auto px-margin-mobile lg:px-margin">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10" data-stagger-group data-stagger-step="90">
        <!-- Column 1: Brand -->
        <div class="flex flex-col gap-4" data-animate="fade-up">
          <div class="flex items-center gap-2">
            <a class="bg-surface-container-lowest p-2 rounded-lg inline-flex items-center hover:scale-105 transition-transform duration-200" href="${homeHref}">
              <img alt="Super Cleaners London" class="h-16 w-auto object-contain" src="images/logo.png" />
            </a>
          </div>
          <p class="font-body-sm text-body-sm text-surface-container-highest/80 leading-relaxed">
            London cleaning since 2006. Over two decades of discrete, immaculate domestic and commercial cleaning services across Fulham, Chelsea, Kensington, Westminster, and Greater London.
          </p>
          <div class="flex items-center gap-1.5 font-label-caps text-label-caps text-secondary-fixed-dim">
            <span class="material-symbols-outlined text-[16px]">verified_user</span>
            <span>Fully Trained &amp; Insured</span>
          </div>
        </div>

        <!-- Column 2: Services -->
        <div class="flex flex-col gap-4" data-animate="fade-up">
          <h3 class="font-headline-sm text-headline-sm text-on-primary">Services</h3>
          <ul class="flex flex-col gap-2.5 font-body-sm text-body-sm">
            <li><a class="${isDomestic ? "text-white font-semibold" : "hover:text-on-primary"} transition-colors" href="domestic-cleaning.html">Domestic Cleaning Services</a></li>
            <li><a class="${isProfessional ? "text-white font-semibold" : "hover:text-on-primary"} transition-colors" href="professional-cleaning.html">Professional Cleaning Services</a></li>
            <li><a class="${isCommercial ? "text-white font-semibold" : "hover:text-on-primary"} transition-colors" href="commercial-cleaning.html">Commercial Cleaning Services</a></li>
            <li><a class="${isCarpet ? "text-white font-semibold" : "hover:text-on-primary"} transition-colors" href="carpet-upholstery-cleaning.html">Carpet &amp; Upholstery Cleaning</a></li>
          </ul>
        </div>

        <!-- Column 3: Coverage Areas -->
        <div class="flex flex-col gap-4" data-animate="fade-up">
          <h3 class="font-headline-sm text-headline-sm text-on-primary">Coverage Areas</h3>
          <ul class="flex flex-col gap-2.5 font-body-sm text-body-sm">
            <li><a class="hover:text-on-primary transition-colors" href="areas-we-cover.html">Fulham &amp; Parsons Green (SW6)</a></li>
            <li><a class="hover:text-on-primary transition-colors" href="areas-we-cover.html">Chelsea &amp; Kensington (SW3, SW7, W8)</a></li>
            <li><a class="hover:text-on-primary transition-colors" href="areas-we-cover.html">Putney, Wandsworth &amp; Earlsfield</a></li>
            <li><a class="hover:text-on-primary transition-colors" href="areas-we-cover.html">Battersea, Clapham &amp; Hammersmith</a></li>
            <li><a class="hover:text-on-primary transition-colors" href="areas-we-cover.html">Bromley (BR1/BR2) &amp; Greater London</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact & Enquiries -->
        <div class="flex flex-col gap-4" data-animate="fade-up">
          <h3 class="font-headline-sm text-headline-sm text-on-primary">Contact &amp; Enquiries</h3>
          <div class="flex flex-col gap-2.5 font-body-sm text-body-sm">
            <a class="flex items-center gap-2 hover:text-on-primary transition-colors" href="tel:02036649304">
              <span class="material-symbols-outlined text-secondary-fixed text-[18px]">call</span>
              <span>020 3664 9304</span>
            </a>
            <a class="flex items-center gap-2 hover:text-on-primary transition-colors" href="https://wa.me/447786282887" rel="noopener" target="_blank">
              <span class="material-symbols-outlined text-secondary-fixed text-[18px]">chat</span>
              <span>WhatsApp: 07786 282887</span>
            </a>
            <a class="flex items-center gap-2 hover:text-on-primary transition-colors" href="https://wa.me/44750700167" rel="noopener" target="_blank">
              <span class="material-symbols-outlined text-secondary-fixed text-[18px]">chat</span>
              <span>WhatsApp: 07507 00167</span>
            </a>
            <a class="flex items-center gap-2 hover:text-on-primary transition-colors" href="mailto:info@supercleanerslondon.co.uk">
              <span class="material-symbols-outlined text-secondary-fixed text-[18px]">mail</span>
              <span>info@supercleanerslondon.co.uk</span>
            </a>
            <div class="flex items-center gap-1.5 pt-1">
              <span class="material-symbols-outlined text-amber-400 text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="font-bold text-on-primary">4.9/5 Rating</span>
              <span class="text-surface-container-highest/70 font-label-sm text-label-sm">(99+ Google Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-surface-container-highest/60">
        <p>© 2006–2026 Super Cleaners London Ltd. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <a class="hover:text-on-primary transition-colors" href="${homeHref}">Privacy Policy</a>
          <a class="hover:text-on-primary transition-colors" href="${homeHref}">Terms of Service</a>
          <a class="hover:text-on-primary transition-colors" href="${homeHref}">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  const headerSlot = document.getElementById("scl-global-header");
  if (headerSlot) {
    headerSlot.outerHTML = headerHTML;
  }

  const footerSlot = document.getElementById("scl-global-footer");
  if (footerSlot) {
    footerSlot.outerHTML = footerHTML;
  }

  // Bind Mobile Submenu Arrow Toggles (click text = navigate, click arrow = toggle submenu)
  document.querySelectorAll(".scl-mobile-subtoggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = btn.getAttribute("data-mobile-submenu");
      const menu = targetId ? document.getElementById(targetId) : null;
      if (!menu) return;
      const isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden", isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      const icon = btn.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
      }
    });
  });
})();
