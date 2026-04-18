document.addEventListener("DOMContentLoaded", () => {

  // =============== Mobile Menu Section Start ============
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

  const openMenu = () => {
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    mobileDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
      const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
      const menu = dropdown.querySelector(".mobile-dropdown-menu");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      if (menu) menu.style.maxHeight = "0px";
    });
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeDesktopDropdowns();
    }
  });
  // =============== Mobile Menu Section End ===============


  // =============== Desktop Dropdown Section Start ============
  const desktopDropdowns = document.querySelectorAll(".nav-dropdown");

  function closeDesktopDropdowns() {
    desktopDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
      const toggle = dropdown.querySelector(".nav-dropdown-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  if (desktopDropdowns.length) {
    desktopDropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".nav-dropdown-toggle");

      if (!toggle) return;

      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isActive = dropdown.classList.contains("active");

        closeDesktopDropdowns();

        if (!isActive) {
          dropdown.classList.add("active");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-dropdown")) {
        closeDesktopDropdowns();
      }
    });
  }
  // =============== Desktop Dropdown Section End ===============


  // =============== Mobile Dropdown Section Start ============
  const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");

  if (mobileDropdowns.length) {
    mobileDropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
      const menu = dropdown.querySelector(".mobile-dropdown-menu");

      if (!toggle || !menu) return;

      toggle.addEventListener("click", () => {
        const isActive = dropdown.classList.contains("active");

        mobileDropdowns.forEach((item) => {
          item.classList.remove("active");
          const itemToggle = item.querySelector(".mobile-dropdown-toggle");
          const itemMenu = item.querySelector(".mobile-dropdown-menu");
          if (itemToggle) itemToggle.setAttribute("aria-expanded", "false");
          if (itemMenu) itemMenu.style.maxHeight = "0px";
        });

        if (!isActive) {
          dropdown.classList.add("active");
          toggle.setAttribute("aria-expanded", "true");
          menu.style.maxHeight = menu.scrollHeight + "px";
        }
      });
    });
  }
  // =============== Mobile Dropdown Section End ===============



  // =============== Global Reveal Animation Start ===============
  let revealObserver;

  function createRevealObserver() {
    if (revealObserver) return revealObserver;

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 0% 0px"
      }
    );

    return revealObserver;
  }

  window.initializeRevealItems = function (scope = document) {
    const revealItems = scope.querySelectorAll(".reveal-up");
    if (!revealItems.length) return;

    const observer = createRevealObserver();

    revealItems.forEach((item) => {
      if (item.classList.contains("active")) return;

      const rect = item.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      const alreadyVisible = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

      if (alreadyVisible) {
        item.classList.add("active");
      } else {
        observer.observe(item);
      }
    });
  };

  window.initializeRevealItems();
  // =============== Global Reveal Animation End ===============



  // =============== Blog Details Load Animation Start ===============
  const blogLoadItems = document.querySelectorAll(".blog-load-animate");

  if (blogLoadItems.length) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blogLoadItems.forEach((item) => {
          item.classList.add("blog-load-active");
        });
      });
    });
  }
  // =============== Blog Details Load Animation End ===============
});



// =============== Why Choose Section Interactive Start ===============
const savingSelectWrap = document.querySelector(".saving-select-wrap");
const savingSelectBtn = document.getElementById("savingSelectBtn");
const savingSelectMenu = document.getElementById("savingSelectMenu");
const savingCurrentFilter = document.getElementById("savingCurrentFilter");
const savingIncomeValue = document.getElementById("savingIncomeValue");
const savingLinePath = document.getElementById("savingLinePath");
const savingPoint = document.getElementById("savingPoint");
const savingHighlight = document.getElementById("savingHighlight");
const savingXAxis = document.getElementById("savingXAxis");
const expenseItems = document.querySelectorAll(".expense-item");

