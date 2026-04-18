// ======================= Documentation Page Section Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const docsSidebar = document.getElementById("docsPageSidebar");
    const docsMenuToggle = document.getElementById("docsPageMenuToggle");
    const docsNavLinks = document.querySelectorAll(".docs-page-pro-nav-link");

    if (docsMenuToggle && docsSidebar) {
        docsMenuToggle.addEventListener("click", () => {
            docsSidebar.classList.toggle("active");
        });
    }

    document.addEventListener("click", (event) => {
        if (
            window.innerWidth <= 991 &&
            docsSidebar &&
            docsMenuToggle &&
            !docsSidebar.contains(event.target) &&
            !docsMenuToggle.contains(event.target)
        ) {
            docsSidebar.classList.remove("active");
        }
    });

    function setActiveDocNav() {
        const currentUrl = window.location.pathname.split("/").pop();
        const currentParams = new URLSearchParams(window.location.search);
        const currentDoc = currentParams.get("doc");

        docsNavLinks.forEach((link) => {
            const linkUrl = new URL(link.href, window.location.origin);
            const linkDoc = linkUrl.searchParams.get("doc");
            const linkPath = linkUrl.pathname.split("/").pop();

            link.classList.remove("is-active");

            if (currentDoc && linkDoc === currentDoc) {
                link.classList.add("is-active");
            } else if (!currentDoc && currentUrl === "documentation.html" && link.dataset.docLink === "user-guides") {
                // default active on docs landing page
                link.classList.add("is-active");
            } else if (currentUrl === linkPath && currentDoc && linkDoc === currentDoc) {
                link.classList.add("is-active");
            }
        });
    }

    setActiveDocNav();

    const docsRevealItems = document.querySelectorAll(".docs-page-pro-section .reveal-up");

    if (docsRevealItems.length) {
        const docsObserver = new IntersectionObserver(
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

        docsRevealItems.forEach((item) => {
            docsObserver.observe(item);
        });
    }
});
// ======================= Documentation Page Section End =======================



// ======================= Docs Feedback Interactive Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const feedbackButtons = document.querySelectorAll(".docs-feedback-btn");
    const feedbackResponse = document.getElementById("docsFeedbackResponse");
    const feedbackMessage = document.getElementById("docsFeedbackMessage");
    const feedbackChips = document.querySelectorAll(".docs-feedback-chip");

    if (!feedbackButtons.length || !feedbackResponse || !feedbackMessage) return;

    function clearFeedbackState() {
        feedbackButtons.forEach((btn) => {
            btn.classList.remove("is-selected-yes", "is-selected-no");
        });

        feedbackChips.forEach((chip) => {
            chip.classList.remove("is-active");
        });
    }

    feedbackButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const feedbackType = button.dataset.feedback;

            clearFeedbackState();

            if (feedbackType === "yes") {
                button.classList.add("is-selected-yes");
                feedbackMessage.textContent = "Thanks for the feedback. Glad this documentation helped.";
            } else {
                button.classList.add("is-selected-no");
                feedbackMessage.textContent = "Thanks for letting us know. What could be improved?";
            }

            feedbackResponse.classList.add("is-visible");
        });
    });

    feedbackChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            feedbackChips.forEach((item) => item.classList.remove("is-active"));
            chip.classList.add("is-active");

            const reason = chip.dataset.reason;

            if (reason === "clear") {
                feedbackMessage.textContent = "Awesome — thanks for confirming it was clear.";
            } else if (reason === "useful") {
                feedbackMessage.textContent = "Great — happy it was useful.";
            } else if (reason === "too-short") {
                feedbackMessage.textContent = "Got it — this section likely needs more detail.";
            } else if (reason === "confusing") {
                feedbackMessage.textContent = "Understood — this part may need clearer explanation.";
            } else if (reason === "missing-info") {
                feedbackMessage.textContent = "Thanks — this doc may need more complete information.";
            }
        });
    });
});
// ======================= Docs Feedback Interactive End =======================