// ======================= ClayAI New Feature Section Start =======================
document.addEventListener("DOMContentLoaded", () => {
    const clayaiFeatureTabs = document.querySelectorAll(".clayai-feature-pro-tab-item");
    const clayaiFeatureLine = document.getElementById("clayaiFeatureTabsLine");

    const clayaiFeatureCard = document.getElementById("clayaiFeatureCard");
    const clayaiFeatureCardTitle = document.getElementById("clayaiFeatureCardTitle");
    const clayaiFeatureCardLink = document.getElementById("clayaiFeatureCardLink");
    const clayaiFeatureCardLabel = document.getElementById("clayaiFeatureCardLabel");
    const clayaiFeatureCardAmount = document.getElementById("clayaiFeatureCardAmount");
    const clayaiFeatureCardPeriod = document.getElementById("clayaiFeatureCardPeriod");
    const clayaiFeatureChart = document.getElementById("clayaiFeatureChart");
    const clayaiFeatureChartBars = document.getElementById("clayaiFeatureChartBars");

    let clayaiActiveFeatureIndex = 0;
    let clayaiFeatureAutoRotate = null;

    function clayaiGetBarClass(styleName, index, values) {
        const maxValue = Math.max(...values);
        const maxIndex = values.indexOf(maxValue);

        if (styleName === "style-one") {
            if (index === 2) return "is-active";
            return "is-muted";
        }

        if (styleName === "style-two") {
            if (index === maxIndex) return "is-active";
            if (index === 3) return "is-active-secondary";
            return "is-muted";
        }

        if (styleName === "style-three") {
            if (index === values.length - 1) return "is-active";
            if (index % 2 === 0) return "is-deep-dark";
            return "is-soft-dark";
        }

        return index === 2 ? "is-active" : "is-muted";
    }

    function clayaiBuildFeatureChart(months, values, styleName = "style-one") {
        if (!clayaiFeatureChartBars || !clayaiFeatureChart) return;

        clayaiFeatureChartBars.innerHTML = "";
        clayaiFeatureChart.classList.remove("style-one", "style-two", "style-three");
        clayaiFeatureChart.classList.add(styleName);

        const maxValue = Math.max(...values);

        values.forEach((value, index) => {
            const chartItem = document.createElement("div");
            chartItem.className = "clayai-feature-pro-chart-item";

            const barClass = clayaiGetBarClass(styleName, index, values);
            if (barClass) {
                chartItem.classList.add(barClass);
            }

            const barWrap = document.createElement("div");
            barWrap.className = "clayai-feature-pro-chart-bar-wrap";

            const bar = document.createElement("div");
            bar.className = "clayai-feature-pro-chart-bar";
            bar.style.height = `${Math.max((value / maxValue) * 100, 26)}%`;

            const label = document.createElement("div");
            label.className = "clayai-feature-pro-chart-label";
            label.textContent = months[index] || "";

            barWrap.appendChild(bar);
            chartItem.appendChild(barWrap);
            chartItem.appendChild(label);
            clayaiFeatureChartBars.appendChild(chartItem);
        });
    }

    function clayaiUpdateFeatureLine(targetItem) {
        if (!targetItem || !clayaiFeatureLine) return;

        const lineParent = clayaiFeatureLine.parentElement.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();

        const offsetTop = itemRect.top - lineParent.top;
        const itemHeight = targetItem.offsetHeight;

        clayaiFeatureLine.style.top = `${offsetTop}px`;
        clayaiFeatureLine.style.height = `${itemHeight}px`;
    }

    function clayaiUpdateFeatureCard(targetItem) {
        if (!targetItem || !clayaiFeatureCard) return;

        const title = targetItem.dataset.title || "Overview";
        const link = targetItem.dataset.link || "See reports";
        const label = targetItem.dataset.label || "Spend this month";
        const amount = targetItem.dataset.amount || "$0.00";
        const period = targetItem.dataset.period || "Month";
        const styleName = targetItem.dataset.chartStyle || "style-one";
        const months = (targetItem.dataset.months || "").split(",");
        const values = (targetItem.dataset.values || "").split(",").map(Number);

        clayaiFeatureCard.classList.add("is-switching");

        setTimeout(() => {
            clayaiFeatureCardTitle.textContent = title;
            clayaiFeatureCardLink.textContent = link;
            clayaiFeatureCardLabel.textContent = label;
            clayaiFeatureCardAmount.textContent = amount;
            clayaiFeatureCardPeriod.childNodes[0].nodeValue = `${period} `;
            clayaiBuildFeatureChart(months, values, styleName);
            clayaiFeatureCard.classList.remove("is-switching");
        }, 180);
    }

    function clayaiSetActiveFeature(index, userTriggered = false) {
        const targetItem = clayaiFeatureTabs[index];
        if (!targetItem) return;

        clayaiFeatureTabs.forEach((item) => item.classList.remove("is-active"));
        targetItem.classList.add("is-active");

        clayaiActiveFeatureIndex = index;
        clayaiUpdateFeatureLine(targetItem);
        clayaiUpdateFeatureCard(targetItem);

        if (userTriggered) {
            clayaiResetFeatureAutoRotate();
        }
    }

    function clayaiNextFeature() {
        clayaiActiveFeatureIndex = (clayaiActiveFeatureIndex + 1) % clayaiFeatureTabs.length;
        clayaiSetActiveFeature(clayaiActiveFeatureIndex);
    }

    function clayaiStartFeatureAutoRotate() {
        clayaiFeatureAutoRotate = setInterval(clayaiNextFeature, 4500);
    }

    function clayaiResetFeatureAutoRotate() {
        clearInterval(clayaiFeatureAutoRotate);
        clayaiStartFeatureAutoRotate();
    }

    if (clayaiFeatureTabs.length) {
        clayaiFeatureTabs.forEach((item, index) => {
            item.addEventListener("click", () => {
                clayaiSetActiveFeature(index, true);
            });

            item.addEventListener("mouseenter", () => {
                if (window.innerWidth > 991) {
                    clayaiSetActiveFeature(index, true);
                }
            });
        });

        window.addEventListener("resize", () => {
            const activeItem = document.querySelector(".clayai-feature-pro-tab-item.is-active");
            if (activeItem) {
                clayaiUpdateFeatureLine(activeItem);
            }
        });

        clayaiSetActiveFeature(0);
        clayaiStartFeatureAutoRotate();
    }
});
// ======================= ClayAI New Feature Section End =======================