const savingChartData = {
  Month: {
    total: "$25,267<span>.50</span>",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [0.2, 2.8, 2.7, 6.95, 5.8, 6.9],
    activeIndex: 3
  },
  Quarter: {
    total: "$74,820<span>.90</span>",
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    values: [0.8, 2.6, 4.1, 6.7, 5.9, 7.3],
    activeIndex: 3
  },
  "Half Year": {
    total: "$148,450<span>.80</span>",
    labels: ["H1", "H2", "H3", "H4", "H5", "H6"],
    values: [0.5, 2.1, 3.8, 6.4, 5.5, 6.8],
    activeIndex: 3
  }
};

function buildSmoothPath(points) {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

function renderSavingChart(filterName) {
  if (!savingLinePath || !savingPoint || !savingHighlight || !savingXAxis || !savingIncomeValue) return;

  const currentData = savingChartData[filterName];
  if (!currentData) return;

  const { total, labels, values, activeIndex } = currentData;
  const maxValue = 8;
  const width = 100;
  const height = 100;
  const stepX = width / (labels.length - 1);

  const points = values.map((value, index) => {
    const x = stepX * index;
    const y = height - (value / maxValue) * height;
    return { x, y };
  });

  savingLinePath.setAttribute("d", buildSmoothPath(points));

  const activePoint = points[activeIndex];
  savingPoint.style.left = `${activePoint.x}%`;
  savingPoint.style.top = `${activePoint.y}%`;

  const axisWidth = savingXAxis.offsetWidth;
  const chartHeight = savingXAxis.parentElement.offsetHeight - 26;
  const colWidth = axisWidth / labels.length;
  const highlightHeight = (values[activeIndex] / maxValue) * chartHeight;

  savingHighlight.style.left = `${(activeIndex * colWidth) + (colWidth / 2)}px`;
  savingHighlight.style.height = `${highlightHeight}px`;

  savingXAxis.innerHTML = labels
    .map((label, index) => `<span class="${index === activeIndex ? "active" : ""}">${label}</span>`)
    .join("");

  savingIncomeValue.innerHTML = total;
}

if (savingSelectBtn && savingSelectWrap && savingSelectMenu) {
  renderSavingChart("Month");

  savingSelectBtn.addEventListener("click", () => {
    const expanded = savingSelectBtn.getAttribute("aria-expanded") === "true";
    savingSelectWrap.classList.toggle("active");
    savingSelectBtn.setAttribute("aria-expanded", String(!expanded));
  });

  savingSelectMenu.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      savingCurrentFilter.textContent = selectedFilter;
      savingSelectWrap.classList.remove("active");
      savingSelectBtn.setAttribute("aria-expanded", "false");
      renderSavingChart(selectedFilter);
    });
  });

  document.addEventListener("click", (event) => {
    if (!savingSelectWrap.contains(event.target)) {
      savingSelectWrap.classList.remove("active");
      savingSelectBtn.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    renderSavingChart(savingCurrentFilter.textContent.trim());
  });
}

if (expenseItems.length) {
  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressValue = entry.target.getAttribute("data-progress");
          const fill = entry.target.querySelector(".expense-fill");
          if (fill) {
            fill.style.width = `${progressValue}%`;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  expenseItems.forEach((item) => progressObserver.observe(item));
}
// =============== Why Choose Section Interactive End ===============



// =============== CRM Showcase Section Start ===============
const crmVisualCards = document.querySelectorAll(".crm-visual-card");

if (crmVisualCards.length) {
  crmVisualCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 991) return;

      const imageWrap = card.querySelector(".crm-visual-image-wrap");
      const floatingCards = card.querySelectorAll(".crm-gender-card, .crm-small-card");

      const rect = card.getBoundingClientRect();
      const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

      if (imageWrap) {
        imageWrap.style.transform = `translate(${moveX * 0.35}px, ${moveY * 0.35}px)`;
      }

      floatingCards.forEach((item, index) => {
        const factor = index === 0 ? 0.55 : 0.75;
        item.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      const imageWrap = card.querySelector(".crm-visual-image-wrap");
      const floatingCards = card.querySelectorAll(".crm-gender-card, .crm-small-card");

      if (imageWrap) {
        imageWrap.style.transform = "";
      }

      floatingCards.forEach((item) => {
        item.style.transform = "";
      });
    });
  });
}
// =============== CRM Showcase Section End ===============



// =============== Features Section Start =============== 
document.addEventListener("DOMContentLoaded", () => {
    const featureItems = document.querySelectorAll(".feature-item");
    const progressLine = document.querySelector(".features-progress-line");
    const progressActive = document.querySelector(".features-progress-active");

    const featuresCard = document.getElementById("featuresCard");
    const featureCardTitle = document.getElementById("featureCardTitle");
    const featureCardLink = document.getElementById("featureCardLink");
    const featureCardLabel = document.getElementById("featureCardLabel");
    const featureCardAmount = document.getElementById("featureCardAmount");
    const featureCardPeriod = document.getElementById("featureCardPeriod");
    const featuresChartBars = document.getElementById("featuresChartBars");

    let activeIndex = 0;
    let autoRotate;

    function buildChart(months, values) {
        featuresChartBars.innerHTML = "";

        const maxValue = Math.max(...values);

        values.forEach((value, index) => {
            const chartItem = document.createElement("div");
            chartItem.className = "features-chart__item";

            if (index === 2) {
                chartItem.classList.add("is-active");
            }

            const barWrap = document.createElement("div");
            barWrap.className = "features-chart__bar-wrap";

            const bar = document.createElement("div");
            bar.className = "features-chart__bar";
            bar.style.height = `${Math.max((value / maxValue) * 100, 26)}%`;

            const label = document.createElement("div");
            label.className = "features-chart__label";
            label.textContent = months[index] || "";

            barWrap.appendChild(bar);
            chartItem.appendChild(barWrap);
            chartItem.appendChild(label);
            featuresChartBars.appendChild(chartItem);
        });
    }

    function updateProgress(targetItem) {
        if (!targetItem || !progressLine || !progressActive) return;

        const lineRect = progressLine.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();

        const offsetTop = itemRect.top - lineRect.top;
        const itemHeight = targetItem.offsetHeight;

        progressActive.style.height = `${itemHeight}px`;
        progressActive.style.top = `${offsetTop}px`;
    }

    function updateCard(targetItem) {
        const title = targetItem.dataset.title || "Overview";
        const link = targetItem.dataset.link || "See reports";
        const label = targetItem.dataset.label || "Spend this month";
        const amount = targetItem.dataset.amount || "$0.00";
        const period = targetItem.dataset.period || "Month";
        const months = (targetItem.dataset.months || "").split(",");
        const values = (targetItem.dataset.values || "").split(",").map(Number);

        featuresCard.classList.add("is-switching");

        setTimeout(() => {
            featureCardTitle.textContent = title;
            featureCardLink.textContent = link;
            featureCardLabel.textContent = label;
            featureCardAmount.textContent = amount;
            featureCardPeriod.childNodes[0].nodeValue = `${period} `;
            buildChart(months, values);
            featuresCard.classList.remove("is-switching");
        }, 180);
    }

    function setActiveFeature(index, userTriggered = false) {
        const targetItem = featureItems[index];
        if (!targetItem) return;

        featureItems.forEach((item) => item.classList.remove("feature-item-active"));
        targetItem.classList.add("feature-item-active");

        activeIndex = index;
        updateProgress(targetItem);
        updateCard(targetItem);

        if (userTriggered) {
            resetAutoRotate();
        }
    }

    function nextFeature() {
        activeIndex = (activeIndex + 1) % featureItems.length;
        setActiveFeature(activeIndex);
    }

    function startAutoRotate() {
        autoRotate = setInterval(nextFeature, 4500);
    }

    function resetAutoRotate() {
        clearInterval(autoRotate);
        startAutoRotate();
    }

    featureItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            setActiveFeature(index, true);
        });

        item.addEventListener("mouseenter", () => {
            if (window.innerWidth > 991) {
                setActiveFeature(index, true);
            }
        });
    });

    window.addEventListener("resize", () => {
        const activeItem = document.querySelector(".feature-item-active");
        if (activeItem) {
            updateProgress(activeItem);
        }
    });

    setActiveFeature(0);
    startAutoRotate();
});
// =============== Features Section End ===============



// =============== Highlights Section Animation Start ===============
const highlightRevealItems = document.querySelectorAll(
  ".highlights-section .reveal-up"
);

if (highlightRevealItems.length) {
  const highlightObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  highlightRevealItems.forEach((item) => highlightObserver.observe(item));
}
// =============== Highlights Section Animation End ===============



// =============== How It Works Slider Start ===============
const howWorksTrack = document.getElementById("howWorksTrack");
const howWorksViewport = document.getElementById("howWorksViewport");
const howWorksPrev = document.getElementById("howWorksPrev");
const howWorksNext = document.getElementById("howWorksNext");
const howWorksDots = document.querySelectorAll(".how-works-dot");

if (howWorksTrack && howWorksViewport && howWorksPrev && howWorksNext && howWorksDots.length) {
  const originalCards = Array.from(howWorksTrack.querySelectorAll(".how-works-card"));
  const totalSlides = originalCards.length;

  if (totalSlides > 1) {
    const firstClone = originalCards[0].cloneNode(true);
    const lastClone = originalCards[totalSlides - 1].cloneNode(true);

    firstClone.classList.add("how-works-clone");
    lastClone.classList.add("how-works-clone");

    howWorksTrack.appendChild(firstClone,);
    howWorksTrack.insertBefore(lastClone, howWorksTrack.firstChild);
  }

  let allCards = Array.from(howWorksTrack.querySelectorAll(".how-works-card"));
  let currentIndex = 1;
  let isAnimating = false;

  function getStep() {
    if (!allCards.length) return 0;
    const cardWidth = allCards[0].getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(howWorksTrack);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || 0);
    return cardWidth + gap;
  }

  function getRealIndex() {
    let realIndex = currentIndex - 1;

    if (realIndex < 0) realIndex = totalSlides - 1;
    if (realIndex >= totalSlides) realIndex = 0;

    return realIndex;
  }

  function setActiveState() {
    const realIndex = getRealIndex();

    allCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === currentIndex);
    });

    howWorksDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === realIndex);
    });
  }

  function moveSlider(withAnimation = true) {
    const step = getStep();

    howWorksTrack.style.transition = withAnimation
      ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    howWorksTrack.style.transform = `translateX(-${currentIndex * step}px)`;
    setActiveState();
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += 1;
    moveSlider(true);
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex -= 1;
    moveSlider(true);
  }

  howWorksNext.addEventListener("click", nextSlide);
  howWorksPrev.addEventListener("click", prevSlide);

  howWorksDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex = index + 1;
      moveSlider(true);
    });
  });

  howWorksTrack.addEventListener("transitionend", () => {
    if (currentIndex === 0) {
      currentIndex = totalSlides;
      moveSlider(false);
    }

    if (currentIndex === totalSlides + 1) {
      currentIndex = 1;
      moveSlider(false);
    }

    requestAnimationFrame(() => {
      isAnimating = false;
    });
  });

  window.addEventListener("resize", () => {
    moveSlider(false);
  });

  moveSlider(false);
}
// =============== How It Works Slider End ===============



// =============== Blog Section Start ===============
document.addEventListener("DOMContentLoaded", () => {
  const blogCards = document.querySelectorAll(".blog-card[data-blog-id]");

  if (blogCards.length) {
    blogCards.forEach((card) => {
      card.addEventListener("click", () => {
        const blogData = {
          id: card.dataset.blogId || "",
          title: card.dataset.blogTitle || "",
          readTime: card.dataset.blogRead || "",
          excerpt: card.dataset.blogExcerpt || "",
          image: card.dataset.blogImage || ""
        };

        localStorage.setItem("selectedBlogPost", JSON.stringify(blogData));
      });
    });
  }
});
// =============== Blog Section End ===============



// =============== Integrations Section Start ===============
document.addEventListener("DOMContentLoaded", () => {
  const integrationCards = document.querySelectorAll(".integration-card");

  if (integrationCards.length) {
    integrationCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        if (window.innerWidth <= 991) return;

        const rect = card.getBoundingClientRect();
        const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

        card.style.transform = `translate(${moveX * 0.18}px, ${moveY * 0.18 - 6}px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
// =============== Integrations Section End ===============



// =============== FAQ Section Start ===============
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length) {
    faqItems.forEach((item, index) => {
      const button = item.querySelector(".faq-question");
      const answerWrap = item.querySelector(".faq-answer-wrap");

      if (!button || !answerWrap) return;

      if (index === 0) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        answerWrap.style.maxHeight = answerWrap.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        answerWrap.style.maxHeight = "0px";
      }

      button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach((faq) => {
          const faqButton = faq.querySelector(".faq-question");
          const faqAnswerWrap = faq.querySelector(".faq-answer-wrap");

          faq.classList.remove("active");
          if (faqButton) faqButton.setAttribute("aria-expanded", "false");
          if (faqAnswerWrap) faqAnswerWrap.style.maxHeight = "0px";
        });

        if (!isActive) {
          item.classList.add("active");
          button.setAttribute("aria-expanded", "true");
          answerWrap.style.maxHeight = answerWrap.scrollHeight + "px";
        }
      });
    });

    window.addEventListener("resize", () => {
      const activeItem = document.querySelector(".faq-item.active");
      if (!activeItem) return;

      const activeAnswerWrap = activeItem.querySelector(".faq-answer-wrap");
      if (activeAnswerWrap) {
        activeAnswerWrap.style.maxHeight = activeAnswerWrap.scrollHeight + "px";
      }
    });
  }
});
// =============== FAQ Section End ===============



// ======================= Pricing Section Animation Start =======================
document.addEventListener("DOMContentLoaded", () => {
  const pricingCards = document.querySelectorAll(".pricing-card");

  if (pricingCards.length) {
    pricingCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        if (window.innerWidth <= 991) return;

        const rect = card.getBoundingClientRect();
        const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

        card.style.transform = `translateY(-8px) rotateX(${-moveY * 0.35}deg) rotateY(${moveX * 0.35}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
// ======================= Pricing Section Animation End =======================



// ======================= Pricing Testimonial Slider Start =======================
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("pricingTestiSlider");
  const track = document.getElementById("pricingTestiTrack");
  const dotsWrap = document.getElementById("pricingTestiDots");

  if (!slider || !track) return;

  const originalCards = Array.from(track.querySelectorAll(".pricing-testi-card"));
  if (!originalCards.length) return;

  let autoSlide = null;
  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
  }

  function setupTrack() {
    track.innerHTML = "";

    const visibleCards = getVisibleCards();

    originalCards.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    originalCards.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    if (originalCards.length <= visibleCards) {
      originalCards.forEach((card) => {
        track.appendChild(card.cloneNode(true));
      });
    }
  }

  function getGap() {
    const style = window.getComputedStyle(track);
    return parseFloat(style.gap || 0);
  }

  function getCardWidth() {
    const firstCard = track.querySelector(".pricing-testi-card");
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + getGap();
  }

  function getTotalPages() {
    return originalCards.length;
  }

  function createDots() {
    if (!dotsWrap) return;

    dotsWrap.innerHTML = "";
    const totalPages = getTotalPages();

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "pricing-testi-dot";
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider(true);
        resetAutoSlide();
      });

      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;

    const dots = dotsWrap.querySelectorAll(".pricing-testi-dot");
    const realIndex = currentIndex % originalCards.length;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === realIndex);
    });
  }

  function updateSlider(animate = true) {
    const step = getCardWidth();
    currentTranslate = -(currentIndex * step);
    prevTranslate = currentTranslate;

    track.style.transition = animate
      ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    track.style.transform = `translateX(${currentTranslate}px)`;
    updateDots();
  }

  function normalizeIndex() {
    if (currentIndex >= originalCards.length) {
      currentIndex = 0;
      updateSlider(false);
    }

    if (currentIndex < 0) {
      currentIndex = originalCards.length - 1;
      updateSlider(false);
    }
  }

  function nextSlide() {
    currentIndex += 1;
    updateSlider(true);

    setTimeout(() => {
      normalizeIndex();
    }, 720);
  }

  function prevSlide() {
    currentIndex -= 1;
    updateSlider(true);

    setTimeout(() => {
      normalizeIndex();
    }, 720);
  }

  function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  function dragStart(clientX) {
    isDragging = true;
    startX = clientX;
    track.style.transition = "none";
    clearInterval(autoSlide);
  }

  function dragMove(clientX) {
    if (!isDragging) return;
    const diff = clientX - startX;
    track.style.transform = `translateX(${prevTranslate + diff}px)`;
  }

  function dragEnd(clientX) {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = clientX - startX;
    const threshold = 70;

    if (movedBy < -threshold) {
      nextSlide();
    } else if (movedBy > threshold) {
      prevSlide();
    } else {
      updateSlider(true);
    }

    startAutoSlide();
  }

  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => startAutoSlide());

  slider.addEventListener("mousedown", (e) => dragStart(e.clientX));
  window.addEventListener("mousemove", (e) => dragMove(e.clientX));
  window.addEventListener("mouseup", (e) => dragEnd(e.clientX));

  slider.addEventListener("touchstart", (e) => dragStart(e.touches[0].clientX), { passive: true });
  slider.addEventListener("touchmove", (e) => dragMove(e.touches[0].clientX), { passive: true });
  slider.addEventListener("touchend", (e) => dragEnd(e.changedTouches[0].clientX));

  window.addEventListener("resize", () => {
    setupTrack();
    createDots();
    currentIndex = 0;
    updateSlider(false);
  });

  setupTrack();
  createDots();
  updateSlider(false);
  startAutoSlide();
});
// ======================= Pricing Testimonial Slider End =======================



// ======================= Pricing FAQ Section Start =======================
document.addEventListener("DOMContentLoaded", () => {
  const pricingFaqItems = document.querySelectorAll(".pricing-faq-item");

  if (pricingFaqItems.length) {
    pricingFaqItems.forEach((item, index) => {
      const button = item.querySelector(".pricing-faq-question");
      const answerWrap = item.querySelector(".pricing-faq-answer-wrap");

      if (!button || !answerWrap) return;

      if (index === 0) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        answerWrap.style.maxHeight = answerWrap.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        answerWrap.style.maxHeight = "0px";
      }

      button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        pricingFaqItems.forEach((faqItem) => {
          const faqButton = faqItem.querySelector(".pricing-faq-question");
          const faqAnswerWrap = faqItem.querySelector(".pricing-faq-answer-wrap");

          faqItem.classList.remove("active");
          if (faqButton) faqButton.setAttribute("aria-expanded", "false");
          if (faqAnswerWrap) faqAnswerWrap.style.maxHeight = "0px";
        });

        if (!isActive) {
          item.classList.add("active");
          button.setAttribute("aria-expanded", "true");
          answerWrap.style.maxHeight = answerWrap.scrollHeight + "px";
        }
      });
    });

    window.addEventListener("resize", () => {
      const activeItem = document.querySelector(".pricing-faq-item.active");
      if (!activeItem) return;

      const activeAnswerWrap = activeItem.querySelector(".pricing-faq-answer-wrap");
      if (activeAnswerWrap) {
        activeAnswerWrap.style.maxHeight = activeAnswerWrap.scrollHeight + "px";
      }
    });
  }
});
// ======================= Pricing FAQ Section End =======================



// ======================= Contact Page Section Animation Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const contactRevealItems = document.querySelectorAll(".contact-page-pro-section .reveal-up");

    if (contactRevealItems.length) {
        const contactObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        contactRevealItems.forEach((item) => {
            contactObserver.observe(item);
        });
    }
});
// ======================= Contact Page Section Animation End =======================



// ======================= Error 404 Hero Animation Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const error404RevealItems = document.querySelectorAll(".error404-pro-hero-section .reveal-up");

    if (error404RevealItems.length) {
        const error404Observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        error404RevealItems.forEach((item) => {
            error404Observer.observe(item);
        });
    }
});
// ======================= Error 404 Hero Animation End =======================



// ======================= Terms Page Animation Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const termsRevealItems = document.querySelectorAll(".terms-page-pro-section .reveal-up");

    if (termsRevealItems.length) {
        const termsObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        termsRevealItems.forEach((item) => {
            termsObserver.observe(item);
        });
    }
});
// ======================= Terms Page Animation End =======================



// ======================= Privacy Page Animation Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const privacyRevealItems = document.querySelectorAll(".privacy-page-pro-section .reveal-up");

    if (privacyRevealItems.length) {
        const privacyObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        privacyRevealItems.forEach((item) => {
            privacyObserver.observe(item);
        });
    }
});
// ======================= Privacy Page Animation End =======================



// ======================= Changelog Page Animation Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const changelogRevealItems = document.querySelectorAll(".changelog-page-pro-section .reveal-up");

    if (changelogRevealItems.length) {
        const changelogObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        changelogRevealItems.forEach((item) => {
            changelogObserver.observe(item);
        });
    }
});
// ======================= Changelog Page Animation End =======================



// ======================= Footer Year Start =======================
const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
// ======================= Footer Year End =======================



document.addEventListener("DOMContentLoaded", () => {
    // ======================= Contact Page Form Functionality Start =======================

    const contactForm = document.querySelector(".contact-page-pro-form");
    const fullNameInput = contactForm?.querySelector('input[name="full_name"]');
    const emailInput = contactForm?.querySelector('input[name="email"]');
    const messageInput = contactForm?.querySelector('textarea[name="message"]');
    const submitBtn = contactForm?.querySelector(".contact-page-pro-submit-btn");

    if (!contactForm || !fullNameInput || !emailInput || !messageInput || !submitBtn) return;

    const formFields = [fullNameInput, emailInput, messageInput];

    const validators = {
        full_name: (value) => {
            if (!value.trim()) return "Please enter your full name.";
            if (value.trim().length < 3) return "Full name must be at least 3 characters long.";
            return "";
        },
        email: (value) => {
            const email = value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!email) return "Please enter your email address.";
            if (!emailPattern.test(email)) return "Please enter a valid email address.";
            return "";
        },
        message: (value) => {
            const message = value.trim();
            if (!message) return "Please write your message.";
            if (message.length < 20) return "Message must be at least 20 characters long.";
            return "";
        }
    };

    const createFeedbackElement = (field) => {
        let feedback = field.parentElement.querySelector(".contact-field-feedback");

        if (!feedback) {
            feedback = document.createElement("span");
            feedback.className = "contact-field-feedback";
            feedback.style.display = "block";
            feedback.style.marginTop = "10px";
            feedback.style.fontSize = "14px";
            feedback.style.lineHeight = "1.5";
            feedback.style.fontWeight = "500";
            field.parentElement.appendChild(feedback);
        }

        return feedback;
    };

    const setFieldState = (field, state, message = "") => {
        const feedback = createFeedbackElement(field);

        field.classList.remove("is-error", "is-success");

        if (state === "error") {
            field.classList.add("is-error");
            field.style.borderColor = "#ff6b6b";
            field.style.boxShadow = "0 0 0 4px rgba(255, 107, 107, 0.12)";
            feedback.textContent = message;
            feedback.style.color = "#ff8f8f";
        } else if (state === "success") {
            field.classList.add("is-success");
            field.style.borderColor = "#4fd1a5";
            field.style.boxShadow = "0 0 0 4px rgba(79, 209, 165, 0.12)";
            feedback.textContent = "";
        } else {
            field.style.borderColor = "";
            field.style.boxShadow = "";
            feedback.textContent = "";
        }
    };

    const validateField = (field) => {
        const fieldName = field.getAttribute("name");
        const value = field.value;
        const errorMessage = validators[fieldName]?.(value) || "";

        if (errorMessage) {
            setFieldState(field, "error", errorMessage);
            return false;
        }

        setFieldState(field, "success");
        return true;
    };

    const validateForm = () => {
        let isValid = true;

        formFields.forEach((field) => {
            const valid = validateField(field);
            if (!valid) isValid = false;
        });

        return isValid;
    };

    const createFormAlert = () => {
        let alertBox = contactForm.querySelector(".contact-form-alert");

        if (!alertBox) {
            alertBox = document.createElement("div");
            alertBox.className = "contact-form-alert";
            alertBox.style.marginTop = "20px";
            alertBox.style.padding = "14px 18px";
            alertBox.style.borderRadius = "14px";
            alertBox.style.fontSize = "14px";
            alertBox.style.lineHeight = "1.6";
            alertBox.style.fontWeight = "500";
            alertBox.style.display = "none";
            contactForm.appendChild(alertBox);
        }

        return alertBox;
    };

    const showFormAlert = (type, message) => {
        const alertBox = createFormAlert();

        alertBox.style.display = "block";
        alertBox.textContent = message;

        if (type === "error") {
            alertBox.style.color = "#ffd7d7";
            alertBox.style.background = "rgba(255, 107, 107, 0.12)";
            alertBox.style.border = "1px solid rgba(255, 107, 107, 0.28)";
        } else {
            alertBox.style.color = "#d7ffee";
            alertBox.style.background = "rgba(79, 209, 165, 0.12)";
            alertBox.style.border = "1px solid rgba(79, 209, 165, 0.28)";
        }
    };

    const clearFormAlert = () => {
        const alertBox = contactForm.querySelector(".contact-form-alert");
        if (alertBox) {
            alertBox.style.display = "none";
            alertBox.textContent = "";
        }
    };

    const setButtonLoading = (isLoading) => {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.style.opacity = "0.8";
            submitBtn.style.cursor = "not-allowed";
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || "Submit Inquiry";
            submitBtn.style.opacity = "";
            submitBtn.style.cursor = "";
        }
    };

    const resetFieldStates = () => {
        formFields.forEach((field) => {
            setFieldState(field, "default");
        });
    };

    const focusFirstInvalidField = () => {
        const firstInvalid = contactForm.querySelector(".is-error");
        if (firstInvalid) firstInvalid.focus();
    };

    fullNameInput.addEventListener("input", () => {
        if (fullNameInput.value.trim().length > 0) validateField(fullNameInput);
        else setFieldState(fullNameInput, "default");
    });

    emailInput.addEventListener("input", () => {
        if (emailInput.value.trim().length > 0) validateField(emailInput);
        else setFieldState(emailInput, "default");
    });

    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim().length > 0) validateField(messageInput);
        else setFieldState(messageInput, "default");
    });

    formFields.forEach((field) => {
        field.addEventListener("blur", () => {
            validateField(field);
        });

        field.addEventListener("focus", () => {
            field.style.transition = "all 0.25s ease";
            clearFormAlert();
        });
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearFormAlert();

        const isValid = validateForm();

        if (!isValid) {
            showFormAlert("error", "Please correct the highlighted fields before submitting the form.");
            focusFirstInvalidField();
            return;
        }

        setButtonLoading(true);

        const formData = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            submittedAt: new Date().toISOString()
        };

        try {
            await new Promise((resolve) => setTimeout(resolve, 1600));

            console.log("Contact form submitted:", formData);

            showFormAlert(
                "success",
                "Your message has been sent successfully. Our team will get back to you as soon as possible."
            );

            contactForm.reset();
            resetFieldStates();
        } catch (error) {
            console.error("Form submission error:", error);

            showFormAlert(
                "error",
                "Something went wrong while sending your message. Please try again."
            );
        } finally {
            setButtonLoading(false);
        }
    });

    // ======================= Contact Page Form Functionality End =======================
});